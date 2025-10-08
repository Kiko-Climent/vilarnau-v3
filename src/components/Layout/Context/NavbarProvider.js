import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";

const NavbarContext = createContext();

export const NavbarProvider = ({ children }) => {
  const [showNavbar, setShowNavbar] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;

    if (router.pathname === "/") {
      setShowNavbar(false);
    } else if (router.pathname === "/home") {
      setShowNavbar(false);
    } else {
      setShowNavbar(true);
    }

    setInitialized(true);
  }, [router.pathname, router.isReady]);

  return (
    <NavbarContext.Provider value={{ showNavbar, setShowNavbar, initialized }}>
      {children}
    </NavbarContext.Provider>
  );
};

export const useNavbar = () => useContext(NavbarContext);
