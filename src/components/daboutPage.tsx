'use client'

import { motion } from 'framer-motion'
import React from 'react'
import dynamic from 'next/dynamic'
import { useMapData } from '@/hooks/useMapData'
import Calendar from '@/components/Calendar'
import Image from 'next/image'
import { partners, workingHours, colors } from '@/data/DaboutPage';
import { exchangePoints } from '@/data/exchangePoints'

const MapWithNoSSR = dynamic(
  () => import('@/components/mapComponent').then((mod) => mod.default),
  { 
    ssr: false,
    loading: () => (
      <div className="h-[500px] bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-2xl animate-pulse" />
    )
  }
)

const LoadingState = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="fixed inset-0 flex items-center justify-center bg-gray-100/90 dark:bg-gray-900/90 z-50 backdrop-blur-sm"
  >
    <motion.div
      initial={{ scale: 0.95, y: 10 }}
      animate={{ scale: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className="text-center p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-md w-full mx-4 border border-gray-200 dark:border-gray-700"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1.8, ease: 'linear' }}
        className="text-5xl mb-5"
      >
        🌍
      </motion.div>
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">Загружаем карту</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-4">Ищем лучшие курсы валют для вас...</p>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: '100%' }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        className="h-2 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full"
      />
    </motion.div>
  </motion.div>
)

