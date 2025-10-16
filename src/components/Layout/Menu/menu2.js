import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router"; // 👈

import PriceList2 from "@/components/Prices/index2";

const Menu2 = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter(); // 👈

  return (
    <>
      <nav 
        className="w-full h-auto top-0 left-0 right-0 px-2 py-2 fixed flex items-start justify-between text-gray-400 mix-blend-difference text-base md:text-[clamp(0.8rem,1.4vw,1rem)] tracking-wider z-2 font-myfont2"
      >
        <div className="flex flex-row items-start gap-2 md:gap-6">
          <Link href="/home" scroll={false}>vilarnau</Link>
          <div className="flex"><Link href="/styles" scroll={false}>styles</Link></div>
          <div className="flex cursor-pointer" onClick={() => setIsModalOpen(true)}>prices</div>
          <div className="flex"><Link href="/home#about" scroll={false}>about</Link></div>
        </div>

        {/* 👇 Solo mostramos si NO estamos en "/styles" */}
        {router.pathname !== "/styles" && (
          <div className="flex flex-col md:flex-row items-end gap-0 md:gap-6 -space-y-2.5 md:-space-y-1">
            <a href="mailto:hello@vilarnau.com" className="flex pb-1">
              hello@vilarnau.com
            </a>
            <a href="tel:+493061202363" className="flex">
              (030) 61202363
            </a>
          </div>
        )}
      </nav>

      {isModalOpen && (
        <PriceList2 isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      )}
    </>
  )
}

export default Menu2;
