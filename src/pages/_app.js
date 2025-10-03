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

import { ReactLenis, useLenis } from "lenis/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

function Layout({ Component, pageProps, router }) {
  const { showNavbar } = useNavbar();
  const pathname = router.pathname;
  const lenis = useLenis();
  const r = useRouter();

  // 🔑 Controlar Lenis según la ruta
  useEffect(() => {
    if (!lenis) return;
    if (r.pathname === "/styles") {
      lenis.stop();
      // por seguridad, reseteamos el scroll
      window.scrollTo(0, 0);
    } else {
      lenis.start();
    }
  }, [r.pathname, lenis]);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="w-screen min-h-screen flex flex-col">
        {showNavbar && <Menu2 />}
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
      {/* 👇 Lenis global */}
      <ReactLenis root>
        <Layout Component={Component} pageProps={pageProps} router={router} />
      </ReactLenis>
    </NavbarProvider>
  );
}
