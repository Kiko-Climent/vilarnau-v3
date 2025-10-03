import { useRef, useEffect, useState } from "react";
import gsap from "gsap";

export default function CounterPreloader({ onComplete, minDuration = 4 }) {
  const countRef = useRef(null);
  const currentValue = useRef({ val: 0 });
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!countRef.current) return;

    const tl = gsap.timeline({
      onComplete: () => {
        setDone(true);
        if (onComplete) onComplete();
      },
    });

    // 🔹 Fase 1: del 0% al 90% en minDuration segundos
    tl.to(currentValue.current, {
      val: 90,
      duration: minDuration,
      ease: "power1.out",
      onUpdate: () => {
        if (countRef.current) {
          countRef.current.innerText = Math.floor(currentValue.current.val);
        }
      },
    });

    // 🔹 Fase 2: espera hasta que assets estén listos (se controlará externamente)
    // se forzará con un trigger -> cuando acaben imágenes sube al 100
  }, [onComplete, minDuration]);

  // 🔹 Cuando todo esté cargado (NewHero4 detecta imágenes + Test4), subimos a 100
  useEffect(() => {
    if (done) return; // evitar repetir
  }, [done]);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white">
      <div className="text-8xl select-none tracking-wide">
        <span ref={countRef}>0</span>
      </div>
    </div>
  );
}
