"use client";

import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import AlmodovarQuote2 from "./index2";
import AlmodovarQuote2Mobile from "./index3";

const AlmodovarQuoteWrapper = () => {
  const [mounted, setMounted] = useState(false);
  const isDesktop = useMediaQuery({ minWidth: 1024 });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // 🚫 Evita mismatch SSR/CSR
    return null;
  }

  return isDesktop ? <AlmodovarQuote2 /> : <AlmodovarQuote2Mobile />;
}

export default AlmodovarQuoteWrapper;