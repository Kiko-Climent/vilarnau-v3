"use client";
import { createContext, useContext, useState } from "react";
import { useEffect } from "react";

const NavbarContext = createContext();

export const NavbarProvider = ({ children }) => {
  const [showNavbar, setShowNavbar] = useState(false);

  useEffect(() => {
    console.log("Estado inicial de showNavbar:", showNavbar);
  }, []);

  return (
    <NavbarContext.Provider value={{ showNavbar, setShowNavbar }}>
      {children}
    </NavbarContext.Provider>
  );
};

export const useNavbar = () => useContext(NavbarContext);
