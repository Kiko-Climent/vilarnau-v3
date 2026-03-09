"use client";
import { useState } from "react";
import Image from "next/image";
import TextAnimation from "../Tools";
import GridRevealImage from "../Tools/GridRevealAnimation";
import { useNavbarDesktop } from "@/components/Layout/Context/NavbarDesktopContext";

const Triptico5DesktopNew = () => {
  const [realSrc, setRealSrc] = useState(null);
  const { measures } = useNavbarDesktop();

  const { aboutRight, vilarnauRight, stylesX } = measures;
  const measuresReady = aboutRight > 0 && vilarnauRight > 0 && stylesX > 0;

  return (
    <div className="w-full h-screen overflow-hidden bg-white relative">

      {/* Preload oculto — siempre activo para que la imagen esté lista */}
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

      {measuresReady && (
        <>
          <div
            className="absolute top-0"
            style={{ left: `calc(${aboutRight}px + 0.5rem)`, right: 0, height: "50vh" }}
          >
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

          <TextAnimation>
            <div
              className="absolute bottom-50 pl-2 font-myfont2 text-[clamp(0.95rem,2vw,1.45rem)] tracking-wider leading-none md:leading-5"
              style={{ left: vilarnauRight, width: stylesX - vilarnauRight }}
            >
              <p>a place where individuality</p>
              <p>and self expression are</p>
              <p>not just embraced</p>
              <p>but celebrated</p>
            </div>
          </TextAnimation>
        </>
      )}

    </div>
  );
};

export default Triptico5DesktopNew;