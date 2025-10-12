import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CounterPreloader2({ progress = 0, onComplete }) {
  const countRef = useRef(null);
  const tweenValue = useRef({ value: 0 });
  const tweenRef = useRef(null); // para limpiar el tween anterior
  const [displayProgress, setDisplayProgress] = useState(0);

  useEffect(() => {
    if (!countRef.current) return;

    // mata el tween previo antes de crear uno nuevo
    if (tweenRef.current) {
      tweenRef.current.kill();
    }

    // tramo normal (0 → 90)
    if (progress <= 90) {
      tweenRef.current = gsap.to(tweenValue.current, {
        value: progress,
        duration: 1.2, // más ágil, pero suave
        ease: "power2.out",
        onUpdate: () => {
          const val = Math.floor(tweenValue.current.value);
          setDisplayProgress(val);
        },
      });
    }
    // tramo final (90 → 100)
    else {
      tweenRef.current = gsap.to(tweenValue.current, {
        value: 100,
        duration: 0.8,
        ease: "expo.out",
        onUpdate: () => {
          const val = Math.floor(tweenValue.current.value);
          setDisplayProgress(val);
        },
        onComplete: () => {
          gsap.delayedCall(0.2, () => {
            onComplete?.();
          });
        },
      });
    }

    // cleanup al desmontar el componente
    return () => {
      if (tweenRef.current) tweenRef.current.kill();
    };
  }, [progress, onComplete]);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white overflow-hidden">
      <div className="text-[clamp(2.5rem,10vw,6rem)] select-none tracking-tight px-2 overflow-visible leading-none">
        <span ref={countRef}>{displayProgress}</span>
      </div>
    </div>
  );
}
