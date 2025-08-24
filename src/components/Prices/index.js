"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
// import TextAnimation from "../Tools";
import TextAnimation2 from "../Tools/AnimatedText2";

export default function PriceList({ isOpen, onClose }) {
  const modalRef = useRef();

  useEffect(() => {
    if (isOpen && modalRef.current) {
      gsap.fromTo(
        modalRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, ease: "power3.out" }
      );
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40" onClick={onClose}>
      {/* Blur completo de fondo */}
      <div className="absolute inset-0 backdrop-blur-xl bg-white/40" />

      {/* Modal centrado */}
      <div
        ref={modalRef}
        className="font-medium border border-black absolute flex flex-col top-1/2 left-1/2 z-50 w-[80vw] md:w-[40vw] -translate-x-1/2 -translate-y-1/2 
                   bg-transparent text-black px-3 md:px-4 py-8 md:py-4 gap-2 md:gap-2"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col uppercase text-justify gap-2">
          <TextAnimation2>
          <h2 className="tracking-wide pb-2">Price List</h2>

          <ul className="space-y-1 border-black pt-2">
            <li className="flex justify-between border-b border-black">
              <span>Cut & Wash</span>
              <span>25€</span>
            </li>
            <li className="flex justify-between border-b border-black">
              <span>Beard Trim</span>
              <span>15€</span>
            </li>
            <li className="flex justify-between border-b border-black">
              <span>Shave (Hot Towel)</span>
              <span>18€</span>
            </li>
            <li className="flex justify-between border-b border-black">
              <span>Buzz Cut</span>
              <span>18€</span>
            </li>
            <li className="flex justify-between border-b border-black">
              <span>Haircut + Beard</span>
              <span>35€</span>
            </li>
            <li className="flex justify-between border-b border-black">
              <span>Hair Color</span>
              <span>50€</span>
            </li>
            <li className="flex justify-between border-b border-black">
              <span>Bleach & Tone</span>
              <span>70€</span>
            </li>
            <li className="flex justify-between border-b border-black">
              <span>Eyebrow Trim</span>
              <span>10€</span>
            </li>
            <li className="flex justify-between border-b border-black">
              <span>Student Haircut</span>
              <span>20€</span>
            </li>
            <li className="flex justify-between border-b border-black">
              <span>Kids (Under 12)</span>
              <span>18€</span>
            </li>
          </ul>
          </TextAnimation2>
        </div>

        <div className="flex flex-col self-center text-center mt-4 uppercase leading-3 text-xs">
          <h2>Salon Vilarnau</h2>
        </div>
      </div>
    </div>
  );
}
