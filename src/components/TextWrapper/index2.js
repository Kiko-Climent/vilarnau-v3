import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import TextAnimation from "../Tools";

const TextWrapper2 = () => {
  const sectionRef = useRef(null);
  const leftTextRef = useRef(null);
  const rightTextRef = useRef(null);
  const imageWrapperRef = useRef(null);
  const imageRef = useRef(null);
  const imageWrapperRef2 = useRef(null);
  const [showFinalText, setShowFinalText] = useState(false);
  const showFinalTextRef = useRef(false);

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

      // estados iniciales claros
      gsap.set(imageWrapperRef.current, { scale: 0, opacity: 0 });
      gsap.set(imageRef.current, { scale: 1.5, opacity: 0 });
      gsap.set(imageWrapperRef2.current, { opacity: 0 });

      scrollTriggerInstance = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: `+=${window.innerHeight * 1}`,
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;

          // Intro + bg-image escala
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
              opacity: 1,
            });
            gsap.set(imageRef.current, {
              scale: 1.5 - animationProgress * 0.5,
              opacity: 1,
            });

            // forzamos imagen final oculta
            gsap.set(imageWrapperRef2.current, { 
              opacity: 0, 
              clipPath: "inset(0% 0% 100% 0%)" // recorta desde abajo hacia arriba
            })
          }

          // Imagen principal estable
          else if (progress > 0.4 && progress <= 0.6) {
            gsap.set(imageWrapperRef.current, { scale: 1, opacity: 1 });
            gsap.set(imageRef.current, { scale: 1, opacity: 1 });
            gsap.set(imageWrapperRef2.current, { opacity: 0 });
          }

          // Fade out bg-image
          else if (progress > 0.6 && progress <= 0.65) {
            const fadeProgress = (progress - 0.6) / 0.05;
            gsap.set(imageWrapperRef.current, { opacity: 1 - fadeProgress });
            gsap.set(imageRef.current, { opacity: 1 - fadeProgress });
            gsap.set(imageWrapperRef2.current, { opacity: 0 });
          }

          // Fade in final image (fija, sin escala)
          else if (progress > 0.65 && progress <= 0.85) {
            const revealProgress = (progress - 0.65) / 0.2;
            gsap.set(imageWrapperRef2.current, {
              opacity: 1,
              clipPath: `inset(0% 0% ${100 - revealProgress * 100}% 0%)`,
            });
          }

          // Texto final
          if (progress > 0.85 && !showFinalTextRef.current) {
            showFinalTextRef.current = true;
            setShowFinalText(true);
          } else if (progress <= 0.85 && showFinalTextRef.current) {
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
    <section ref={sectionRef} className="spotlight font-myfont2 tracking-wider text-lg">
      <div className="spotlight-intro-text-wrapper">
        <div className="spotlight-intro-text" ref={leftTextRef}>
          <p className="p-spot">where classics</p>
        </div>
        <div className="spotlight-intro-text" ref={rightTextRef}>
          <p className="p-spot">meets contemporary</p>
        </div>
      </div>

      {/* Imagen inicial */}
      <div className="spotlight-bg-img" ref={imageWrapperRef}>
        <img src="/images/img5.jpg" ref={imageRef} />
      </div>

      {/* Imagen final */}
      <div className="spotlight-final-img" ref={imageWrapperRef2}>
        <img src="/images/img5.jpg" />
      </div>

      {showFinalText && (
        <TextAnimation>
          <div className="spotlight-text2 pb-2">
            <p className="p-spot-img tracking-wider leading-none text-lg">
              we believe in creating a look<br />
              that while keeping an insight<br />
              on actual trends, better highlights<br />
              your features and lifestyle
            </p>
          </div>
        </TextAnimation>
      )}
    </section>
  );
};

export default TextWrapper2;
