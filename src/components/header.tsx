'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function Header({ onMenuClick }: { onMenuClick: () => void }) {
  const [currentTime, setCurrentTime] = useState({
    hours: '00',
    minutes: '00',
    seconds: '00'
  })

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setCurrentTime({
        hours: now.getHours().toString().padStart(2, '0'),
        minutes: now.getMinutes().toString().padStart(2, '0'),
        seconds: now.getSeconds().toString().padStart(2, '0')
      })
    }

    updateTime()
    const timerId = setInterval(updateTime, 1000)
    return () => clearInterval(timerId)
  }, [])

    return (
            <header className="flex items-center justify-between bg-gradient-to-r from-red-500 to-red-400 dark:bg-gradient-to-r dark:from-blue-500 dark:to-blue-400 text-white dark:text-blue-100 px-6 py-1 shadow">
            <div className="flex items-center">
              <button onClick={onMenuClick} className="text-white dark:text-blue-100 md:text-2xl sm:text-[24px] text-[22px] md:w-10 sm:w-9 w-8 md:h-10 sm:h-9 h-8 rounded-full bg-[#ff5555]/80 dark:bg-[#4444ff]/80 hover:scale-105 hover:shadow-[7px_8px_12px_rgba(0,0,0,0.2)] transition-all duration-300 cursor-pointer">
              <span className="inline-block hover:rotate-180 transition-transform duration-500">
                &#9776;
              </span>
              </button>
              <Image src="/logo.png" alt="Bank Logo" width={140} height={60}  className="md:h-17 sm:h-14 h-14 md:w-35 sm:w-30 w-30 md:ml-2 sm:ml-0 -ml-2 
              dark:sepia-[0.3] dark:hue-rotate-[210deg] dark:saturate-200 animate-[pulse_2.5s_ease-in-out_infinite] [filter:drop-shadow(0_10px_15px_rgba(0,0,0,0.4))]" />
              <Link href="/" className="md:ml-2 ms:-ml-2 -ml-5 md:text-2xl sm:text-[18px] text-[14px] font-bold text-white dark:text-blue-100 hover:text-red-200
              dark:hover:text-blue-200 transition-colors duration-300">
                БГБ Банк
              </Link>
            </div>
            <div className="flex items-center gap-12">
            <div className="hidden sm:flex items-center rounded-lg px-3 py-1 
              bg-gradient-to-br from-[#ffffffaf]/20 via-[#da0000af]/60 to-[#da0000af]/30
              dark:from-[#ffffffaf]/20 dark:via-[#0000daaf]/60 dark:to-[#0000daaf]/30
              border border-[#ffffff]/30 border-b-[#ff0f0f]/50 border-r-[#ff0f0f]/50
              dark:border-[#ffffff]/30 dark:border-b-[#0f0fff]/50 dark:border-r-[#0f0fff]/50
              shadow-[inset_0_1px_2px_rgba(255,255,255,0.8),12px_6px_12px_rgba(255,50,50,0.7)]
              dark:shadow-[inset_0_1px_2px_rgba(255,255,255,0.8),12px_6px_12px_rgba(50,50,255,0.7)]
              hover:shadow-[inset_0_1px_2px_rgba(255,255,255,0.4),0_0_16px_rgba(255,80,80,0.7)]
              dark:hover:shadow-[inset_0_1px_2px_rgba(255,255,255,0.4),0_0_16px_rgba(80,80,255,0.7)]
              backdrop-blur-sm transition-all duration-300">
            
              <span className="font-mono text-white text-lg sm:text-[16px] md:text-xl font-medium tracking-tighter">
                <span className="text-red-200 hover:text-red-50 transition-all duration-200 hover:scale-110 hover:text-[20.3px] hover:drop-shadow-[0_0_8px_rgba(255,100,100,0.8)]">
                  {currentTime.hours}
                </span>
                <span className="text-white/80 mx-0.5 animate-pulse">:</span>
                <span className="text-green-200 hover:text-green-50 transition-all duration-200 hover:scale-110 hover:text-[20.3px] hover:drop-shadow-[0_0_8px_rgba(100,255,100,0.8)]">
                  {currentTime.minutes}
                </span>
                <span className="text-white/80 mx-0.5 animate-pulse">:</span>
                <span className="text-blue-200 hover:text-blue-50 transition-all duration-200 hover:scale-110 hover:text-[20.3px] hover:drop-shadow-[0_0_8px_rgba(100,100,255,0.8)]">
                  {currentTime.seconds}
                </span>
              </span>
            </div>
            <Link href="/" className="dark:hover:text-blue-200 hover:text-red-200 md:text-[20px] sm:text-[18px] text-[13px] rounded-2xl p-1 bg-gradient-to-r from-[#ff1a1a7a]/40 to-[#ff2a2aa4]/30
            dark:bg-gradient-to-r dark:from-[#1a1aff7a]/40 dark:to-[#2a2affa4]/30 hover:text-shadow-[7px_8px_12px_rgba(0,0,0,0.2)] transition-all duration-300
            border border-[#ffffff]/20 border-b-[#ff0f0f]/40 border-r-[#ff0f0f]/40
            dark:border-[#ffffff]/20 dark:border-b-[#0f0fff]/40 dark:border-r-[#0f0fff]/40
            shadow-[inset_0_1px_2px_rgba(255,255,255,0.8),12px_6px_12px_rgba(255,50,50,0.7)]
            dark:shadow-[inset_0_1px_2px_rgba(255,255,255,0.8),12px_6px_12px_rgba(50,50,255,0.7)]
            hover:shadow-[inset_0_1px_2px_rgba(255,255,255,0.4),0_0_16px_rgba(255,80,80,0.7)] backdrop-blur-sm
            dark:hover:shadow-[inset_0_1px_2px_rgba(255,255,255,0.4),0_0_16px_rgba(80,80,255,0.7)]">
              Вход в аккаунт
            </Link>
            </div>
          </header>

    )
  }
  