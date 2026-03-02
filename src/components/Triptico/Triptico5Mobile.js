"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { useNavbar } from "../Layout/Context/NavbarProvider"; // ajusta el path si es necesario

export default function Triptico5Mobile() {
    const { measures } = useNavbar();

    // Ref sobre el inner div (ya dentro del px-4) para medir el área útil
    const innerRef = useRef(null);
    const [containerRect, setContainerRect] = useState({ left: 0, width: 0 });

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

    // Re-medir cuando el navbar reporte sus posiciones
    useEffect(() => {
        updateContainerRect();
    }, [measures, updateContainerRect]);

    const {
        vilarnauX,
        vilarnauWidth,
        pricesX,
        pricesWidth,
        aboutX,
    } = measures;

    const { left: cLeft, width: cWidth } = containerRect;

    // ── Imagen 1 ──────────────────────────────────────────────────────────────
    // De la "v" de vilarnau al borde derecho de "prices"
    const img1Left  = vilarnauX - cLeft;
    const img1Width = (pricesX + pricesWidth) - vilarnauX;

    // ── Imagen 2 ──────────────────────────────────────────────────────────────
    // Del borde derecho de "vilarnau" hasta el borde derecho del área útil (px-4 incluido)
    const img2Left  = (vilarnauX + vilarnauWidth) - cLeft;
    const img2Width = cWidth - img2Left; // se detiene en el px-4 derecho

    // ── Texto ──────────────────────────────────────────────────────────────────
    // De la "a" de about hasta el borde derecho del área útil (px-4 incluido)
    const textLeft  = aboutX - cLeft;
    const textWidth = cWidth - textLeft;

    const ready = vilarnauX > 0 && pricesX > 0 && cWidth > 0;

    return (
        // px-4 envuelve todo — el innerRef mide el área útil ya con el margen aplicado
        <div className="px-4 w-full bg-white">
            <div ref={innerRef} className="flex flex-col gap-4 w-full">

                {ready && (
                    <>
                        {/* ── BLOQUE SUPERIOR: imagen + texto ── */}
                        <div className="relative" style={{ height: "60vh" }}>

                            {/* Imagen 1 — vertical · object-contain · bottom */}
                            <div
                                className="absolute inset-y-0 overflow-hidden"
                                style={{
                                    left:  img1Left,
                                    width: img1Width,
                                }}
                            >
                                <Image
                                    src="/images/img2.jpg"
                                    alt=""
                                    fill
                                    sizes="100vw"
                                    style={{ objectFit: "contain", objectPosition: "bottom" }}
                                    priority
                                />
                            </div>

                            {/* Textos — ocupan toda la altura, empujados al bottom */}
                            <div
                                className="absolute inset-y-0 flex flex-col justify-end"
                                style={{
                                    left:  textLeft,
                                    width: textWidth,
                                }}
                            >
                                <p className="text-lg leading-none tracking-wide text-black ">
                                    a place where individuality
                                    and self expression are
                                    not just embraced
                                    but celebrated
                                </p>

                                {/* Línea separadora */}
                                <div className="w-full border-t border-black my-3" />

                                <p className="text-lg leading-none tracking-wide text-black">
                                    designing looks that reflect the now
                                    while highlighting who you truly are
                                </p>
                            </div>

                        </div>

                        {/* ── IMAGEN 2 ── horizontal · object-cover · 28vh ── */}
                        <div
                            className="relative overflow-hidden"
                            style={{
                                marginLeft: img2Left,
                                width:      img2Width,
                                height:     "28vh",
                            }}
                        >
                            <Image
                                src="/images/img4.jpeg"
                                alt=""
                                fill
                                sizes="100vw"
                                style={{ objectFit: "cover", objectPosition: "center" }}
                            />
                        </div>
                    </>
                )}

            </div>
        </div>
    );
}