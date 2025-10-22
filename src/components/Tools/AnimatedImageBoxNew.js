"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function AnimatedImageBoxNew() {
  const boxRef = useRef(null);

  useEffect(() => {
    if (!boxRef.current) return;

    const imgElement = boxRef.current.querySelector("img");
    const allImageSources = Array.from({ length: 35 }, (_, i) => `/newhero/img${i + 1}.webp`);

    // ✅ Precargar todas las imágenes una vez
    const preloadImages = () => {
      return Promise.all(
        allImageSources.map(
          src =>
            new Promise(resolve => {
              const img = new Image();
              img.src = src;
              img.onload = img.onerror = resolve;
            })
        )
      );
    };

    // ✅ Cuando termine la precarga, inicia el bucle
    preloadImages().then(() => {
      const getRandomImage = () => {
        const index = Math.floor(Math.random() * allImageSources.length);
        return allImageSources[index];
      };

      gsap.to({}, {
        duration: 0,
        repeat: -1,
        repeatDelay: 0.18, // la misma velocidad que ya usas
        onRepeat: () => {
          imgElement.src = getRandomImage();
        },
      });
    });
  }, []);

  return (
    <div ref={boxRef} className="w-full h-full overflow-hidden">
      <img
        src="/newhero/img1.webp"
        alt="animated"
        className="w-full h-full object-contain"
      />
    </div>
  );
}
