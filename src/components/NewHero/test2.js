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
      className="container-test-hero w-screen h-screen flex flex-row px-2 gap-2 py-2 bg-white"
    >
      <div className="img-test-hero flex w-1/2 overflow-hidden">
        <img
          src="/images/img4.jpeg"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className="container-right-hero w-1/2 flex flex-col justify-between">
        <div className="flex self-end w-1/2">
          <img src="/images/img1.jpeg"
          alt=""
          className="w-full h-full object-cover"/>
        </div>
        <div className="test-info flex justify-between self-start w-full">
          <div className="flex flex-col -space-y-2">
            <h1 className="text-black ">salon vilarnau</h1>
            <p>manteufelstr.55</p>
            <p>10999 · kreuzberg</p>
          </div>
          <div className="flex flex-col -space-y-2">
            <p>info — appointments /</p>
            <p className="">(030) 61987269</p>
            <p className="">hello@vilarnau.com</p>
          </div>
          {/* <div className="flex flex-col -space-y-2">
            <p>appointments /</p>
            <p className="">hello@vilarnau.com</p>
          </div> */}
          <div className="flex flex-col -space-y-2" >
            <p>oppening times /</p>
            <p>tue — fri from 12 to 20</p>
            <p>saturdays from 13 to 19</p>
            {/* <p>sun — mon closed</p>           */}
          </div>
        </div>
      </div>
    </div>
  );
}
