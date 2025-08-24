"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import "swiper/css";
import "swiper/css/pagination";

const formatTitle = (id) => {
  return typeof id === "string" ? id.replace(/_/g, " ") : "";
};

const setVH = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
};

const checkIsDesktop = (setIsDesktop) => {
  setIsDesktop(window.innerWidth >= 738);
};


const StyleSlider2 = ({images, id}) => {
  
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const swiperRef = useRef(null);

  // Set --vh custom property
  useEffect(() => {
    setVH();
    window.addEventListener("resize", setVH);
    return () => window.removeEventListener("resize", setVH);
  }, []);
  
  useEffect(() => {
    checkIsDesktop(setIsDesktop);
    const handler = () => checkIsDesktop(setIsDesktop);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  

  const handleClick = (e) => {
    const clickX = e.clientX;
    const screenWidth = window.innerWidth;

    if (!swiperRef.current) return;

    if (clickX > screenWidth / 2) {
      swiperRef.current.slideNext();
    } else {
      swiperRef.current.slidePrev();
    }
  };


  if (!images || images.length === 0) return null;

  return(
    <div
      onClick={handleClick}
      className="flex flex-col justify-center items-center w-full overflow-hidden gap-0 md:gap-2 pb-2"
      style={{ 
        height: "calc(var(--vh, 1vh) * 100)",
        
       }}
    >
      
      <div className="flex w-full relative">
        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          pagination={{
            type: "fraction",
            el: ".custom-pagination",
          }}
          modules={[Pagination]}
          spaceBetween={60}
          className="w-full h-full"
        >
          {images.map((src, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full max-w-sm mx-auto aspect-[3/4]">
                <Image
                  src={typeof src === "string" ? src : src.src}
                  alt="gallery"
                  fill
                  className="object-contain"
                  sizes="100vw"
                  loading={index < 4 ? "eager" : "lazy"}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

        {/* Texto debajo */}
      <div
        className="flex flex-col items-center text-center -space-y-1 whitespace-nowrap"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="flex flex-row gap-x-1 text-lg">
          <div>{formatTitle(id)}</div>
          <div className="custom-pagination text-black" />
        </div>
      </div>
    </div>
  )
}

export default StyleSlider2;