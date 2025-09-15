"use client"

// import PageTransition from "@/components/Layout/PageTransition";
import { useEffect } from "react";
import StylesWrapper from "@/components/StylesWrapper";


export default function Styles() {

  useEffect(() => {
    const images = Array.from({ length: 16 }, (_, i) => `/stylesresized/img${i + 1}.webp`);
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // const images = Array.from({ length: 16 }, (_, i) => `/styles/img${i + 1}.jpg`);

  return(
    // <PageTransition>
      <div 
        className="relative w-full overflow-hidden"
        style={{ height: "calc(var(--vh, 1vh) * 100)" }}
      >
        <StylesWrapper />
      </div>
    // </PageTransition>
  )
}