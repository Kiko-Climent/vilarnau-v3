import { AnimatePresence } from "framer-motion";
import Head from "next/head";
import Menu2 from "@/components/Layout/Menu/menu2";
import "@/styles/globals.css";
import "@/styles/hero.css";
import "@/styles/zoomgallery.css";
import "@/styles/newhero.css";
import "@/styles/styleslidernew.css";
import { useNavbar } from "@/components/Layout/Context/NavbarProvider";
import { NavbarProvider } from "@/components/Layout/Context/NavbarProvider";
import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import PageTransition from "@/components/Layout/PageTransition";

function Layout({ Component, pageProps, router }) {
  const { showNavbar } = useNavbar();
  const pathname = router.pathname;
  const nextRouter = useRouter();
  const prevPathRef = useRef(null);

  // Previene que Next.js haga scroll automático
  useEffect(() => {
    window.history.scrollRestoration = "manual";
  }, []);

  // Guarda la ruta previa
  useEffect(() => {
    const handleRouteChangeStart = () => {
      window.scrollTo({ top: 0, behavior: "instant" });
      prevPathRef.current = nextRouter.pathname;
    };
    nextRouter.events.on("routeChangeStart", handleRouteChangeStart);
    return () => {
      nextRouter.events.off("routeChangeStart", handleRouteChangeStart);
    };
  }, [nextRouter]);

  // Forzar scrollTop en cada cambio de página completado
  useEffect(() => {
    const handleRouteChangeComplete = () => {
      window.scrollTo({ top: 0, behavior: "instant" });
    };
    nextRouter.events.on("routeChangeComplete", handleRouteChangeComplete);
    return () => {
      nextRouter.events.off("routeChangeComplete", handleRouteChangeComplete);
    };
  }, [nextRouter]);

  // Detecta si venimos de "/" a "/home"
  const isSplashToHome =
    prevPathRef.current === "/" && pathname === "/home";

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="w-screen min-h-screen flex flex-col">
        {showNavbar && <Menu2 />}
        <AnimatePresence mode="wait">
          {pathname === "/home" || pathname === "/styles" ? (
            isSplashToHome ? (
              // No aplicar transición si vienes del splash
              <Component key={pathname} {...pageProps} />
            ) : (
              <PageTransition key={pathname}>
                <Component {...pageProps} />
              </PageTransition>
            )
          ) : (
            <Component key={pathname} {...pageProps} />
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

export default function App({ Component, pageProps, router }) {
  return (
    <NavbarProvider>
      <Layout Component={Component} pageProps={pageProps} router={router} />
    </NavbarProvider>
  );
}
