"use client";

import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import Team2 from "./index2";
import TeamMobile2 from "./index4";

const TeamWrapper = () => {
  const [mounted, setMounted] = useState(false);
  const isDesktop = useMediaQuery({ minWidth: 1024 });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // 🚫 Evita mismatch SSR/CSR
    return null;
  }

  return isDesktop ? <Team2 /> : <TeamMobile2 />;
}

export default TeamWrapper;