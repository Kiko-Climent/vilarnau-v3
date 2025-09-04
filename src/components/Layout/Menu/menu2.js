import Link from "next/link";
import { useState } from "react";
import PriceList from "@/components/Prices";

const Menu2 = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return(
    <>
      <nav 
      className="w-full h-auto px-2 py-2 fixed flex items-start justify-between text-gray-400 mix-blend-difference text-base md:text-lg tracking-wider z-2 font-myfont2">
        <div className="flex flex-row items-start gap-2 md:gap-6">
          <Link href="/home">vilarnau</Link>
          <div className="flex"><Link href="/styles">styles</Link></div>
          <div className="flex cursor-pointer" onClick={() => setIsModalOpen(true)}>prices</div>
          <div className="flex"><Link href="/about">about</Link></div>
        </div>
        <div className="flex flex-col md:flex-row items-end gap-0 md:gap-6 -space-y-1">
          <a href="mailto:hello@vilarnau.com" className="flex">
            hello@vilarnau.com
          </a>
          <a href="tel:+493061202363" className="flex">
            (030) 61202363
          </a>
        </div>
      </nav>
      {isModalOpen && <PriceList isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />}
    </>
  )
}


export default Menu2;