    "use client";

    import Link from "next/link";
    import { useState } from "react";
    import { useRouter } from "next/router";
    import { useNavbar } from "../Context/NavbarProvider";
    import PriceList4 from "@/components/Prices/index4";


    const MenuMobileNew = () => {
        const [isModalOpen, setIsModalOpen] = useState(false);
        const router = useRouter();

        const {
            navbarRef,
            vilarnauRef,
            leftColRef,
            rightColRef,
            stylesRef,
            pricesRef,
            aboutRef,
            contactRef,
        } = useNavbar();

        return (
            <>
            {isModalOpen && (
                <PriceList4 isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            )}
            <div
                ref={navbarRef}
                className="w-screen px-4 py-1 tracking-wider justify-between flex bg-white fixed top-0 left-0 right-0 z-50 text-lg"
            >
                <div ref={leftColRef} className="flex w-1/3">
                    <Link ref={vilarnauRef} href="/home">vilarnau</Link>
                </div>

                <div ref={rightColRef} className="flex justify-between w-2/3">
                    <Link ref={stylesRef}  href="/styles">styles</Link>
                    <div ref={pricesRef} onClick={() => setIsModalOpen(true)}>prices</div>
                    <Link ref={aboutRef} href="/home#about">about</Link>
                    <Link ref={contactRef} href="/home">contact</Link>
                </div>
            </div>
            </>
        );
    };

    export default MenuMobileNew;