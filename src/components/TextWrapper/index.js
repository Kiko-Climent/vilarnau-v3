import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import TextAnimation from "../Tools";

const TextWrapper = () => {
  const sectionRef = useRef(null);
  const leftTextRef = useRef(null);
  const rightTextRef = useRef(null);
  const imageWrapperRef = useRef(null);
  const imageRef = useRef(null);
  const [showFinalText, setShowFinalText] = useState(false);
  const showFinalTextRef = useRef(false); // <-- ref para controlar estado sin render

  useEffect(() => {
    let lenis;
    let scrollTriggerInstance;

    const init = async () => {
      const ScrollTrigger = (await import("gsap/ScrollTrigger")).default;
      const Lenis = (await import("lenis")).default;

      gsap.registerPlugin(ScrollTrigger);

      lenis = new Lenis();
      const raf = (time) => {
        lenis.raf(time);
        requestAnimationFrame(raf);
      };
      requestAnimationFrame(raf);
      lenis.on("scroll", ScrollTrigger.update);

      scrollTriggerInstance = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: `+=${window.innerHeight * 2}`,
        pin: true,
        scrub: 1,
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

          // Controlar aparición/desaparición del texto en 0.65 con ref para evitar renders innecesarios
          if (progress > 0.65 && !showFinalTextRef.current) {
            showFinalTextRef.current = true;
            setShowFinalText(true);
          } else if (progress <= 0.65 && showFinalTextRef.current) {
            showFinalTextRef.current = false;
            setShowFinalText(false);
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
      {showFinalText && (
        <TextAnimation>
          <div className="spotlight-text">
            <p className="p-spot-img">
              we believe in creating a look that while keeping an insight on
              actual trends, better highlights your features and lifestyle
            </p>
          </div>
        </TextAnimation>
      )}
    </section>
  );
};

export default TextWrapper;
