"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function AnimatedImageBox() {
  const boxRef = useRef(null);

  useEffect(() => {
    if (!boxRef.current) return;

    const imgElement = boxRef.current.querySelector("img");
    const allImageSources = Array.from({ length: 35 }, (_, i) => `/newhero/img${i + 1}.webp`);

    const getRandomImage = () => {
      const index = Math.floor(Math.random() * allImageSources.length);
      return allImageSources[index];
    };

    const loopAnimation = () => {
      gsap.to({}, {
        duration: 0,
        repeat: -1, // loop infinito
        repeatDelay: 0.15, // tiempo entre cambios
        onRepeat: () => {
          imgElement.src = getRandomImage();
        }
      });
    };

    loopAnimation();
  }, []);

  return (
    <div ref={boxRef} className="w-full h-full overflow-hidden">
      <img src="/newhero/img1.webp" alt="animated" className="w-full h-full object-cover" />
    </div>
  );
}
