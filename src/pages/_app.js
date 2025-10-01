import { AnimatePresence } from "framer-motion";
import PageTransitionWrapper from "@/components/Layout/PageTransition/PageTransitionOverlay";
import Head from "next/head";
import Menu2 from "@/components/Layout/Menu/menu2";
import "@/styles/globals.css";
import "@/styles/hero.css";
import "@/styles/zoomgallery.css";
import "@/styles/newhero.css";
import "@/styles/styleslidernew.css";
// import "@/styles/styleslidernew2.css";
import { useNavbar } from "@/components/Layout/Context/NavbarProvider";
import { NavbarProvider } from "@/components/Layout/Context/NavbarProvider";

function Layout ({ Component, pageProps, router }) {
  const {showNavbar} = useNavbar();

  const pathname = router.pathname

  const enableTransition =
    (pathname === "/home" || pathname === "/styles");

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="w-screen min-h-screen flex flex-col">
        {showNavbar && <Menu2 />}
        
        {enableTransition ? (
          <PageTransitionWrapper route={pathname}>
            <Component {...pageProps} />
          </PageTransitionWrapper>
        ) : (
          <Component {...pageProps} />
        )}
      </div>
    </>
  );
}

export default function App({ Component, pageProps, router }) {

  console.log("ROUTE:", router.route); // <-- deberías ver "/home", "/about", etc.

  return (
    <NavbarProvider>
      <Layout Component={Component} pageProps={pageProps} router={router} />
    </NavbarProvider>
  );
}
