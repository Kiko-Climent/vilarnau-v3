import { useState, useEffect } from "react";

/**
 * Devuelve true si el viewport cumple la media query dada.
 * Inicializa en `null` para evitar mismatch de hidratación con SSR.
 *
 * Uso:
 *   const isMobile = useMediaQuery("(max-width: 767px)");
 *   if (isMobile === null) return null; // aún no hidratado
 */
const useMediaQuery = (query) => {
    const [matches, setMatches] = useState(null);

    useEffect(() => {
        const media = window.matchMedia(query);
        setMatches(media.matches);

        const listener = (e) => setMatches(e.matches);
        media.addEventListener("change", listener);

        return () => media.removeEventListener("change", listener);
    }, [query]);

    return matches;
};

export default useMediaQuery;