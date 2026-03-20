/**
 * usePreloadSliderImages.js
 *
 * Precarga inteligente de imágenes para el slider de styles.
 * Elimina el tirón al cambiar de slide cargando las imágenes
 * antes de que el usuario las solicite.
 *
 * Estrategia:
 *   1. Al montar: precarga inmediatamente imgs 1, 2 y 3
 *   2. Tras cada cambio de slide: precarga la siguiente y la anterior
 *   3. En segundo plano: carga el resto de forma escalonada
 *
 * Uso:
 *   const { preloadAround, isReady } = usePreloadSliderImages(getImage, totalSlides);
 *
 *   // Llamar después de cada cambio de slide:
 *   preloadAround(currentImg);
 *
 *   // isReady: true cuando las primeras 3 imágenes están cargadas
 */

import { useEffect, useRef, useCallback, useState } from "react";

export const usePreloadSliderImages = (getImage, total = 16) => {
  // Cache de imágenes ya precargadas (evita re-descargar)
  const preloadedRef = useRef(new Set());
  const [isReady, setIsReady]     = useState(false);
  const initialCountRef           = useRef(0);

  /**
   * Precarga una imagen por índice (1-based).
   * Devuelve una Promise que resuelve cuando la imagen está en caché.
   */
  const preloadOne = useCallback(
    (index) => {
      if (index < 1 || index > total) return Promise.resolve();
      if (preloadedRef.current.has(index)) return Promise.resolve();

      return new Promise((resolve) => {
        const { src } = getImage(`img${index}`, "auto");
        if (!src) return resolve();

        preloadedRef.current.add(index); // marcar antes de cargar para evitar duplicados

        const img = new window.Image();
        img.src = src;
        img.onload  = resolve;
        img.onerror = resolve; // resolve igual para no bloquear
      });
    },
    [getImage, total]
  );

  /**
   * Precarga también la variante thumb del mismo índice.
   * Los thumbs son 300px — muy ligeros, se precargan siempre.
   */
  const preloadThumb = useCallback(
    (index) => {
      if (index < 1 || index > total) return;
      const key = `thumb_${index}`;
      if (preloadedRef.current.has(key)) return;
      preloadedRef.current.add(key);

      const { src } = getImage(`img${index}`, "thumb");
      if (!src) return;
      const img = new window.Image();
      img.src = src;
    },
    [getImage, total]
  );

  // ── Precarga inicial al montar ────────────────────────────────────────────
  useEffect(() => {
    if (!getImage) return;

    // Fase 1: imgs 1, 2, 3 de forma prioritaria (las más probables al entrar)
    const loadInitial = async () => {
      await Promise.all([
        preloadOne(1),
        preloadOne(2),
        preloadOne(3),
      ]);
      setIsReady(true);
    };

    loadInitial();

    // Fase 2: thumbs de todos los slides (son pequeños, cargar todos)
    for (let i = 1; i <= total; i++) {
      preloadThumb(i);
    }

    // Fase 3: resto de slides en background, escalonados para no saturar red
    // Empieza desde img4 con un pequeño delay entre cada una
    let i = 4;
    const interval = setInterval(() => {
      if (i > total) {
        clearInterval(interval);
        return;
      }
      preloadOne(i);
      i++;
    }, 300); // 300ms entre cada precarga background → no compite con las prioritarias

    return () => clearInterval(interval);
  }, [getImage, total, preloadOne, preloadThumb]);

  /**
   * Llama a esta función después de cada cambio de slide.
   * Precarga inmediatamente el siguiente y el anterior.
   *
   * @param {number} currentIndex — índice actual (1-based)
   */
  const preloadAround = useCallback(
    (currentIndex) => {
      preloadOne(currentIndex + 1);
      preloadOne(currentIndex - 1);
    },
    [preloadOne]
  );

  return { preloadAround, isReady };
};