"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(); 

export default function TextAnimationIndent({ children, animateOnScroll = true, delay = 0, indent = "3rem" }) {
  const containerRef = useRef(null);
  const lines = useRef([]);
  const splitRefs = useRef([]);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      import("gsap/SplitText").then(({ SplitText }) => {
        import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
          gsap.registerPlugin(SplitText, ScrollTrigger);

          splitRefs.current = [];
          lines.current = [];

          const elements = containerRef.current.hasAttribute("data-copy-wrapper")
            ? Array.from(containerRef.current.children)
            : [containerRef.current];

          elements.forEach((element) => {
            // Wrap de la primera letra en un span para indent inicial
            const firstChar = element.textContent.charAt(0);
            element.innerHTML =
              `<span class="first-char">${firstChar}</span>` + element.textContent.slice(1);

            // SplitText normal por líneas
            const split = SplitText.create(element, {
              type: "lines",
              mask: "lines",
              linesClass: "line-line",
              lineThreshold: 0.1,
            });

            splitRefs.current.push(split);
            lines.current.push(...split.lines);
          });

          // Aplica el padding solo a la primera letra (pseudo indent)
          const styleTag = document.createElement("style");
          styleTag.innerHTML = `.first-char { display:inline-block; width:${indent}; }`;
          document.head.appendChild(styleTag);

          gsap.set(lines.current, { y: "100%" });

          const animationProps = { y: "0%", duration: 1, stagger: 0.1, ease: "power4.out", delay };

          if (animateOnScroll) {
            gsap.to(lines.current, {
              ...animationProps,
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top 75%",
                once: true,
              },
            });
          } else {
            gsap.to(lines.current, animationProps);
          }
        });
      });

      return () => {
        splitRefs.current.forEach((split) => split?.revert());
      };
    },
    { scope: containerRef, dependencies: [animateOnScroll, delay, indent] }
  );

  if (React.Children.count(children) === 1) {
    return React.cloneElement(children, { ref: containerRef });
  }

  return <div ref={containerRef} data-copy-wrapper="true">{children}</div>;
}
