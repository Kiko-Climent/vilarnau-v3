import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function CounterPreloader({ progress, onComplete, done }) {
  const countRef = useRef(null);
  const currentValue = useRef({ val: 0 });

  useEffect(() => {
    if (!countRef.current) return;

    gsap.to(currentValue.current, {
      val: progress,
      duration: 0.3,
      ease: "power1.out",
      onUpdate: () => {
        if (countRef.current) {
          countRef.current.innerText = Math.floor(currentValue.current.val);
        }
      },
      onComplete: () => {
        if (done && onComplete) onComplete();
      },
    });
  }, [progress, done, onComplete]);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white">
      <div className="text-8xl select-none tracking-wide">
        <span ref={countRef}>0</span>
      </div>
    </div>
  );
}
