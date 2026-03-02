"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(); // Registrar sin plugins aún

export default function TextAnimation({ children, animateOnScroll = true, delay = 0, start = "top 75%", }) {
  const containerRef = useRef(null);
  const elementRefs = useRef([]);
  const splitRefs = useRef([]);
  const lines = useRef([]);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      // Dynamic import solo en cliente
      import("gsap/SplitText").then(({ SplitText }) => {
        import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
          const container = containerRef.current;
          if (!container) return; // 🛑 PROTECCIÓN
      
          gsap.registerPlugin(SplitText, ScrollTrigger);
      
          splitRefs.current = [];
          lines.current = [];
          elementRefs.current = [];
      
          let elements = [];
      
          if (container.hasAttribute("data-copy-wrapper")) {
            elements = Array.from(container.children);
          } else {
            elements = [container];
          }
      
          elements.forEach((element) => {
            elementRefs.current.push(element);
      
            const split = SplitText.create(element, {
              type: "lines",
              mask: "lines",
              linesClass: "line-line",
              lineThreshold: 0.1,
            });
      
            splitRefs.current.push(split);
      
            const computedStyle = window.getComputedStyle(element);
            const textIndent = computedStyle.textIndent;
      
            if (textIndent && textIndent !== "0px") {
              if (split.lines.length > 0) {
                split.lines[0].style.paddingLeft = textIndent;
              }
              element.style.textIndent = "0";
            }
      
            lines.current.push(...split.lines);
          });
      
          gsap.set(lines.current, { y: "100%" });
      
          const animationProps = {
            y: "0%",
            duration: 1,
            stagger: 0.1,
            ease: "power4.out",
            delay: delay,
          };
      
          if (animateOnScroll) {
            gsap.to(lines.current, {
              ...animationProps,
              scrollTrigger: {
                trigger: container,
                start,
                once: true,
              },
            });
          } else {
            gsap.to(lines.current, animationProps);
          }
        });
      });

      return () => {
        splitRefs.current.forEach((split) => {
          if (split) {
            split.revert();
          }
        });
      };
    },
    { scope: containerRef, dependencies: [animateOnScroll, delay] }
  );

  if (React.Children.count(children) === 1) {
    return React.cloneElement(children, { ref: containerRef });
  }

  return (
    <div ref={containerRef} data-copy-wrapper="true">
      {children}
    </div>
  );
}
