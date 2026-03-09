"use client";

import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
// import Composition4 from "../Composition/index4";
import Composition4MobileFlex2 from "../Composition/index7";
import Composition4_2 from "../Composition/index10";
import AboutDesktop from "../NewDesktop/AboutDesktop";

const Composition4Wrapper = () => {
  const [mounted, setMounted] = useState(false);
  const isDesktop = useMediaQuery({ minWidth: 1024 });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // 🚫 Evita mismatch SSR/CSR
    return null;
  }

  return isDesktop ? <AboutDesktop /> : <Composition4MobileFlex2 />;
}

export default Composition4Wrapper;