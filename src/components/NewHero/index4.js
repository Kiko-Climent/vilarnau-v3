"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import gsap from "gsap";
import CounterPreloader from "../Tools/CounterPreloader";
import CounterPreloader2 from "../Tools/CounterPreloader2";

export default function NewHero4() {
  const gridRef = useRef(null);
  const router = useRouter();

  const [progress, setProgress] = useState(0);   // porcentaje visible
  const [done, setDone] = useState(false);       // preloader finalizado
  const [test4ImagesLoaded, setTest4ImagesLoaded] = useState(false); // Test4 precargado

  // -------------------------------
  // Animación del splash
  // -------------------------------
  const runAnimation = async () => {
    if (!gridRef.current) return;

    const { default: CustomEase } = await import("gsap/CustomEase");
    gsap.registerPlugin(CustomEase);
    CustomEase.create("hop", "0.9, 0, 0.1, 1");

    const gridImages = gsap.utils.toArray(
      gridRef.current.querySelectorAll(".img-newhero")
    );
    const heroImage = gridRef.current.querySelector(".img-newhero.hero-img");
    const images = gridImages.filter((img) => img !== heroImage);

    const allImageSources = Array.from(
      { length: 35 },
      (_, i) => `/newheromobile/img${i + 1}.webp`
    );
    const getRandomImageSet = () =>
      [...allImageSources].sort(() => 0.5 - Math.random()).slice(0, 9);

    const startImageRotation = () => {
      const totalCycles = 20;
      for (let cycle = 0; cycle < totalCycles; cycle++) {
        const randomImages = getRandomImageSet();
        gsap.to({}, {
          duration: 0,
          delay: cycle * 0.15,
          onComplete: () => {
            gridImages.forEach((img, index) => {
              const imgElement = img.querySelector("img");
              if (cycle === totalCycles - 1 && img === heroImage) {
                imgElement.src = "/newhero/img5.webp";
                gsap.set(heroImage.querySelector("img"), { scale: 2 });
              } else {
                imgElement.src = randomImages[index];
              }
            });
          },
        });
      }
    };

    const tl = gsap.timeline();

    tl.to(".img-newhero", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      duration: 1,
      delay: 1.5,
      stagger: 0.05,
      ease: "hop",
      onStart: () => setTimeout(() => startImageRotation(), 1000),
    });

    tl.to(images, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
      duration: 1,
      delay: 2,
      stagger: 0.05,
      ease: "hop",
    });

    tl.to(heroImage, { y: 0, duration: 1, ease: "hop" });

    tl.to(
      heroImage,
      {
        scale: 4,
        clipPath: "polygon(20% 10%, 80% 10%, 80% 90%, 20% 90%)",
        duration: 0.8,
        ease: "hop",
        onStart: () =>
          gsap.to(heroImage.querySelector("img"), {
            scale: 1,
            duration: 0.8,
            ease: "hop",
          }),
      },
      "-=0.8"
    );

    tl.to(heroImage, {
      clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)",
      duration: 0.6,
      ease: "power2.inOut",
      onComplete: () => {
        // forzar refresh completo
        window.location.href = "/home";
      },
    });
    
  };

  // -------------------------------
  // Preload con progreso real + mínimo 4s
  // -------------------------------
  useEffect(() => {
    const splashImages = [
      ...Array.from({ length: 35 }, (_, i) => `/newheromobile/img${i + 1}.webp`),
      "/newhero/img5.webp",
      "/newhero/img12.webp",
    ];
    const test4Images = [
      "/newhero/img10.webp",
      "/images/img1.webp",
      "/images/img17.webp",
    ];
    const allImages = [...splashImages, ...test4Images];
    let loaded = 0;

    const preloadPromise = new Promise((resolve) => {
      allImages.forEach((src) => {
        const img = new Image();
        img.src = src;
        img.onload = img.onerror = () => {
          loaded++;
          // calcular progreso máximo inicial 90%
          const maxInitialProgress = 90;
          const progressValue = Math.min(
            Math.floor((loaded / allImages.length) * 100),
            maxInitialProgress
          );
          setProgress(progressValue);
    
          if (loaded === allImages.length) {
            console.log("all images succesfully loaded");  
            resolve();
          }
        };
      });
    });
    

    const timerPromise = new Promise((resolve) => setTimeout(resolve, 4000));

    Promise.all([preloadPromise, timerPromise]).then(() => {
      // Aseguramos que todas las imágenes realmente existen en caché antes de continuar
      requestAnimationFrame(() => {
        setProgress(100);
        setTimeout(() => setDone(true), 500);
      });
    });
        
  }, []);

  // -------------------------------
  // Lanzar animación cuando done = true
  // -------------------------------
  useEffect(() => {
    if (done) {
      requestAnimationFrame(() => {
        runAnimation();
      });
    }
  }, [done]);
  

  // -------------------------------
  // Renderizado
  // -------------------------------
  return (
    <>
      {!done && (
        <CounterPreloader2
          progress={progress}
          onComplete={() => setDone(true)}
        />
      )}

      {done && (
        <div className="image-grid" ref={gridRef}>
          <div className="grid-row">
            <div className="img-newhero">
              <img src="/newheromobile/img1.webp" alt="" />
            </div>
            <div className="img-newhero">
              <img src="/newheromobile/img3.webp" alt="" />
            </div>
            <div className="img-newhero">
              <img src="/newheromobile/img4.webp" alt="" />
            </div>
          </div>
          <div className="grid-row">
            <div className="img-newhero">
              <img src="/newheromobile/img5.webp" alt="" />
            </div>
            <div className="img-newhero hero-img">
              <img src="/newhero/img12.webp" alt="" />
            </div>
            <div className="img-newhero">
              <img src="/newheromobile/img7.webp" alt="" />
            </div>
          </div>
          <div className="grid-row">
            <div className="img-newhero">
              <img src="/newheromobile/img8.webp" alt="" />
            </div>
            <div className="img-newhero">
              <img src="/newheromobile/img11.webp" alt="" />
            </div>
            <div className="img-newhero">
              <img src="/newheromobile/img6.webp" alt="" />
            </div>
          </div>
          <div className="header font-myfont2">
            <h1>salon vilarnau</h1>
          </div>
        </div>
      )}
    </>
  );
}
