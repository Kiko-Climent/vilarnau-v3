'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function StyleSliderMobile2() {
  const sliderRef = useRef(null);
  const counterRef = useRef(null);
  const previewsRef = useRef(null);
  const sliderImagesRef = useRef(null);

  useEffect(() => {
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
        const slidePreview = previewsRef.current;
        let currentImg = 1;
        const totalSlides = 16;

        function updateCounterAndTitlePosition() {
          if (counter) {
            counter.textContent = `${currentImg} / ${totalSlides}`;
          }
        }

        function updateActiveSlidePreview() {
          prevSlides.forEach((prev) => prev.classList.remove('active'));
          prevSlides[currentImg - 1].classList.add('active');
        }

        function animateSlide(direction) {
          const currentSlide = sliderImages.querySelectorAll('.img-slider-new')[
            sliderImages.querySelectorAll('.img-slider-new').length - 1
          ];

          const slideImg = document.createElement('div');
          slideImg.classList.add(
            'img-slider-new',
            'absolute',
            'w-full',
            'h-full',
            'will-change-transform',
            'translate-z-0',
            'backface-hidden'
          );

          const slideImgElem = document.createElement('img');
          slideImgElem.src = `/stylesresized/img${currentImg}.webp`;
          slideImgElem.classList.add(
            'w-full',
            'h-full',
            'object-cover',
            'object-top',
            'will-change-transform',
            'translate-z-0',
            'backface-hidden'
          );

          gsap.set(slideImgElem, { x: direction === 'left' ? -500 : 500 });
          slideImg.appendChild(slideImgElem);
          sliderImages.appendChild(slideImg);

          gsap.to(currentSlide.querySelector('img'), {
            x: direction === 'left' ? 500 : -500,
            duration: 1.5,
            ease: 'hop',
          });

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

          cleanupSlides();
        }

        function cleanupSlides() {
          const imgElements = sliderImages.querySelectorAll('.img-slider-new');
          if (imgElements.length > totalSlides) {
            imgElements[0].remove();
          }
        }

        function handleClick(event) {
          const sliderWidth = sliderRef.current.clientWidth;
          const clickPosition = event.clientX;

          if (slidePreview.contains(event.target)) {
            const clickedPrev = event.target.closest('.preview');
            if (clickedPrev) {
              const clickedIndex = Array.from(prevSlides).indexOf(clickedPrev) + 1;
              if (clickedIndex !== currentImg) {
                if (clickedIndex < currentImg) {
                  currentImg = clickedIndex;
                  animateSlide('left');
                } else {
                  currentImg = clickedIndex;
                  animateSlide('right');
                }
                updateActiveSlidePreview();
                updateCounterAndTitlePosition();
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
          updateCounterAndTitlePosition();
        }

        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
      });
    }, sliderRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen w-screen flex flex-col font-myfont2 gap-2 px-2 justify-center">
      {/* Primera columna */}
      <div className="flex h-[70%] w-full flex-row gap-2">
        {/* Slider */}
        <div className="flex-1 flex items-center justify-center">
          <div
            className="aspect-[3/4] w-full relative overflow-hidden"
            ref={sliderRef}
          >
            <div
              className="slider-images w-full h-full relative"
              ref={sliderImagesRef}
            >
              <div className="img-slider-new absolute w-full h-full will-change-transform translate-z-0 backface-hidden">
                <img
                  src="/stylesresized/img1.webp"
                  alt="img1"
                  className="w-full h-full object-cover object-top will-change-transform translate-z-0 backface-hidden"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Paginación */}
        <div className="w-15 flex flex-col justify-end items-center">
          <p ref={counterRef} className="text-3xl text-nowrap">1 / 16</p>
        </div>
      </div>

      {/* Previews */}
      <div className="flex h-[20%] w-full items-center justify-center">
        <div
          className="grid grid-cols-8 grid-rows-2 gap-2 w-full h-full"
          ref={previewsRef}
        >
          {Array.from({ length: 16 }, (_, index) => (
            <div
              key={index + 1}
              className={`preview cursor-pointer relative ${index === 0 ? 'active' : ''}`}
            >
              <img
                src={`/stylesresized/img${index + 1}.webp`}
                alt={`img${index + 1}`}
                className="w-full h-full object-cover rounded-sm will-change-transform translate-z-0 backface-hidden"
              />
              <div
                className={`absolute inset-0 rounded-sm transition-opacity duration-300
                  ${index === 0 ? 'opacity-0' : 'bg-opacity-40'}`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Info */}
      <div className="flex h-[20%] flex-col justify-center items-start -space-y-2 tracking-wider">
        <p className="text-xl">vilarnau | styles</p>
        <p className="text-xl">T : (030) 61202363</p>
        <p className="text-xl">E : hello@vilarnau.de</p>
      </div>
    </div>
  );
}
