"use client";
import { useState } from "react";
import Image from "next/image";
import TextAnimation from "../Tools";
import GridRevealImage from "../Tools/GridRevealAnimation";

const Triptico5 = () => {
  const [realSrc, setRealSrc] = useState(null);

  return (
    <div className="w-full h-screen overflow-hidden bg-white relative">

      {/* Preload de Next pero oculto */}
      <div className="hidden">
        <Image
          src="/images/img4.jpeg"
          alt=""
          width={1200}
          height={1600}
          priority
          onLoadingComplete={(img) => setRealSrc(img.src)}
        />
      </div>

      {/* Imagen en esquina superior derecha revelándose */}
      <div className="absolute top-0 right-0 w-10/12 md:w-7/12 h-[75%] aspect-[4/3]">
        {realSrc && (
          <GridRevealImage
            src={realSrc}
            className="w-full h-full"
            rows={5}
            cols={5}
            order="diagonal"
            start="top 85%"
          />
        )}
      </div>

      {/* Texto */}
      <TextAnimation>
        <div className="absolute bottom-2 left-2 text-left font-myfont2 text-base md:text-[clamp(0.95rem,2vw,1.45rem)] tracking-wider leading-none md:leading-5">
          <p>a place where individuality</p>
          <p>and self expression are</p>
          <p>not just embraced</p>
          <p>but celebrated</p>
        </div>
      </TextAnimation>
    </div>
  );
};

export default Triptico5;
