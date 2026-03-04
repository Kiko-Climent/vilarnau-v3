"use client";

import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
// import StyleSlider8 from "../Styles/index8";
import StyleSliderMobile3 from "../Styles/index12";
import StyleSlider9 from "../Styles/index13";

const StylesWrapper = ({ready}) => {
  const [mounted, setMounted] = useState(false);
  const isDesktop = useMediaQuery({ minWidth: 1024 });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Evita mismatch SSR/CSR
    return null;
  }

  return isDesktop ? <StyleSlider9 ready={ready} /> : <StyleSliderMobile3 ready={ready} />;
}

export default StylesWrapper;