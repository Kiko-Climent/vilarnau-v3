"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import gsap from "gsap";
import CounterPreloader from "../Tools/CounterPreloader";

export default function NewHero4() {
  const gridRef = useRef(null);
  const router = useRouter();

  const [loading, setLoading] = useState(true);             // CounterPreloader visible
  const [imagesLoaded, setImagesLoaded] = useState(false);  // Splash images precargadas
  const [test4ImagesLoaded, setTest4ImagesLoaded] = useState(false); // Test4 images precargadas

  // -------------------------------
  // Función de precarga genérica
  // -------------------------------
  const preloadImages = (images, onComplete) => {
    let loaded = 0;
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = img.onerror = () => {
        loaded++;
        if (loaded === images.length && onComplete) onComplete();
      };
    });
  };

  // -------------------------------
  // Precarga imágenes Splash
  // -------------------------------
  useEffect(() => {
    const splashImages = [
      ...Array.from({ length: 35 }, (_, i) => `/newheromobile/img${i + 1}.webp`),
      "/newhero/img5.webp",
      "/newhero/img12.webp"
    ];
    preloadImages(splashImages, () => setImagesLoaded(true));
  }, []);

  // -------------------------------
  // Precarga imágenes Test4
  // -------------------------------
  useEffect(() => {
    const test4Images = [
      "/newhero/img10.webp",
      "/images/img1.webp",
      "/images/img17.webp"
    ];
    preloadImages(test4Images, () => setTest4ImagesLoaded(true));
  }, []);

  // -------------------------------
  // Animación del splash
  // -------------------------------
  const runAnimation = async () => {
    if (!gridRef.current) return;

    const { default: CustomEase } = await import("gsap/CustomEase");
    gsap.registerPlugin(CustomEase);
    CustomEase.create("hop", "0.9, 0, 0.1, 1");

    const gridImages = gsap.utils.toArray(gridRef.current.querySelectorAll(".img-newhero"));
    const heroImage = gridRef.current.querySelector(".img-newhero.hero-img");
    const images = gridImages.filter(img => img !== heroImage);

    const allImageSources = Array.from({ length: 35 }, (_, i) => `/newheromobile/img${i + 1}.webp`);
    const getRandomImageSet = () => [...allImageSources].sort(() => 0.5 - Math.random()).slice(0, 9);

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

    tl.to(images, { clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)", duration: 1, delay: 2, stagger: 0.05, ease: "hop" });

    tl.to(heroImage, { y: 0, duration: 1, ease: "hop" });

    tl.to(heroImage, {
      scale: 4,
      clipPath: "polygon(20% 10%, 80% 10%, 80% 90%, 20% 90%)",
      duration: 0.8,
      ease: "hop",
      onStart: () => gsap.to(heroImage.querySelector("img"), { scale: 1, duration: 0.8, ease: "hop" }),
    }, "-=0.8");

    tl.to(heroImage, {
      clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)",
      duration: 0.6,
      ease: "power2.inOut",
      onComplete: () => {
        // 🔹 Esperamos que Test4 esté precargado antes de ir a /home
        if (test4ImagesLoaded) {
          router.push("/home");
        } else {
          const checkLoaded = setInterval(() => {
            if (test4ImagesLoaded) {
              clearInterval(checkLoaded);
              router.push("/home");
            }
          }, 50);
        }
      },
    });
  };

  // -------------------------------
  // Ejecuta animación solo cuando preloader y splash images estén listas
  // -------------------------------
  useEffect(() => {
    if (!loading && imagesLoaded) runAnimation();
  }, [loading, imagesLoaded]);

  // -------------------------------
  // Renderizado
  // -------------------------------
  return (
    <>
      {loading && <CounterPreloader duration={4} onComplete={() => setLoading(false)} />}
      {!loading && (
        <div className="image-grid" ref={gridRef}>
          <div className="grid-row">
            <div className="img-newhero"><img src="/newheromobile/img1.webp" alt="" /></div>
            <div className="img-newhero"><img src="/newheromobile/img3.webp" alt="" /></div>
            <div className="img-newhero"><img src="/newheromobile/img4.webp" alt="" /></div>
          </div>
          <div className="grid-row">
            <div className="img-newhero"><img src="/newheromobile/img5.webp" alt="" /></div>
            <div className="img-newhero hero-img"><img src="/newhero/img12.webp" alt="" /></div>
            <div className="img-newhero"><img src="/newheromobile/img7.webp" alt="" /></div>
          </div>
          <div className="grid-row">
            <div className="img-newhero"><img src="/newheromobile/img8.webp" alt="" /></div>
            <div className="img-newhero"><img src="/newheromobile/img11.webp" alt="" /></div>
            <div className="img-newhero"><img src="/newheromobile/img6.webp" alt="" /></div>
          </div>
          <div className="header font-myfont2">
            <h1>salon vilarnau</h1>
          </div>
        </div>
      )}
    </>
  );
}
