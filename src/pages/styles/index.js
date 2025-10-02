"use client";
import { useEffect, useState } from "react";
import StylesWrapper from "@/components/StylesWrapper";
import Head from "next/head";

export default function Styles() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const previews = Array.from({ length: 16 }, (_, i) => `/stylesresized/img${i+1}.webp`);
    const slides = Array.from({ length: 16 }, (_, i) => `/stylesresized/img${i+1}.webp`);
    const allImages = [...previews, ...slides];

    preloadImages(allImages, () => {
      setReady(true);
    });
  }, []);

  return (
    <>
      <Head>
        <link rel="preload" as="image" href="/stylesresized/img1.webp" />
      </Head>
      <div className="relative w-full">
        <StylesWrapper ready={ready} />
      </div>
    </>
  );
}

function preloadImages(paths, callback) {
  let loaded = 0;
  const total = paths.length;

  paths.forEach(src => {
    const img = new Image();
    img.src = src;
    img.onload = img.onerror = () => {
      loaded++;
      if (loaded === total && callback) callback();
    };
  });
}
