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
    { yPercent: "random([-100, 100])", opacity: 0, filter: "blur(1.5px)" },
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
        start: "top 60+=100",
        once: true,
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
      className="w-screen h-screen flex flex-col items-center justify-center font-myfont2 tracking-wider text-[clamp(1rem,7vw,4rem)] md:text-[clamp(1.1rem,2.2vw,1.8rem)] uppercase"
    >
      <div ref={textRef} className="flex flex-col -space-y-4 md:-space-y-4 text-center">
        <p>where timeless</p>
        <p>meets today</p>
      </div>
    </section>
  );
};

export default Quote1;
