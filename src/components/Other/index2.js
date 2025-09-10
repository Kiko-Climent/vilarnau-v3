"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const animateIn = async (target, onComplete) => {
  const { default: SplitText } = await import("gsap/SplitText");
  gsap.registerPlugin(SplitText);

  // Hacemos visible el contenedor justo antes de animar
  gsap.set(target, { opacity: 1 });

  const split = new SplitText(target, { type: "chars" });

  gsap.fromTo(
    split.chars,
    { yPercent: "random([-100, 100])", opacity: 0, filter: "blur(10px)" },
    {
      yPercent: 0,
      opacity: 1,
      stagger: { amount: 0.4, from: "random" },
      duration: 1,
      ease: "power3.out",
      onComplete,
      filter: "blur(0px)",
    }
  );
};

const Quote1 = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const hasAnimatedText = useRef(false);

  useEffect(() => {
    let scrollTriggerInstance;

    const init = async () => {
      const ScrollTrigger = (await import("gsap/ScrollTrigger")).default;
      gsap.registerPlugin(ScrollTrigger);

      // 🔹 Inicialmente ocultamos el texto
      gsap.set(textRef.current, { opacity: 0 });

      scrollTriggerInstance = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 60%", // ⬅️ cuando el top del componente llega al 60% del viewport
        once: true, // se ejecuta una sola vez
        onEnter: () => {
          if (!hasAnimatedText.current) {
            hasAnimatedText.current = true;
            animateIn(textRef.current);
          }
        },
      });
    };

    init();

    return () => {
      if (scrollTriggerInstance) scrollTriggerInstance.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-screen h-screen flex flex-col items-center justify-center font-myfont2 tracking-wider text-4xl uppercase"
    >
      <div ref={textRef} className="flex flex-col -space-y-2 text-center">
        <p>where classics</p>
        <p>meets contemporary</p>
      </div>
    </section>
  );
};

export default Quote1;
