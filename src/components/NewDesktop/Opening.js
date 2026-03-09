"use client";

import TextAnimation from "../Tools";
import TextAnimation2 from "../Tools/AnimatedText2";
import GridRevealImage from "../Tools/GridRevealAnimation";
import { useNavbarDesktop } from "@/components/Layout/Context/NavbarDesktopContext";

const OpeningDesktop = () => {
  const { measures } = useNavbarDesktop();

  // Calcular punto medio entre vilarnau y styles
  const img15Left = (measures.vilarnauRight + measures.stylesX) / 2;
  const img15Width = measures.aboutX - img15Left;

  // img2: desde about hasta mitad de email
  const img2Left = measures.aboutX;
  const img2Width = measures.emailCenterX - measures.aboutX;

  // img23: desde punto medio entre "t" de about y "h" de email hasta el borde derecho
  const img23Left = (measures.aboutRight + measures.emailX) / 2;
  const img23Width = `calc(100vw - ${img23Left}px)`;

  // Solo renderizar cuando las medidas estén disponibles
  const hasMeasures = measures.aboutX > 0;

  return (
    <div className="w-screen h-screen md:h-full py-24 flex items-center justify-center overflow-hidden font-myfont2">
      <div className="relative w-full h-full max-w-[1920px] max-h-[calc(100vh-1rem)] aspect-[16/10]">

        {/* Imagen inferior centro - desde medio vilarnau-styles hasta "a" de about */}
        {hasMeasures && (
          <div 
            className="absolute pr-2 bottom-0 h-[58.5%] z-[1]"
            style={{
              left: `${img15Left}px`,
              width: `${img15Width}px`
            }}
          >
            <GridRevealImage
              src="/images/img15.jpeg"
              className="w-full h-full object-cover"
              alt="img15"
            />
          </div>
        )}

        {/* Texto, pegado a la imagen por arriba - mismo ancho que img15 */}
        {hasMeasures && (
          <div 
            className="absolute bottom-[58.5%] z-[2] text-[clamp(0.95rem,2vw,1.45rem)] text-left leading-5 tracking-wider"
            style={{
              left: `${img15Left}px`,
              width: `${img15Width}px`
            }}
          >
            <TextAnimation2>
              <p>vilarnau opens:</p>
              <p>tuesday 12 — 20</p>
              <p>wednesday 12 — 20</p>
              <p>thursday 12 — 20</p>
              <p>friday 12 — 20</p>
              <p>saturday 10 — 18</p>
              <p>sunday - closed</p>
              <p>monday - closed</p>
            </TextAnimation2>
          </div>
        )}

        {/* Imagen superior centro - desde "a" de about hasta mitad de email */}
        {hasMeasures && (
          <div 
            className="absolute top-0 h-[62%] z-[1]"
            style={{
              left: `${img2Left}px`,
              width: `${img2Width}px`
            }}
          >
            <GridRevealImage
              src="/images/img2.jpeg"
              className="w-full h-full object-cover"
              alt="img10"
            />
          </div>
        )}

        {/* Imagen inferior derecha - desde 20px después de email hasta el borde */}
        {hasMeasures && (
          <div 
            className="absolute bottom-0 h-[37.3%] pr-6 z-[1]"
            style={{
              left: `${img23Left}px`,
              width: img23Width
            }}
          >
            <GridRevealImage
              src="/images/img23.jpg"
              className="w-full h-full object-cover"
              alt="img2"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default OpeningDesktop;