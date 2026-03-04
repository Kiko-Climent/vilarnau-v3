"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

/**
 * Preload una imagen con Next.js y devuelve su src real cuando está lista
 * @param {string} src - ruta de la imagen
 * @param {object} options - { width, height, priority }
 * @returns [realSrc, PreloadComponent]
 */
export default function usePreloadImage(
  src,
  { width = 1200, height = 1600, priority = true } = {}
) {
  const [realSrc, setRealSrc] = useState(null);

  const PreloadComponent = (
    <div className="hidden">
      <Image
        src={src}
        alt=""
        width={width}
        height={height}
        priority={priority}
        onLoad={(e) => setRealSrc(e.target.currentSrc || e.target.src)}
      />
    </div>
  );

  return [realSrc, PreloadComponent];
}
