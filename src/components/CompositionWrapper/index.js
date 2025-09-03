"use client";

import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import Composition4 from "../Composition/index4";
import Composition4MobileFlex from "../Composition/index6";

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

  return isDesktop ? <Composition4 /> : <Composition4MobileFlex />;
}

export default Composition4Wrapper;