"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const animateIn = async (target, onComplete) => {
  const module = await import('gsap/SplitText');
  const SplitText = module.default;
  gsap.registerPlugin(SplitText);

  gsap.set(target, { opacity: 1 });
  const split = new SplitText(target, { type: 'chars' });

  gsap.fromTo(
    split.chars,
    { yPercent: 'random([-100, 100])', opacity: 0, filter: 'blur(10px)' },
    {
      yPercent: 0,
      opacity: 1,
      stagger: { amount: 0.4, from: 'random' },
      duration: 1,
      ease: 'power3.out',
      onComplete,
      filter: 'blur(0px)',
    }
  );
};

export default function Test3() {
  const containerRef = useRef(null);
  const textRef = useRef(null)

  useEffect(() => {
    const runAnimation = async () => {
      const { default: CustomEase } = await import("gsap/CustomEase");
      gsap.registerPlugin(CustomEase);
      CustomEase.create("hop", "0.9, 0, 0.1, 1");
  
      gsap.set(".img-test-hero", {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        willChange: "clip-path",
      });

      gsap.set(".img-test-herocenter", {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        willChange: "clip-path",
      });
  
      gsap.set(textRef.current, { opacity: 0 });
  
      const tl = gsap.timeline();
  
      tl.to(".img-test-hero", {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 1.5,
        ease: "hop",
      });

      tl.to(".img-test-herocenter", {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 1.5,
        ease: "hop",
      });
  
      tl.call(() => {
        animateIn(textRef.current);
      });
    };
  
    runAnimation();
  }, []);
  

  return (
    <div
      ref={containerRef}
      className="container-test-hero w-screen h-screen flex flex-col md:flex-row gap-2 px-2 py-2 bg-white text-base"
    >
      {/* Lado izquierdo */}
      <div className="img-test-hero flex w-12/12 md:w-1/2 overflow-hidden">
        <img
          src="/images/img1.jpeg"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      {/* Lado derecho */}
      <div className="container-right-hero w-1/2 flex flex-col">
        
        {/* Imagen centrada */}
        <div className="hidden md:flex flex-1 items-center justify-center">
          <div className="aspect-[3/4] w-1/2 img-test-herocenter">
            <img
              src="/images/img17.jpeg"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Info en el fondo */}
        <div className="test-info flex flex-col md:flex-row justify-between w-full"
        ref={textRef}>
          <div className="flex flex-col -space-y-2">
            <h1 className="text-black ">salon vilarnau</h1>
            <p>manteufelstr.55</p>
            <p>10999 · kreuzberg</p>
          </div>
          <div className="flex flex-col -space-y-2">
            <p>info — appointments /</p>
            <p>hello@vilarnau.com</p>
            <p>(030) 61987269</p>
          </div>
          <div className="flex flex-col -space-y-2">
            <p>oppening times /</p>
            <p>tue — fri from 12 to 20</p>
            <p>saturdays from 13 to 19</p>
          </div>
        </div>
      </div>
    </div>

  );
}
