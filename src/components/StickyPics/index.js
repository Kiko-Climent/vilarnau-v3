'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import Image from 'next/image';
import TextAnimation3 from '../Tools/AnimatedText3';

import Pic1 from "../../../public/images/img18.JPG";
import Pic2 from "../../../public/images/img3.jpg";
import Pic3 from "../../../public/images/img2.jpeg";
import Pic4 from "../../../public/images/img8.jpg";

export default function StickyPics() {
  const container = useRef(null);
  const isInView = useInView(container, { margin: '-50% 0px', once: false });

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end']
  });

  const targetXs = ['50px', '200px', '300px', '500px'];
  const targetYs = ['12vh', '5vh', '25vh', '15vh'];

  const pics = [Pic1, Pic2, Pic3, Pic4];

  // ✅ Creamos los useTransform individualmente fuera de cualquier callback
  const translateY1 = useTransform(scrollYProgress, [0, 0.25], ['150vh', '0vh']);
  const translateY2 = useTransform(scrollYProgress, [0.25, 0.5], ['150vh', '0vh']);
  const translateY3 = useTransform(scrollYProgress, [0.5, 0.75], ['150vh', '0vh']);
  const translateY4 = useTransform(scrollYProgress, [0.75, 1], ['150vh', '0vh']);

  const translateYs = [translateY1, translateY2, translateY3, translateY4];

  return (
    <div ref={container} className="relative h-[300vh] overflow-visible">
      {isInView && (
        <div className='fixed top-1/2 right-10 transform -translate-y-1/2 z-50'>
          <TextAnimation3 delay={0}>
            <p className='text-black text-right max-w-[500px] text-5xl leading-[1.2]'>
              because you are more authentic the more you resemble what you&apos;ve dreamed you are
            </p>
          </TextAnimation3>
        </div>
      )}

      <div className="sticky top-0 h-screen w-full">
        {pics.map((src, index) => (
          <motion.div
            key={index}
            style={{
              top: targetYs[index],
              left: targetXs[index],
              y: translateYs[index], // usamos el array ya creado correctamente
            }}
            transition={{
              ease: "easeOut",
              duration: 1.2,
            }}
            className="absolute w-[350px] h-[500px]"
          >
            <Image
              src={src}
              alt={`image-${index}`}
              className="object-cover"
              fill
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
