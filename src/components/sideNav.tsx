'use client'
import Link from 'next/link'
import ThemeToggle from './ThemeToggle'

export default function SideNav({ open, onClose }: { open: boolean, onClose: () => void }) {
    return (
        <div
        className={`fixed left-0 md:top-18.5 sm:top-16 top-16 md:w-62 sm:w-48 w-43 bg-gradient-to-t from-[#ff1111] via-[#f74141] to-[#ff5151] dark:bg-gradient-to-t dark:from-[#1515f4] dark:via-[#3232f8] dark:to-[#4f4fff]
        shadow-lg transition-transform z-50
        h-[calc(100vh-64px)] ${open ? 'translate-x-0' : '-translate-x-full'}`}
      >
        
        <div className="flex justify-between items-center p-0.5 rounded-br-4xl border-b border-red-600/90 dark:border-blue-400/80
        bg-gradient-to-b from-[#ff2b2b] via-[#ff3939] to-[#ff4949] dark:bg-gradient-to-b dark:from-[#171bff] dark:via-[#3a3dff] dark:to-[#4f4fff]">
        <button className="md:ml-6 sm:ml-4 ml-2 text-white dark:text-blue-50 text-[18px] w-0 h-0 opacity-90 rounded-full bg-[#ff1111]/80 dark:bg-[#6666ff]/80 hover:scale-108 
        shadow-[0_10px_20px_rgba(0,0,0,0.3)] transition-all duration-300 cursor-pointer mb-9" onClick={onClose}>✕</button>
                <ThemeToggle />
            </div>
        <nav className="flex flex-col p-4 space-y-3">
          <Link href="/" className="md:text-[21px] sm:text-[19px] text-[17px] font-medium text-[#ffffff] hover:text-[#efefef] dark:text-[#dfdfdf] dark:hover:text-[#cfcfcf]
              transition-all duration-300 transform hover:rotate-1
              hover:translate-x-2 hover:scale-[1.02] hover:text-shadow-[0px_8px_8px_rgba(0,0,0,0.9)]">Главная</Link>
          <Link href="/converter" className="md:text-[21px] sm:text-[19px] text-[17px] font-medium text-[#ffffff] hover:text-[#efefef] dark:text-[#dfdfdf] dark:hover:text-[#cfcfcf]
              transition-all duration-300 transform hover:rotate-1
              hover:translate-x-2 hover:scale-[1.02] hover:text-shadow-[0px_8px_8px_rgba(0,0,0,0.9)]">Конвертер валют</Link>
          <Link href="/about" className="md:text-[21px] sm:text-[19px] text-[17px] font-medium text-[#ffffff] hover:text-[#efefef] dark:text-[#dfdfdf] dark:hover:text-[#cfcfcf]
              transition-all duration-300 transform hover:rotate-1
              hover:translate-x-2 hover:scale-[1.02] hover:text-shadow-[0px_8px_8px_rgba(0,0,0,0.9)]">О банке</Link>
        </nav>
      </div>
    )
  }
  