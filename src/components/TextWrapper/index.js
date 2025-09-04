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
        end: `+=${window.innerHeight * 1.2}`, // scroll más corto
        pin: true,
        scrub: 0.8,
        onUpdate: (self) => {
          const progress = self.progress;
  
          // ⚡ Nueva lógica para la imagen
          const fullViewportProgress = 0.3; // escala full screen
          const leftAnchorProgress = 0.5;   // se ancla a la izquierda
  
          if (progress <= fullViewportProgress) {
            const animProgress = progress / fullViewportProgress;
  
            gsap.set(imageWrapperRef.current, {
              scale: animProgress,
              x: 0,
              y: 0,
            });
          } else if (progress <= leftAnchorProgress) {
            const animProgress = (progress - fullViewportProgress) / (leftAnchorProgress - fullViewportProgress);
  
            gsap.set(imageWrapperRef.current, {
              scale: 1,
              x: -animProgress * 100, // ajusta según cuánto quieres moverla
              y: 0,
            });
          } else {
            gsap.set(imageWrapperRef.current, {
              scale: 1,
              x: -100, // posición final a la izquierda
              y: 0,
            });
          }
  
          // Movimiento de los textos
          if (progress <= 0.3) {
            const animationProgress = progress / 0.3;
            const moveDistance = window.innerWidth * 0.6;
  
            gsap.set(leftTextRef.current, {
              x: -animationProgress * moveDistance,
              opacity: 1,
            });
            gsap.set(rightTextRef.current, {
              x: animationProgress * moveDistance,
              opacity: 1,
            });
          }
  
          // Texto final
          if (progress > 0.45 && !showFinalTextRef.current) {
            showFinalTextRef.current = true;
            setShowFinalText(true);
          } else if (progress <= 0.45 && showFinalTextRef.current) {
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
