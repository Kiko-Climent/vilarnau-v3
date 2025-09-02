'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function StyleSlider8() {
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
          const currentSlide =
            sliderImages.querySelectorAll('.img-slider-new')[
              sliderImages.querySelectorAll('.img-slider-new').length - 1
            ];

          const slideImg = document.createElement('div');
          slideImg.classList.add('img-slider-new');

          const slideImgElem = document.createElement('img');
          slideImgElem.src = `/styles/img${currentImg}.jpg`;
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
    <div className='container-styles-2'>
      <div className="slider" ref={sliderRef}>
        <div className="slider-images" ref={sliderImagesRef}>
          <div className="img-slider-new">
            <img src="/styles/img1.jpg" alt="img1" />
          </div>
        </div>
      </div>

      <div className='slider-content'>
        <div className='contact-content'>  
          <div className='header-content'>
            <p>salon vilarnau | styles</p>
            <p>(030)5768910836</p>
            <p>hello@vilarnau.de</p>
          </div>
          <div className="slider-counter font-myfont2">
            <p ref={counterRef}>1 / 6</p>
          </div>
        </div>

        <div className="slider-preview" ref={previewsRef}>
          <div className="preview active">
            <img src="/styles/img1.jpg" alt="img1" />
          </div>
          <div className="preview">
            <img src="/styles/img2.jpg" alt="img2" />
          </div>
          <div className="preview">
            <img src="/styles/img3.jpg" alt="img3" />
          </div>
          <div className="preview">
            <img src="/styles/img4.jpg" alt="img4" />
          </div>
          <div className="preview">
            <img src="/styles/img5.jpg" alt="img5" />
          </div>
          <div className="preview">
            <img src="/styles/img6.jpg" alt="img5" />
          </div>
          <div className="preview">
            <img src="/styles/img7.jpg" alt="img5" />
          </div>
          <div className="preview">
            <img src="/styles/img8.jpg" alt="img5" />
          </div>
          <div className="preview">
            <img src="/styles/img9.jpg" alt="img5" />
          </div>
          <div className="preview">
            <img src="/styles/img10.jpg" alt="img5" />
          </div>
          <div className="preview">
            <img src="/styles/img11.jpg" alt="img5" />
          </div>
          <div className="preview">
            <img src="/styles/img12.jpg" alt="img5" />
          </div>
          <div className="preview">
            <img src="/styles/img13.jpg" alt="img5" />
          </div>
          <div className="preview">
            <img src="/styles/img14.jpg" alt="img5" />
          </div>
          <div className="preview">
            <img src="/styles/img15.jpg" alt="img5" />
          </div>
          <div className="preview">
            <img src="/styles/img16.jpg" alt="img5" />
          </div>
        </div>
      </div>

    </div>
  );
}
