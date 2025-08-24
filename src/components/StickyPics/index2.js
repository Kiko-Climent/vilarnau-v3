import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

import Pic1 from "../../../public/images/img18.JPG"
import Pic2 from "../../../public/images/img3.jpg"
import Pic3 from "../../../public/images/img2.jpeg"
import Pic4 from "../../../public/images/img8.jpg"

export default function StickyPics2 () {

  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end']
  });

  const targetXs = ['50px', '200px', '300px', '500px'];
  const targetYs = ['12vh', '5vh', '25vh', '15vh'];

  const pics = [Pic1, Pic2, Pic3, Pic4];

  return (
    <div
      ref={container}
      className="relative h-[200vh] overflow-visible"
    >
      <div className="sticky top-0 h-screen w-full">
        {pics.map((src, index) => {
          const start = index * 0.1;
          const end = start + 0.3;

          // Animamos la escala en lugar de opacidad
          const scale = useTransform(scrollYProgress, [start, end], [0, 1]);

          return (
            <motion.div
              key={index}
              style={{
                top: targetYs[index],
                left: targetXs[index],
                scale,
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
          );
        })}
      </div>

      <div className='fixed top-1/2 right-10 transform -translate-y-1/2 z-50'>
        <p className='text-black text-right max-w-[500px] text-5xl'>
          because you are more authentic the more you resemble what you've dreamed you are
        </p>
      </div>
    </div>
  );
}
