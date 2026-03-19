/**
 * useOptimizedMedia.js
 *
 * Consume public/media-manifest.json y devuelve los paths correctos
 * según dispositivo, conexión y soporte de formatos del browser.
 *
 * Variantes disponibles (generadas por optimize-images.mjs):
 *   desktop.webp / desktop.jpg  — 1920px  (slider desktop)
 *   mobile.webp  / mobile.jpg   —  900px  (slider mobile)
 *   thumb.webp   / thumb.jpg    —  300px  (previews/thumbnails)
 *
 * ─── Uso básico ──────────────────────────────────────────────────────────────
 *
 *   const { getImage, isLoaded } = useOptimizedMedia();
 *
 *   // Slider principal — variante automática según dispositivo
 *   const { src, fallback } = getImage("img1", "auto");
 *
 *   // Forzar variante específica (thumbnails siempre thumb)
 *   const { src, fallback } = getImage(`img${i}`, "thumb");
 *
 *   // En JSX con <picture> para máxima compatibilidad:
 *   <picture>
 *     <source srcSet={src} type="image/webp" />
 *     <img src={fallback} alt="..." />
 *   </picture>
 *
 *   // O directamente (browsers modernos soportan WebP):
 *   <img src={src} alt="..." />
 *
 * ─── Integración en los sliders ──────────────────────────────────────────────
 *
 *   // Slider grande → variante automática (desktop o mobile según pantalla)
 *   slideImgElem.src = getImage(`img${currentImg}`, "auto").src;
 *
 *   // GridRevealImage (primera imagen)
 *   <GridRevealImage src={getImage("img1", "auto").src} ... />
 *
 *   // Previews → siempre thumb
 *   <img src={getImage(`img${i+1}`, "thumb").src} ... />
 */

import { useEffect, useState, useCallback } from "react";

// ─── Detección de capacidades del browser ─────────────────────────────────────

const detectCapabilities = () => {
  if (typeof window === "undefined") {
    return { isMobile: false, supportsWebP: true, slowConnection: false };
  }

  const isMobile =
    window.innerWidth <= 768 ||
    /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  // Detección real de soporte WebP via canvas
  const canvas = document.createElement("canvas");
  canvas.width = 1;
  canvas.height = 1;
  const supportsWebP =
    canvas.toDataURL("image/webp").startsWith("data:image/webp");

  // Network Information API (Chrome / Android)
  const connection =
    navigator.connection ||
    navigator.mozConnection ||
    navigator.webkitConnection;

  const slowConnection =
    connection?.effectiveType === "2g" ||
    connection?.effectiveType === "slow-2g" ||
    connection?.saveData === true;

  return { isMobile, supportsWebP, slowConnection };
};

// ─── Hook ─────────────────────────────────────────────────────────────────────

export const useOptimizedMedia = () => {
  const [manifest, setManifest]         = useState(null);
  const [capabilities, setCapabilities] = useState(detectCapabilities);
  const [isLoaded, setIsLoaded]         = useState(false);

  useEffect(() => {
    fetch("/media-manifest.json")
      .then((r) => r.json())
      .then((data) => {
        setManifest(data);
        setIsLoaded(true);
      })
      .catch(() => {
        // Sin manifest: el hook sigue funcionando con fallback a /styles/
        console.warn("useOptimizedMedia: media-manifest.json no encontrado. Usando paths originales.");
        setIsLoaded(true);
      });

    const handleResize = () => setCapabilities(detectCapabilities());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /**
   * Devuelve los paths optimizados para una imagen.
   *
   * @param {string} name    — nombre sin extensión, ej: "img1"
   * @param {"auto"|"desktop"|"mobile"|"thumb"} variant
   *   - "auto"    → elige desktop o mobile según el dispositivo (para el slider)
   *   - "desktop" → fuerza variante desktop 1920px
   *   - "mobile"  → fuerza variante mobile 900px
   *   - "thumb"   → fuerza variante thumb 300px (usar siempre en previews)
   *
   * @returns {{ src: string, fallback: string, hasOptimized: boolean }}
   *   src      → WebP si el browser lo soporta, JPEG si no
   *   fallback → siempre JPEG (para el <source> dentro de <picture>)
   */
  const getImage = useCallback(
    (name, variant = "auto") => {
      const entry = manifest?.images?.find((img) => img.name === name);

      // Sin manifest o imagen no encontrada → fallback a original
      if (!entry) {
        return {
          src: `/styles/${name}.jpg`,
          fallback: `/styles/${name}.jpg`,
          hasOptimized: false,
        };
      }

      // Resolver variante efectiva
      let effectiveVariant = variant;

      if (variant === "auto") {
        // En conexión lenta, forzar mobile aunque sea desktop
        effectiveVariant =
          capabilities.slowConnection || capabilities.isMobile
            ? "mobile"
            : "desktop";
      }

      const webpSrc = entry[`${effectiveVariant}_webp`];
      const jpgSrc  = entry[`${effectiveVariant}_jpg`] || entry.original;

      // WebP si el browser lo soporta Y existe la variante generada
      const src = capabilities.supportsWebP && webpSrc ? webpSrc : jpgSrc;

      return {
        src,
        fallback: jpgSrc,
        hasOptimized: true,
      };
    },
    [manifest, capabilities]
  );

  return { getImage, isLoaded, capabilities };
};