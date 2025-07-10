'use client'
import Link from 'next/link'
import Image from 'next/image'
export default function Header({ onMenuClick }: { onMenuClick: () => void }) {
    return (
            <header className="flex items-center justify-between bg-gradient-to-r from-red-500 to-red-400 text-white px-6 py-1 shadow">
            <div className="flex items-center">
              <button onClick={onMenuClick} className="text-white text-2xl w-10 h-10 rounded-full bg-[#ff5555]/80 hover:scale-105 hover:shadow-[7px_8px_12px_rgba(0,0,0,0.2)] transition-all duration-300 cursor-pointer">
              <span className="inline-block hover:rotate-180 transition-transform duration-500">
                &#9776;
              </span>
              </button>
              <Image src="/logo.png" alt="Bank Logo" width={140} height={60}  className="h-17 w-35 animate-[pulse_2.5s_ease-in-out_infinite] [filter:drop-shadow(0_10px_15px_rgba(0,0,0,0.4))]" />
              <Link href="/" className="ml-2 text-2xl font-bold text-white hover:text-red-200 transition-colors duration-300">
                БГБ Банк
              </Link>
            </div>
            <Link href="/" className="hover:text-red-200 hover:text-shadow-[7px_8px_12px_rgba(0,0,0,0.2)] transition-all duration-300">
              Вход в аккаунт
            </Link>
          </header>

    )
  }
  