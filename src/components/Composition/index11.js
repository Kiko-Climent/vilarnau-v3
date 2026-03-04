"use client";

import usePreloadImage from "../Tools/usePreloadImage";
import { useNavbar } from "../Layout/Context/NavbarProvider";

const Composition4MobileFlex3 = () => {
  // 1️⃣ Preload de imágenes
  const [img1, Pre1] = usePreloadImage("/images/img17.jpeg");
  const [img2, Pre2] = usePreloadImage("/images/img9.jpg");

  const { measures } = useNavbar();

  const img1Width = measures.stylesX - 16;                              // desde padding izq hasta "s"
  const img2Width = measures.navbarWidth - measures.stylesX - 16 - 16;       // desde "s" hasta padding der


  return (
    <div className="w-screen h-screen justify-center flex flex-col px-4 gap-2 text-[clamp(1rem,7vw,4rem)] bg-white tracking-wide">

      {/* 2️⃣ Preloaders ocultos */}
      {Pre1}
      {Pre2}

      {/* Texto superior */}
        <div className="w-full flex-col leading-none space-y-2">
            <div className="flex">
                <p>Welcome to salon vilarnau.</p>
            </div>
          <p className="flex">
            Our philosophy is to deeply understand your wishes, so that we can create
            individual cuts that accentuate your features and style.
          </p>
          <p className="flex">
            We believe in the power of classic meets contemporary, and customers
            leaving our salon feeling seen, understood, and phenomenal.
          </p>
        </div>

        {/* Composición en dos columnas */}
        <div className="flex items-stretch" style={{ gap: "16px" }}>

        {/* Columna izquierda — sin cambios */}
        <div
        className="flex flex-col gap-2 flex-shrink-0"
        style={{ width: img1Width > 0 ? `${img1Width}px` : "40%" }}
        >
        {img1 && (
            <div className="relative aspect-[3/4]">
                <img src={img1} className="w-full h-full object-contain" alt="img17" />
            </div>
        )}
        <div className="flex flex-col h-full justify-start">
            <div className="flex flex-col leading-none">
            <p>Open in the heart of Berlin-Kreuzberg since 2018.</p>
            <p>Come and say hello</p>
            </div>
            <p className="flex text-lg mt-auto">©vilarnau 2026</p>
        </div>
        </div>

        {/* Columna derecha */}
        <div
        className="flex-shrink-0 flex flex-col"   // 👈 flex container
        style={{ width: img2Width > 0 ? `${img2Width}px` : "60%" }}
        >
        {img2 && (
            <img
            src={img2}
            className="flex-1 min-h-0 w-full object-cover"   // 👈 flex-1 + min-h-0
            alt="img9"
            />
        )}
        </div>

        </div>
    </div>
  );
};

export default Composition4MobileFlex3;
