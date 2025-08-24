'use client';

import { useRef, useEffect } from "react";
import Lenis from "lenis";

export default function FlipSection2({ FirstComponent, SecondComponent }) {
  const containerRef = useRef(null);


  useEffect( () => {
    const lenis = new Lenis()

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
  }, [])


  return (
    <main ref={containerRef} className="relative h-[200vh]">    
      <div className="sticky top-0 h-screen">
        <FirstComponent />
      </div>
      <div className="relative h-screen">
        <SecondComponent />
      </div>
    </main>
  );
}
