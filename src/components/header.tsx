'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { createSupabaseBrowserClient } from '@/lib/supabase/client'
import { useUserActivity } from '@/hooks/useUserActivity'
import { motion } from 'framer-motion'
import { User } from '@supabase/supabase-js'

export default function Header({ onMenuClick }: { onMenuClick: () => void }) {
  const [currentTime, setCurrentTime] = useState({ hours: '00', minutes: '00', seconds: '00' })
  const [user, setUser] = useState<User | null>(null)
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const supabase = createSupabaseBrowserClient()

  const {
    userStatus,
    updateActivity,
    getStatusColor
  } = useUserActivity()

  // Обновление времени каждую секунду
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setCurrentTime({
        hours: now.getHours().toString().padStart(2, '0'),
        minutes: now.getMinutes().toString().padStart(2, '0'),
        seconds: now.getSeconds().toString().padStart(2, '0'),
      })
    }
    updateTime()
    const timerId = setInterval(updateTime, 1000)
    return () => clearInterval(timerId)
  }, [])

  // Получение пользователя и его аватара
  useEffect(() => {
    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user)
        setAvatarUrl(session.user.user_metadata?.avatar_url || null)
      } else {
        setUser(null)
        setAvatarUrl(null)
      }
    })
  
    return () => {
      subscription?.subscription.unsubscribe()
    }
  }, [supabase])
  

  return (
    <header className="flex items-center justify-between bg-gradient-to-r from-red-500 to-red-400 dark:bg-gradient-to-r dark:from-blue-500 dark:to-blue-400 text-white dark:text-blue-100 px-6 py-1 shadow"
    onClick={updateActivity}
    onMouseMove={updateActivity}
    onKeyPress={updateActivity}
    onScroll={updateActivity}
    onTouchStart={updateActivity}
    >
      
      {/* Левая часть: меню и логотип */}
      <div className="flex items-center">
        <button
          onClick={onMenuClick}
          className="text-white dark:text-blue-100 md:text-2xl sm:text-[24px] text-[22px] md:w-10 sm:w-9 w-8 md:h-10 sm:h-9 h-8 rounded-full bg-[#ff5555]/80 dark:bg-[#4444ff]/80 hover:scale-105 shadow-[6px_4px_8px_rgba(0,0,0,0.2)] hover:shadow-[7px_8px_12px_rgba(0,0,0,0.2)] transition-all duration-300 cursor-pointer"
        >
          <span className="inline-block text-center hover:rotate-180 transition-transform duration-500">
            &#9776;
          </span>
        </button>

        <Image
          src="/logo.png"
          alt="Bank Logo"
          width={140}
          height={60}
          className="md:h-17 sm:h-14 h-14 md:w-35 sm:w-30 w-30 md:ml-2 sm:ml-0 -ml-5 dark:sepia-[0.3] dark:hue-rotate-[210deg] dark:saturate-200 animate-[pulse_2.5s_ease-in-out_infinite] [filter:drop-shadow(0_10px_15px_rgba(0,0,0,0.4))]"
          priority
        />

        <Link
          href="/"
          className="md:ml-2 ms:-ml-2 -ml-5 md:text-2xl sm:text-[18px] text-[14px] font-bold text-white dark:text-blue-100 hover:text-red-200 dark:hover:text-blue-200 transition-colors duration-300 text-shadow-[7px_2px_6px_rgba(0,0,0,0.2)] hover:text-shadow-[11px_5px_9px_rgba(0,0,0,0.2)]"
        >
          БГБ Банк
        </Link>
      </div>

      {/* Правая часть: часы и аватар/вход */}
      <div className="flex items-center gap-12">
        
        {/* Часы */}
        <div className="hidden sm:flex items-center rounded-lg px-3 py-1 bg-gradient-to-br from-[#ffffffaf]/20 via-[#da0000af]/60 to-[#da0000af]/30 dark:from-[#ffffffaf]/20 dark:via-[#0000daaf]/60 dark:to-[#0000daaf]/30 border border-[#ffffff]/30 border-b-[#ff0f0f]/50 border-r-[#ff0f0f]/50 dark:border-[#ffffff]/30 dark:border-b-[#0f0fff]/50 dark:border-r-[#0f0fff]/50 shadow-[inset_0_1px_2px_rgba(255,255,255,0.8),12px_6px_12px_rgba(255,50,50,0.7)] dark:shadow-[inset_0_1px_2px_rgba(255,255,255,0.8),12px_6px_12px_rgba(50,50,255,0.7)] hover:shadow-[inset_0_1px_2px_rgba(255,255,255,0.4),0_0_16px_rgba(255,80,80,0.7)] dark:hover:shadow-[inset_0_1px_2px_rgba(255,255,255,0.4),0_0_16px_rgba(80,80,255,0.7)] backdrop-blur-sm transition-all duration-300">
          <span className="font-mono text-white text-lg sm:text-[16px] md:text-xl font-medium tracking-tighter">
            <span className="text-red-200">{currentTime.hours}</span>
            <span className="text-white/80 mx-0.5 animate-pulse">:</span>
            <span className="text-green-200">{currentTime.minutes}</span>
            <span className="text-white/80 mx-0.5 animate-pulse">:</span>
            <span className="text-blue-200">{currentTime.seconds}</span>
          </span>
        </div>

        {/* Аватар или кнопка входа */}
        {user ? (
          <Link href="/profile">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-red-500 to-orange-500 dark:from-cyan-500 dark:via-blue-500 dark:to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />
              
              <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-400 to-orange-400 dark:from-cyan-400 dark:to-purple-400 rounded-full blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
              
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-white/80 dark:border-blue-200/80 cursor-pointer transition-all duration-300 group-hover:scale-110 group-hover:border-white dark:group-hover:border-blue-200 group-hover:shadow-2xl group-hover:shadow-pink-400/50 dark:group-hover:shadow-blue-400/50 backdrop-blur-sm">
                {avatarUrl ? (
                  <Image 
                    src={avatarUrl} 
                    alt="Avatar" 
                    width={64} 
                    height={64} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 text-white">
                    {/* Анимированные инициалы */}
                    <span className="text-xl font-semibold transition-transform duration-300 group-hover:scale-125">
                      {user.email?.[0]?.toUpperCase() || '👤'}
                    </span>
                  </div>
                )}
                
                {/* Индикатор онлайн статуса */}
                  <div className="absolute bottom-2 right-2 z-10">
                  <div className="relative w-2.5 h-2.5">
                    {userStatus === 'online' && (
                      <motion.span
                        animate={{ 
                          scale: [1, 1.5, 1],
                          opacity: [1, 0.5, 0]
                        }}
                        transition={{ 
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeOut"
                        }}
                        className="absolute inset-0 rounded-full bg-green-500 dark:bg-emerald-400"
                      />
                    )}
                    {userStatus === 'idle' && (
                      <motion.span
                        animate={{ 
                          scale: [1, 1.1, 1],
                          opacity: [1, 0.7, 1]
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className="absolute inset-0 rounded-full bg-yellow-500 dark:bg-amber-400"
                      />
                    )}
                    <motion.span 
                      className={`absolute inset-0 rounded-full ${getStatusColor()} border-1 border-white/20 dark:border-gray-900/20 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                      whileHover={{ scale: 1.1 }}
                    />
                  </div>
                </div>
              </div>

              {/* Всплывающая подсказка */}
              <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="bg-black/90 dark:bg-white/10 text-white dark:text-gray-200 text-xs px-3 py-1 rounded-lg whitespace-nowrap backdrop-blur-sm border border-white/20">
                  Профиль
                  <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-black/90 dark:bg-white/10 rotate-45 border-t border-l border-white/20" />
                </div>
              </div>
            </div>
          </Link>
        ) : (
          <Link
            href="/login"
            className="relative group overflow-hidden dark:hover:text-blue-200 hover:text-red-200 md:text-[20px] sm:text-[18px] text-[13px] rounded-2xl pl-4 pr-4 p-1 bg-gradient-to-r from-[#ff1a1a7a]/40 to-[#ff2a2aa4]/30 dark:bg-gradient-to-r dark:from-[#1a1aff7a]/40 dark:to-[#2a2affa4]/30 hover:text-shadow-[7px_8px_12px_rgba(0,0,0,0.2)] transition-all duration-300 border border-[#ffffff]/20 border-b-[#ff0f0f]/40 border-r-[#ff0f0f]/40 dark:border-[#ffffff]/20 dark:border-b-[#0f0fff]/40 dark:border-r-[#0f0fff]/40 shadow-[inset_0_1px_2px_rgba(255,255,255,0.8),12px_6px_12px_rgba(255,50,50,0.7)] dark:shadow-[inset_0_1px_2px_rgba(255,255,255,0.8),12px_6px_12px_rgba(50,50,255,0.7)] hover:shadow-[inset_0_1px_2px_rgba(255,255,255,0.4),0_0_16px_rgba(255,80,80,0.7)] backdrop-blur-sm dark:hover:shadow-[inset_0_1px_2px_rgba(255,255,255,0.4),0_0_16px_rgba(80,80,255,0.7)]"
          >
            {/* Анимация фона */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 group-hover:animate-shine" />
            
            <span className="relative z-10 flex items-center gap-2">
              <svg className="w-4 h-4 group-hover:animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Вход в аккаунт
            </span>
          </Link>
        )}
      </div>
    </header>
  )
}