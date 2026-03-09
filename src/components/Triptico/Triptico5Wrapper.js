"use client";
import useMediaQuery from "../Hooks/useMediaQuery";
import Triptico5 from "./index5";
import Triptico5Mobile from "./Triptico5Mobile";
import Triptico5DesktopNew from "../NewDesktop/Triptico5Desktop";

const Triptico5Wrapper = () => {
    const isMobile = useMediaQuery("(max-width: 767px)");
  
    if (isMobile === null) return <div className="w-full h-full bg-white" />; // 👈 placeholder del mismo tamaño
  
    return isMobile ? <Triptico5Mobile /> : <Triptico5DesktopNew />;
  };

export default Triptico5Wrapper;