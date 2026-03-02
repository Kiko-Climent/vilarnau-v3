"use client";

import TextAnimation from "../Tools";
import GridRevealImage from "../Tools/GridRevealAnimation";
import { useNavbar } from "../Layout/Context/NavbarProvider";

const PADDING = 16;

const TeamMobile4 = () => {
  const { measures } = useNavbar();

  // img12: desde el final de vilarnau hasta el final de about
  const img12Left  = measures.vilarnauX + measures.vilarnauWidth;
  const img12Width = (measures.aboutX + measures.aboutWidth) - img12Left;

  // img2: desde padding izquierdo hasta el final de "styles"
  const img2Width  = measures.stylesX + measures.stylesWidth - PADDING;

  // texto: desde el inicio de "prices" hasta el padding derecho
  const textWidth  = measures.navbarWidth - measures.pricesX - PADDING;

  return (
    <div className="w-screen min-h-screen flex flex-col justify-center overflow-hidden py-4 bg-white">

      {/* === Fila superior — img12 === */}
      <div
        style={{
          marginLeft: img12Left > 0 ? `${img12Left}px` : "20%",
          width: img12Width > 0 ? `${img12Width}px` : "80%",
        }}
      >
        <div className="w-full aspect-[3/4] overflow-hidden">
          <GridRevealImage
            src="/assets/img12.jpg"
            className="w-full h-full object-cover"
            start="top 65%"
          />
        </div>
      </div>

      {/* === Fila inferior — img2 + texto, sin gap (el espacio styles→prices lo da) === */}
      <div
        className="flex flex-row items-stretch"
        style={{ paddingLeft: `${PADDING}px`, paddingRight: `${PADDING}px`, marginTop: `${PADDING}px` }}
      >
        {/* img2: hasta el final de "styles" */}
        <div
          className="flex-shrink-0 overflow-hidden"
          style={{ width: img2Width > 0 ? `${img2Width}px` : "45%" }}
        >
          <GridRevealImage
            src="/assets/img2.jpg"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Spacer natural entre styles y prices */}
        <div className="flex-1" />

        {/* Texto: desde "p" de prices hasta padding derecho */}
        <div
          className="flex flex-shrink-0 flex-col justify-center gap-3"
          style={{ width: textWidth > 0 ? `${textWidth}px` : "55%" }}
        >
          <TextAnimation>
            <p className="text-lg leading-none tracking-wider">
              At Salon Vilarnau, Sergi and Damian bring warmth, care, and genuine connection to every visit.
            </p>
          </TextAnimation>

          <hr className="border-black border-t w-full" />

          <TextAnimation>
            <p className="text-lg leading-none tracking-wider">
              Their calm energy and attention to detail create a space where you can relax, feel understood, and leave refreshed — inside and out.
            </p>
          </TextAnimation>
        </div>
      </div>

    </div>
  );
};

export default TeamMobile4;