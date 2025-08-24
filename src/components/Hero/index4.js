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

const Hero4 = () => {
  const [currentText, setCurrentText] = useState("salon vilarnau");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startSlideshow, setStartSlideshow] = useState(false);
  const textRef = useRef(null);
  const slideshowStarted = useRef(false);

  // Animación de entrada
  const animateIn = async (target, onComplete) => {
    const module = await import("gsap/SplitText");
    const SplitText = module.default;
    gsap.registerPlugin(SplitText);

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

  // Montar texto inicial y transición a segundo texto
  useEffect(() => {
    const runInitialSequence = async () => {
      if (!textRef.current) return;

      await animateIn(textRef.current);

      setTimeout(() => {
        animateOut(textRef.current, () => {
          setCurrentText("manteufelstr.55");
        });
      }, 1000); // espera 1 segundo antes de empezar la salida
    };

    runInitialSequence();
  }, []);

  // Animar entrada del segundo texto
  useEffect(() => {
    if (currentText === "manteufelstr.55" && textRef.current) {
      animateIn(textRef.current, () => {
        // Cuando termina la animación de entrada del segundo texto
        setTimeout(() => {
          setStartSlideshow(true);
        }, 300); // pequeño delay extra si quieres
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
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, [startSlideshow]);

  return (
    <div className="w-screen h-screen flex justify-center items-center relative overflow-hidden">
      {startSlideshow && (
        <img
          src={images[currentIndex]}
          alt={`img-${currentIndex}`}
          className="w-[23vw] aspect-[4/5] object-cover rounded-xl transition-all duration-500"
          draggable={false}
        />
      )}
      <p
        ref={textRef}
        className="absolute text-4xl text-gray-400 mix-blend-difference font-semibold"
      >
        {currentText}
      </p>
    </div>
  );
};

export default Hero4;
