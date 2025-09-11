"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";

const TOTAL_SLIDES = 16;

export default function StyleSlider8() {
  const sliderRef = useRef(null);
  const counterRef = useRef(null);
  const previewsRef = useRef(null);
  const [currentImg, setCurrentImg] = useState(0);

  useEffect(() => {
    let CustomEase;

    // ⬇️ Import dinámico para evitar error en SSR
    import("gsap/CustomEase").then((mod) => {
      CustomEase = mod.CustomEase;
      gsap.registerPlugin(CustomEase);
      CustomEase.create(
        "hop",
        "M0,0 C0.071,0.505 0.192,0.726 0.318,0.852 0.45,0.984 0.504,1 1,1"
      );
    });

    const slides = sliderRef.current.querySelectorAll(".img-slider-new");
    const previews = previewsRef.current.querySelectorAll(".preview");

    function showSlide(index, direction = "right") {
      if (index === currentImg) return;
    
      const currentSlide = slides[currentImg];
      const nextSlide = slides[index];
    
      gsap.set(nextSlide, {
        clipPath:
          direction === "left"
            ? "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)"
            : "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
        zIndex: 3, // 👈 siempre encima del current
      });
    
      // animar solo el nuevo slide
      gsap.to(nextSlide, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 1.2,
        ease: "hop",
        onComplete: () => {
          setCurrentImg(index);
          gsap.set(currentSlide, { zIndex: 1 }); // enviar el anterior al fondo
        },
      });
    
      // actualizar previews
      previews.forEach((p) => p.classList.remove("active"));
      previews[index].classList.add("active");
    
      // actualizar contador
      if (counterRef.current) {
        counterRef.current.textContent = `${index + 1} / ${TOTAL_SLIDES}`;
      }
    }
    

    function handleClick(e) {
      const sliderWidth = sliderRef.current.clientWidth;
      const clickX = e.clientX;

      // click en preview
      if (previewsRef.current.contains(e.target)) {
        const clickedPrev = e.target.closest(".preview");
        if (clickedPrev) {
          const newIndex = Array.from(previews).indexOf(clickedPrev);
          showSlide(newIndex, newIndex < currentImg ? "left" : "right");
        }
        return;
      }

      // click en izquierda/derecha del slider
      if (clickX < sliderWidth / 2 && currentImg > 0) {
        showSlide(currentImg - 1, "left");
      } else if (clickX > sliderWidth / 2 && currentImg < TOTAL_SLIDES - 1) {
        showSlide(currentImg + 1, "right");
      }
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [currentImg]);

  return (
    <div className="container-styles-2 font-myfont2 text-xl tracking-wider">
      {/* columna izquierda → slider */}
      <div className="slider" ref={sliderRef}>
        <div className="slider-images">
          {[...Array(TOTAL_SLIDES)].map((_, i) => (
            <div
              key={i}
              className={`img-slider-new ${i === 0 ? "active" : ""}`}
              style={{
                opacity: i === 0 ? 1 : 0,
                zIndex: i === 0 ? 2 : 1,
              }}
            >
              {/* Slides con <img> para GSAP */}
              <img
                src={`/styles/img${i + 1}.webp`}
                alt={`style-${i + 1}`}
                loading={i === 0 ? "eager" : "lazy"}
              />
            </div>
          ))}
        </div>
      </div>

      {/* columna derecha → texto + previews */}
      <div className="slider-content">
        <div className="contact-content">
          <div className="header-content leading-none">
            <p>salon vilarnau | styles</p>
            <p>T : (030) 61202363</p>
            <p>E : hello@vilarnau.de</p>
          </div>
          <div className="slider-counter">
            <p ref={counterRef}>1 / {TOTAL_SLIDES}</p>
          </div>
        </div>

        <div className="slider-preview" ref={previewsRef}>
          {[...Array(TOTAL_SLIDES)].map((_, i) => (
            <div
              key={i}
              className={`preview ${i === 0 ? "active" : ""}`}
            >
              {/* Previews con next/image optimizadas, sin zooms extras */}
              <Image
                src={`/styles/img${i + 1}.webp`}
                alt={`preview-${i + 1}`}
                width={120}
                height={120}
                className="object-cover w-full h-auto"
                priority={i < 4}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
