import { useEffect, useRef } from "react";
import gsap from "gsap";

const TextWrapper = () => {
  const sectionRef = useRef(null);
  const leftTextRef = useRef(null);
  const rightTextRef = useRef(null);
  const imageWrapperRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    let lenis;
    let scrollTriggerInstance;

    const init = async () => {
      const ScrollTrigger = (await import("gsap/ScrollTrigger")).default;
      const Lenis = (await import("lenis")).default;

      gsap.registerPlugin(ScrollTrigger);

      // smooth scroll
      lenis = new Lenis();
      const raf = (time) => {
        lenis.raf(time);
        requestAnimationFrame(raf);
      };
      requestAnimationFrame(raf);
      lenis.on("scroll", ScrollTrigger.update);

      // scroll trigger
      scrollTriggerInstance = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=100%", // ⬅️ solo 1 pantalla de duración (compacto)
        pin: true,
        scrub: 1,
        anticipatePin: 1, // ayuda a que no "salte"
        onUpdate: (self) => {
          const progress = self.progress;

          if (progress <= 0.4) {
            const animationProgress = progress / 0.4;
            const moveDistance = window.innerWidth * 0.6;

            gsap.set(leftTextRef.current, {
              x: -animationProgress * moveDistance,
              opacity: 1,
            });
            gsap.set(rightTextRef.current, {
              x: animationProgress * moveDistance,
              opacity: 1,
            });

            gsap.set(imageWrapperRef.current, {
              scale: animationProgress,
            });
            gsap.set(imageRef.current, {
              scale: 1.5 - animationProgress * 0.5,
            });
          } else {
            gsap.set(imageWrapperRef.current, { scale: 1 });
            gsap.set(imageRef.current, { scale: 1 });
          }
        },
      });
    };

    init();

    return () => {
      if (scrollTriggerInstance) scrollTriggerInstance.kill();
      if (lenis) lenis.destroy();
    };
  }, []);

  return (
    <section ref={sectionRef} className="spotlight">
      <div className="spotlight-intro-text-wrapper">
        <div className="spotlight-intro-text" ref={leftTextRef}>
          <p className="p-spot">where classics</p>
        </div>
        <div className="spotlight-intro-text" ref={rightTextRef}>
          <p className="p-spot">meets contemporary</p>
        </div>
      </div>
      <div className="spotlight-bg-img" ref={imageWrapperRef}>
        <img src="/images/img5.jpg" ref={imageRef} />
      </div>
    </section>
  );
};

export default TextWrapper;
