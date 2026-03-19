"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { useNavbar } from "../Layout/Context/NavbarProvider";

import img2 from "../../../public/images/img2.jpg";
import img4 from "../../../public/images/img4.jpeg";

export default function Triptico5Mobile() {
  const { measures } = useNavbar();

  const innerRef = useRef(null);
  const [containerRect, setContainerRect] = useState({ left: 0, width: 0 });

  // ── Precarga de imágenes ──────────────────────────────────────────────────
  // Se inicia inmediatamente al montar, antes de que el layout esté calculado.
  // Cuando "ready" sea true, el browser ya tiene las imágenes en caché.
  const [imgsPreloaded, setImgsPreloaded] = useState(false);

  useEffect(() => {
    let loaded = 0;
    const srcs = [img2.src, img4.src];

    srcs.forEach((src) => {
      const img = new window.Image();
      img.src = src;
      img.onload = img.onerror = () => {
        loaded++;
        if (loaded === srcs.length) setImgsPreloaded(true);
      };
    });
  }, []);

  // ── Medidas del contenedor ────────────────────────────────────────────────
  const updateContainerRect = useCallback(() => {
    if (!innerRef.current) return;
    const rect = innerRef.current.getBoundingClientRect();
    setContainerRect({ left: rect.left, width: rect.width });
  }, []);

  useEffect(() => {
    updateContainerRect();
    window.addEventListener("resize", updateContainerRect);
    return () => window.removeEventListener("resize", updateContainerRect);
  }, [updateContainerRect]);

  useEffect(() => {
    updateContainerRect();
  }, [measures, updateContainerRect]);

  const { vilarnauX, vilarnauWidth, pricesX, pricesWidth, aboutX } = measures;
  const { left: cLeft, width: cWidth } = containerRect;

  const img1Left  = vilarnauX - cLeft;
  const img1Width = pricesX + pricesWidth - vilarnauX;
  const img2Left  = vilarnauX + vilarnauWidth - cLeft;
  const img2Width = cWidth - img2Left;
  const textLeft  = aboutX - cLeft;
  const textWidth = cWidth - textLeft;

  const ready = vilarnauX > 0 && pricesX > 0 && cWidth > 0;

  // Mostramos el contenido solo cuando el layout esté listo Y las imágenes precargadas
  const showContent = ready && imgsPreloaded;

  return (
    <div className="px-4 w-full bg-white">
      <div ref={innerRef} className="flex flex-col gap-4 w-full">

        {/* 
          Skeleton/placeholder mientras carga — ocupa el mismo espacio
          para evitar el layout shift. Se desvanece cuando showContent es true.
        */}
        {!showContent && (
          <div
            className="w-full bg-white"
            style={{ height: "calc(60vh + 1rem + 28vh)" }}
          />
        )}

        {/* Contenido real — fade in suave cuando está listo */}
        <div
          className="flex flex-col gap-4 w-full"
          style={{
            opacity: showContent ? 1 : 0,
            transition: "opacity 0.4s ease",
            // No desmontamos nunca para que Next/Image pueda prerender el blur
            position: showContent ? "relative" : "absolute",
            pointerEvents: showContent ? "auto" : "none",
          }}
        >
          {/* ── BLOQUE SUPERIOR ──────────────────────────────────────────── */}
          <div className="relative" style={{ height: "60vh" }}>

            {/* Imagen 1 */}
            <div
              className="absolute inset-y-0 overflow-hidden"
              style={{ left: img1Left, width: img1Width }}
            >
              <Image
                src={img2}
                alt=""
                fill
                sizes="50vw"
                style={{ objectFit: "contain", objectPosition: "bottom" }}
                priority
                placeholder="blur"
              />
            </div>

            {/* Textos */}
            <div
              className="absolute inset-y-0 flex flex-col justify-end"
              style={{ left: textLeft, width: textWidth }}
            >
              <p className="text-lg leading-none tracking-wide text-black">
                a place where individuality
                and self expression are
                not just embraced
                but celebrated
              </p>
              <div className="w-full border-t border-black my-3" />
              <p className="text-lg leading-none tracking-wide text-black">
                designing looks that reflect the now
                while highlighting who you truly are
              </p>
            </div>

          </div>

          {/* ── IMAGEN 2 ─────────────────────────────────────────────────── */}
          <div
            className="relative overflow-hidden"
            style={{
              marginLeft: img2Left,
              width: img2Width,
              height: "28vh",
            }}
          >
            <Image
              src={img4}
              alt=""
              fill
              sizes="60vw"
              style={{ objectFit: "cover", objectPosition: "center" }}
              placeholder="blur"
            />
          </div>
        </div>

      </div>
    </div>
  );
}