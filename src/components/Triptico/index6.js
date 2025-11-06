"use client";
import { useState } from "react";
import Image from "next/image";
import TextAnimation from "../Tools";
import GridRevealImage from "../Tools/GridRevealAnimation";

const Triptico6 = () => {
  const [realSrc, setRealSrc] = useState(null);

  return (
    <div className="w-screen h-screen overflow-hidden bg-white relative">

      {/* Preload de la imagen usando Next Image, invisible */}
      <div className="hidden">
        <Image
          src="/images/img2.jpg"
          alt=""
          width={1200}
          height={900}
          priority
          onLoadingComplete={(img) => setRealSrc(img.src)}
        />
      </div>

      {/* Imagen con GridReveal solo cuando la imagen está lista */}
      <div className="absolute top-0 left-0 w-10/12 md:w-8/12 h-[75%] aspect-[4/3]">
        {realSrc && (
          <GridRevealImage
            src={realSrc}
            className="w-full h-full"
            rows={5}
            cols={5}
            order="diagonal"
            start="top 70%"
          />
        )}
      </div>

      {/* Texto animado */}
      <TextAnimation>
        <div className="absolute bottom-2 right-2 md:right-6 text-right text-base md:text-[clamp(0.95rem,2vw,1.45rem)] tracking-wider leading-none md:leading-5">
          <p>designing looks</p>
          <p>that reflect the now</p>
          <p>while highlighting</p>
          <p>who you truly are</p>
        </div>
      </TextAnimation>

    </div>
  );
};

export default Triptico6;
