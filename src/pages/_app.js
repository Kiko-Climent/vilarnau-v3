import { AnimatePresence } from "framer-motion";
import Head from "next/head";
import MenuDesktopNew2 from "@/components/Layout/Menu/MenuDesktopNew2";
import MenuMobileNew from "@/components/Layout/Menu/MenuMobileNew";
import "@/styles/globals.css";
import "@/styles/hero.css";
import "@/styles/zoomgallery.css";
import "@/styles/newhero.css";
import "@/styles/styleslidernew.css";
import { useNavbar, NavbarProvider } from "@/components/Layout/Context/NavbarProvider";
import { NavbarDesktopProvider } from "@/components/Layout/Context/NavbarDesktopContext"; // 👈
import useMediaQuery from "@/components/Hooks/useMediaQuery";
import { ReactLenis, useLenis } from "lenis/react";
import { useEffect } from "react";

function Layout({ Component, pageProps, router }) {
  const { showNavbar } = useNavbar();
  const pathname = router.pathname;
  const lenis = useLenis();
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

  // const renderNavbar = () => {
  //   if (!showNavbar || isMobile === null) return null;
  //   return isMobile ? <MenuMobileNew /> : <MenuDesktopNew2 />;
  // };

  const renderNavbar = () => {
    if (isMobile === null) return null;
    if (isMobile) return showNavbar ? <MenuMobileNew /> : null;
    return <MenuDesktopNew2 />; // 👈 desktop SIEMPRE montado para que los refs midan
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
      <NavbarDesktopProvider> {/* 👈 */}
        <ReactLenis root>
          <Layout Component={Component} pageProps={pageProps} router={router} />
        </ReactLenis>
      </NavbarDesktopProvider> {/* 👈 */}
    </NavbarProvider>
  );
}