import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CounterPreloader({ progress = 0, onComplete }) {
  const countRef = useRef(null);

  useEffect(() => {
    if (!countRef.current) return;

    gsap.to(countRef.current, {
      innerText: progress,
      duration: 0.3,
      roundProps: "innerText",
      ease: "power1.out",
      onComplete: () => {
        if (progress >= 100 && onComplete) onComplete();
      },
    });
  }, [progress, onComplete]);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white">
      <div className="text-8xl select-none tracking-wide">
        <span ref={countRef}>0</span>
      </div>
    </div>
  );
}
