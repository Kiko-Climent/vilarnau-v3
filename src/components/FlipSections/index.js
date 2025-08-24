'use client';
import { useScroll, useTransform, motion, useMotionValueEvent } from "framer-motion";
import { useNavbar } from "../Layout/Context/NavbarProvider";
import { useRef, useEffect, useState } from "react";
import Lenis from "lenis";

export default function FlipSection({ FirstComponent, SecondComponent }) {
  const containerRef = useRef(null);
  const [navbarVisible, setNavbarVisible] = useState(false);
  const {setShowNavbar} = useNavbar();

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
  })

  useEffect( () => {
    const lenis = new Lenis()

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
  }, [])

  const scaleFirst = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const rotateFirst = useTransform(scrollYProgress, [0, 1], [0, -5]);

  const scaleSecond = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const rotateSecond = useTransform(scrollYProgress, [0, 1], [5, 0]);

  return (
    <main ref={containerRef} className="relative h-[200vh]">
      
      <motion.div
        style={{ scale: scaleFirst, rotate: rotateFirst }}
        className="sticky top-0 h-screen"
      >
        <FirstComponent />
      </motion.div>

      <motion.div
        style={{ scale: scaleSecond, rotate: rotateSecond }}
        className="relative h-screen"
      >
        <SecondComponent />
      </motion.div>

    </main>
  );
}
