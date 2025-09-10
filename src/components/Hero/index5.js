"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const images = [
  "/assets/img1.jpg",
  "/assets/img2.jpg",
  "/assets/img3.jpg",
  "/assets/img4.jpg",
  "/assets/img5.jpg",
  "/assets/img6.jpg",
  "/assets/img8.jpg",
  "/assets/img9.jpg",
  "/assets/img10.jpg",
  "/assets/img11.jpg",
  "/assets/img12.jpg",
];

const preloadImages = (srcArray) => {
  srcArray.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
};

const Hero5 = () => {
  const [currentText, setCurrentText] = useState("salon vilarnau");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startSlideshow, setStartSlideshow] = useState(false);
  const [showFinalImage, setShowFinalImage] = useState(false);
  const [showText, setShowText] = useState(false);
  const [isFinalText, setIsFinalText] = useState(false);

  const textRef = useRef(null);
  const slideshowStarted = useRef(false);
  const finalImageRef = useRef(null);
  const addressRef = useRef(null);

  // Animación de entrada
  const animateIn = async (target, onComplete) => {
    const SplitModule = await import('gsap/SplitText');
    const SplitText = SplitModule.default;
    gsap.registerPlugin(SplitText);

    gsap.set(target, { opacity: 1 });
    const split = new SplitText(target, { type: "chars" });

    gsap.fromTo(
      split.chars,
      { yPercent: "random([-100, 100])", opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        stagger: { amount: 0.4, from: "random" },
        duration: 1,
        ease: "power3.out",
        onComplete,
      }
    );
  };

  // Animación de salida
  const animateOut = async (target, onComplete) => {
    const chars = target.querySelectorAll("div, span");
    gsap.to(chars, {
      yPercent: "random([100, -100])",
      opacity: 0,
      stagger: { amount: 0.3, from: "random" },
      duration: 0.5,
      ease: "power3.in",
      onComplete,
    });
  };

  // Animaciones para la dirección
  const animateAddressIn = () => {
    if (!addressRef.current) return;
    gsap.fromTo(
      addressRef.current,
      { opacity: 0, y: 20, filter: "blur(10px)" },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out", filter: "blur(0px)" }
    );
    
  };

  // Montar texto inicial y transición a segundo texto
  useEffect(() => {
    const runInitialSequence = async () => {
      if (!textRef.current) return;

      await animateIn(textRef.current);

      setTimeout(() => {
        animateOut(textRef.current, () => {
          setCurrentText("manteufelstr.55");
        });
      }, 1000);
    };

    runInitialSequence();
  }, []);

  // Animar entrada del segundo texto
  useEffect(() => {
    if (currentText === "manteufelstr.55" && textRef.current) {
      animateIn(textRef.current, () => {
        setTimeout(() => {
          setStartSlideshow(true);
        }, 300);
      });
    }
  }, [currentText]);

  // Animación de imágenes secuencial hasta la última
  useEffect(() => {
    if (!startSlideshow || slideshowStarted.current) return;

    slideshowStarted.current = true;
    preloadImages(images);

    let index = 0;
    const frameRate = 2;
    const intervalTime = 1000 / frameRate;

    const interval = setInterval(() => {
      index += 1;
      setCurrentIndex(index);

      if (index === images.length - 1) {
        clearInterval(interval);
        setShowFinalImage(true);
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, [startSlideshow]);

  // Al mostrar la imagen final, ocultar texto y mostrar el último sin blend junto con la dirección
  useEffect(() => {
    if (showFinalImage && finalImageRef.current && textRef.current) {
      const imgWrapper = finalImageRef.current.querySelector("div");

      animateOut(textRef.current, () => {
        gsap.to(imgWrapper, {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          duration: 1.5,
          ease: "power3.out",
          delay: 1,
          onComplete: () => {
            setShowText(false);

            setTimeout(() => {
              setIsFinalText(true);
              setCurrentText("salon vilarnau");
              setShowText(true);
              animateAddressIn();
            }, 100);
          },
        });
      });
    }
  }, [showFinalImage]);

  useEffect(() => {
    if (showText && textRef.current) {
      animateIn(textRef.current, () => {
        animateAddressIn(); // Ejecutar solo después de la animación del texto
      });
    }
  }, [showText]);
  

  return (
    <div className="w-screen h-screen flex justify-center items-center relative overflow-hidden bg-white">
      {startSlideshow && (
        <div className="max-h-[62vh] aspect-[4/5]">
          <img
            src={images[currentIndex]}
            alt={`img-${currentIndex}`}
            className="w-full h-full object-cover rounded-xl transition-all duration-500"
            draggable={false}
          />
        </div>
      )}
      <p
        ref={textRef}
        className={`absolute text-5xl blur-[0.5px] text-white font-semibold z-60 opacity-0 ${
          !isFinalText ? "mix-blend-difference" : ""
        }`}
      >
        {currentText}
      </p>

      {showFinalImage && (
        <div
          ref={finalImageRef}
          className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center z-50"
          style={{ pointerEvents: "none" }}
        >
          <div
            className="flex w-[100%] md:w-4/5 lg:w-7/12 h-3/4 overflow-hidden rounded-xl relative"
            style={{
              clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)",
            }}
          >
            <img
              src="/images/img2.jpg"
              alt="Final"
              className="w-full min-h-[60vh] aspect-[5/4] object-cover rounded-xl"
              draggable={false}
            />

            {/* Texto dirección en absolute */}
            {isFinalText && (
              <div className="text-white text-xs md:text-base flex flex-col absolute bottom-1 right-4 md:right-2 items-end -space-y-[4px] md:-space-y-[6px]"
                  ref={addressRef}
                  style={{ opacity: 0, transform: "translateY(20px)", filter: "blur(10px)" }}>
                <h2 className="font-semibold blur-[0.5px] tracking-tight">manteufelstr.55</h2>
                <h2 className="font-semibold blur-[0.5px] tracking-tight">10247 · kreuzberg</h2>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Hero5;
