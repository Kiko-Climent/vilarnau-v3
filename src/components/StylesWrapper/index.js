"use client";

import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import StyleSlider8 from "../Styles/index8";
// import StyleSlider11 from "../Styles/index11";
import StyleSliderMobile2 from "../Styles/index10";

const StylesWrapper = () => {
  const [mounted, setMounted] = useState(false);
  const isDesktop = useMediaQuery({ minWidth: 1024 });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Evita mismatch SSR/CSR
    return null;
  }

  return isDesktop ? <StyleSlider8 /> : <StyleSliderMobile2 />;
}

export default StylesWrapper;