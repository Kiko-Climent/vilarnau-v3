"use client";
import { useState } from "react";
import Image from "next/image";
import TextAnimation from "../Tools";
import GridRevealImage from "../Tools/GridRevealAnimation";
import { useNavbarDesktop } from "@/components/Layout/Context/NavbarDesktopContext";

const Triptico6Desktop = () => {
  const [realSrc, setRealSrc] = useState(null);
  const { measures } = useNavbarDesktop();

  const { aboutRight, emailX, stylesRight } = measures;
  const px = 8;
  const measuresReady = aboutRight > 0 && emailX > 0 && stylesRight > 0;

  return (
    <div className="w-screen h-screen overflow-hidden bg-white relative">

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

      {measuresReady && (
        <>
          {/* Foto: desde stylesRight hasta emailX, altura 50vh */}
          <div
            className="absolute top-0"
            style={{
              left:   stylesRight,
              width:  emailX - stylesRight,
              height: "50vh",
            }}
          >
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

          {/* Texto: bottom, entre aboutRight y emailX */}
          <TextAnimation>
            <div
              className="absolute bottom-48 text-right font-myfont2 text-[clamp(0.95rem,2vw,1.45rem)] tracking-wider leading-none md:leading-5"
              style={{
                left:  aboutRight,
                width: emailX - aboutRight,
              }}
            >
              <p>designing looks that reflect the now</p>
              <p>while highlighting who you truly are</p>
            </div>
          </TextAnimation>
        </>
      )}

    </div>
  );
};

export default Triptico6Desktop;