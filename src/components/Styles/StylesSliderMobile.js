'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import GridRevealImage from '../Tools/GridRevealAnimation';
import { useNavbar } from '../Layout/Context/NavbarProvider';
import { useOptimizedMedia } from '../../hooks/useOptimizedMedia';

export default function StylesSliderMobile({ ready }) {
  const sliderRef       = useRef(null);
  const counterRef      = useRef(null);
  const previewsRef     = useRef(null);
  const sliderImagesRef = useRef(null);
  const textRef         = useRef(null);
  const innerRef        = useRef(null);

  // ── Hook de imágenes optimizadas ─────────────────────────────────────────
  const { getImage, isLoaded } = useOptimizedMedia();

  // Ref para que animateSlide() acceda siempre a getImage actualizado
  const getImageRef = useRef(getImage);
  useEffect(() => {
    getImageRef.current = getImage;
  }, [getImage]);

  // ── Medidas del navbar ────────────────────────────────────────────────────
  const { measures } = useNavbar();
  const { aboutX } = measures;

  const [containerLeft, setContainerLeft] = useState(0);

  const updateContainerLeft = useCallback(() => {
    if (!innerRef.current) return;
    const rect = innerRef.current.getBoundingClientRect();
    setContainerLeft(rect.left);
  }, []);

  useEffect(() => {
    updateContainerLeft();
    window.addEventListener('resize', updateContainerLeft);
    return () => window.removeEventListener('resize', updateContainerLeft);
  }, [updateContainerLeft]);

  useEffect(() => {
    updateContainerLeft();
  }, [measures, updateContainerLeft]);

  const sliderWidth = aboutX > 0 && containerLeft >= 0
    ? aboutX - containerLeft
    : null;

  const widthStyle = sliderWidth ? { width: `${sliderWidth}px` } : { width: '100%' };

  // ── Animación de texto SplitText ─────────────────────────────────────────
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

  // ── Ajuste de vh para móviles ─────────────────────────────────────────────
  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    setVh();
    window.addEventListener('resize', setVh);
    return () => window.removeEventListener('resize', setVh);
  }, []);

  // ── Evita scroll mientras está el slider ──────────────────────────────────
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  // ── Lógica GSAP principal ─────────────────────────────────────────────────
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
        const counter      = counterRef.current;
        const prevSlides   = previewsRef.current.querySelectorAll('.preview');
        let currentImg     = 1;
        const totalSlides  = 16;

        prevSlides.forEach((prev) => {
          gsap.set(prev, { opacity: 0, y: 20 });
          const img = prev.querySelector('img');
          img.style.willChange         = 'transform, clip-path';
          img.style.transform          = 'translateZ(0)';
          img.style.backfaceVisibility = 'hidden';
        });

        const headerContent = textRef.current;
        gsap.set(headerContent, { opacity: 0 });
        headerContent.style.willChange         = 'transform, opacity';
        headerContent.style.transform          = 'translateZ(0)';
        headerContent.style.backfaceVisibility = 'hidden';

        function updateCounterAndTitle() {
          if (counter) counter.textContent = `${currentImg} / ${totalSlides}`;
        }

        function updateActiveSlidePreview() {
          prevSlides.forEach((prev) => prev.classList.remove('active'));
          prevSlides[currentImg - 1].classList.add('active');
        }

        function animateSlide(direction) {
          const slideImg = document.createElement('div');
          slideImg.classList.add('img-slider-new', 'absolute', 'w-full', 'h-full');

          const slideImgElem = document.createElement('img');
          // ✅ Variante mobile forzada — este componente es siempre móvil
          slideImgElem.src = getImageRef.current(`img${currentImg}`, 'mobile').src;
          slideImgElem.classList.add('w-full', 'h-full', 'object-cover', 'object-top');
          slideImgElem.style.willChange         = 'transform, clip-path';
          slideImgElem.style.transform          = 'translateZ(0)';
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
            { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', duration: 1.5, ease: 'hop' }
          );

          gsap.to(slideImgElem, { x: 0, duration: 1.5, ease: 'hop' });

          const imgElements = sliderImages.querySelectorAll('.img-slider-new');
          if (imgElements.length > totalSlides) imgElements[0].remove();
        }

        gsap.to(prevSlides, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.05,
          ease: 'power2.out',
        });

        function handleClick(event) {
          if (!sliderRef.current) return;
          if (event.target.closest('a')) return;

          const sliderW       = sliderRef.current.clientWidth;
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

          if (clickPosition < sliderW / 2 && currentImg !== 1) {
            currentImg--;
            animateSlide('left');
          } else if (clickPosition > sliderW / 2 && currentImg !== totalSlides) {
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

  // ── Espera al manifest antes de renderizar ────────────────────────────────
  if (!isLoaded) return null;

  return (
    <div
      className="w-full flex flex-col font-myfont2 gap-2"
      style={{
        height: 'calc(var(--vh, 1vh) * 100)',
        paddingTop: '40px',
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}
    >

      {/* ── Slider + contador ─────────────────────────────────────────────── */}
      <div ref={innerRef} className="flex flex-row flex-1 gap-2 items-end pl-4">

        <div
          className="aspect-[3/4] relative overflow-hidden flex-shrink-0"
          ref={sliderRef}
          style={widthStyle}
        >
          <div className="slider-images w-full h-full relative" ref={sliderImagesRef}>
            <div className="img-slider-new absolute w-full h-full">
              {/* ✅ Primera imagen — variante mobile forzada */}
              <GridRevealImage
                src={getImage('img1', 'mobile').src}
                alt="img1"
                className="w-full h-full"
                rows={5}
                cols={5}
                order="diagonal"
                start="top 85%"
                onComplete={() => animateIn(textRef.current)}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-end items-center flex-1 h-full mt-2">
          <p ref={counterRef} className="text-3xl text-nowrap">1 / 16</p>
        </div>

      </div>

      {/* ── Previews ─────────────────────────────────────────────────────── */}
      <div className="flex flex-none h-[15vh] px-4">
        <div className="grid grid-cols-8 grid-rows-2 gap-2 w-full h-full" ref={previewsRef}>
          {Array.from({ length: 16 }, (_, index) => (
            <div
              key={index + 1}
              className={`preview cursor-pointer relative overflow-hidden ${index === 0 ? 'active' : ''}`}
            >
              {/* ✅ Previews — siempre thumb (300px) */}
              <img
                src={getImage(`img${index + 1}`, 'thumb').src}
                alt={`img${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* ── Info ─────────────────────────────────────────────────────────── */}
      <div
        ref={textRef}
        className="flex flex-none h-[20vh] flex-col justify-start items-start -space-y-2 tracking-wider pl-4"
      >
        <p className="text-xl">vilarnau | styles</p>
        <a href="tel:+493061202363" className="text-xl">T : (030) 61202363</a>
        <a href="mailto:hello@vilarnau.com" className="text-xl">E : hello@vilarnau.de</a>
      </div>

    </div>
  );
}