import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import TextAnimation from "../Tools";

const buildClipPaths = (rows, cols, type, overlap = 0.1) => {
  const stepX = 100 / cols;
  const stepY = 100 / rows;
  const paths = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x1 = c * stepX - overlap;
      const y1 = r * stepY - overlap;
      const x2 = (c + 1) * stepX;
      const y2 = (r + 1) * stepY;
      paths.push(
        type === "visible"
          ? `polygon(${x1}% ${y1}%, ${x2}% ${y1}%, ${x2}% ${y2}%, ${x1}% ${y2}%)`
          : `polygon(${x1}% ${y1}%, ${x1}% ${y1}%, ${x1}% ${y1}%, ${x1}% ${y1}%)`
      );
    }
  }
  return paths;
};

const makeOrder = (rows, cols) => {
  const total = rows * cols;
  const indices = Array.from({ length: total }, (_, i) => i);
  const groups = Array.from({ length: rows + cols - 1 }, () => []);
  indices.forEach((i) => {
    const r = Math.floor(i / cols);
    const c = i % cols;
    groups[r + c].push(i);
  });
  return groups;
};

const TextWrapper3 = () => {
  const sectionRef = useRef(null);
  const leftTextRef = useRef(null);
  const rightTextRef = useRef(null);
  const imageWrapperRef = useRef(null);
  const imageRef = useRef(null);
  const imageFinalRef = useRef(null);
  const [showFinalText, setShowFinalText] = useState(false);
  const showFinalTextRef = useRef(false);

  const rows = 5;
  const cols = 5;

  useEffect(() => {
    let lenis;
    let scrollTriggerInstance;
    let tlFinalImage = null;
  
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
  
      // Preparar máscara de la imagen final
      const finalWrap = imageFinalRef.current;
      const totalTiles = rows * cols;
      const hiddenPaths = buildClipPaths(rows, cols, "hidden");
      const visiblePaths = buildClipPaths(rows, cols, "visible");
  
      finalWrap.innerHTML = "";
      for (let i = 0; i < totalTiles; i++) {
        const div = document.createElement("div");
        div.className = `mask mask${i} absolute`;
        div.dataset.index = i;
        div.style.backgroundImage = `url(/images/img5.jpg)`;
        finalWrap.appendChild(div);
      }
  
      const masks = finalWrap.querySelectorAll(".mask");
      masks.forEach((mask, idx) => {
        const r = Math.floor(idx / cols);
        const c = idx % cols;
  
        gsap.set(mask, {
          clipPath: hiddenPaths[idx],
          width: `${100 / cols}%`,
          height: `${100 / rows}%`,
          top: `${r * (100 / rows)}%`,
          left: `${c * (100 / cols)}%`,
          position: "absolute",
  
          // <- clave: ajusta la imagen para cada tile
          backgroundSize: `${cols * 100}% ${rows * 100}%`,
          backgroundPosition: `${(c * -100) / (cols - 1)}% ${(r * -100) / (rows - 1)}%`,
        });
      });
  
      // Timeline del reveal pausado
      tlFinalImage = gsap.timeline({ paused: true });
      const groups = makeOrder(rows, cols);
      groups.forEach((group, groupIndex) => {
        const elements = group
          .map((idx) => finalWrap.querySelector(`.mask${idx}`))
          .filter(Boolean);
  
        tlFinalImage.to(
          elements,
          {
            clipPath: (i, el) => visiblePaths[el.dataset.index],
            duration: 0.5,
            ease: "power2.out",
            stagger: 0.08,
          },
          groupIndex * 0.125
        );
      });
  
      gsap.set(finalWrap, { opacity: 0 });
  
      scrollTriggerInstance = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: `+=${window.innerHeight * 1}`,
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
  
          if (progress <= 0.4) {
            const animationProgress = progress / 0.4;
            const moveDistance = window.innerWidth * 0.6;
  
            gsap.set(leftTextRef.current, { x: -animationProgress * moveDistance, opacity: 1 });
            gsap.set(rightTextRef.current, { x: animationProgress * moveDistance, opacity: 1 });
            gsap.set(imageWrapperRef.current, { scale: animationProgress, opacity: 1 });
  
            gsap.set(imageRef.current, { scale: 1.5 - animationProgress * 0.5, opacity: 1 });
  
            gsap.set(finalWrap, { opacity: 0 });
            tlFinalImage.progress(0);
          } else if (progress > 0.4 && progress <= 0.6) {
            gsap.set(imageWrapperRef.current, { scale: 1, opacity: 1 });
            gsap.set(imageRef.current, { scale: 1, opacity: 1 });
            gsap.set(finalWrap, { opacity: 0 });
            tlFinalImage.progress(0);
          } else if (progress > 0.6 && progress <= 0.65) {
            const fadeProgress = (progress - 0.6) / 0.05;
            gsap.set(imageWrapperRef.current, { opacity: 1 - fadeProgress });
            gsap.set(imageRef.current, { opacity: 1 - fadeProgress });
            gsap.set(finalWrap, { opacity: 0 });
            tlFinalImage.progress(0);
          } else if (progress > 0.65 && progress <= 0.85) {
            gsap.set(finalWrap, { opacity: 1 });
            const revealProgress = (progress - 0.65) / 0.2;
            tlFinalImage.progress(revealProgress);
          }
  
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

      <div className="spotlight-bg-img" ref={imageWrapperRef}>
        <img src="/images/img5.jpg" ref={imageRef} />
      </div>

      {/* Imagen final con grid reveal */}
      <div
        className="spotlight-final-img"
        ref={imageFinalRef}
        style={{ position: "absolute", top: 0, left: 0, width: "70%", height: "50vh", overflow: "hidden" }}
      />

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

export default TextWrapper3;
