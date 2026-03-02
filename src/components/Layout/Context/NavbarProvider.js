import { createContext, useContext, useRef, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";

const NavbarContext = createContext();

export const NavbarProvider = ({ children }) => {

    // ─── LÓGICA DE VISIBILIDAD (tu código original) ───────────────────────────
    const [showNavbar, setShowNavbar]   = useState(false);
    const [initialized, setInitialized] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (!router.isReady) return;

        if (router.pathname === "/" || router.pathname === "/home") {
            setShowNavbar(false);
        } else {
            setShowNavbar(true);
        }

        setInitialized(true);
    }, [router.pathname, router.isReady]);

    // ─── REFS ─────────────────────────────────────────────────────────────────
    const navbarRef   = useRef(null);
    const vilarnauRef = useRef(null);
    const leftColRef  = useRef(null);
    const rightColRef = useRef(null);
    const stylesRef   = useRef(null);
    const pricesRef   = useRef(null);
    const aboutRef    = useRef(null);
    const contactRef  = useRef(null);

    // ─── MEDIDAS ──────────────────────────────────────────────────────────────
    const [measures, setMeasures] = useState({
        navbarHeight:              0,
        navbarWidth:               0,
        leftColWidth:              0,
        rightColWidth:             0,
        vilarnauEndToRight:        0,
        vilarnauStartToAboutStart: 0,
        vilarnauX:                 0,
        stylesX:                   0,
        pricesX:                   0,
        aboutX:                    0,
        contactX:                  0,
        vilarnauWidth:             0,
        stylesWidth:               0,
        pricesWidth:               0,
        aboutWidth:                0,
        contactWidth:              0,
        vilarnauCenterX:           0,
        stylesCenterX:             0,
        pricesCenterX:             0,
        aboutCenterX:              0,
        contactCenterX:            0,
        stylesToPricesGap:         0,
        pricesToAboutGap:          0,
        aboutToContactGap:         0,
    });

    const measure = useCallback(() => {
        if (
            !navbarRef.current   ||
            !vilarnauRef.current ||
            !aboutRef.current    ||
            !leftColRef.current  ||
            !rightColRef.current
        ) return;

        const vw      = window.innerWidth;
        const navbar   = navbarRef.current.getBoundingClientRect();
        const vilarnau = vilarnauRef.current.getBoundingClientRect();
        const leftCol  = leftColRef.current.getBoundingClientRect();
        const rightCol = rightColRef.current.getBoundingClientRect();
        const about    = aboutRef.current.getBoundingClientRect();
        const styles   = stylesRef.current?.getBoundingClientRect();
        const prices   = pricesRef.current?.getBoundingClientRect();
        const contact  = contactRef.current?.getBoundingClientRect();

        setMeasures({
            navbarHeight:  navbar.height,
            navbarWidth:   navbar.width,
            leftColWidth:  leftCol.width,
            rightColWidth: rightCol.width,

            vilarnauEndToRight:        vw - vilarnau.right,
            vilarnauStartToAboutStart: about.left - vilarnau.left,

            vilarnauX:  vilarnau.left,
            stylesX:    styles?.left  ?? 0,
            pricesX:    prices?.left  ?? 0,
            aboutX:     about.left,
            contactX:   contact?.left ?? 0,

            vilarnauWidth:  vilarnau.width,
            stylesWidth:    styles?.width  ?? 0,
            pricesWidth:    prices?.width  ?? 0,
            aboutWidth:     about.width,
            contactWidth:   contact?.width ?? 0,

            vilarnauCenterX: vilarnau.left + vilarnau.width / 2,
            stylesCenterX:   styles  ? styles.left  + styles.width  / 2 : 0,
            pricesCenterX:   prices  ? prices.left  + prices.width  / 2 : 0,
            aboutCenterX:    about.left   + about.width   / 2,
            contactCenterX:  contact ? contact.left + contact.width / 2 : 0,

            stylesToPricesGap: prices && styles ? prices.left  - styles.right : 0,
            pricesToAboutGap:  prices            ? about.left  - prices.right : 0,
            aboutToContactGap: contact           ? contact.left - about.right : 0,
        });
    }, []);

    // Medir al montar y en cada resize
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

    // Re-medir cuando el navbar aparece tras un cambio de ruta
    useEffect(() => {
        if (showNavbar) {
            const t = setTimeout(measure, 50);
            return () => clearTimeout(t);
        }
    }, [showNavbar, measure]);

    // ─── VALOR ────────────────────────────────────────────────────────────────
    return (
        <NavbarContext.Provider value={{
            // visibilidad
            showNavbar,
            setShowNavbar,
            initialized,
            // refs (asignar en MenuMobileNew)
            navbarRef,
            vilarnauRef,
            leftColRef,
            rightColRef,
            stylesRef,
            pricesRef,
            aboutRef,
            contactRef,
            // medidas
            measures,
            measure,
        }}>
            {children}
        </NavbarContext.Provider>
    );
};

export const useNavbar = () => useContext(NavbarContext);