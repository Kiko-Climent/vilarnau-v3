"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import TextAnimation2 from "../Tools/AnimatedText2";

export default function PriceList2({ isOpen, onClose }) {
  const modalRef = useRef();
  const lineRefs = useRef([]);

  useEffect(() => {
    if (isOpen && modalRef.current) {
      // Animación del modal
      gsap.fromTo(
        modalRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, ease: "power3.out" }
      );

      // Animación de las líneas
      gsap.fromTo(
        lineRefs.current,
        { scaleX: 0, transformOrigin: "left center" },
        {
          scaleX: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          delay: 0.3,
        }
      );
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40" onClick={onClose}>
      {/* Blur completo de fondo */}
      <div className="absolute inset-0 bg-white/80 backdrop-blur-xl" />

      {/* Modal centrado */}
      <div
        ref={modalRef}
        className="absolute flex flex-col top-1/2 left-1/2 z-50 w-[80vw] md:w-[55vw] -translate-x-1/2 -translate-y-1/2  
             text-black px-6 md:px-8 py-8 md:py-6 gap-4 text-xl font-myfont2 tracking-widest"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col gap-2">
          <TextAnimation2>
            <h2 className="tracking-wider">salon vilarnau | pricelist</h2>

            <ul className="space-y-3 pt-2 uppercase">
              {[
                ["Cut & Wash", "25.-"],
                ["Beard Trim", "15.-"],
                ["Shave (Hot Towel)", "18.-"],
                ["Buzz Cut", "18.-"],
                ["Haircut + Beard", "35.-"],
                ["Hair Color", "50.-"],
                ["Bleach & Tone", "70.-"],
                ["Eyebrow Trim", "10.-"],
                ["Student Haircut", "20.-"],
                ["Kids (Under 12)", "18.-"],
              ].map(([service, price], i) => (
                <li key={i} className="flex flex-col">
                  <div className="flex justify-between">
                    <span>{">"} {service}</span>
                    <span>{price}</span>
                  </div>
                  {/* Línea que animamos */}
                  <div
                    ref={(el) => (lineRefs.current[i] = el)}
                    className="h-[2px] w-full bg-black origin-left scale-x-0"
                  />
                </li>
              ))}
            </ul>
          </TextAnimation2>
        </div>

        <div className="flex flex-row-reverse justify-between text-base tracking-wider leading-none">
          <div className="flex flex-col items-end">
            <h2 className="flex">manteufelstr.35</h2>
            <h2 className="flex">10247 · berlin</h2>
          </div>
          <div className="flex flex-col">
            <h2 className="flex">T: (030) 61202363</h2>
            <h2 className="flex">E: hello@vilarnau.com</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
