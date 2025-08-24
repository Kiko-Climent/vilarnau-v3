import Link from "next/link";

const Menu = () => {
  return(
    <nav 
    className="w-full h-auto px-2 py-2 fixed flex items-start justify-between uppercase text-gray-500 font-semibold text-base leading-4 z-2">
      <div className="flex flex-col items-start">
        <Link href="/home">vilarnau</Link>
      </div>
      <div className="flex flex-col items-start">
        <div className="flex"><Link href="/styles">styles</Link></div>
        <div className="flex"><Link href="/prices">prices</Link></div>
        <div className="flex"><Link href="/about">about</Link></div>
      </div>
    </nav>
  )
}

export default Menu;