'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function StyleSlider11() {
  const sliderRef = useRef(null);
  const counterRef = useRef(null);
  const previewsRef = useRef(null);
  const sliderImagesRef = useRef(null);

  // 🔹 Precarga de imágenes al montar
  useEffect(() => {
    const imageList = Array.from({ length: 16 }, (_, i) => `/styles/img${i + 1}.jpg`);
    imageList.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.loading = 'eager';
      img.decoding = 'async';
    });
  }, []);

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
          const currentSlide =
            sliderImages.querySelectorAll('.img-slider-new')[
              sliderImages.querySelectorAll('.img-slider-new').length - 1
            ];

          const slideImg = document.createElement('div');
          slideImg.classList.add('img-slider-new');

          const slideImgElem = document.createElement('img');
          slideImgElem.src = `/styles/img${currentImg}.jpg`;
          slideImgElem.loading = 'eager';
          slideImgElem.decoding = 'async';
          gsap.set(slideImgElem, { x: direction === 'left' ? -500 : 500 });

          slideImg.appendChild(slideImgElem);
          sliderImages.appendChild(slideImg);

          gsap.to(currentSlide.querySelector('img-slider-new'), {
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
    <div className='container-styles-2 font-myfont2 text-xl tracking-wider'>
      <div className="slider" ref={sliderRef}>
        <div className="slider-images" ref={sliderImagesRef}>
          <div className="img-slider-new">
            <img src="/styles/img1.jpg" alt="img1" loading="eager" decoding="async" />
          </div>
        </div>
      </div>
      <div className='slider-content'>
        <div className='contact-content'>  
          <div className='header-content leading-none'>
            <p>salon vilarnau | styles</p>
            <p>T : (030) 61202363</p>
            <p>E : hello@vilarnau.de</p>
          </div>
          <div className="slider-counter">
            <p ref={counterRef}>1 / 16</p>
          </div>
        </div>

        <div className="slider-preview" ref={previewsRef}>
          {Array.from({ length: 16 }, (_, i) => (
            <div className={`preview ${i === 0 ? 'active' : ''}`} key={i}>
              <img
                src={`/styles/img${i + 1}.jpg`}
                alt={`img${i + 1}`}
                loading="eager"
                decoding="async"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
