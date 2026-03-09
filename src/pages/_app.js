import { AnimatePresence } from "framer-motion";
import Head from "next/head";
import MenuDesktopNew from "@/components/Layout/Menu/MenuDesktopNew";
import MenuMobileNew from "@/components/Layout/Menu/MenuMobileNew";
import "@/styles/globals.css";
import "@/styles/hero.css";
import "@/styles/zoomgallery.css";
import "@/styles/newhero.css";
import "@/styles/styleslidernew.css";
import { useNavbar, NavbarProvider } from "@/components/Layout/Context/NavbarProvider";
import useMediaQuery from "@/components/Hooks/useMediaQuery"; // ajusta el path según tu estructura
import { ReactLenis, useLenis } from "lenis/react";
import { useEffect } from "react";
import MenuDesktopNew2 from "@/components/Layout/Menu/MenuDesktopNew2";
import Menu2 from "@/components/Layout/Menu/menu2";

function Layout({ Component, pageProps, router }) {
  const { showNavbar } = useNavbar();
  const pathname = router.pathname;
  const lenis = useLenis();

  // null  → todavía no hidratado (evita flash)
  // true  → móvil  → MenuMobileNew
  // false → desktop → Menu2
  const isMobile = useMediaQuery("(max-width: 767px)");

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    if (!lenis) return;
    lenis.scrollTo(0, { immediate: true });
  }, [lenis, router.pathname]);

  // Qué navbar renderizar
  const renderNavbar = () => {
    if (!showNavbar || isMobile === null) return null; // espera hidratación
    return isMobile ? <MenuMobileNew /> : <Menu2 />;
  };

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="w-full min-h-screen flex flex-col">
        {renderNavbar()}
        <AnimatePresence mode="wait">
          <Component key={pathname} {...pageProps} />
        </AnimatePresence>
      </div>
    </>
  );
}

export default function App({ Component, pageProps, router }) {
  return (
    <NavbarProvider>
      <ReactLenis root>
        <Layout Component={Component} pageProps={pageProps} router={router} />
      </ReactLenis>
    </NavbarProvider>
  );
}