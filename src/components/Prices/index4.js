"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import TextAnimation2 from "../Tools/AnimatedText2";

// 🔹 Texto que muestra solo inglés en móvil y ambos idiomas en desktop
function LocalizedText({ text, className = "" }) {
  const [en, de] = text.split("/");
  return (
    <p className={`text-left ${className}`}>
      <span className="inline md:hidden">{en?.trim()}</span>
      <span className="hidden md:inline">{text}</span>
    </p>
  );
}

export default function PriceList4({ isOpen, onClose }) {
  const modalRef = useRef();
  const lineRefs = useRef([]);

  useEffect(() => {
    if (isOpen && modalRef.current) {
      // ✨ Animación del modal (fade + escala)
      gsap.fromTo(
        modalRef.current,
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, ease: "power3.out" }
      );

      // ⏳ Espera antes de dibujar líneas (para sincronizar con texto)
      const delayBeforeLines = 1.6;

      const timer = setTimeout(() => {
        gsap.fromTo(
          lineRefs.current,
          { scaleX: 0, transformOrigin: "left center" },
          {
            scaleX: 1,
            duration: 2.5, // más despacio
            ease: "power3.out",
            stagger: 0.25,
          }
        );
      }, delayBeforeLines * 1000);

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const sections = [
    {
      title: "CUTS",
      rows: [
        { service: "CUTS", prices: ["43.-", "48.-", "55.-"], type: "grid" },
        { service: "fringe, beard trim, contour", prices: ["from 10.-"], type: "flex" },
      ],
    },
    {
      title: "STYLING",
      rows: [{ service: "STYLING", prices: ["30.-", "40.-", "50.-"], type: "grid" }],
    },
    {
      title: "SEMI & PERMANENT COLOUR",
      rows: [
        { service: "Regrowth / Ansatz", prices: ["from 10.-"], type: "flex" },
        { service: "Full Head / Ganzen Kopf", prices: ["43.-", "48.-", "55.-"], type: "grid" },
      ],
    },
    {
      title: "HIGHLIGHTS, BALAYAGE, PAINTINGS",
      rows: [
        { service: "T-Section & Touch-Up", prices: ["80.-", "90.-", "100.-"], type: "grid" },
        { service: "Half Head / Halben Kopf", prices: ["100.-", "110.-", "120.-"], type: "grid" },
        { service: "Full Head / Ganzen Kopf", prices: ["120.-", "130.-", "140.-"], type: "grid" },
        { service: "Toner / Abmatierung", prices: ["from 30.-"], type: "flex" },
      ],
    },
    {
      title: "BLEACH",
      rows: [
        { service: "Regrowth / Ansatz", prices: ["from 80.-"], type: "flex" },
        { service: "Full Head / Ganzen Kopf", prices: ["120.-", "140.-", "160.-"], type: "grid" },
      ],
    },
    {
      title: "PACKAGES",
      rows: [
        { service: "Cut & Styling", prices: ["60.-", "70.-", "80.-"], type: "grid" },
        { service: "Cut & Regrowth Colour", prices: ["98.-"], type: "flex" },
        { service: "Cut & Full Head Colour", prices: ["113.-", "128.-", "145.-"], type: "grid" },
        { service: "Cut & Highlights", prices: [], type: "flex" },
        { service: "— T-Zone", prices: ["from 120.-"], type: "flex", indent: true },
        { service: "— Half Head / Halben Kopf", prices: ["from 140.-"], type: "flex", indent: true },
        { service: "— Full Head / Ganzen Kopf", prices: ["from 150.-"], type: "flex", indent: true },
      ],
    },
  ];

  return (
    <div className="fixed inset-0 z-40" onClick={onClose}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#f5f6f7]/90 backdrop-blur-2xl" />

      {/* Modal */}
      <div
        ref={modalRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                   w-[100vw] md:w-[60vw] bg-transparent text-black 
                   px-6 md:px-10 py-8 md:py-10 font-myfont2 tracking-widest leading-tight z-50"
      >
        <TextAnimation2>
          <h1 className="text-xl mb-2">vilarnau | pricelist</h1>
        </TextAnimation2>

        {/* Cabecera */}
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr] text-right items-center">
          <p className="text-left">
            Service <span className="hidden md:inline">/ Leistung</span> *
          </p>
          <p>short</p>
          <p>mid</p>
          <p>long</p>
        </div>

        {/* Línea inicial */}
        <div
          ref={(el) => (lineRefs.current[0] = el)}
          className="h-[1px] w-full bg-black origin-left scale-x-0 mb-4"
        />

        {/* Secciones */}
        <div className="flex flex-col relative">
          <div className="relative">
            <TextAnimation2>
              {sections.map((section, i) => (
                <div key={i} className="flex flex-col pb-2">
                  {/* 🔹 Mostrar título solo a partir de la tercera sección */}
                  {i > 1 && (
                    <TextAnimation2 scrollStart="top 80%">
                      <h2 className="text-base font-medium uppercase transition-all duration-300 md:hover:bg-black md:hover:text-white">
                        {section.title}
                      </h2>
                    </TextAnimation2>
                  )}

                  {section.rows.map((row, j) =>
                    row.type === "grid" ? (
                      <div
                        key={j}
                        className={`group grid grid-cols-[2fr_1fr_1fr_1fr] text-right items-center transition-all duration-300 md:hover:bg-black md:hover:text-white ${
                          row.indent ? "pl-6" : ""
                        }`}
                      >
                        <LocalizedText text={row.service} className="font-medium" />
                        {row.prices.map((price, idx) => (
                          <p key={idx}>{price}</p>
                        ))}
                      </div>
                    ) : (
                      <div
                        key={j}
                        className={`group flex justify-between items-center transition-all duration-300 md:hover:bg-black md:hover:text-white ${
                          row.indent ? "pl-6" : ""
                        }`}
                      >
                        <LocalizedText text={row.service} />
                        {row.prices.length > 0 && <p>{row.prices[0]}</p>}
                      </div>
                    )
                  )}

                  {/* Línea final de cada sección */}
                  <div
                    ref={(el) => (lineRefs.current[i + 1] = el)}
                    className="h-[1px] w-full bg-black origin-left scale-x-0"
                  />
                </div>
              ))}
            </TextAnimation2>
          </div>
        </div>

        {/* Notas */}
        <div className="flex flex-col text-xs mt-3 leading-none">
          <p>
            * Prices may vary depending on the amount of work involved / additional materials used.
          </p>
          <p className="hidden md:block">
            * Je nach Aufwand / Mehrverbrauch an Materialien, können die Preise abweichen.
          </p>
        </div>

        {/* Footer */}
        <div className="flex flex-row-reverse justify-between text-base mt-4">
          <div className="flex flex-col items-end leading-none">
            <h2>manteufelstr.55</h2>
            <h2>10999 · berlin</h2>
          </div>
          <div className="flex flex-col leading-none">
            <h2>T: (030) 61202363</h2>
            <h2>E: hello@vilarnau.com</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
