'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import GridRevealImage from '../Tools/GridRevealAnimation';
import usePreloadImage from "../Tools/usePreloadImage";
import { useOptimizedMedia } from "../../hooks/useOptimizedMedia";

export default function StylesSliderDesktop({ ready }) {
  const sliderRef = useRef(null);
  const counterRef = useRef(null);
  const previewsRef = useRef(null);
  const sliderImagesRef = useRef(null);
  const textRef = useRef(null);

  // ── Hook de imágenes optimizadas ─────────────────────────────────────────
  const { getImage, isLoaded } = useOptimizedMedia();

  // Ref para que animateSlide() (dentro del useEffect GSAP) acceda
  // siempre a la versión actualizada de getImage sin stale closure
  const getImageRef = useRef(getImage);
  useEffect(() => {
    getImageRef.current = getImage;
  }, [getImage]);

  // ── Primera imagen: src optimizado según dispositivo ─────────────────────
  const firstSlide = getImage("img1", "auto");

  const [firstSlideSrc, FirstSlidePreload] = usePreloadImage(
    firstSlide.src,
    { width: 1200, height: 1600, priority: true }
  );

  // ── Animación de texto SplitText ─────────────────────────────────────────
  const animateIn = async (target, onComplete) => {
    const { default: SplitText } = await import("gsap/SplitText");
    gsap.registerPlugin(SplitText);

    gsap.set(target, { opacity: 1 });

    const split = new SplitText(target, { type: "chars" });

    gsap.fromTo(
      split.chars,
      { yPercent: "random([-100,100])", opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        stagger: { amount: 0.4, from: "random" },
        duration: 1,
        ease: "power3.out",
        onComplete: () => {
          split.revert();
          if (onComplete) onComplete();
        }
      }
    );
  };

  // ── Lógica GSAP principal ─────────────────────────────────────────────────
  useEffect(() => {
    if (!ready) return;

    let ctx = gsap.context(() => {
      import('gsap/CustomEase').then(({ CustomEase }) => {
        gsap.registerPlugin(CustomEase);
        CustomEase.create('hop', 'M0,0 C0.071,0.505 0.192,0.726 0.318,0.852 0.45,0.984 0.504,1 1,1');

        const sliderImages = sliderImagesRef.current;
        const counter = counterRef.current;
        const prevSlides = previewsRef.current.querySelectorAll('.preview');

        let currentImg = 1;
        const totalSlides = 16;

        prevSlides.forEach(prev => {
          const img = prev.querySelector('img');
          gsap.set(prev, { opacity: 0 });
          img.style.willChange = 'transform, clip-path';
          img.style.transform = 'translateZ(0)';
          img.style.backfaceVisibility = 'hidden';
        });

        const headerContent = textRef.current.querySelector('.header-content');
        gsap.set(headerContent, { opacity: 0 });
        headerContent.style.willChange = 'transform, opacity';
        headerContent.style.transform = 'translateZ(0)';
        headerContent.style.backfaceVisibility = 'hidden';

        function updateCounterAndTitlePosition() {
          if (counter) counter.textContent = `${currentImg} / ${totalSlides}`;
        }

        function updateActiveSlidePreview() {
          prevSlides.forEach((prev) => prev.classList.remove('active'));
          prevSlides[currentImg - 1].classList.add('active');
        }

        function animateSlide(direction) {
          const slideImg = document.createElement('div');
          slideImg.classList.add('img-slider-new');

          const slideImgElem = document.createElement('img');
          // ✅ Usa getImageRef para evitar stale closure — variante auto (desktop/mobile según dispositivo)
          slideImgElem.src = getImageRef.current(`img${currentImg}`, "auto").src;

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

          const imgElements = sliderImages.querySelectorAll('.img-slider-new');
          if (imgElements.length > totalSlides) imgElements[0].remove();
        }

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

        requestAnimationFrame(() => {
          updateActiveSlidePreview();
          updateCounterAndTitlePosition();
        });

        return () => document.removeEventListener('click', handleClick);
      });
    }, sliderRef);

    return () => ctx.revert();
  }, [ready]);

  // ── Espera a que el manifest esté listo antes de renderizar ──────────────
  if (!isLoaded) return null;

  return (
    <div className='container-styles-2 font-myfont2 text-xl tracking-wider'>

      {/* Preload primera imagen */}
      {FirstSlidePreload}

      <div className="slider" ref={sliderRef}>
        <div className="slider-images" ref={sliderImagesRef}>
          <div className="img-slider-new">
            {firstSlideSrc && (
              <GridRevealImage
                src={firstSlideSrc}
                alt="img1"
                objectPosition="top"
                className="w-full h-full"
                rows={5}
                cols={5}
                order="diagonal"
                start="top 85%"
                onComplete={() => {
                  animateIn(textRef.current.querySelector('.header-content'), () => {
                    const prevSlides = previewsRef.current.querySelectorAll('.preview');
                    gsap.to(prevSlides, {
                      opacity: 1,
                      y: 0,
                      duration: 0.6,
                      stagger: 0.05,
                      ease: 'power2.out'
                    });
                  });
                }}
              />
            )}
          </div>
        </div>
      </div>

      <div className='slider-content'>
        <div className='contact-content' ref={textRef}>
          <div className='header-content leading-none opacity-0'>
            <p>salon vilarnau | styles</p>
            <a href='tel:+493061202363'>T : (030) 61202363</a>
            <a href='mailto:hello@vilarnau.com'>E : hello@vilarnau.de</a>
          </div>

          <div className="slider-counter">
            <p ref={counterRef}>1 / 16</p>
          </div>
        </div>

        {/* ✅ Previews — siempre variante thumb (300px) */}
        <div className="slider-preview" ref={previewsRef}>
          {Array.from({ length: 16 }, (_, i) => (
            <div key={i} className={`preview ${i === 0 ? 'active' : ''}`}>
              <img
                src={getImage(`img${i + 1}`, "thumb").src}
                alt={`img${i + 1}`}
                style={{
                  willChange: 'transform, clip-path',
                  transform: 'translateZ(0)',
                  backfaceVisibility: 'hidden'
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}