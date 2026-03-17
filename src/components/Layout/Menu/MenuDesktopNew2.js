// components/MenuDesktopNew2.jsx
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

import PriceList4 from "@/components/Prices/index4";
import { useNavbarDesktop } from "@/components/Layout/Context/NavbarDesktopContext";

const MenuDesktopNew2 = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const router = useRouter();

    const {
        emailRef,
        showNavbar,
        navbarRef,
        vilarnauRef,
        stylesRef,
        pricesRef,
        aboutRef,
        leftHalfRef,
        rightHalfRef,
        linksGroupRef,
    } = useNavbarDesktop();

    return (
        <>
            <nav
                ref={navbarRef}
                className="w-full h-auto top-0 left-0 right-0 px-2 py-2 fixed flex items-start justify-between text-gray-400 mix-blend-difference text-[clamp(0.95rem,2vw,1.45rem)] tracking-wider z-9999 font-myfont2"
                style={{
                    opacity:       showNavbar ? 1 : 0,
                    pointerEvents: showNavbar ? "auto" : "none",
                    transition:    "opacity 0.3s ease",
                }}
            >
                <div className="flex flex-row items-start justify-between w-full">

                    {/* ── Mitad izquierda ── */}
                    <div ref={leftHalfRef} className="w-1/2 flex flex-row items-start justify-between">

                        <div className="flex w-1/2">
                            <Link ref={vilarnauRef} href="/home" scroll={false}>
                                vilarnau
                            </Link>
                        </div>

                        {/* Bloque styles / prices / about */}
                        <div ref={linksGroupRef} className="flex w-1/2 flex-row items-start justify-between">
                            <div className="flex">
                                <Link ref={stylesRef} href="/styles" scroll={false}>styles</Link>
                            </div>
                            <div ref={pricesRef} className="flex cursor-pointer" onClick={() => setIsModalOpen(true)}>
                                prices
                            </div>
                            <div className="flex">
                                <Link ref={aboutRef} href="/home#about" scroll={false}>about</Link>
                            </div>
                        </div>

                    </div>

                    {/* ── Mitad derecha (oculta en /styles) ── */}
                    {router.pathname !== "/styles" && (
                        <div ref={rightHalfRef} className="flex justify-end items-end w-1/2 gap-8">
                            <a ref={emailRef} href="mailto:hello@vilarnau.de" className="flex pb-0">
                                hello@vilarnau.de
                            </a>
                            <a href="tel:+493061202363" className="flex">
                                (030) 61202363
                            </a>
                        </div>
                    )}

                </div>
            </nav>

            {isModalOpen && (
                <PriceList4 isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            )}
        </>
    );
};

export default MenuDesktopNew2;