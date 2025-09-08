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

          <ul className="space-y-1 border-black pt-2 uppercase  ">
            <li className="flex justify-between border-b border-black">
              <span>{'>'} Cut & Wash</span>
              <span>25.-</span>
            </li>
            <li className="flex justify-between border-b border-black">
              <span>{'>'} Beard Trim</span>
              <span>15.-</span>
            </li>
            <li className="flex justify-between border-b border-black">
              <span>{'>'} Shave (Hot Towel)</span>
              <span>18.-</span>
            </li>
            <li className="flex justify-between border-b border-black">
              <span>{'>'} Buzz Cut</span>
              <span>18.-</span>
            </li>
            <li className="flex justify-between border-b border-black">
              <span>{'>'} Haircut + Beard</span>
              <span>35.-</span>
            </li>
            <li className="flex justify-between border-b border-black">
              <span>{'>'} Hair Color</span>
              <span>50.-</span>
            </li>
            <li className="flex justify-between border-b border-black">
              <span>{'>'} Bleach & Tone</span>
              <span>70.-</span>
            </li>
            <li className="flex justify-between border-b border-black">
              <span>{'>'} Eyebrow Trim</span>
              <span>10.-</span>
            </li>
            <li className="flex justify-between border-b border-black">
              <span>{'>'} Student Haircut</span>
              <span>20.-</span>
            </li>
            <li className="flex justify-between border-b border-black">
              <span>{'>'} Kids (Under 12)</span>
              <span>18.-</span>
            </li>
          </ul>
          </TextAnimation2>
        </div>

        <div className="flex flex-row-reverse justify-between text-base tracking-wider leading-none">
          <div className="flex flex-col">
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
