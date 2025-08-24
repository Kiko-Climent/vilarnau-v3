'use client';

import { useEffect, useRef, useState } from 'react';

export default function StyleSlider3() {
  const totalImages = 16;
  const carouselRef = useRef(null);
  const [activeSrc, setActiveSrc] = useState(`/styles/img1.jpg`);

  const currentX = useRef(0);
  const lastScrollY = useRef(0);
  const lastActive = useRef(null);
  const leftmostItem = useRef(null);
  const animationFrame = useRef(null);

  useEffect(() => {
    const handleWheel = (e) => {
      lastScrollY.current += e.deltaY;
      const maxScroll =
        carouselRef.current.scrollWidth - window.innerWidth;
      lastScrollY.current = Math.max(
        0,
        Math.min(lastScrollY.current, maxScroll)
      );
    };

    window.addEventListener('wheel', handleWheel);

    const lerp = (start, end, t) => start * (1 - t) + end * t;

    const checkActiveItem = () => {
      const items = carouselRef.current.querySelectorAll('.carousel-item');
      for (let item of items) {
        const rect = item.getBoundingClientRect();
        if (rect.left >= 0 && rect.left < 10) {
          if (leftmostItem.current !== item) {
            if (lastActive.current) {
              lastActive.current.classList.remove('active');
            }
            item.classList.add('active');
            const src = item.querySelector('img').src;
            setActiveSrc(src);
            lastActive.current = item;
            leftmostItem.current = item;
          }
          break;
        }
      }
    };

    const animate = () => {
      currentX.current = lerp(currentX.current, lastScrollY.current, 0.075);
      if (carouselRef.current) {
        carouselRef.current.style.transform = `translateX(-${currentX.current}px)`;
        checkActiveItem();
      }
      animationFrame.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrame.current);
      window.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return (
    <>
      <div className="carousel-wrapper">
        <div className="carousel-items" ref={carouselRef}>
          {Array.from({ length: totalImages }).map((_, i) => (
            <div className="carousel-item" key={i}>
              <img src={`/styles/img${i + 1}.jpg`} alt={`img${i + 1}`} />
            </div>
          ))}
        </div>
      </div>

      <div className="active-item">
        <img src={activeSrc} alt="Active" />
      </div>

      <style jsx>{`
        .carousel-wrapper {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100px;
          overflow: hidden;
        }

        .carousel-items {
          display: flex;
          gap: 5px;
          will-change: transform;
        }

        .carousel-item {
          width: 60px;
          height: 80px;
          flex-shrink: 0;
        }

        .carousel-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .active-item {
          position: fixed;
          left: 30px;
          bottom: 36px;
          width: 450px;
          height: 550px;
        }

        .active-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .carousel-item.active {
          outline: 2px solid white;
        }
      `}</style>
    </>
  );
}
