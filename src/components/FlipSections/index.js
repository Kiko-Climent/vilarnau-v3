'use client';

import { useScroll, useTransform, motion, useMotionValueEvent } from "framer-motion";
import { useNavbar } from "../Layout/Context/NavbarProvider";
import { useRef, useEffect, useState } from "react";

export default function FlipSection({ FirstComponent, SecondComponent }) {
  const containerRef = useRef(null);
  const [navbarVisible, setNavbarVisible] = useState(false);
  const { setShowNavbar } = useNavbar();
  const [isMobile, setIsMobile] = useState(false);

  // Detectar móvil
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (progress > 0.5 && !navbarVisible) {
      setNavbarVisible(true);
      setShowNavbar(true);
    } else if (progress <= 0.5 && navbarVisible) {
      setNavbarVisible(false);
      setShowNavbar(false);
    }
  });

  // Animaciones SIEMPRE calculadas (para no romper desktop)
  const scaleFirst = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const rotateFirst = useTransform(scrollYProgress, [0, 1], [0, -5]);

  const scaleSecond = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const rotateSecond = useTransform(scrollYProgress, [0, 1], [5, 0]);

  return (
    <main
      ref={containerRef}
      className="relative h-[200vh]"
    >
      {/* FIRST */}
      <motion.div
        style={
          isMobile
            ? {} // sin animación en móvil
            : { scale: scaleFirst, rotate: rotateFirst }
        }
        className="sticky top-0 h-screen z-10"
      >
        <FirstComponent />
      </motion.div>

      {/* SECOND */}
      <motion.div
        style={
          isMobile
            ? {} // sin animación en móvil
            : { scale: scaleSecond, rotate: rotateSecond }
        }
        className="relative h-screen z-20"
      >
        <SecondComponent />
      </motion.div>
    </main>
  );
}