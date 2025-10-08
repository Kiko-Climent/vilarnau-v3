"use client";

import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import AlmodovarQuote5 from "./index5";
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

  return isDesktop ? <AlmodovarQuote5 /> : <AlmodovarQuote2Mobile />;
}

export default AlmodovarQuoteWrapper;