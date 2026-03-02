"use client";

import TextAnimation2 from "../Tools/AnimatedText2";
import GridRevealImage from "../Tools/GridRevealAnimation";
import { useNavbar } from "../Layout/Context/NavbarProvider";

const GAP = 16;
const PADDING = 16;

const Composition3Mobile = () => {
  const { measures } = useNavbar();

  const img1Width = measures.stylesX + measures.stylesWidth - PADDING;
  const img2Width = measures.navbarWidth - (measures.stylesX + measures.stylesWidth) - PADDING - GAP;

  return (
    <div className="w-screen h-screen flex items-center justify-center px-4 py-4 bg-white font-myfont2 overflow-hidden">

      <div className="flex w-full h-[85%]" style={{ gap: `${GAP}px` }}>

        {/* Columna izquierda — texto + img5 + img15 */}
        <div
          className="flex flex-col flex-shrink-0"
          style={{
            width: img1Width > 0 ? `${img1Width}px` : "45%",
            gap: `${GAP}px`,
          }}
        >
          {/* Texto */}
          <div className="text-l leading-tight tracking-wider flex-shrink-0">
            <TextAnimation2>
              <p>vilarnau opens:</p>
              <p>tuesday 12 — 20</p>
              <p>wednesday 12 — 20</p>
              <p>thursday 12 — 20</p>
              <p>friday 12 — 20</p>
              <p>saturday 13 — 20</p>
              <p>sunday - closed</p>
              <p>monday - closed</p>
            </TextAnimation2>
          </div>

          {/* img5 — foto nueva en el medio */}
          <div className="flex-1 min-h-0">
            <GridRevealImage
              src="/images/img10.jpg"
              className="w-full h-full object-contain"
              alt="img5"
            />
          </div>

          {/* img15 abajo */}
          <div className="flex-1 min-h-0">
            <GridRevealImage
              src="/images/img15.jpeg"
              className="w-full h-full object-contain"
              alt="img15"
            />
          </div>
        </div>

        {/* Columna derecha — img2 arriba, img23 abajo */}
        <div
          className="flex flex-col flex-shrink-0"
          style={{
            width: img2Width > 0 ? `${img2Width}px` : "55%",
            gap: `${GAP}px`,
          }}
        >
          <div className="flex-1 min-h-0">
            <GridRevealImage
              src="/images/img2.jpeg"
              className="w-full h-full object-contain"
              alt="img2"
            />
          </div>

          <div className="flex-1 min-h-0">
            <GridRevealImage
              src="/images/img23.jpg"
              className="w-full h-full object-contain"
              alt="img23"
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Composition3Mobile;