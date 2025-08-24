'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const imageFilenames = [
  'img10.jpg', 'img1.jpg', 'img3.jpg', 'img4.jpg',
  'img5.jpg', 'img6.jpg', 'img9.jpg', 'img8.jpg',
  'img11.jpg', 'img12.jpg',
];

const animateIn = async (target, onComplete) => {
  const module = await import('gsap/SplitText');
  const SplitText = module.default;
  gsap.registerPlugin(SplitText);

  gsap.set(target, { opacity: 1 });
  const split = new SplitText(target, { type: 'chars' });

  gsap.fromTo(
    split.chars,
    { yPercent: 'random([-100, 100])', opacity: 0, filter: 'blur(10px)' },
    {
      yPercent: 0,
      opacity: 1,
      stagger: { amount: 0.4, from: 'random' },
      duration: 1,
      ease: 'power3.out',
      onComplete,
      filter: 'blur(0px)',
    }
  );
};

const animateOut = async (target, onComplete) => {
  const chars = target.querySelectorAll('div, span');
  gsap.to(chars, {
    yPercent: 'random([100, -100])',
    opacity: 0,
    stagger: { amount: 0.3, from: 'random' },
    duration: 0.5,
    ease: 'power3.in',
    onComplete,
    filter: 'blur(10px)',
  });
};


export default function Hero11({}) {
  const galleryRef = useRef(null);
  const text1Ref = useRef(null); // salon vilarnau
  const text2Ref = useRef(null); // manteufelstr.55
  const text3Ref = useRef(null); // info@vilarnau.de

  useEffect(() => {
    const imgs = galleryRef.current.querySelectorAll('.img:not(.final-img)');
    const finalImg = galleryRef.current.querySelector('.final-img');
    const blackMask = galleryRef.current.querySelector('.black-mask');

    const screenWidth = window.innerWidth;
    const scaleFactor = screenWidth / 1440;

    const largeWidth = 350 * scaleFactor;
    const largeHeight = 500 * scaleFactor;

    const finalWidth = 850 * scaleFactor;
    const finalHeight = 600 * scaleFactor;

    const tl = gsap.timeline();

    // Setup inicial
    gsap.set(imgs, {
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%) scale(0)',
      position: 'absolute',
      opacity: 1,
    });

    gsap.set(blackMask, {
      width: finalWidth,
      height: finalHeight,
      top: '50%',
      left: '50%',
      xPercent: -50,
      yPercent: -50,
      opacity: 1,
      position: 'absolute',
      clipPath: 'inset(0% 0% 0% 100%)',
    });

    gsap.set(finalImg, {
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%) scale(1)',
      position: 'absolute',
      opacity: 0, // ¡YA visible!
      width: `${finalWidth}px`,
      height: `${finalHeight}px`,
    });

    gsap.set([text1Ref.current, text2Ref.current, text3Ref.current], {
      opacity: 0,
    });

    // SECUENCIA DE ANIMACIÓN

    // 1. Aparece "salon vilarnau"
    tl.add(() => {
      animateIn(text1Ref.current);
    });

    // 2. Desaparece "salon vilarnau"
    tl.add(() => {
      animateOut(text1Ref.current);
    }, '+=2');

    // 3. Aparece "manteufelstr.55"
    tl.add(() => {
      animateIn(text2Ref.current);
    }, '+=0.2');

    // 4. Aparecen imágenes con "manteufelstr.55" aún visible
    tl.to(imgs, {
      scale: 1,
      width: `${largeWidth}px`,
      height: `${largeHeight}px`,
      stagger: 0.4,
      duration: 1.8,
      ease: 'power2.out',
      // delay: 0.6,
    }, '+=1');

    const imgsExceptLast = Array.from(imgs).slice(0, -1);

    // 5. Ocultamos todas menos la última
    tl.to(imgsExceptLast, {
      opacity: 0,
      duration: 1.2,
      ease: 'power1.inOut',
      delay: 0.2,
    });


    // Animación: máscara entra de izquierda a derecha cubriendo la pantalla
    tl.to(blackMask, {
      clipPath: 'inset(0% 0% 0% 0%)',
      opacity: 1,
      duration: 0.8,
      ease: 'power2.inOut',
    }, '+=0.2');

    // 6. Desaparece "manteufelstr.55" y aparece imagen final
    tl.add(() => {
      animateOut(text2Ref.current);
    });

    // Cuando máscara termina de entrar, mostramos la imagen detrás
    tl.to(finalImg, {
      opacity: 1,
      scale: 1,
      width: `${finalWidth}px`,
      height: `${finalHeight}px`,
    });

    // Animamos la máscara para que revele la imagen de izquierda a derecha
    tl.to(blackMask, {
      clipPath: 'inset(0% 100% 0% 0%)',
      duration: 1,
      ease: 'power2.inOut',
    }, '+=0.2');

    tl.to(imgs[imgs.length - 1], {
      opacity: 0,
      duration: 0.6,
      ease: 'power1.inOut',
    }, '-=1');

    // 7. Aparece "info@vilarnau.de"
    tl.add(() => {
      text3Ref.current.style.mixBlendMode = 'normal';
      animateIn(text3Ref.current);
    }, '+=0.2');

  }, []);

  return (
    <div className="tracking-tighter gallery relative w-full h-screen overflow-hidden bg-white" ref={galleryRef}>
      {imageFilenames.map((filename, index) => (
        <div className="img opacity-0 scale-0 z-50" key={index}>
          <img src={`assets/${filename}`} alt={`img${index}`} />
        </div>
      ))}

      {/* Textos animados en el centro */}
      <p
        ref={text1Ref}
        className="absolute text-4xl md:text-5xl blur-[0.5px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white mix-blend-difference font-medium z-50 opacity-0"
      >
        salon vilarnau
      </p>

      <p
        ref={text2Ref}
        className="absolute text-4xl md:text-5xl blur-[0.5px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white mix-blend-difference z-50 opacity-0"
      >
        manteufelstr.55
      </p>

      {/* Imagen final más grande */}
      <div className="img final-img opacity-0 ">
      <div className="black-mask absolute bg-white z-40" style={{ opacity: 0 }} />
        <img src="images/img2.jpg" alt="Final large image" />
        <div 
        ref={text3Ref}
        className="text-white justify-between inset-0 flex flex-col absolute left-2 md:right-2 items-start font-medium blur-[0.5px] tracking-tight">
        <h2 className="flex text-5xl">salon vilarnau</h2>
          <div className='flex flex-col -space-y-2'>
            <h2 className="text-5xl">manteufelstr.55</h2>
            <h2 className="text-5xl">10999 · kreuzberg</h2>
          </div>
          <div className='flex flex-col -space-y-2'>
            <h2 className='text-base'>info</h2>
            <h2 className='text-5xl'>(030) 61202363</h2>
          </div>
          <div className='flex flex-col -space-y-2'>
            <h2 className='text-base'>inquires</h2>
            <h2 className='flex text-5xl'>hello@vilarnau.com</h2>
          </div>
          <div className='flex flex-col -space-y-2 text-5xl'>
          <h2 className='text-base'>opening times</h2>
            <p>tue — fri from 12 to 20</p>
            <p>saturdays from 13 to 19</p>
            <p>sun — mon closed</p>
          </div>
        </div>
      </div>
    </div>
  );
}
