import Pic1 from "../../../public/zoomgallery/zoom5.webp"
import Pic2 from "../../../public/zoomgallery/zoom1.webp"
import Pic3 from "../../../public/zoomgallery/zoom8.webp"
import Pic4 from "../../../public/zoomgallery/zoom2.webp"
import Pic5 from "../../../public/zoomgallery/zoom3.webp"
import Pic6 from "../../../public/zoomgallery/zoom4.webp"
import Pic7 from "../../../public/zoomgallery/zoom6.webp"

import { useNavbar } from "@/components/Layout/Context/NavbarProvider"; // ajusta el path si es necesario
import TextAnimation from "../Tools"
import { useScroll, useTransform, useMotionValueEvent, motion } from 'framer-motion';
import Image from 'next/image';
import { useRef, useEffect, useState } from 'react';
// import Lenis from 'lenis';

export default function ZoomGallery() {

  const container = useRef(null);
  const [showText, setShowText] = useState(false);
  const { measures } = useNavbar();
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end end']
    })

    // useEffect( () => {
    //   const lenis = new Lenis()
  
    //   function raf(time) {
    //     lenis.raf(time)
    //     requestAnimationFrame(raf)
    //   }
  
    //   requestAnimationFrame(raf)
    // }, [])

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
    <div ref={container} className="container-zoom px-4 md:px-0">
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
            <div className="zoom-text-overlay text-4xl md:text-8xl blur-[0.3px] tracking-wide w-full font-myfont2 hidden md:flex flex-col -space-y-10">
              <div className="flex flex-row justify-center text-5xl gap-4 pl-2 pr-6 tracking-[0.08em]">
                <p className="text-9xl">elevating</p>
                <div className="flex flex-col pt-3 -space-y-2">
                  <p className="self-end">the</p>
                  <p>craft of</p>                
                </div>
              </div>
              <div className="flex flex-row justify-center gap-4 pl-2 pr-6 text-9xl">
                <p>hairstyling</p>
                <div className="flex flex-col text-5xl pt-3 -space-y-2">
                  <p>since</p>
                  <p>2018</p>
                </div>
              </div>
            </div>
            {/* layout for mobiles */}
            <div
              className="zoom-text-overlay 
                        text-xl 
                        blur-[0.2px] 
                        tracking-wide 
                        font-myfont2 
                        flex md:hidden 
                        flex-col 
                        -space-y-2
                        items-center 
                        justify-center
                        text-center"
              style={{
                width: "100%",
                height: "100%",
              }}
            >
              {/* <div className="flex flex-col -space-y-3">
                <p>elevating</p>
                <div className="flex flex-row gap-3">
                  <p>the</p>
                  <p>craft</p>
                  <p>of</p>
                </div>
                <p>hairstyling</p>
                <div className="flex flex-row gap-3 w-full justify-end">
                  <p>since</p>
                  <p>2018</p>
                </div>
              </div> */}
              <div className="flex flex-col -space-y-2">
                <p>Elevating the craft of</p>
                <p>hairstyling since 2018</p>
              </div>
            </div>
          </TextAnimation>
        )}
      </div>
    </div>
  )
}