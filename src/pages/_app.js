import { AnimatePresence } from "framer-motion";
import Menu2 from "@/components/Layout/Menu/menu2";
import "@/styles/globals.css";
import "@/styles/hero.css";
import "@/styles/zoomgallery.css";
import "@/styles/newhero.css";
import "@/styles/styleslidernew.css";
import { useNavbar } from "@/components/Layout/Context/NavbarProvider";
import { NavbarProvider } from "@/components/Layout/Context/NavbarProvider";

function Layout ({ Component, pageProps, router }) {
  const {showNavbar} = useNavbar();

  const pathname = router.pathname

  return (
    <div className="w-screen min-h-screen flex flex-col">
      {showNavbar && <Menu2 />} {/* 👈 solo mostramos si está activo */}
      <AnimatePresence mode="wait">
        <Component key={pathname} {...pageProps} />
      </AnimatePresence>
    </div>
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
