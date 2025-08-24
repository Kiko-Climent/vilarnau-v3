"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Hero3() {
  const [isAnimated, setIsAnimated] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const [nextImageIndex, setNextImageIndex] = useState(1);
  const [showFirst, setShowFirst] = useState(true);

  const images = [
    "/images/img1.jpg",
    "/images/img2.jpg",
    "/images/img3.jpg",
    "/images/img4.jpg",
    "/images/img5.jpg",
  ];

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setIsAnimated(true);
    }, 2000);

    const timer2 = setTimeout(() => {
      setIsAnimated(false);
      setImageIndex(0);
      setNextImageIndex(1);
      setShowFirst(true);
    }, 2000 + images.length * 700);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  useEffect(() => {
    if (!isAnimated) return;

    const interval = setInterval(() => {
      setShowFirst((prev) => !prev);
      setImageIndex((prev) => (prev + 1) % images.length);
      setNextImageIndex((prev) => (prev + 1) % images.length);
    }, 300);

    return () => clearInterval(interval);
  }, [isAnimated]);

  const anim = {
    initial: { width: 0 },
    open: {
      width: "20vw",
      transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] }
    },
    closed: {
      width: 0,
      transition: { duration: 0.3, ease: [0.23, 1, 0.32, 1] }
    }
  };

  return (
    <div className="flex flex-row justify-center items-center h-screen gap-1 relative overflow-hidden">
      {/* SALON */}
      <motion.h1
        className="flex text-[3vw] z-10"
        animate={{
          x: isAnimated ? "-3vw" : "0vw",
          scale: isAnimated ? 1.1 : 1
        }}
        transition={{ type: "tween", ease: "easeInOut", duration: 0.4 }}
      >
        salon
      </motion.h1>

      {/* IMAGE SLIDESHOW */}
      <motion.div
        className="h-[40vh] w-[20vw] overflow-hidden z-0 relative hidden md:block"
        variants={anim}
        initial="initial"
        animate={isAnimated ? "open" : "closed"}
      >
        <img
          src={images[imageIndex]}
          alt={`Salon Vilarnau ${imageIndex}`}
          className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-0 ${
            showFirst ? "opacity-100" : "opacity-0"
          }`}
        />
        <img
          src={images[nextImageIndex]}
          alt={`Salon Vilarnau ${nextImageIndex}`}
          className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-0 ${
            showFirst ? "opacity-0" : "opacity-100"
          }`}
        />
      </motion.div>

      {/* VILARNAU */}
      <motion.h1
        className="flex text-[3vw] z-10"
        animate={{
          x: isAnimated ? "3vw" : "0vw",
          scale: isAnimated ? 1.1 : 1
        }}
        transition={{ type: "tween", ease: "easeInOut", duration: 0.4 }}
      >
        vilarnau
      </motion.h1>
    </div>
  );
}
