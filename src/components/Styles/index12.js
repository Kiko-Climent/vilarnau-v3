'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import GridRevealImage from '../Tools/GridRevealAnimation';

export default function StyleSliderMobile3({ ready }) {
  const sliderRef = useRef(null);
  const counterRef = useRef(null);
  const previewsRef = useRef(null);
  const sliderImagesRef = useRef(null);
  const textRef = useRef(null);

  // Animación del texto tipo SplitText
  const animateIn = async (target, onComplete) => {
    const { default: SplitText } = await import('gsap/SplitText');
    gsap.registerPlugin(SplitText);

    gsap.set(target, { opacity: 1 });

    const split = new SplitText(target, { type: 'chars' });

    gsap.fromTo(
      split.chars,
      { yPercent: 'random([-100,100])', opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        stagger: { amount: 0.4, from: 'random' },
        duration: 1,
        ease: 'power3.out',
        onComplete: () => {
          split.revert();
          if (onComplete) onComplete();
        },
      }
    );
  };

  // Ajuste de vh para móviles
  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    setVh();
    window.addEventListener('resize', setVh);
    return () => window.removeEventListener('resize', setVh);
  }, []);

  // Evita scroll mientras está el slider
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  useEffect(() => {
    if (!ready) return;

    let ctx = gsap.context(() => {
      import('gsap/CustomEase').then(({ CustomEase }) => {
        gsap.registerPlugin(CustomEase);
        CustomEase.create(
          'hop',
          'M0,0 C0.071,0.505 0.192,0.726 0.318,0.852 0.45,0.984 0.504,1 1,1'
        );

        const sliderImages = sliderImagesRef.current;
        const counter = counterRef.current;
        const prevSlides = previewsRef.current.querySelectorAll('.preview');
        let currentImg = 1;
        const totalSlides = 16;

        // Inicializamos previews con opacity 0
        prevSlides.forEach((prev) => {
          gsap.set(prev, { opacity: 0, y: 20 });
          const img = prev.querySelector('img');
          img.style.willChange = 'transform, clip-path';
          img.style.transform = 'translateZ(0)';
          img.style.backfaceVisibility = 'hidden';
        });

        // Inicializamos texto
        const headerContent = textRef.current;
        gsap.set(headerContent, { opacity: 0 });
        headerContent.style.willChange = 'transform, opacity';
        headerContent.style.transform = 'translateZ(0)';
        headerContent.style.backfaceVisibility = 'hidden';

        function updateCounterAndTitle() {
          if (counter) counter.textContent = `${currentImg} / ${totalSlides}`;
        }

        function updateActiveSlidePreview() {
          prevSlides.forEach((prev) => prev.classList.remove('active'));
          prevSlides[currentImg - 1].classList.add('active');
        }

        function animateSlide(direction) {
          const currentSlide =
            sliderImages.querySelectorAll('.img-slider-new')[
              sliderImages.querySelectorAll('.img-slider-new').length - 1
            ];

          const slideImg = document.createElement('div');
          slideImg.classList.add('img-slider-new', 'absolute', 'w-full', 'h-full');

          const slideImgElem = document.createElement('img');
          slideImgElem.src = `/stylesresized/img${currentImg}.webp`;
          slideImgElem.classList.add('w-full', 'h-full', 'object-cover', 'object-top');

          // GPU hints solo para activo y siguiente
          slideImgElem.style.willChange = 'transform, clip-path';
          slideImgElem.style.transform = 'translateZ(0)';
          slideImgElem.style.backfaceVisibility = 'hidden';

          gsap.set(slideImgElem, { x: direction === 'left' ? -500 : 500 });

          slideImg.appendChild(slideImgElem);
          sliderImages.appendChild(slideImg);

          gsap.fromTo(
            slideImg,
            {
              clipPath:
                direction === 'left'
                  ? 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)'
                  : 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)',
            },
            {
              clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
              duration: 1.5,
              ease: 'hop',
            }
          );

          gsap.to(slideImgElem, {
            x: 0,
            duration: 1.5,
            ease: 'hop',
          });

          // Limitar slides en DOM
          const imgElements = sliderImages.querySelectorAll('.img-slider-new');
          if (imgElements.length > totalSlides) imgElements[0].remove();
        }

        // Animación inicial de previews
        gsap.to(prevSlides, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.05,
          ease: 'power2.out',
        });

        function handleClick(event) {
          if (!sliderRef.current) return;
          const sliderWidth = sliderRef.current.clientWidth;
          const clickPosition = event.clientX;

          if (previewsRef.current.contains(event.target)) {
            const clickedPrev = event.target.closest('.preview');
            if (clickedPrev) {
              const clickedIndex = Array.from(prevSlides).indexOf(clickedPrev) + 1;
              if (clickedIndex !== currentImg) {
                const direction = clickedIndex > currentImg ? 'right' : 'left';
                currentImg = clickedIndex;
                animateSlide(direction);
                updateActiveSlidePreview();
                updateCounterAndTitle();
              }
            }
            return;
          }

          if (clickPosition < sliderWidth / 2 && currentImg !== 1) {
            currentImg--;
            animateSlide('left');
          } else if (clickPosition > sliderWidth / 2 && currentImg !== totalSlides) {
            currentImg++;
            animateSlide('right');
          }

          updateActiveSlidePreview();
          updateCounterAndTitle();
        }

        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
      });
    }, sliderRef);

    return () => ctx.revert();
  }, [ready]);

  return (
    <div
      className="w-full flex flex-col font-myfont2 px-2 gap-2"
      style={{
        height: 'calc(var(--vh, 1vh) * 100)',
        paddingTop: '40px',
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}
    >
      {/* Slider + contador */}
      <div className="flex flex-row flex-1 gap-2">
        <div className="flex-1 flex items-end justify-center">
          <div className="aspect-[3/4] w-full relative overflow-hidden" ref={sliderRef}>
            <div className="slider-images w-full h-full relative" ref={sliderImagesRef}>
              <div className="img-slider-new absolute w-full h-full">
                <GridRevealImage
                  src="/styles/img1.webp"
                  alt="img1"
                  className="w-full h-full"
                  rows={5}
                  cols={5}
                  order="diagonal"
                  start="top 85%"
                  onComplete={() => {
                    animateIn(textRef.current);
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Paginación */}
        <div className="w-15 flex flex-col justify-end items-center h-full mt-2">
          <p ref={counterRef} className="text-3xl text-nowrap">
            1 / 16
          </p>
        </div>
      </div>

      {/* Previews */}
      <div className="flex flex-none h-[calc(15vh)] w-full items-center justify-center">
        <div className="grid grid-cols-8 grid-rows-2 gap-2 w-full h-full" ref={previewsRef}>
          {Array.from({ length: 16 }, (_, index) => (
            <div
              key={index + 1}
              className={`preview cursor-pointer relative overflow-hidden ${index === 0 ? 'active' : ''}`}
            >
              <img
                src={`/stylesresized/img${index + 1}.webp`}
                alt={`img${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Info */}
      <div
        ref={textRef}
        className="flex flex-none h-[calc(20vh)] flex-col justify-start items-start -space-y-2 tracking-wider"
      >
        <p className="text-xl">vilarnau | styles</p>
        <p className="text-xl">T : (030) 61202363</p>
        <p className="text-xl">E : hello@vilarnau.de</p>
      </div>
    </div>
  );
}
