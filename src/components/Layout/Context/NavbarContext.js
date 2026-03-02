"use client";

import { createContext, useContext, useRef, useState, useEffect, useCallback } from "react";

const NavbarContext = createContext(null);

export const NavbarProvider = ({ children }) => {
    // ─── REFS ────────────────────────────────────────────────────────────────
    const navbarRef        = useRef(null); // el <nav> completo
    const vilarnauRef      = useRef(null); // el <Link> de "vilarnau"
    const stylesRef        = useRef(null);
    const pricesRef        = useRef(null);
    const aboutRef         = useRef(null);
    const contactRef       = useRef(null);
    const leftColRef       = useRef(null); // div w-1/3
    const rightColRef      = useRef(null); // div w-2/3

    // ─── MEDIDAS ─────────────────────────────────────────────────────────────
    const [measures, setMeasures] = useState({
        // Navbar general
        navbarHeight: 0,          // altura total del navbar
        navbarWidth: 0,           // ancho total del navbar

        // Columnas
        leftColWidth: 0,          // ancho del bloque izquierdo (vilarnau)
        rightColWidth: 0,         // ancho del bloque derecho (links)

        // ── Medidas que pediste ──────────────────────────────────────────────

        // 1. Desde el final de la "u" de vilarnau hasta el borde derecho
        vilarnauEndToRight: 0,

        // 2. Desde el inicio de la "v" de vilarnau hasta el inicio de la "a" de about
        vilarnauStartToAboutStart: 0,

        // ── Extras útiles para el grid ───────────────────────────────────────

        // Posición X absoluta de cada elemento (borde izquierdo)
        vilarnauX: 0,             // inicio de "vilarnau"
        stylesX: 0,               // inicio de "styles"
        pricesX: 0,               // inicio de "prices"
        aboutX: 0,                // inicio de "about"
        contactX: 0,              // inicio de "contact"

        // Ancho de cada palabra (útil para centrar contenido bajo ellas)
        vilarnauWidth: 0,
        stylesWidth: 0,
        pricesWidth: 0,
        aboutWidth: 0,
        contactWidth: 0,

        // Centro X de cada palabra (ideal para alinear columnas de fotos)
        vilarnauCenterX: 0,
        stylesCenterX: 0,
        pricesCenterX: 0,
        aboutCenterX: 0,
        contactCenterX: 0,

        // Distancia entre palabras del menú derecho (gap real)
        stylesToPricesGap: 0,
        pricesToAboutGap: 0,
        aboutToContactGap: 0,
    });

    // ─── FUNCIÓN DE MEDICIÓN ──────────────────────────────────────────────────
    const measure = useCallback(() => {
        if (
            !navbarRef.current   ||
            !vilarnauRef.current ||
            !aboutRef.current    ||
            !leftColRef.current  ||
            !rightColRef.current
        ) return;

        const vw = window.innerWidth;

        const navbar   = navbarRef.current.getBoundingClientRect();
        const vilarnau = vilarnauRef.current.getBoundingClientRect();
        const leftCol  = leftColRef.current.getBoundingClientRect();
        const rightCol = rightColRef.current.getBoundingClientRect();
        const about    = aboutRef.current.getBoundingClientRect();

        // Opcionales — pueden no estar montados todavía
        const styles  = stylesRef.current?.getBoundingClientRect();
        const prices  = pricesRef.current?.getBoundingClientRect();
        const contact = contactRef.current?.getBoundingClientRect();

        setMeasures({
            // Navbar
            navbarHeight: navbar.height,
            navbarWidth:  navbar.width,

            // Columnas
            leftColWidth:  leftCol.width,
            rightColWidth: rightCol.width,

            // ── Medidas pedidas ──────────────────────────────────────────────

            // 1. Desde el final de "vilarnau" hasta el borde derecho de pantalla
            vilarnauEndToRight: vw - vilarnau.right,

            // 2. Desde el inicio de "vilarnau" hasta el inicio de "about"
            vilarnauStartToAboutStart: about.left - vilarnau.left,

            // ── Extras ───────────────────────────────────────────────────────

            vilarnauX:     vilarnau.left,
            stylesX:       styles?.left  ?? 0,
            pricesX:       prices?.left  ?? 0,
            aboutX:        about.left,
            contactX:      contact?.left ?? 0,

            vilarnauWidth: vilarnau.width,
            stylesWidth:   styles?.width  ?? 0,
            pricesWidth:   prices?.width  ?? 0,
            aboutWidth:    about.width,
            contactWidth:  contact?.width ?? 0,

            vilarnauCenterX: vilarnau.left + vilarnau.width / 2,
            stylesCenterX:   styles  ? styles.left  + styles.width  / 2 : 0,
            pricesCenterX:   prices  ? prices.left  + prices.width  / 2 : 0,
            aboutCenterX:    about.left   + about.width   / 2,
            contactCenterX:  contact ? contact.left + contact.width / 2 : 0,

            stylesToPricesGap:  prices  && styles  ? prices.left  - styles.right  : 0,
            pricesToAboutGap:   prices             ? about.left   - prices.right  : 0,
            aboutToContactGap:  contact            ? contact.left - about.right   : 0,
        });
    }, []);

    // ─── EFECTOS ──────────────────────────────────────────────────────────────
    useEffect(() => {
        // Medir al montar y en cada resize
        measure();

        const observer = new ResizeObserver(measure);
        if (navbarRef.current) observer.observe(navbarRef.current);
        window.addEventListener("resize", measure);

        return () => {
            observer.disconnect();
            window.removeEventListener("resize", measure);
        };
    }, [measure]);

    // ─── VALOR DEL CONTEXT ────────────────────────────────────────────────────
    const value = {
        // Refs (para asignar en el navbar)
        navbarRef,
        vilarnauRef,
        stylesRef,
        pricesRef,
        aboutRef,
        contactRef,
        leftColRef,
        rightColRef,

        // Medidas
        measures,

        // Función manual por si necesitas re-medir desde un componente hijo
        measure,
    };

    return (
        <NavbarContext.Provider value={value}>
            {children}
        </NavbarContext.Provider>
    );
};

// ─── HOOK ─────────────────────────────────────────────────────────────────────
export const useNavbar = () => {
    const ctx = useContext(NavbarContext);
    if (!ctx) throw new Error("useNavbar debe usarse dentro de <NavbarProvider>");
    return ctx;
};