'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';


const imageFilenames = [
  'img12.jpg', 'img1.jpg', 'img3.jpg', 'img4.jpg',
  'img5.jpg', 'img6.jpg', 'img9.jpg', 'img8.jpg',
  'img11.jpg', 'img10.jpg',
];

export default function Hero8() {
  const galleryRef = useRef(null);

  useEffect(() => {
    const imgs = galleryRef.current.querySelectorAll('.img:not(.final-img)');
  
    const screenWidth = window.innerWidth;
    const scaleFactor = screenWidth / 1440;
  
    const largeWidth = 350 * scaleFactor;
    const largeHeight = 500 * scaleFactor;
  
    const tl = gsap.timeline();
  
    // Paso 1: imágenes aparecen en el centro escalando
    gsap.set(imgs, {
      top: "50%",
      left: "48%",
      transform: "translate(-50%, -50%) scale(0)",
      position: 'absolute',
    });
  
    tl.to(imgs, {
      scale: 1,
      width: `${largeWidth}px`,
      height: `${largeHeight}px`,
      stagger: 0.4,
      duration: 1.8,
      ease: "power2.out",
      delay: 1,
    });
  
  }, []);
  

  return (
    <div className="gallery" ref={galleryRef}>
      {imageFilenames.map((filename, index) => (
        <div className="img" key={index}>
          <img src={`assets/${filename}`} alt={`img${index}`} />
        </div>
      ))}
    </div>
    
  );
}
