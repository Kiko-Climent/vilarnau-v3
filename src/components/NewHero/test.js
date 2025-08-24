"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Test() {
  const containerRef = useRef(null);

  useEffect(() => {
    const runAnimation = async () => {
      const { default: CustomEase } = await import("gsap/CustomEase");
      gsap.registerPlugin(CustomEase);

      // Creamos la ease personalizada
      CustomEase.create("hop", "0.9, 0, 0.1, 1");

      // Seteamos estado inicial del clipPath
      gsap.set(".img-test-hero", {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        willChange: "clip-path",
      });

      // Esperamos un poco tras carga
      setTimeout(() => {
        gsap.to(".img-test-hero", {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          duration: 1.5,
          ease: "hop",
        });
      }, 1000); // Retardo de 1s
    };

    runAnimation();
  }, []);

  return (
    <div
      ref={containerRef}
      className="container-test-hero text-lg w-screen h-screen flex flex-row py-2 bg-white"
    >
      <div className="img-test-hero flex w-1/2 aspect-square overflow-hidden border-r">
        <img
          src="/images/img1.jpeg"
          alt=""
          className="w-full h-full object-cover px-2"
        />
      </div>
      <div className="test-info flex flex-col w-1/2 justify-center text-center items-center px-2">
        <div className="flex flex-col -space-y-2">
          <h1 className="text-black ">salon vilarnau</h1>
          <p>manteufelstr.55</p>
          <p>10999 · kreuzberg</p>
        </div>
        <div className="flex flex-col -space-y-2">
          {/* <p>info — appointments /</p> */}
          <p className="">(030) 61987269</p>
          <p className="">hello@vilarnau.com</p>
        </div>
        {/* <div className="flex flex-col -space-y-2">
          <p>appointments /</p>
          <p className="">hello@vilarnau.com</p>
        </div> */}
        <div className="flex flex-col -space-y-2" >
          {/* <p>oppening times /</p> */}
          <p>tue — fri from 12 to 20</p>
          <p>saturdays from 13 to 19</p>
          {/* <p>sun — mon closed</p>           */}
        </div>
      </div>
    </div>
  );
}
