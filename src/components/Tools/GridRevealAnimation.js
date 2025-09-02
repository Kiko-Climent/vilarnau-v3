"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

// Helpers
const getSrc = (img) => (typeof img === "string" ? img : img?.src || "");

const buildClipPaths = (rows, cols, type, overlap = 0.1) => {
  const stepX = 100 / cols;
  const stepY = 100 / rows;
  const paths = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x1 = c * stepX - overlap;
      const y1 = r * stepY - overlap;
      const x2 = (c + 1) * stepX;
      const y2 = (r + 1) * stepY;

      paths.push(
        type === "visible"
          ? `polygon(${x1}% ${y1}%, ${x2}% ${y1}%, ${x2}% ${y2}%, ${x1}% ${y2}%)`
          : `polygon(${x1}% ${y1}%, ${x1}% ${y1}%, ${x1}% ${y1}%, ${x1}% ${y1}%)`
      );
    }
  }
  return paths;
};

const makeOrder = (rows, cols, mode = "diagonal") => {
  const total = rows * cols;
  const indices = Array.from({ length: total }, (_, i) => i);

  if (Array.isArray(mode)) return mode;

  if (mode === "row") {
    return Array.from({ length: rows }, (_, r) =>
      indices.filter((i) => Math.floor(i / cols) === r)
    );
  }

  if (mode === "column") {
    return Array.from({ length: cols }, (_, c) =>
      indices.filter((i) => i % cols === c)
    );
  }

  if (mode === "random") {
    const shuffled = [...indices].sort(() => Math.random() - 0.5);
    return shuffled.map((i) => [i]);
  }

  // diagonal por defecto
  const groups = Array.from({ length: rows + cols - 1 }, () => []);
  indices.forEach((i) => {
    const r = Math.floor(i / cols);
    const c = i % cols;
    groups[r + c].push(i);
  });
  return groups;
};

export default function GridRevealImage({
  src,
  rows = 5,
  cols = 5,
  className = "",
  style,
  trigger = "self",
  order = "diagonal",
  duration = 0.5,
  stagger = 0.08,
  ease = "power2.out",
  overlap = 0.1,
  groupOffset = 0.125,
  start = "top 80%",
  once = true,
  onComplete,
}) {
  const wrapRef = useRef(null);
  const tlRef = useRef(null);
  const hasAnimatedRef = useRef(false); // 🔹 flag por instancia

  useEffect(() => {
    if (once && hasAnimatedRef.current) return;

    let mounted = true;

    (async () => {
      const { default: ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      if (!mounted || !wrapRef.current) return;

      const wrap = wrapRef.current;
      const masks = wrap.querySelectorAll(".mask");
      const hidden = buildClipPaths(rows, cols, "hidden", overlap);
      const visible = buildClipPaths(rows, cols, "visible", overlap);

      // Estado inicial oculto
      masks.forEach((mask, idx) =>
        gsap.set(mask, { clipPath: hidden[idx], willChange: "clip-path" })
      );

      const groups = makeOrder(rows, cols, order);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: trigger === "self" ? wrap : document.querySelector(trigger),
          start,
        },
        onComplete: () => {
          if (once) hasAnimatedRef.current = true; // ✅ marca como animado solo esta instancia
          onComplete?.();
        },
      });

      groups.forEach((group, groupIndex) => {
        const elements = group
          .map((idx) => wrap.querySelector(`.mask${idx}`))
          .filter(Boolean);

        tl.to(
          elements,
          {
            clipPath: (i, el) => visible[Number(el.dataset.index)],
            duration,
            ease,
            stagger,
          },
          groupIndex * groupOffset
        );
      });

      tlRef.current = tl;
    })();

    return () => {
      mounted = false;
      if (tlRef.current) {
        tlRef.current.kill();
        tlRef.current = null;
      }
      if (wrapRef.current) {
        gsap.killTweensOf(wrapRef.current.querySelectorAll(".mask"));
      }
    };
  }, [rows, cols, trigger, order, duration, stagger, ease, overlap, groupOffset, start, once, onComplete]);

  const resolvedSrc = getSrc(src);
  const total = rows * cols;

  return (
    <div ref={wrapRef} className={`relative overflow-hidden ${className}`} style={style}>
      {Array.from({ length: total }).map((_, j) => (
        <div
          key={j}
          className={`mask mask${j} absolute inset-0 bg-center bg-cover`}
          data-index={j}
          style={{ backgroundImage: `url(${resolvedSrc})` }}
        />
      ))}
    </div>
  );
}