const ErrorState = ({ onRetry }: { onRetry: () => void }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="fixed inset-0 flex items-center justify-center bg-gray-100/90 dark:bg-gray-900/90 z-50 backdrop-blur-sm"
  >
    <motion.div
      initial={{ scale: 0.95 }}
      animate={{ scale: 1 }}
      className="text-center p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-md w-full mx-4 border border-red-200 dark:border-red-900/50"
    >
      <motion.div
        animate={{ scale: [1, 1.1, 1], rotate: [0, -5, 5, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="text-5xl mb-5 text-red-500"
      >
        ❗
      </motion.div>
      <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-3">Ошибка загрузки</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">Не удалось загрузить данные карты. Пожалуйста, попробуйте снова.</p>
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="px-8 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl shadow-md hover:shadow-lg transition-all font-medium"
        onClick={onRetry}
      >
        Попробовать снова
      </motion.button>
    </motion.div>
  </motion.div>
)

export default function DaboutPage() {
  const { mapData, isLoading, isError } = useMapData()


  if (isLoading) return <LoadingState />
  if (isError) return <ErrorState onRetry={() => window.location.reload()} />

  const defaultCenter = mapData?.defaultLocation || { lat: 53.9045, lng: 27.5615 }

  return (
    <div className=" mx-auto px-4 py-8 w-full space-y-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 min-h-screen">
      <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="text-center relative pt-7 pb-3 mb-6 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700"
  >
    {/* Анимированная градиентная полоса с пульсацией */}
    <motion.div 
      className="absolute inset-x-0 top-1/2 h-0.5 bg-gradient-to-r from-transparent via-rose-400 dark:via-blue-400 to-transparent"
    />
  
  <div className="inline-block relative mb-8">
    <motion.div 
      className="absolute -inset-1 bg-gradient-to-r from-rose-400 to-red-500 dark:from-blue-400 dark:to-indigo-600 rounded-lg blur opacity-75"

    />
    
    <motion.h1 
      className="relative text-[19px] sm:text-3xl md:text-5xl font-bold bg-white dark:bg-gray-900 px-8 py-4 rounded-lg"
      whileHover={{ 
        y: -3,
        transition: { type: "spring", stiffness: 300 }
      }}

    >
      <span className="bg-gradient-to-r dark:from-blue-400 dark:via-indigo-400 dark:to-blue-500 from-rose-500 via-red-500 to-rose-600 bg-clip-text text-transparent">
        Обмен валют
      </span> <span className="text-gray-700 dark:text-white"> в Минске</span>
    </motion.h1>
  </div>
  
  <motion.p 
    className=" text-[15px] sm:text-[17px] md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto relative italic font-serif max-sm:ml-5 max-sm:mr-5
     max-sm:underline max-sm:decoration-rose-400 dark:max-sm:decoration-indigo-400 max-sm:decoration-2 max-sm:underline-offset-4 max-sm:decoration-dotted"
    whileHover={{ scale: 1.02 }}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.3 }}
  >
    <motion.span 
      className="absolute sm:left-12 md:left-15 top-0 text-rose-400 dark:text-blue-400 text-2xl max-sm:hidden "
      animate={{ y: [-2, 2, -2] }}
      transition={{ duration: 3, repeat: Infinity }}
    >“</motion.span>
    Находите лучшие курсы и проверенные обменные пункты
    <motion.span 
      className="absolute sm:right-12 md:right-15 bottom-0 text-rose-400 dark:text-blue-400 text-2xl max-sm:hidden "
      animate={{ y: [2, -2, 2] }}
      transition={{ duration: 3, repeat: Infinity, delay: 1 }}
    >”</motion.span>
  </motion.p>
</motion.div>

      {/* Основной блок с картой и списком */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700"
      >
      {/* Заголовок блока */}
      <motion.div 
        className="p-6 bg-gradient-to-r from-[#f6183d] via-[#f43f5e] to-[#fa2727] dark:from-[#3b82f6] dark:via-[#6366f1] dark:to-[#8b5cf6]"
      >
        <motion.h2
          whileHover={{ x: 15, scale: 1.01 }}
          className="text-[15px] sm:text-2xl md:text-3xl font-bold text-white flex items-center"
        >
          <span className="mr-3">🗺️</span>
          Карта обменных пунктов Минска
        </motion.h2>
      </motion.div>

        <div className="flex flex-col lg:flex-row">
          {/* Карта с анимированной границей */}
          <div className="w-full lg:w-2/3 p-4">
            <motion.div
            className={`p-[3px] rounded-2xl overflow-hidden bg-gradient-to-r dark:from-${colors[0]} dark:via-${colors[1]} dark:to-${colors[2]}
            from-${colors[3]} via-${colors[4]} to-${colors[5]}`}
            >
              <div className="relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden h-full shadow-lg">
                <div className="h-[500px] w-full">
                  <MapWithNoSSR center={defaultCenter} />
                </div>
              </div>
            </motion.div>
            <div className="px-4 py-3 text-[12px] sm:text-sm text-white dark:text-gray-300 flex justify-between items-center bg-gradient-to-r from-[rgba(220,38,38,0.9)] to-[rgba(255,38,38,0.8)] dark:bg-gradient-to-l dark:from-[rgba(29,78,216,0.7)] dark:to-[rgba(150,78,255,0.9)] rounded-lg mt-2">
              <span className='sm:hover:text-[14.5px] text-[11px] sm:text-sm transition-all duration-400'>Центр карты: {defaultCenter.lat.toFixed(4)}, {defaultCenter.lng.toFixed(4)}</span>
              <span className="flex items-center sm:hover:text-[14.5px] transition-all duration-400">
                <span className="mr-1">🗺️</span> OpenStreetMap
              </span>
            </div>
          </div>

          {/* Список обменников */}
          <div className="w-full lg:w-1/3 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 p-6 border-l border-gray-200 dark:border-gray-700">
            <div className="flex items-center mb-6">
              <div className="w-4 h-4 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mr-3 animate-pulse"></div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Обменники</h2>
            </div>
            
            <div className="overflow-y-auto max-h-[500px] pr-3 custom-scrollbar">
              <ul className="space-y-4">
                {/* Центральный банк */}
                <motion.li 
                  whileHover={{ x: 5, scale: 1.01 }}
                  className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md border-2 border-red-200 dark:border-red-900/50"
                >
                  <div className="flex items-start">
                    <div className="w-3 h-3 bg-red-500 rounded-full mt-1 mr-3 flex-shrink-0 animate-pulse"></div>
                    <div>
                      <h3 className="font-bold text-red-600 dark:text-red-400">Центральный банк</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">пр. Независимости, 20</p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {['USD', 'EUR', 'RUB', 'CNY'].map(currency => (
                          <motion.span 
                            key={currency}
                            whileHover={{ scale: 1.1 }}
                            className="text-xs px-3 py-1 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-full border border-red-200 dark:border-red-800"
                          >
                            {currency}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.li>

                {/* Другие обменники */}
                {exchangePoints.slice(0, 6).map((point) => (
                  <motion.li
                    key={point.id}
                    whileHover={{ x: 5, scale: 1.01 }}
                    className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 hover:border-[rgba(29,78,216,0.7)]"
                  >
                    <div className="flex items-start">
                      <div className="w-3 h-3 bg-blue-400 rounded-full mt-1 mr-3 flex-shrink-0"></div>
                      <div>
                        <h3 className="font-medium text-gray-800 dark:text-gray-200">{point.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{point.address.split(',')[0]}</p>
                        <div className="flex flex-wrap gap-2 mt-3">
                          {point.currencies.split(', ').slice(0, 3).map(currency => (
                            <motion.span 
                              key={currency}
                              whileHover={{ scale: 1.1 }}
                              className="text-xs px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full border border-blue-200 dark:border-blue-800"
                            >
                              {currency}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Блок с графиком и календарем */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true, margin: "0px" }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* График работы */}
        <motion.div 
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700"
          whileHover={{ y: -5 }}
        >
          <div className="p-6 bg-gradient-to-r from-red-500 via-[#fa3939] to-[#f45648] dark:from-blue-500 dark:via-blue-600 dark:to-indigo-600">
            <div className="flex items-center">
              <span className="text-2xl sm:text-3xl mr-4 text-white">⏰</span>
              <h3 className="text-xl sm:text-2xl font-bold text-white">График работы</h3>
            </div>
          </div>
          <div className="p-6">
            <ul className="space-y-3">
              {workingHours.map((item, index) => (
                <motion.li
                  key={index}
                  whileHover={{ scale: 1.02, x: 5 }}
                  className={`flex justify-between items-center p-4 rounded-xl ${item.color} shadow-sm`}
                >
                  <div className="flex items-center">
                    <span className="text-xl mr-3">{item.emoji}</span>
                    <span className="text-gray-700 dark:text-gray-300 font-medium">{item.day}</span>
                  </div>
                  <span className="font-medium text-blue-600 dark:text-blue-400 bg-white dark:bg-gray-700 px-3 py-1 rounded-full text-sm">
                    {item.time}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Рабочий календарь */}
        <motion.div 
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700"
          whileHover={{ y: -5 }}
        >
          <div className="p-6 bg-gradient-to-r from-red-500 via-[#fa3939] to-[#f45648] dark:from-indigo-600 dark:via-blue-600 dark:to-blue-500">
            <div className="flex items-center">
              <span className="text-2xl sm:text-3xl mr-4 text-white">📅</span>
              <h3 className="text-xl sm:text-2xl font-bold text-white">Рабочий календарь</h3>
            </div>
          </div>
          <div className="p-6">
            <Calendar />
          </div>
        </motion.div>
      </motion.div>

      {/* Партнеры */}
            <div className="relative rounded-3xl overflow-hidden border border-gray-200 dark:border-white/10 bg-white dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800/90 shadow-lg dark:shadow-none">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">

          <div className="absolute -top-20 -left-20 w-64 h-64 bg-gradient-to-br from-indigo-500/15 to-blue-600/10 rounded-full filter blur-[90px] dark:opacity-100 opacity-0" />
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-gradient-to-br from-purple-600/15 to-pink-500/10 rounded-full filter blur-[90px] dark:opacity-100 opacity-0" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-emerald-500/10 to-teal-600/10 rounded-full filter blur-[100px] dark:opacity-100 opacity-0" />

          <div className="absolute -top-20 -left-20 w-64 h-64 bg-gradient-to-br from-blue-100/70 to-indigo-100/70 rounded-full filter blur-[90px] dark:opacity-0 opacity-100" />
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-gradient-to-br from-purple-100/70 to-pink-100/70 rounded-full filter blur-[90px] dark:opacity-0 opacity-100" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-emerald-100/70 to-teal-100/70 rounded-full filter blur-[100px] dark:opacity-0 opacity-100" />
        </div>

        <div className="relative z-10 p-8 md:p-12 lg:p-16">
          <div className="text-center mb-14">
          <motion.h3 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{
            scale: 1.03,
            transition: { duration: 0.3, ease: "easeOut" }
          }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-rose-500 dark:text-blue-500 mb-5 bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 dark:from-blue-300 dark:via-indigo-300 dark:to-blue-400 cursor-default"
        >
          Наши партнёры
        </motion.h3>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          whileHover={{
            scaleX: 1.1,
            width: "220px",
            transition: { duration: 0.4, ease: "easeOut" }
          }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="w-40 h-1 bg-gradient-to-r from-transparent via-rose-500 to-transparent dark:via-blue-400 mx-auto mb-8 origin-center"
        />
            
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-gray-600 dark:text-blue-100/90 max-w-2xl mx-auto text-lg md:text-xl font-light tracking-wide leading-relaxed"
            >
              Ведущие финансовые учреждения, которые доверяют нам
            </motion.p>
          </div>
          
          {/* Сетка партнеров */}
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-4 sm:gap-6 md:gap-8">
            {partners.map((partner, index) => {
              const lightColorClass = index % 3 === 0 ? 'from-blue-50 to-indigo-50' : 
                                    index % 3 === 1 ? 'from-purple-50 to-fuchsia-50' : 
                                    'from-emerald-50 to-teal-50';
              
              const lightBorderClass = index % 3 === 0 ? 'border-blue-200' : 
                                    index % 3 === 1 ? 'border-purple-200' : 
                                    'border-emerald-200';
              
              const lightHoverClass = index % 3 === 0 ? 'hover:border-blue-300 hover:shadow-blue-500/20' : 
                                    index % 3 === 1 ? 'hover:border-purple-300 hover:shadow-purple-500/20' : 
                                    'hover:border-emerald-300 hover:shadow-emerald-500/20';
              
              const darkColorClass = index % 3 === 0 ? 'dark:from-blue-500/10 dark:to-indigo-600/10' : 
                                  index % 3 === 1 ? 'dark:from-purple-500/10 dark:to-fuchsia-600/10' : 
                                  'dark:from-emerald-500/10 dark:to-teal-600/10';
              
              const darkBorderClass = index % 3 === 0 ? 'dark:border-blue-400/20' : 
                                    index % 3 === 1 ? 'dark:border-purple-400/20' : 
                                    'dark:border-emerald-400/20';
              
              const darkHoverClass = index % 3 === 0 ? 'dark:hover:border-blue-400/40 dark:hover:shadow-blue-500/10' : 
                                  index % 3 === 1 ? 'dark:hover:border-purple-400/40 dark:hover:shadow-purple-500/10' : 
                                  'dark:hover:border-emerald-400/40 dark:hover:shadow-emerald-500/10';
              
              return (
                <motion.div
                  key={partner.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ 
                    y: -10,
                    transition: { 
                      type: "spring",
                      stiffness: 500,
                      damping: 15,
                      delay: 0
                    } 
                  }}
                  transition={{ 
                    duration: 0.3,
                    delay: 0
                  }}
                  viewport={{ once: true }}
                  className={`group relative rounded-2xl bg-gradient-to-br ${lightColorClass} ${darkColorClass} backdrop-blur-md border ${lightBorderClass} ${darkBorderClass} ${lightHoverClass} ${darkHoverClass} transition-all duration-300 hover:shadow-xl dark:hover:shadow-xl`}
                >
                  <div className="h-full p-3 sm:p-6 flex flex-col items-center justify-center text-center">
                  <a 
                    href={partner.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full flex flex-col items-center"
                  >
                    <div className="w-24 h-24 mb-5 flex items-center justify-center p-2">
                    <Image 
                      src={partner.logo} 
                      alt={partner.name}
                      width={96}
                      height={96}
                      className={`max-h-full max-w-full object-contain opacity-90 grayscale brightness-110 contrast-110 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-200 ${
                        index % 3 === 0 ? 'group-hover:brightness-110 dark:group-hover:brightness-110' : 
                        index % 3 === 1 ? 'group-hover:contrast-110 dark:group-hover:contrast-110' : 
                        'group-hover:brightness-105 dark:group-hover:brightness-105'
                      }`}
                      loading="lazy"
                      unoptimized={true}
                    />
                  </div>
                    <span className={`text-gray-700 dark:text-white/90 font-medium text-sm md:text-base tracking-wide text-center transition-all duration-200 ${
                      index % 3 === 0 ? 'group-hover:text-blue-600 dark:group-hover:text-blue-200' : 
                      index % 3 === 1 ? 'group-hover:text-purple-600 dark:group-hover:text-purple-200' : 
                      'group-hover:text-emerald-600 dark:group-hover:text-emerald-200'
                    }`}>
                      {partner.name}
                    </span>
                    </a>
                  </div>
                  
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

{/* Блок обратной связи и контактов */}
<motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
  viewport={{ once: true, margin: "-100px" }}
  className="relative rounded-3xl shadow-2xl overflow-hidden border border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-br from-white/30 to-blue-50/20 dark:from-gray-900/80 dark:to-gray-800/90 backdrop-blur-sm"
>
  <motion.div 
    className="absolute inset-0 z-0 overflow-hidden"
    viewport={{ once: true }}
  >
    <div className="absolute inset-0 w-full h-full">
      <Image
        src="/contact-bg.jpg"
        alt="Фон формы обратной связи"
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        quality={90}
        className="object-cover object-center md:object-[center_30%] opacity-60 dark:opacity-40"
        priority
      />
    </div>
    <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-blue-50/70 to-indigo-100/70 dark:from-gray-900/90 dark:via-gray-800/95 dark:to-gray-900"></div>
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-white/40 to-transparent dark:via-black/30"></div>
  </motion.div>

  <div className="relative z-10">
    {/* Секция формы */}
    <div className="p-5 sm:p-8 md:p-12 lg:p-12">
      <div className="text-center mb-8 sm:mb-12">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          viewport={{ once: true }}
          className="inline-block mb-2 sm:mb-4"
        >
          <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-r from-rose-500 to-red-600 dark:from-blue-500 dark:to-indigo-600 flex items-center justify-center shadow-lg mx-auto hover:scale-120 hover:rounded-3xl transition-all duration-450">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
          </div>
        </motion.div>
        
        <motion.h3 
          className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-3 font-[Inter] tracking-tight"
          initial={{ y: 10, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
        >
          <span className="bg-gradient-to-r from-rose-500 to-red-600 dark:from-blue-500 dark:to-indigo-600 bg-clip-text text-transparent">
            Свяжитесь с нами
          </span>
        </motion.h3>
        
        <motion.p 
          className="text-[17px] sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed"
          initial={{ y: 10, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
        >
          Мы готовы ответить на все ваши вопросы и предложения
        </motion.p>
      </div>
      
      <form className="max-w-3xl mx-auto space-y-4 sm:space-y-8">
        <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            whileHover={{ y: -4 }}
            className="relative group"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-rose-200 to-red-300 dark:from-blue-400 dark:to-indigo-500 rounded-xl blur opacity-0 group-hover:opacity-75 transition duration-500 group-hover:duration-200"></div>
            <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-1 shadow-lg border border-gray-200/30 dark:border-gray-700/30">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 px-3 pt-2">
                Ваше имя <span className="text-rose-400 dark:text-blue-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-200/80 dark:border-gray-700/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700/30 dark:text-white transition-all placeholder-gray-400/60"
                placeholder="Иван Иванов"
              />
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ x: 20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
            whileHover={{ y: -4 }}
            className="relative group"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-rose-200 to-red-300 dark:from-blue-400 dark:to-indigo-500 rounded-xl blur opacity-0 group-hover:opacity-75 transition duration-500 group-hover:duration-200"></div>
            <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-1 shadow-lg border border-gray-200/30 dark:border-gray-700/30">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 px-3 pt-2">
                Email <span className="text-rose-400 dark:text-blue-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-200/80 dark:border-gray-700/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700/30 dark:text-white transition-all placeholder-gray-400/60"
                placeholder="example@mail.com"
              />
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ y: 10, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          whileHover={{ y: -4 }}
          className="relative group"
        >
          <div className="absolute -inset-0.5 bg-gradient-to-r from-rose-200 to-red-300 dark:from-blue-400 dark:to-indigo-500 rounded-xl blur opacity-0 group-hover:opacity-75 transition duration-500 group-hover:duration-200"></div>
          <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-1 shadow-lg border border-gray-200/30 dark:border-gray-700/30">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 px-3 pt-2">
              Телефон
            </label>
            <input
              type="tel"
              id="phone"
              className="w-full px-4 py-3 rounded-lg border border-gray-200/80 dark:border-gray-700/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700/30 dark:text-white transition-all placeholder-gray-400/60"
              placeholder="+375 (29) 123-45-67"
            />
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ y: 10, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          whileHover={{ y: -4 }}
          className="relative group"
        >
          <div className="absolute -inset-0.5 bg-gradient-to-r from-rose-200 to-red-300 dark:from-blue-400 dark:to-indigo-500 rounded-xl blur opacity-0 group-hover:opacity-75 transition duration-500 group-hover:duration-200"></div>
          <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-1 shadow-lg border border-gray-200/30 dark:border-gray-700/30">
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 px-3 pt-2">
              Сообщение <span className="text-rose-400 dark:text-blue-500">*</span>
            </label>
            <textarea
              id="message"
              rows={5}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-200/80 dark:border-gray-700/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700/30 dark:text-white transition-all placeholder-gray-400/60 resize-none"
              placeholder="Расскажите нам, чем мы можем вам помочь..."
            ></textarea>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          viewport={{ once: true }}
          className="pt-2"
        >
          <motion.button
          whileHover={{ 
            scale: 1.02,
            boxShadow: "0 10px 30px -5px rgba(59, 130, 246, 0.5)"
          }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full relative overflow-hidden group cursor-pointer"
        >
          <div className="rounded-2xl absolute inset-0 bg-gradient-to-r from-rose-400 to-red-500 group-hover:from-rose-400 group-hover:to-red-500 dark:from-blue-600 dark:to-indigo-600 dark:group-hover:from-blue-500 dark:group-hover:to-indigo-700 transition-all duration-500"></div>
          <div className="absolute rounded-3xl inset-0 bg-gradient-to-r from-rose-400 to-red-500 dark:from-blue-500 dark:to-indigo-600 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
          <div className="relative z-10 flex items-center justify-center gap-2 text-white font-medium py-4 px-6 rounded-xl text-lg transition-all duration-300 group-hover:shadow-[0_10px_30px_-5px_rgba(239,68,68,0.5)] dark:group-hover:shadow-[0_10px_30px_-5px_rgba(59,130,246,0.5)]">
            <span>Отправить сообщение</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </div>
        </motion.button>
        </motion.div>
      </form>
    </div>

    {/* Секция контактов */}
    <div className="p-8 md:p-12 lg:p-16 bg-gradient-to-br from-white/80 to-blue-50/40 dark:from-gray-800/95 dark:to-gray-900/95 backdrop-blur-sm border-t border-gray-200/50 dark:border-gray-700/30">
      <div className="text-center mb-6 sm:mb-9 md:mb-12">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          viewport={{ once: true }}
          className="inline-block mb-4"
        >
          <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-r from-rose-500 to-red-600 dark:from-blue-500 dark:to-indigo-600 flex items-center justify-center shadow-lg mx-auto hover:scale-120 hover:rounded-3xl transition-all duration-450">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
          </div>
        </motion.div>
        
        <motion.h3 
          className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3 font-[Inter] tracking-tight"
          initial={{ y: 10, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
        >
          <span className="bg-gradient-to-r from-rose-500 to-red-600 dark:from-blue-600 dark:to-indigo-600 bg-clip-text text-transparent italic">
            Наши контакты
          </span>
        </motion.h3>
        
        <motion.p 
          className="text-[17px] sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed"
          initial={{ y: 10, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
        >
          Выберите удобный способ связи с нашей командой
        </motion.p>
      </div>
      
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {/* Телефон */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          whileHover={{ y: -8 }}
          className="relative group sm:col-span-1 md:col-span-1"
        >
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-xl blur opacity-0 group-hover:opacity-75 transition duration-500 group-hover:duration-200"></div>
          <div className="relative h-full p-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-lg text-center border border-gray-200/30 dark:border-gray-700/30 transition-all hover:shadow-xl">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-blue-50 dark:from-blue-900/30 dark:to-blue-800/20 rounded-2xl flex items-center justify-center mx-auto mb-4 text-blue-600 dark:text-blue-300 text-2xl shadow-inner">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
            </div>
            <h4 className="font-bold text-xl text-gray-800 dark:text-white mb-2">Телефон</h4>
            <p className="text-gray-600 dark:text-gray-400 mb-3">+375 (17) 218-99-01</p>
            <motion.a
              href="tel:+375172189901"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 mt-3 px-5 py-2.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 rounded-xl text-sm font-medium shadow-sm hover:shadow-md transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              Позвонить
            </motion.a>
          </div>
        </motion.div>
        
        {/* Email */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          whileHover={{ y: -8 }}
          className="relative group sm:col-span-1 md:col-span-1"
        >
          <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-400 to-green-500 rounded-xl blur opacity-0 group-hover:opacity-75 transition duration-500 group-hover:duration-200"></div>
          <div className="relative h-full p-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-lg text-center border border-gray-200/30 dark:border-gray-700/30 transition-all hover:shadow-xl">
            <div className="w-16 h-16 bg-gradient-to-r from-green-100 to-green-50 dark:from-green-900/30 dark:to-green-800/20 rounded-2xl flex items-center justify-center mx-auto mb-4 text-green-600 dark:text-green-300 text-2xl shadow-inner">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </div>
            <h4 className="font-bold text-xl text-gray-800 dark:text-white mb-2">Email</h4>
            <p className="text-gray-600 dark:text-gray-400 mb-3">info@bgb.com</p>
            <motion.a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = "mailto:51ufumiz@gmail.com";
                }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 mt-3 px-5 py-2.5 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-300 rounded-xl text-sm font-medium shadow-sm hover:shadow-md transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              Написать
            </motion.a>
          </div>
        </motion.div>
        
        {/* Адрес */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          whileHover={{ y: -8 }}
          className="relative group sm:col-span-2 md:col-span-1"
        >
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-400 to-pink-500 rounded-xl blur opacity-0 group-hover:opacity-75 transition duration-500 group-hover:duration-200"></div>
          <div className="relative h-full p-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-lg text-center border border-gray-200/30 dark:border-gray-700/30 transition-all hover:shadow-xl">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-100 to-purple-50 dark:from-purple-900/30 dark:to-purple-800/20 rounded-2xl flex items-center justify-center mx-auto mb-4 text-purple-600 dark:text-purple-300 text-2xl shadow-inner">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </div>
            <h4 className="font-bold text-xl text-gray-800 dark:text-white mb-2">Адрес</h4>
            <p className="text-gray-600 dark:text-gray-400 mb-3"> г. Минск, ул. Интернациональная, 36</p>
            <motion.a
              href="https://www.google.com/maps/dir/?api=1&destination=г. Минск, ул. Интернациональная, 36"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 mt-3 px-5 py-2.5 bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300 rounded-xl text-sm font-medium shadow-sm hover:shadow-md transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              Маршрут
            </motion.a>
          </div>
        </motion.div>
      </div>
    </div>
  </div>
</motion.div>
    </div>
  )
}