"use client";

import TextAnimation from "../Tools";
import GridRevealImage from "../Tools/GridRevealAnimation";
import usePreloadImage from "../Tools/usePreloadImage";
import { useNavbarDesktop } from "@/components/Layout/Context/NavbarDesktopContext";

const TeamDesktop = () => {
  // Hook del navbar para obtener las medidas
  const { measures } = useNavbarDesktop();

  // Preload de cada imagen con el hook
  const [img1, Preload1] = usePreloadImage("/images/img4.jpg");
  const [img2, Preload2] = usePreloadImage("/assets/img12.jpg");
  const [img3, Preload3] = usePreloadImage("/assets/img2.jpg");

  return (
    <div className="w-screen min-h-screen relative overflow-hidden">

      {/* Renderizamos preloaders ocultos */}
      {Preload1}
      {Preload2}
      {Preload3}

      {/* 1️⃣ Primera foto: desde la izquierda hasta la "p" de prices */}
      {img1 && (
        <div 
          className="absolute top-0 aspect-[3/4]"
          style={{
            left: 0,
            width: `${measures.pricesX}px`
          }}
        >
          <GridRevealImage
            src={img1}
            className="w-full h-full grayscale object-cover"
            start="top 60%"
          />
        </div>
      )}

      {/* 2️⃣ Imagen 2: comienza en "about" */}
      {img2 && (
        <div 
          className="absolute bottom-[5%]"
          style={{
            left: `${measures.aboutX}px`,
            width: '25%' // mantiene el tamaño relativo
          }}
        >
          <p className="text-black">( 1 )</p>
          <GridRevealImage
            src={img2}
            className="w-full h-full object-cover aspect-[3/4]"
            start="top 70%"
          />
        </div>
      )}

      {/* 3️⃣ Imagen 3: desde "email" hasta la derecha */}
      {img3 && (
        <div 
          className="absolute bottom-0"
          style={{
            left: `${measures.emailX}px`,
            width: `calc(100vw - ${measures.emailX}px)`
          }}
        >
          <p className="text-black">( 2 )</p>
          <GridRevealImage
            src={img3}
            className="w-full h-full object-cover aspect-[1/1]"
            start="top 70%"
          />
        </div>
      )}

      {/* Texto: cuadrado con la "s" de prices (pricesRight) hasta el final */}
      <TextAnimation>
        <div 
          className="absolute top-[10%] text-black text-[clamp(0.95rem,2vw,1.45rem)] tracking-wider leading-5"
          style={{
            left: `${measures.pricesRight}px`,
            width: `calc(100vw - ${measures.pricesRight}px)`,
            paddingRight: '1rem'
          }}
        >
          <p>
            At Salon Vilarnau, Sergi ( 1 ) and Damian ( 2 ) bring warmth, care, and genuine connection to every visit.
            Their calm energy and attention to detail create a space where you can relax, feel understood, and leave refreshed — inside and out.
          </p>
        </div>
      </TextAnimation>
    </div>
  );
};

export default TeamDesktop;