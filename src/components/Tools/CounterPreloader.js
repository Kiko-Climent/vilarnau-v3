import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CounterPreloader({ progress = 0, onComplete }) {
  const countRef = useRef(null);
  const [displayProgress, setDisplayProgress] = useState(0);
  const tweenValue = useRef({ value: 0 });

  useEffect(() => {
    if (!countRef.current) return;

    if (progress <= 90) {
      // 👇 Easing personalizado tipo curva “loading realista”
      gsap.to(tweenValue.current, {
        value: progress,
        duration: 2, // más lento entre 0 y 90
        ease: "power3.inOut", // curva suave (rápido al inicio, lento en medio)
        onUpdate: () => {
          setDisplayProgress(Math.floor(tweenValue.current.value));
        },
      });
    } else {
      // tramo final 90 → 100 más rápido y fluido
      gsap.to(countRef.current, {
        innerText: 100,
        duration: 0.8,
        roundProps: "innerText",
        ease: "expo.out", // acelera suavemente al final
        onComplete: () => onComplete && onComplete(),
      });
    }
  }, [progress, onComplete]);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white">
      <div className="text-8xl select-none tracking-wide">
        <span ref={countRef}>{displayProgress}</span>
      </div>
    </div>
  );
}
