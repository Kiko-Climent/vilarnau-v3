import Pic1 from "../../../public/zoomgallery/zoom5.webp"
import Pic2 from "../../../public/zoomgallery/zoom1.webp"
import Pic3 from "../../../public/zoomgallery/zoom7.webp"
import Pic4 from "../../../public/zoomgallery/zoom2.webp"
import Pic5 from "../../../public/zoomgallery/zoom3.webp"
import Pic6 from "../../../public/zoomgallery/zoom4.webp"
import Pic7 from "../../../public/zoomgallery/zoom6.webp"

import TextAnimation from "../Tools"
import { useScroll, useTransform, useMotionValueEvent, motion } from 'framer-motion';
import Image from 'next/image';
import { useRef, useEffect, useState } from 'react';
import Lenis from 'lenis';

export default function ZoomGallery() {

  const container = useRef(null);
  const [showText, setShowText] = useState(false);

    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end end']
    })

    useEffect( () => {
      const lenis = new Lenis()
  
      function raf(time) {
        lenis.raf(time)
        requestAnimationFrame(raf)
      }
  
      requestAnimationFrame(raf)
    }, [])

    const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
    const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
    const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
    const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
    const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);

    const pics = [
      {
        src: Pic1,
        scale: scale4
      },
      {
        src: Pic2,
        scale: scale5
      },
      {
        src: Pic3,
        scale: scale6
      },
      {
        src: Pic4,
        scale: scale5
      },
      {
        src: Pic5,
        scale: scale6
      },
      {
        src: Pic6,
        scale: scale8
      },
      {
        src: Pic7,
        scale: scale9
      }
    ]
    useMotionValueEvent(scale4, "change", (latest) => {
      setShowText(latest >= 3.5); // o cualquier valor que te funcione mejor
    });

  return(
    <div ref={container} className="container-zoom">
      <div className="sticky-zoom">
        {
          pics.map(({ src, scale }, index) => {
            return (
              <motion.div
                key={index} // <- aquí va el key
                style={{ scale }}
                className="el-zoom"
              >
                <div className="image-container-zoom">
                  <Image
                    src={src}
                    priority={index === 0}
                    fill
                    alt={`image-${index}`}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 100vw"
                  />
                </div>
              </motion.div>
            )
          })
          
        }
        {showText && (
          <TextAnimation>
            <div className="zoom-text-overlay text-4xl md:text-8xl blur-[0.3px] tracking-wide w-full font-myfont2">
              {/* <p>we believe in creating a look that while keeping an insight on actual trends, better highlights your features and lifestyle</p> */}
              <p>elevating the craft of</p>
              <p>hairstyling since 2019</p>
              {/* <p>where classics</p>
              <p>meets contemporary</p> */}
            </div>
          </TextAnimation>
        )}
      </div>
    </div>
  )
}