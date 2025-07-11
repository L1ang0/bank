'use client'
import Link from 'next/link'
import Image from 'next/image'
export default function Header({ onMenuClick }: { onMenuClick: () => void }) {
    return (
            <header className="flex items-center justify-between bg-gradient-to-r from-red-500 to-red-400 text-white px-6 py-1 shadow">
            <div className="flex items-center">
              <button onClick={onMenuClick} className="text-white md:text-2xl sm:text-[24px] text-[22px] md:w-10 sm:w-9 w-8 md:h-10 sm:h-9 h-8 rounded-full bg-[#ff5555]/80 hover:scale-105 hover:shadow-[7px_8px_12px_rgba(0,0,0,0.2)] transition-all duration-300 cursor-pointer">
              <span className="inline-block hover:rotate-180 transition-transform duration-500">
                &#9776;
              </span>
              </button>
              <Image src="/logo.png" alt="Bank Logo" width={140} height={60}  className="md:h-17 sm:h-14 h-14 md:w-35 sm:w-30 w-30 md:ml-2 sm:ml-0 -ml-2 animate-[pulse_2.5s_ease-in-out_infinite] [filter:drop-shadow(0_10px_15px_rgba(0,0,0,0.4))]" />
              <Link href="/" className="md:ml-2 ms:-ml-2 -ml-5 md:text-2xl sm:text-[18px] text-[14px] font-bold text-white hover:text-red-200 transition-colors duration-300">
                БГБ Банк
              </Link>
            </div>
            <Link href="/" className="hover:text-red-200 md:text-[20px] sm:text-[18px] text-[13px] bg-gradient-to-r rounded-2xl p-1 from-[#ff1a1a7a] to-[#ff2a2aa4] hover:text-shadow-[7px_8px_12px_rgba(0,0,0,0.2)] transition-all duration-300">
              Вход в аккаунт
            </Link>
          </header>

    )
  }
  