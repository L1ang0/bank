'use client'
import Link from 'next/link'
export default function SideNav({ open, onClose }: { open: boolean, onClose: () => void }) {
    return (
        <div
        className={`fixed left-0 md:top-19 top-16 md:w-60 sm:w-48 w-43 bg-[#ff1111]/80 dark:bg-[#6666ff]/80 shadow-lg transition-transform z-50
        h-[calc(100vh-64px)] ${open ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <button className="sm:ml-4 ml-2 text-white dark:text-blue-50 text-[18px] w-0 h-0 opacity-90 rounded-full bg-[#ff0000]/80 dark:bg-[#0000ff]/80 hover:scale-108 
        shadow-[0_10px_20px_rgba(0,0,0,0.3)] transition-all duration-300 cursor-pointer" onClick={onClose}>✕</button>
        <nav className="flex flex-col p-4 space-y-3">
          <Link href="/" className="md:text-[21px] sm:text-[19px] text-[17px] font-medium text-gray-800 hover:text-[#dfdfdf]
              transition-all duration-300 transform hover:rotate-1
              hover:translate-x-2 hover:scale-[1.02] hover:text-shadow-[0px_8px_8px_rgba(0,0,0,0.9)]">Главная</Link>
          <a href="/services" className="md:text-[21px] sm:text-[19px] text-[17px] font-medium text-gray-800 hover:text-[#dfdfdf]
              transition-all duration-300 transform hover:rotate-1
              hover:translate-x-2 hover:scale-[1.02] hover:text-shadow-[0px_8px_8px_rgba(0,0,0,0.9)]">Конвертер валют</a>
          <a href="/about" className="md:text-[21px] sm:text-[19px] text-[17px] font-medium text-gray-800 hover:text-[#dfdfdf] 
              transition-all duration-300 transform hover:rotate-1
              hover:translate-x-2 hover:scale-[1.02] hover:text-shadow-[0px_8px_8px_rgba(0,0,0,0.9)]">О банке</a>
        </nav>
      </div>
    )
  }
  