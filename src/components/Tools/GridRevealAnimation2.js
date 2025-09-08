"use client";
import { forwardRef, useImperativeHandle, useRef } from "react";
import gsap from "gsap";

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

  const groups = Array.from({ length: rows + cols - 1 }, () => []);
  indices.forEach((i) => {
    const r = Math.floor(i / cols);
    const c = i % cols;
    groups[r + c].push(i);
  });
  return groups;
};

const GridRevealImage2 = forwardRef(
  ({ src, rows = 5, cols = 5, className = "", overlap = 0.1 }, ref) => {
    const wrapRef = useRef(null);

    // Exponer un método público
    useImperativeHandle(ref, () => ({
      animateReveal: (tl, { duration = 0.5, stagger = 0.08, ease = "power2.out", groupOffset = 0.125 } = {}) => {
        if (!wrapRef.current) return;

        const masks = wrapRef.current.querySelectorAll(".mask");
        const hidden = buildClipPaths(rows, cols, "hidden", overlap);
        const visible = buildClipPaths(rows, cols, "visible", overlap);

        masks.forEach((mask, idx) =>
          gsap.set(mask, { clipPath: hidden[idx], willChange: "clip-path" })
        );

        const groups = makeOrder(rows, cols);

        // Animación
        groups.forEach((group, groupIndex) => {
          const elements = group
            .map((idx) => wrapRef.current.querySelector(`.mask${idx}`))
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
      },
    }));

    const total = rows * cols;
    const resolvedSrc = getSrc(src);

    return (
      <div
        ref={wrapRef}
        className={`relative overflow-hidden w-full h-full ${className}`}
      >
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
);

export default GridRevealImage2;
