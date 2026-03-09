"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import usePreloadImage from "../Tools/usePreloadImage";
import { useNavbarDesktop } from "@/components/Layout/Context/NavbarDesktopContext";

const SHY = "\u00AD"; // soft hyphen: permite partir palabras por sílabas

const imgs = [
  "/images/Vilarnau_analog_04.webp",
  "/images/Vilarnau_analog_06.webp",
  "/images/Vilarnau_analog_13.webp",
];

export default function Almodovar() {
  const sectionRef = useRef(null);
  const secondImgRef = useRef(null);
  const [secondImgBottom, setSecondImgBottom] = useState(null);
  const { measures } = useNavbarDesktop();

  // Ancho desktop: desde el FINAL de vilarnau (la "u") hasta la "a" de about
  const desktopImgWidth = measures.aboutX - measures.vilarnauRight;

  // ✅ Preload images first
  const [img1, Pre1] = usePreloadImage(imgs[0]);
  const [img2, Pre2] = usePreloadImage(imgs[1]);
  const [img3, Pre3] = usePreloadImage(imgs[2]);
  const allLoaded = img1 && img2 && img3;

  useEffect(() => {
    if (!secondImgRef.current) return;

    const measure = () => {
      const rect = secondImgRef.current.getBoundingClientRect();
      const sectionRect = sectionRef.current.getBoundingClientRect();
      // bottom relativo al contenedor section
      setSecondImgBottom(sectionRect.height - (rect.bottom - sectionRect.top));
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [allLoaded]);

  useEffect(() => {
    if (!allLoaded) return;
    let ctx;
  
    async function runAnimation() {
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
  
      const images = sectionRef.current?.querySelectorAll(".reveal-img");
      if (!images?.length) return;
  
      // ---- SOLUCIÓN 3: warm-up GPU layer ----
      images.forEach(img => {
        img.style.willChange = "clip-path, transform";
        img.style.transform = "translateZ(0.001px)"; // fuerza composición suave
        img.style.backfaceVisibility = "hidden";
        img.style.contain = "layout paint";
      });
  
      ctx = gsap.context(() => {
        gsap.set(images, {
          clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)",
        });
  
        // ---- SOLUCIÓN 1: doble rAF + 1 frame extra ----
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setTimeout(() => {
              gsap.to(images, {
                clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                duration: 1.25,
                ease: "power4.out",
                stagger: 0.22,
                scrollTrigger: {
                  trigger: sectionRef.current,
                  start: "center-=150 center",
                  toggleActions: "play none none reverse",
                  once: true,
                }
              });
            }, 16); // un frame (~16ms)
          });
        });
      }, sectionRef);
    }
  
    runAnimation();
    return () => ctx?.revert();
  }, [allLoaded]);
  

  return (
    <div
      ref={sectionRef}
      className="relative h-screen w-screen flex flex-col justify-center items-start overflow-hidden gap-4 md:gap-2 pr-4 md:pr-0 bg-white"
    >
      {Pre1}{Pre2}{Pre3}

      {[img1, img2, img3].map((src, i) => (
        <div
          key={i}
          ref={i === 1 ? secondImgRef : null}
          className="flex h-[25%] md:h-[33%]"
          style={{
            marginLeft: measures.navbarWidth >= 768 ? `${measures.vilarnauRight}px` : undefined,
            width: measures.navbarWidth >= 768 && measures.aboutX > 0
              ? `${desktopImgWidth}px`
              : measures.navbarWidth > 0 && measures.navbarWidth < 768
              ? `${measures.aboutX + measures.aboutWidth - 16}px`
              : undefined
          }}
        >
          {src && (
            <img
              src={src}
              className="reveal-img object-cover w-full h-full"
              style={{ contain: "layout paint", transform: "translateZ(0)" }}
            />
          )}
        </div>
      ))}

      <div
        className="absolute pl-4 pr-4 md:pr-4 w-full md:w-[50%] mix-blend-difference"
        style={{
          left: 0,
          bottom: secondImgBottom !== null && measures.navbarWidth < 768
            ? `${secondImgBottom}px`
            : '35%'
        }}
      >
        <p className="text-white text-lg md:text-[clamp(0.95rem,2vw,1.45rem)] tracking-wider leading-none md:leading-5 hyphens-manual" lang="en">
          &quot;wel{SHY}l, as i was say{SHY}ing it cost{SHY}s a lot to be au{SHY}then{SHY}tic,
          and on{SHY}e can&apos;t be stin{SHY}gy with the{SHY}se thin{SHY}gs,
          be{SHY}cause you are mo{SHY}re au{SHY}then{SHY}tic the mo{SHY}re you
          re{SHY}sem{SHY}ble what you&apos;ve dream{SHY}ed you are&quot;
        </p>
      </div>
    </div>
  );
}