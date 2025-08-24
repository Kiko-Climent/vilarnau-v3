'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const colorArray = [
  '#B69671',
  '#6D7783',
  '#B9A288',
  '#B5B8AC',
  '#A2B0B1',
  '#5F5F5F',
  '#7E98B1',
  '#857F71',
  '#A6A6A6',
  '#B5B4AB',
  '#503D31',
  '#B1A591',
  '#616161',
  '#C29651',
  '#5E6471',
  '#B0A89D',
];

export default function StyleSlider5() {
  const previewContainerRef = useRef(null);
  const [bgColor, setBgColor] = useState('#b2b4aa');

  const handleImageClick = (imgNumber) => {
    const newColor = colorArray[imgNumber - 1];
    setBgColor(newColor);

    const newImgSrc = `/styles/img${imgNumber}.jpg`;

    const container = previewContainerRef.current;
    const lastImg = container.querySelector('img:last-child');

    if (lastImg) {
      gsap.to(lastImg, { duration: 1, scale: 1.5, left: '-50%' });
    }

    const newImg = document.createElement('img');
    newImg.src = newImgSrc;
    newImg.style.position = 'absolute';
    newImg.style.right = '-100%';

    container.appendChild(newImg);

    gsap.to(newImg, { duration: 1, right: '0%' });
  };

  return (
    <div className="gallery-page" style={{ backgroundColor: bgColor }}>
      <nav>
        <div className="nav">
          <div className="col copy">
            <p>Gallery</p>
          </div>
          <div className="col">
            <p>Editorial New</p>
          </div>
          <div className="col">
            <p className="logo">Your Logo</p>
          </div>
        </div>
      </nav>

      <div className="container">
        <div className="gallery">
          {[0, 1].map((rowIdx) => (
            <div className="row" key={rowIdx}>
              {[0, 1, 2, 3].map((colIdx) => {
                const imgNumber = rowIdx * 4 + colIdx + 1;
                return (
                  <div className="item" key={imgNumber}>
                    <div
                      className="img"
                      onClick={() => handleImageClick(imgNumber)}
                    >
                      <img
                        src={`/styles/img${imgNumber}.jpg`}
                        alt={`img${imgNumber}`}
                      />
                    </div>
                    <p>Image {imgNumber}</p>
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        <div className="preview">
          <div className="preview-container" ref={previewContainerRef}></div>
        </div>
      </div>

      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .gallery-page {
          width: 100%;
          min-height: 100vh;
          transition: background-color 1s;
        }

        nav {
          position: absolute;
          top: 0;
          width: 100%;
          display: flex;
          padding: 2em;
          gap: 1em;
        }

        .nav {
          display: flex;
          gap: 1em;
          width: 100%;
        }

        .col {
          display: flex;
          gap: 1em;
        }

        .copy {
          flex: 1;
        }

        .col:nth-child(1) {
          flex: 2;
        }

        .col:nth-child(2) {
          flex: 5;
        }

        .col:nth-child(3) {
          flex: 3;
        }

        p {
          font-size: 14px;
          font-family: 'Arial', sans-serif;
        }

        p.logo {
          width: 100%;
          text-align: right;
        }

        .container {
          position: relative;
          top: 175px;
          width: 100%;
          min-height: 80vh;
          display: flex;
          flex-wrap: wrap;
        }

        .gallery {
          flex: 2;
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .row {
          flex: 1;
          display: flex;
          width: 100%;
        }

        .item {
          flex: 1;
          padding: 1em;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1em;
        }

        .img {
          width: 80%;
          height: 80px;
          cursor: pointer;
        }

        .img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .preview {
          flex: 4;
          display: flex;
          justify-content: flex-end;
          align-items: flex-end;
          padding: 2em;
        }

        .preview-container {
          position: relative;
          width: 400px;
          height: 600px;
          background: #e3e3e3;
          overflow: hidden;
        }

        .preview-container img {
          position: absolute;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        @media (max-width: 900px) {
          .col:nth-child(1),
          .col:nth-child(2) {
            display: none;
          }

          .container {
            flex-direction: column;
            gap: 5em;
          }

          .preview-container {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
