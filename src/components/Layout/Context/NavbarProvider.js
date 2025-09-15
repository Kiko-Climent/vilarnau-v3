import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";

const NavbarContext = createContext();

export const NavbarProvider = ({ children }) => {
  const [showNavbar, setShowNavbar] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (router.pathname === "/") {
      // en splash NO mostramos nunca
      setShowNavbar(false);
    } else if (router.pathname === "/home") {
      // en home empieza oculto, luego lo mostrarás desde FlipSection
      setShowNavbar(false);
    } else {
      // en el resto de páginas sí lo mostramos
      setShowNavbar(true);
    }
  }, [router.pathname]);

  return (
    <NavbarContext.Provider value={{ showNavbar, setShowNavbar }}>
      {children}
    </NavbarContext.Provider>
  );
};

export const useNavbar = () => useContext(NavbarContext);
