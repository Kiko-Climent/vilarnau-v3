"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import GridRevealImage from "../Tools/GridRevealAnimation";

const animateIn = async (target, onComplete) => {
  const module = await import("gsap/SplitText");
  const SplitText = module.default;
  gsap.registerPlugin(SplitText);

  // Hacemos visible el contenedor justo antes de animar
  gsap.set(target, { opacity: 1 });

  const split = new SplitText(target, { type: "chars" });

  gsap.fromTo(
    split.chars,
    { yPercent: "random([-100, 100])", opacity: 0, filter: "blur(10px)" },
    {
      yPercent: 0,
      opacity: 1,
      stagger: { amount: 0.4, from: "random" },
      duration: 1,
      ease: "power3.out",
      onComplete,
      filter: "blur(0px)",
    }
  );
};

export default function Test4() {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const hasAnimatedText = useRef(false);

  const handleComplete = () => {
    if (!hasAnimatedText.current) {
      hasAnimatedText.current = true;
      animateIn(textRef.current);
    }
  };

  // 🔹 Inicialmente ocultamos el texto
  useEffect(() => {
    gsap.set(textRef.current, { opacity: 0 });
  }, []);

  return (
    <div
      ref={containerRef}
      className="container-test-hero w-screen h-screen flex flex-col md:flex-row gap-2 bg-white text-base px-2 md:px-0 py-2 md:py-0"
    >
      {/* Lado izquierdo */}
      <div className="flex w-full md:w-1/2 h-full overflow-hidden">
        <GridRevealImage
          src="/images/img1.jpeg"
          className="w-full h-full"
          rows={5}
          cols={5}
          order="diagonal"
          start="top 85%"
          onComplete={handleComplete}
        />
      </div>

      {/* Lado derecho */}
      <div className="container-right-hero w-full md:w-1/2 flex flex-col">
        <div className="hidden md:flex flex-1 items-center justify-center">
          <div className="aspect-[3/4] w-1/2">
            <GridRevealImage
              src="/images/img17.jpeg"
              className="w-full h-full"
              rows={5}
              cols={5}
              order="diagonal"
              start="top 85%"
              onComplete={handleComplete}
            />
          </div>
        </div>

        {/* 🔹 Aplicamos opacity-0 por defecto para eliminar chispazo */}
        <div
          className="test-info flex flex-col md:flex-row justify-between w-full opacity-0"
          ref={textRef}
        >
          <div className="flex flex-col -space-y-2">
            <h1 className="text-black">salon vilarnau</h1>
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
