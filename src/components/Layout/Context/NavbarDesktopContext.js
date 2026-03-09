// context/NavbarDesktopContext.js
import { createContext, useContext, useRef, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";

const NavbarDesktopContext = createContext();

export const NavbarDesktopProvider = ({ children }) => {

    // ─── VISIBILIDAD ──────────────────────────────────────────────────────────
    const [showNavbar, setShowNavbar]   = useState(false);
    const [initialized, setInitialized] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (!router.isReady) return;
        setShowNavbar(router.pathname !== "/" && router.pathname !== "/home");
        setInitialized(true);
    }, [router.pathname, router.isReady]);

    // ─── REFS ─────────────────────────────────────────────────────────────────
    const navbarRef     = useRef(null); // <nav>
    const vilarnauRef   = useRef(null); // Link "vilarnau"
    const stylesRef     = useRef(null); // Link "styles"
    const pricesRef     = useRef(null); // div "prices"
    const aboutRef      = useRef(null); // Link "about"
    const emailRef      = useRef(null); // 👈 <a> "hello@vilarnau.com"
    const leftHalfRef   = useRef(null); // div w-1/2 izquierdo (vilarnau + links)
    const rightHalfRef  = useRef(null); // div w-1/2 derecho (email + tel)
    const linksGroupRef = useRef(null); // div interno w-1/2 que agrupa styles/prices/about

    // ─── MEDIDAS ──────────────────────────────────────────────────────────────
    const [measures, setMeasures] = useState({
        // Navbar
        navbarHeight: 0,
        navbarWidth:  0,

        // Mitades
        leftHalfWidth:  0,
        rightHalfWidth: 0,

        // Posición X absoluta (borde izquierdo de cada elemento)
        vilarnauX: 0,
        stylesX:   0,
        pricesX:   0,
        aboutX:    0,
        emailX:    0, // 👈

        // Ancho de cada elemento
        vilarnauWidth: 0,
        stylesWidth:   0,
        pricesWidth:   0,
        aboutWidth:    0,
        emailWidth:    0, // 👈

        // Centro X de cada elemento (para alinear columnas de fotos)
        vilarnauCenterX: 0,
        stylesCenterX:   0,
        pricesCenterX:   0,
        aboutCenterX:    0,
        emailCenterX:    0, // 👈

        // Borde derecho de cada elemento
        vilarnauRight: 0,
        stylesRight:   0,
        pricesRight:   0,
        aboutRight:    0,
        emailRight:    0, // 👈

        // Gaps reales entre elementos del menú derecho
        vilarnauToStylesGap: 0,
        stylesToPricesGap:   0,
        pricesToAboutGap:    0,

        // Desde el final de "vilarnau" hasta el borde derecho de pantalla
        vilarnauEndToRight: 0,

        // Desde el inicio de "vilarnau" hasta el inicio de "about"
        vilarnauStartToAboutStart: 0,

        // Desde el inicio de "vilarnau" hasta el inicio de "styles"
        vilarnauStartToStylesStart: 0,

        // Ancho total del bloque de links (styles → about)
        linksGroupWidth: 0,
        linksGroupX:     0,
    });

    // ─── FUNCIÓN DE MEDICIÓN ──────────────────────────────────────────────────
    const measure = useCallback(() => {
        if (
            !navbarRef.current   ||
            !vilarnauRef.current ||
            !aboutRef.current    ||
            !leftHalfRef.current
        ) return;

        const vw = window.innerWidth;

        const navbar    = navbarRef.current.getBoundingClientRect();
        const vilarnau  = vilarnauRef.current.getBoundingClientRect();
        const leftHalf  = leftHalfRef.current.getBoundingClientRect();
        const about     = aboutRef.current.getBoundingClientRect();

        // Opcionales — pueden no estar montados
        const rightHalf  = rightHalfRef.current?.getBoundingClientRect();
        const styles     = stylesRef.current?.getBoundingClientRect();
        const prices     = pricesRef.current?.getBoundingClientRect();
        const linksGroup = linksGroupRef.current?.getBoundingClientRect();
        const email      = emailRef.current?.getBoundingClientRect(); // 👈

        setMeasures({
            // Navbar
            navbarHeight: navbar.height,
            navbarWidth:  navbar.width,

            // Mitades
            leftHalfWidth:  leftHalf.width,
            rightHalfWidth: rightHalf?.width ?? 0,

            // Posición X
            vilarnauX: vilarnau.left,
            stylesX:   styles?.left ?? 0,
            pricesX:   prices?.left ?? 0,
            aboutX:    about.left,
            emailX:    email?.left  ?? 0, // 👈

            // Anchos
            vilarnauWidth: vilarnau.width,
            stylesWidth:   styles?.width ?? 0,
            pricesWidth:   prices?.width ?? 0,
            aboutWidth:    about.width,
            emailWidth:    email?.width  ?? 0, // 👈

            // Centros X
            vilarnauCenterX: vilarnau.left + vilarnau.width / 2,
            stylesCenterX:   styles ? styles.left + styles.width / 2 : 0,
            pricesCenterX:   prices ? prices.left + prices.width / 2 : 0,
            aboutCenterX:    about.left + about.width / 2,
            emailCenterX:    email ? email.left + email.width / 2 : 0, // 👈

            // Bordes derechos
            vilarnauRight: vilarnau.right,
            stylesRight:   styles?.right ?? 0,
            pricesRight:   prices?.right ?? 0,
            aboutRight:    about.right,
            emailRight:    email?.right  ?? 0, // 👈

            // Gaps
            vilarnauToStylesGap: styles ? styles.left - vilarnau.right : 0,
            stylesToPricesGap:   styles && prices ? prices.left - styles.right : 0,
            pricesToAboutGap:    prices ? about.left - prices.right : 0,

            // Distancias compuestas
            vilarnauEndToRight:         vw - vilarnau.right,
            vilarnauStartToAboutStart:  about.left - vilarnau.left,
            vilarnauStartToStylesStart: styles ? styles.left - vilarnau.left : 0,

            // Bloque de links (styles → about)
            linksGroupWidth: linksGroup?.width ?? 0,
            linksGroupX:     linksGroup?.left  ?? 0,
        });
    }, []);

    // ─── EFECTOS ──────────────────────────────────────────────────────────────
    useEffect(() => {
        measure();
        const observer = new ResizeObserver(measure);
        if (navbarRef.current) observer.observe(navbarRef.current);
        window.addEventListener("resize", measure);
        return () => {
            observer.disconnect();
            window.removeEventListener("resize", measure);
        };
    }, [measure]);

    // Re-medir cuando el navbar aparece tras cambio de ruta
    useEffect(() => {
        if (showNavbar) {
            const t = setTimeout(measure, 50);
            return () => clearTimeout(t);
        }
    }, [showNavbar, measure]);

    // ─── VALOR ────────────────────────────────────────────────────────────────
    return (
        <NavbarDesktopContext.Provider value={{
            // Visibilidad
            showNavbar,
            setShowNavbar,
            initialized,
            // Refs (asignar en MenuDesktopNew2)
            navbarRef,
            vilarnauRef,
            stylesRef,
            pricesRef,
            aboutRef,
            emailRef,      // 👈
            leftHalfRef,
            rightHalfRef,
            linksGroupRef,
            // Medidas
            measures,
            measure,
        }}>
            {children}
        </NavbarDesktopContext.Provider>
    );
};

export const useNavbarDesktop = () => useContext(NavbarDesktopContext);