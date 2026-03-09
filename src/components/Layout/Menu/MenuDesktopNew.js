import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router"; // 👈

import PriceList2 from "@/components/Prices/index2";
import PriceList4 from "@/components/Prices/index4";

const MenuDesktopNew = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter(); // 👈

  return (
    <>
      <nav 
        className="w-full h-auto top-0 left-0 right-0 px-2 py-2 fixed flex items-start justify-between text-gray-400 mix-blend-difference text-[clamp(0.95rem,2vw,1.45rem)] tracking-wider z-9999 font-myfont2"
      >
        <div className="flex flex-row items-start justify-between w-full">
        <div className="w-1/3 flex">

          <Link href="/home" scroll={false}>vilarnau</Link>
        </div>
        <div className="flex flex-row items-start justify-between w-1/3">
          <div className="flex"><Link href="/styles" scroll={false}>styles</Link></div>
          <div className="flex cursor-pointer" onClick={() => setIsModalOpen(true)}>prices</div>
          <div className="flex"><Link href="/home#about" scroll={false}>about</Link></div>
        </div>

        {/* 👇 Solo mostramos si NO estamos en "/styles" */}
        {router.pathname !== "/styles" && (
          <div className="flex flex-col items-end -space-y-3">
            <a href="mailto:hello@vilarnau.com" className="flex pb-0">
              hello@vilarnau.com
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
  )
}

export default MenuDesktopNew;
