import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function CounterPreloader({ onComplete, duration = 3 }) {
  const countRef = useRef(null);
  const currentValue = useRef({ val: 0 });

  useEffect(() => {
    if (!countRef.current) return;

    gsap.to(currentValue.current, {
      val: 100,
      duration: duration,
      ease: "power1.out",
      onUpdate: () => {
        if (countRef.current) {
          countRef.current.innerText = Math.floor(currentValue.current.val);
        }
      },
      onComplete: () => {
        if (onComplete) onComplete();
      },
    });
  }, [onComplete, duration]);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white">
      <div className="text-8xl select-none tracking-wide">
        <span ref={countRef}>0</span>
      </div>
    </div>
  );
}
