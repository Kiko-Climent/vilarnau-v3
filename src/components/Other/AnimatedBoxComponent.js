"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import AnimatedImageBox from "../Tools/AnimatedImageBox";

const AnimatedBoxComponent = () => {
  const boxRef = useRef (null)
  useEffect(() => {
    let ctx;
    const runAnimation = async () => {
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const section = boxRef.current;
      if (!section) return;

      const images = section.querySelectorAll(".reveal-img");

      ctx = gsap.context(() => {
        gsap.set(images, {
          clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)",
        });

        gsap.to(images, {
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          duration: 1.2,
          ease: "power3.out",
          stagger: 0.25,
          scrollTrigger: {
            trigger: section,
            start: "top 20%",
            toggleActions: "play none none reverse",
          },
        });
      }, section);
    };

    runAnimation();

    return () => ctx && ctx.revert();
  }, []);

  return (
    <div ref={boxRef} 
    className="w-screen h-[100vh] flex justify-center items-center bg-white">
      <div className="reveal-img sticky top-8 w-[40vw] max-w-[35vw] md:max-w-[15vw]">
        <AnimatedImageBox />
      </div>
    </div>
  );
};

export default AnimatedBoxComponent;
