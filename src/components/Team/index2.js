"use client";

import TextAnimation from "../Tools";
import GridRevealImage from "../Tools/GridRevealAnimation";
import usePreloadImage from "../Tools/usePreloadImage";

const Team2 = () => {
  // 1️⃣ Preload de cada imagen con el hook
  const [img1, Preload1] = usePreloadImage("/images/img4.jpg");
  const [img2, Preload2] = usePreloadImage("/assets/img2.jpg");
  const [img3, Preload3] = usePreloadImage("/assets/img12.jpg");

  return (
    <div className="w-screen min-h-screen relative overflow-hidden">

      {/* 2️⃣ Renderizamos preloaders ocultos */}
      {Preload1}
      {Preload2}
      {Preload3}

      {/* 3️⃣ Cuando cada imagen está lista, la pasamos a GridRevealImage */}
      {img1 && (
        <div className="absolute top-0 left-0 aspect-[3/4] w-4/12">
          <GridRevealImage
            src={img1}
            className="w-full h-full grayscale object-cover"
          />
        </div>
      )}

      {img2 && (
        <div className="absolute bottom-0 right-0 w-1/4">
          <p className="text-black">( 2 )</p>
          <GridRevealImage
            src={img2}
            className="w-full h-full object-cover aspect-[1/1]"
          />
        </div>
      )}

      {img3 && (
        <div className="absolute bottom-[5%] right-[30%] w-1/4">
          <p className="text-black">( 1 )</p>
          <GridRevealImage
            src={img3}
            className="w-full h-full object-cover aspect-[3/4]"
          />
        </div>
      )}

      <TextAnimation>
        <div className="absolute top-[10%] right-4 text-black text-[clamp(0.95rem,2vw,1.45rem)] tracking-wider leading-5 w-[54%]">
          <p>
            At Salon Vilarnau, Sergi ( 1 ) and Damian ( 2 ) bring warmth, care, and genuine connection to every visit.
            Their calm energy and attention to detail create a space where you can relax, feel understood, and leave refreshed — inside and out.
          </p>
        </div>
      </TextAnimation>
    </div>
  );
};

export default Team2;
