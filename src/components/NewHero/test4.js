"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image"; // ✅ necesario
import gsap from "gsap";
import GridRevealImage from "../Tools/GridRevealAnimation";

const animateIn = async (target, onComplete) => {
  const { default: SplitText } = await import("gsap/SplitText");
  gsap.registerPlugin(SplitText);

  gsap.set(target, { opacity: 1 });

  const split = new SplitText(target, { type: "chars" });

  gsap.fromTo(
    split.chars,
    { yPercent: "random([-100, 100])", opacity: 0 },
    {
      yPercent: 0,
      opacity: 1,
      stagger: { amount: 0.4, from: "random" },
      duration: 1,
      ease: "power3.out",
      onComplete: () => {
        split.revert();
        onComplete?.();
      }
    }
  );
};

export default function Test4() {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const hasAnimatedText = useRef(false);

  const [isMobile, setIsMobile] = useState(false);

  // ✅ Estados para saber si cada imagen está lista
  const [heroImg, setHeroImg] = useState(null);
  const [sideImg, setSideImg] = useState(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleComplete = () => {
    if (!hasAnimatedText.current) {
      hasAnimatedText.current = true;
      animateIn(textRef.current);
    }
  };

  useEffect(() => {
    gsap.set(textRef.current, { opacity: 0 });

    return () => {
      if (textRef.current) {
        textRef.current.innerHTML = textRef.current.textContent;
      }
    };
  }, []);

  // ✅ rutas dinámicas según mobile
  const heroSrc = isMobile ? "/newhero/img10.webp" : "/images/img1.webp";

  return (
    <div
      ref={containerRef}
      className="w-screen h-screen flex flex-col md:flex-row gap-1 md:gap-2 bg-white text-lg md:text-[clamp(0.8rem,1.4vw,1rem)] px-4 md:px-0 py-8 md:py-0 font-myfont2"
      style={{
        letterSpacing: 'clamp(0.05em, 0.2vw, 0.1em)',
      }}
    >

      {/* ✅ Invisible preload Next/Image */}
      <div className="hidden">
        <Image
          src={heroSrc}
          alt=""
          width={1200}
          height={1600}
          priority
          onLoad={(e) => setHeroImg(e.target.currentSrc)}
        />
        <Image
          src="/images/img17.webp"
          alt=""
          width={1200}
          height={1600}
          priority
          onLoad={(e) => setSideImg(e.target.currentSrc)}
        />
      </div>

      {/* ✅ Lado izquierdo — solo aparece tras preload */}
      <div className="flex w-full md:w-1/2 aspect-[3/4] overflow-hidden">
        {heroImg && (
          <GridRevealImage
            src={heroImg}
            className="w-full h-full"
            rows={5}
            cols={5}
            order="diagonal"
            start="top 85%"
            onComplete={handleComplete}
          />
        )}
      </div>

      {/* ✅ Lado derecho */}
      <div className="w-full md:w-1/2 flex flex-col">

        <div className="hidden md:flex flex-1 items-center justify-center">
          <div className="aspect-[3/4] w-1/2">
            {sideImg && (
              <GridRevealImage
                src={sideImg}
                className="w-full h-full"
                rows={5}
                cols={5}
                order="diagonal"
                start="top 85%"
                onComplete={handleComplete}
              />
            )}
          </div>
        </div>

        {/* Texto Reveal */}
        <div
          className="test-info flex flex-row justify-between w-full opacity-0 pr-0 md:pr-5"
          ref={textRef}
        >
          <div className="flex flex-col -space-y-2 md:-space-y-2">
            <h1 className="text-black">salon vilarnau</h1>
            <p>manteufelstr.55</p>
            <p>10999 · kreuzberg</p>
          </div>
          <div className="hidden md:flex flex-col -space-y-2 md:-space-y-2">
            <p>info & appointments /</p>
            <a href="mailto:hello@vilarnau.com">hello@vilarnau.com</a>
            <a href="tel:+493061202363">(030) 61202363</a>
          </div>
          <div className="hidden md:flex flex-col -space-y-2 md:-space-y-2">
            <p>oppening hours /</p>
            <p>tue — fri from 12 to 20</p>
            <p>saturdays from 13 to 19</p>
          </div>
          <div className="flex md:hidden flex-col text-right -space-y-2 md:-space-y-2">
            <p>info & appointments /</p>
            <a href="mailto:hello@vilarnau.com">hello@vilarnau.com</a>
            <a href="tel:+493061202363">(030) 61202363</a>
          </div>
        </div>
      </div>
    </div>
  );
}
