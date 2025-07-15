'use client'

import { useEffect, useState } from 'react'

export default function ThemeToggleButton() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const theme = localStorage.getItem('theme')
      if (theme === 'dark') {
        document.documentElement.classList.add('dark')
        setIsDark(true)
      }
    }
  }, [])

  const toggleTheme = () => {
    const html = document.documentElement
    if (html.classList.contains('dark')) {
      html.classList.remove('dark')
      localStorage.setItem('theme', 'light')
      setIsDark(false)
    } else {
      html.classList.add('dark')
      localStorage.setItem('theme', 'dark')
      setIsDark(true)
    }
  }

  return (
    <div className="md:-mr-[15px] mt-1 -mr-0 flex flex-col items-center space-y-1">
      <label className="relative inline-flex items-center cursor-pointer w-12 sm:w-14 md:w-16 h-5 sm:h-6 md:h-7">
        <input 
          type="checkbox" 
          checked={isDark}
          onChange={toggleTheme}
          className="sr-only peer" 
        />
        
        {/* Фон переключателя */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 peer-checked:from-stone-600 peer-checked:to-blue-800 transition-all duration-500 shadow-md shadow-gray-400/30 dark:shadow-stone-900/50"></div>
        
        {/* Ползунок */}
        <div className={`
          absolute top-0.5 sm:top-0.5 md:top-0.5  h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 rounded-full bg-white shadow-lg transition-all duration-500
          ${isDark ? 'left-0.5 sm:left-1 md:left-1' : 'left-7 sm:left-8 md:left-9'}
          hover:scale-105
        `}></div>
      </label>

      {/* Текст с адаптацией под экраны */}
      <div className="flex w-full justify-between px-4 sm:px-6 md:px-8 items-center h-full text-[11px] sm:text-[11px] md:text-[11px] font-medium tracking-wide">
        <span className={`
          italic transition-all duration-300 text-cyan-400 drop-shadow-sm 
          ${isDark ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-1'}
        `}>Темная</span>
        <span className={`
          italic transition-all duration-300 text-rose-900 drop-shadow-sm
          ${isDark ? 'opacity-0 translate-x-1' : 'opacity-100 translate-x-0'}
        `}>Светлая</span>
      </div>
    </div>
  )
}