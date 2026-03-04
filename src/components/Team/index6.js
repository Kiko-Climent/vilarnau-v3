"use client";

import { useNavbar } from "../Layout/Context/NavbarProvider";

const PADDING = 16;
const SHY = "\u00AD"; // soft hyphen: permite partir palabras por sílabas

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
          <img
            src="/assets/img12.jpg"
            className="w-full h-full object-contain"
            start="top 65%"
          />
        </div>
      </div>

      {/* === Fila inferior — img2 + texto, sin gap (el espacio styles→prices lo da) === */}
      {/* La altura de la fila la define el texto; la imagen se ajusta con position absolute para no crear espacios en blanco */}
      <div
        className="flex flex-row items-stretch min-h-0"
        style={{ paddingLeft: `${PADDING}px`, paddingRight: `${PADDING}px`, marginTop: `${PADDING}px` }}
      >
        {/* img2: contenedor sin altura intrínseca para que la fila tome la altura del texto */}
        <div
          className="relative flex-shrink-0 overflow-hidden"
          style={{ width: img2Width > 0 ? `${img2Width}px` : "45%" }}
        >
          <div className="absolute inset-0">
            <img
              src="/assets/img2.jpg"
              className="w-full h-full object-contain"
              alt="img2"
            />
          </div>
        </div>

        {/* Spacer natural entre styles y prices */}
        <div className="flex-1 min-w-0" />

        {/* Texto: define la altura de la fila — sin justify-center para evitar espacios en blanco */}
        <div
          className="flex flex-shrink-0 flex-col justify-start gap-3"
          style={{ width: textWidth > 0 ? `${textWidth}px` : "55%" }}
        >
          <p className="text-lg leading-none tracking-wider hyphens-manual" lang="en">
            A{SHY}t Sa{SHY}lon Vi{SHY}lar{SHY}nau, Ser{SHY}gi and Da{SHY}mi{SHY}an bring warm{SHY}th, ca{SHY}re, and gen{SHY}u{SHY}ine con{SHY}nec{SHY}tion to eve{SHY}ry vi{SHY}sit.
          </p>

          <hr className="border-black border-t w-full" />

          <p className="text-lg leading-none tracking-wider hyphens-manual" lang="en">
            Thei{SHY}r calm en{SHY}er{SHY}gy and at{SHY}ten{SHY}tion to de{SHY}tail cre{SHY}ate a spa{SHY}ce where you can re{SHY}lax, feel un{SHY}der{SHY}stood, and leave re{SHY}freshed — in{SHY}side and out.
          </p>
        </div>
      </div>

    </div>
  );
};

export default TeamMobile4;