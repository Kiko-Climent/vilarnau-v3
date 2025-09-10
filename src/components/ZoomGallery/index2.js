import Pic1 from "../../../public/images/img18.JPG"
import Pic2 from "../../../public/images/img3.jpg"
import Pic3 from "../../../public/images/img2.jpeg"
import Pic4 from "../../../public/images/img8.jpg"
import Pic5 from "../../../public/images/img3.jpeg"
import Pic6 from "../../../public/images/img5.jpg"
import Pic7 from "../../../public/images/img6.JPG"

import TextAnimation from "../Tools"
import { useScroll, useTransform, useMotionValueEvent, motion } from 'framer-motion';
import Image from 'next/image';
import { useRef, useEffect, useState } from 'react';
import Lenis from 'lenis';

export default function ZoomGallery2() {
  const container = useRef(null);
  const [showText, setShowText] = useState(false);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end']
  });

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  // Escalado a partir del 66% del scroll
  const scale4 = useTransform(scrollYProgress, [0.66, 1], [1, 4]);
  const scale5 = useTransform(scrollYProgress, [0.66, 1], [1, 5]);
  const scale6 = useTransform(scrollYProgress, [0.66, 1], [1, 6]);
  const scale8 = useTransform(scrollYProgress, [0.66, 1], [1, 8]);
  const scale9 = useTransform(scrollYProgress, [0.66, 1], [1, 9]);

  // Opacidades calculadas fuera del map
  const opacities = [
    useTransform(scrollYProgress, [0.00, 0.15], [0, 1]),
    useTransform(scrollYProgress, [0.05, 0.20], [0, 1]),
    useTransform(scrollYProgress, [0.10, 0.25], [0, 1]),
    useTransform(scrollYProgress, [0.15, 0.30], [0, 1]),
    useTransform(scrollYProgress, [0.20, 0.35], [0, 1]),
    useTransform(scrollYProgress, [0.25, 0.40], [0, 1]),
    useTransform(scrollYProgress, [0.30, 0.45], [0, 1]),
  ];

  const pics = [
    { src: Pic1, scale: scale4 },
    { src: Pic2, scale: scale5 },
    { src: Pic3, scale: scale6 },
    { src: Pic4, scale: scale5 },
    { src: Pic5, scale: scale6 },
    { src: Pic6, scale: scale8 },
    { src: Pic7, scale: scale9 }
  ];

  useMotionValueEvent(scale4, "change", (latest) => {
    setShowText(latest >= 3.5);
  });

  return (
    <div ref={container} className="container-zoom">
      <div className="sticky-zoom">
        {pics.map(({ src, scale }, index) => (
          <motion.div
            key={index}
            style={{ scale, opacity: opacities[index] }}
            className="el-zoom"
          >
            <div className="image-container-zoom">
              <Image src={src} fill alt={`image-${index}`} />
            </div>
          </motion.div>
        ))}

        {showText && (
          <TextAnimation>
            <div className="zoom-text-overlay text-5xl font-medium blur-[0.7px] tracking-tighter">
              <p>where classics</p>
              <p>meets contemporary</p>
            </div>
          </TextAnimation>
        )}
      </div>
    </div>
  );
}
