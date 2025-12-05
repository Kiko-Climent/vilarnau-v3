"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import TextAnimation from "../Tools";
import usePreloadImage from "../Tools/usePreloadImage";

const imgs = [
  "/images/Vilarnau_analog_04.webp",
  "/images/Vilarnau_analog_06.webp",
  "/images/Vilarnau_analog_13.webp",
];

export default function AlmodovarQuoteNew() {
  const sectionRef = useRef(null);

  // ✅ Preload images first
  const [img1, Pre1] = usePreloadImage(imgs[0]);
  const [img2, Pre2] = usePreloadImage(imgs[1]);
  const [img3, Pre3] = usePreloadImage(imgs[2]);
  const allLoaded = img1 && img2 && img3;

  useEffect(() => {
    if (!allLoaded) return;
    let ctx;
  
    async function runAnimation() {
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
  
      const images = sectionRef.current?.querySelectorAll(".reveal-img");
      if (!images?.length) return;
  
      // ---- SOLUCIÓN 3: warm-up GPU layer ----
      images.forEach(img => {
        img.style.willChange = "clip-path, transform";
        img.style.transform = "translateZ(0.001px)"; // fuerza composición suave
        img.style.backfaceVisibility = "hidden";
        img.style.contain = "layout paint";
      });
  
      ctx = gsap.context(() => {
        gsap.set(images, {
          clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)",
        });
  
        // ---- SOLUCIÓN 1: doble rAF + 1 frame extra ----
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setTimeout(() => {
              gsap.to(images, {
                clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                duration: 1.25,
                ease: "power4.out",
                stagger: 0.22,
                scrollTrigger: {
                  trigger: sectionRef.current,
                  start: "center-=150 center",
                  toggleActions: "play none none reverse",
                  once: true,
                }
              });
            }, 16); // un frame (~16ms)
          });
        });
      }, sectionRef);
    }
  
    runAnimation();
    return () => ctx?.revert();
  }, [allLoaded]);
  

  return (
    <div
      ref={sectionRef}
      className="relative h-screen w-screen flex flex-col justify-center items-start overflow-hidden gap-2 pl-2 md:pl-60 bg-white"
    >
      {Pre1}{Pre2}{Pre3}

      {[img1, img2, img3].map((src, i) => (
        <div key={i} className="flex w-[75%] md:w-[38%] h-[22%] md:h-[31%]">
          {src && (
            <img
              src={src}
              className="reveal-img object-cover w-full h-full"
              style={{
                contain: "layout paint",
                transform: "translateZ(0)",
              }}
            />
          )}
        </div>
      ))}

      {/* Texto en medio */}
      <TextAnimation start="top 90%">
        <div className="absolute bottom-[39%] md:bottom-[35%] pl-2 left-[0%] md:left-[11%] w-full md:w-[50%] mix-blend-difference">
          <p className="text-gray-300 text-base md:text-[clamp(0.95rem,2vw,1.45rem)] tracking-wider leading-none md:leading-5">
          &quot;well, as i was saying it costs a lot to be authentic,
            and one can&apos;t be stingy with these things,
            because you are more authentic the more you
            resemble what you&apos;ve dreamed you are&quot;
          </p>
        </div>
      </TextAnimation>
    </div>
  );
}
