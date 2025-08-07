'use client'

import { motion, AnimatePresence } from 'framer-motion';
import React from 'react';
import { usePopularityChart } from '@/hooks/usePopularityChart';

export const PopularityChart = () => {
  const {
    currencyData,
    hovered,
    setHovered,
    getSliceData,
    lightenColor,
    getCurrencyName,
    center
  } = usePopularityChart();

  const slices = getSliceData();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, type: 'spring' }}
      className="flex-1 mt-5 bg-gray-100 dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800 rounded-3xl shadow-lg dark:shadow-2xl hover:shadow-xl dark:hover:shadow-3xl transition-all duration-500 p-8 w-full mb-6 border border-gray-200 dark:border-gray-800"
    >
      <div className="relative overflow-hidden rounded-xl h-full">
        <motion.div
          className="absolute inset-0 z-0"
          animate={{
            background: [
              'linear-gradient(45deg, rgba(99, 102, 241, 0.08) 0%, rgba(16, 185, 129, 0.05) 100%)',
              'linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(239, 68, 68, 0.08) 100%)',
              'linear-gradient(225deg, rgba(16, 185, 129, 0.08) 0%, rgba(99, 102, 241, 0.05) 100%)',
            ],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'linear'
          }}
        />

        <motion.div 
          className="absolute inset-0 z-0 opacity-40 dark:opacity-30"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 60,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'linear'
          }}
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.8) 1px, transparent 1px),
              radial-gradient(circle at 80% 70%, rgba(255, 255, 255, 0.8) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            maskImage: 'radial-gradient(circle at center, black 30%, transparent 70%)'
          }}
        />

        <motion.div 
          className="absolute inset-0 z-0 backdrop-blur-[2px]"
          style={{
            maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, transparent 100%)'
          }}
        />

        <div className="relative z-10 p-6">
          <div className="flex justify-between items-center mb-8">
            <motion.h2 
              whileHover={{ scale: 1.02 }}
              className="text-2xl font-bold text-gray-800 dark:text-white"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-emerald-500 dark:from-indigo-300 dark:to-emerald-300">
                Популярность валют
              </span>
              <InfoTooltip content="Данные основаны на частоте обмена валют в отделениях банка за последний месяц. Включает операции обмена, переводы и платежи." />
            </motion.h2>
          </div>

          <div className="flex flex-col xl:flex-row items-start xl:gap-10">
            <div className="flex-1 w-full xl:max-w-[360px]">
              <div className="grid grid-cols-2 max-sm:grid-cols-1 xl:grid-cols-1 gap-2">
                {currencyData.map((item) => (
                  <motion.div
                    key={item.currency}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ 
                      duration: 0.4, 
                      delay: 0.1 * currencyData.indexOf(item),
                      type: 'spring'
                    }}
                    whileHover={{ 
                      scale: 1.03,
                      boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)"
                    }}
                    onMouseEnter={() => setHovered(item.currency)}
                    onMouseLeave={() => setHovered(null)}
                    className={`p-3 rounded-xl bg-gray-50 dark:bg-white/5 backdrop-blur-lg border border-gray-200 dark:border-white/10 ${
                      hovered === item.currency 
                        ? 'border-indigo-300 dark:border-white/30 shadow-md dark:shadow-lg' 
                        : 'hover:border-gray-300 dark:hover:border-white/20'
                    } transition-all cursor-pointer relative overflow-hidden`}
                  >
                    <motion.div 
                      className="absolute inset-0 opacity-10 dark:opacity-20"
                      animate={{
                        backgroundPosition: hovered === item.currency 
                          ? ['0% 0%', '100% 100%'] 
                          : '0% 0%'
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatType: 'reverse',
                        ease: 'linear'
                      }}
                      style={{
                        backgroundImage: `linear-gradient(45deg, ${item.color.start}, ${item.color.end}, ${item.color.start})`,
                        backgroundSize: '200% 200%'
                      }}
                    />
                    
                    <div className="flex items-center gap-3 relative z-10">
                      <motion.div 
                        className="relative"
                        animate={{
                          scale: hovered === item.currency ? 1.1 : 1,
                          boxShadow: hovered === item.currency 
                            ? `0 0 0 2px ${item.color.end}, 0 0 20px ${item.color.start}80` 
                            : `0 0 0 1px ${item.color.end}40`
                        }}
                        transition={{
                          duration: 0.3,
                          type: 'spring'
                        }}
                      >
                        <div 
                          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg relative"
                          style={{ 
                            background: `linear-gradient(135deg, ${item.color.start}, ${item.color.end})`,
                          }}
                        >
                          {item.icon}
                        </div>
                      </motion.div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="font-bold text-gray-800 dark:text-white text-sm tracking-wide block">
                              {item.currency === 'OTHERS' ? 'Другие' : item.currency}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-white/70">
                              {getCurrencyName(item.currency)}
                            </span>
                          </div>
                          <motion.span 
                            className="text-gray-700 dark:text-white/90 font-mono font-bold text-base"
                            animate={{
                              scale: hovered === item.currency ? 1.2 : 1,
                              color: hovered === item.currency ? item.color.end : "inherit"
                            }}
                          >
                            {item.percentage}%
                          </motion.span>
                        </div>
                        
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ 
                            width: hovered === item.currency ? '100%' : `${item.percentage}%`,
                            background: hovered === item.currency
                              ? `linear-gradient(to right, ${item.color.start}, ${item.color.end}, ${item.color.start})`
                              : `linear-gradient(to right, ${item.color.start}, ${item.color.end})`
                          }}
                          transition={{ 
                            duration: 0.8,
                            ease: "backOut",
                            background: { duration: 0.3 }
                          }}
                          className="h-2 mt-2 rounded-full relative overflow-hidden bg-gray-200 dark:bg-white/10"
                        >
                          <motion.div
                            animate={{
                              x: hovered === item.currency ? ['-100%', '100%'] : '0%',
                              opacity: hovered === item.currency ? [0, 0.8, 0] : 0
                            }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                            className="absolute inset-y-0 w-1/3 bg-white/30"
                            style={{ 
                              transform: 'skewX(-30deg)',
                              filter: 'blur(4px)'
                            }}
                          />
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="relative w-60 h-60 xl:w-96 xl:h-96 mx-auto xl:mr-10 mt-10 xl:mt-22">
              <svg 
                width="100%" 
                height="100%" 
                viewBox="0 0 300 300"
                className="drop-shadow-lg"
              >
                <defs>
                  {currencyData.map((item, i) => (
                    <React.Fragment key={`gradients-${i}`}>
                      <linearGradient id={`gradient-${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor={item.color.start} />
                        <stop offset="100%" stopColor={item.color.end} />
                      </linearGradient>
                      
                      <linearGradient id={`gradient-hover-${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor={lightenColor(item.color.start, 15)} />
                        <stop offset="100%" stopColor={lightenColor(item.color.end, 15)} />
                      </linearGradient>
                    </React.Fragment>
                  ))}
                  
                  <linearGradient key="gradient-center" id="gradient-center" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(255,255,255,0.9)" />
                    <stop offset="100%" stopColor="rgba(230,230,255,0.7)" />
                  </linearGradient>
                </defs>
                
                {slices.map(({ currency, d, dx, dy, index: i, color }) => (
                  <motion.g
                    key={currency}
                    transform={`translate(${dx}, ${dy})`}
                    animate={{
                      transform: `translate(${dx}, ${dy})`
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 300,
                      damping: 15
                    }}
                  >
                    <motion.path
                      d={d}
                      fill={`url(#gradient-${i})`}
                      onMouseEnter={() => setHovered(currency)}
                      onMouseLeave={() => setHovered(null)}
                      initial={{ 
                        opacity: 0,
                        pathLength: 0,
                      }}
                      animate={{ 
                        opacity: 1,
                        pathLength: 1,
                        fill: hovered === currency 
                          ? `url(#gradient-hover-${i})` 
                          : `url(#gradient-${i})`,
                        scale: hovered === currency ? 1.05 : 1,
                      }}
                      transition={{ 
                        duration: 0.8,
                        delay: i * 0.15,
                        type: 'spring',
                        damping: 12,
                        stiffness: 100,
                        fill: { duration: 0.3 },
                        scale: { type: 'spring', bounce: 0.5 }
                      }}
                      style={{
                        filter: hovered === currency 
                          ? `drop-shadow(0 0 20px ${color.start}80)` 
                          : 'drop-shadow(0 5px 10px rgba(0,0,0,0.2))',
                        transformOrigin: 'center',
                        willChange: 'transform, filter, fill',
                        stroke: hovered === currency ? 'white' : 'transparent',
                        strokeWidth: hovered === currency ? 2 : 0,
                      }}
                      whileHover={{
                        scale: 1.07,
                        filter: `drop-shadow(0 0 25px ${color.start}90)`,
                        transition: { 
                          duration: 0.3,
                          type: 'spring',
                          bounce: 0.6
                        }
                      }}
                      whileTap={{
                        scale: 0.98,
                        filter: 'drop-shadow(0 0 5px rgba(0,0,0,0.2))'
                      }}
                    />
                  </motion.g>
                ))}
                
                <motion.circle 
                  cx={center} 
                  cy={center} 
                  r={52} 
                  fill="url(#gradient-center)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  style={{
                    filter: 'drop-shadow(0 0 10px rgba(0,0,0,0.1))',
                    stroke: 'rgba(0,0,0,0.05)',
                    strokeWidth: 1
                  }}
                />
                
                <AnimatePresence mode="wait">
                  {hovered ? (
                    <motion.text
                      key="hovered"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ 
                        opacity: 1, 
                        scale: 1,
                        textShadow: '0 0 15px rgba(0,0,0,0.3)'
                      }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      transition={{ 
                        type: 'spring', 
                        stiffness: 200,
                        damping: 15
                      }}
                      x={center}
                      y={center}
                      textAnchor="middle"
                      alignmentBaseline="middle"
                      fontSize="28"
                      fontWeight="bold"
                      fill={currencyData.find(c => c.currency === hovered)?.color.end || '#333'}
                    >
                      {currencyData.find(c => c.currency === hovered)?.percentage}%
                    </motion.text>
                  ) : (
                    <motion.g
                      key="default"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <motion.text
                        x={center}
                        y={center - 10}
                        textAnchor="middle"
                        alignmentBaseline="middle"
                        fontSize="18"
                        fontWeight="bold"
                        fill="#444"
                        opacity="0.9"
                        animate={{
                          opacity: [0.7, 0.9, 0.7]
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        Наведите
                      </motion.text>
                      <text
                        x={center}
                        y={center + 15}
                        textAnchor="middle"
                        alignmentBaseline="middle"
                        fontSize="14"
                        fill="#666"
                        opacity="0.8"
                      >
                        на валюту
                      </text>
                    </motion.g>
                  )}
                </AnimatePresence>
              </svg>
            </div>
          </div>

          <div className='flex flex-col sm:flex-row justify-between gap-1 sm:gap-6'>
            <motion.div 
              className="mt-6 p-4 w-full sm:w-1/2 bg-gray-100 dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/10 backdrop-blur-sm
              transition-all transform duration-250 hover:border dark:hover:border-[#8e8e8e] hover:border-[#d2d2d2] hover:scale-103"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <div className="flex items-center gap-3">
                <div className="text-emerald-500 dark:text-emerald-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className='hover:scale-110 transition-all transform duration-150'
                   width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 dark:text-white text-sm underline underline-offset-2">Топ валюты</h4>
                  <p className="text-xs text-gray-600 dark:text-white/70 mt-1">
                    USD и EUR составляют 72.3% всех операций. 
                  </p>
                </div>
              </div>
            </motion.div>
            <motion.div 
              className="mt-2 sm:mt-6 p-4 w-full sm:w-1/2 bg-gray-100 dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/10 backdrop-blur-sm
              transition-all transform duration-250 hover:border dark:hover:border-[#8e8e8e] hover:border-[#d2d2d2] hover:scale-103"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <div className="flex items-center gap-3">
                <div className="text-emerald-500 dark:text-emerald-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className='hover:scale-110 transition-all transform duration-150' width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zM4 12c0-.899.156-1.762.431-2.569L6 11l2 2v2l2
                   2 1 1v1.931C7.061 19.436 4 16.072 4 12zm14.33 4.873C17.677 16.347 16.687 16 16 16v-1a2 2 0 0 0-2-2h-4v-3a2 2 0 0 0 2-2V7h1a2 
                   2 0 0 0 2-2v-.411C17.928 5.778 20 8.65 20 12a7.947 7.947 0 0 1-1.67 4.873z"/>
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 dark:text-white text-sm underline underline-offset-2">Топ валюты</h4>
                  <p className="text-xs text-gray-600 dark:text-white/70 mt-1">
                    RUB занимает 17.7%, что на 5.2% больше чем в прошлом квартале.
                    Другие валюты (GBP, JPY, CHF) - 5%.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
          
          <motion.div 
            className="flex justify-between items-center mt-8 pt-4 border-t border-gray-200 dark:border-white/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <div className="text-sm text-gray-600 dark:text-white/70">
              <span className="block mb-1">Данные обновлены:</span>
              <span className="font-mono">{new Date().toLocaleDateString('ru-RU')}</span>
            </div>
            <div className="text-sm text-gray-600 dark:text-white/70 text-right">
              <span className="block mb-1">Источник:</span>
              <span className="font-mono">Аналитика БГБ</span>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const InfoTooltip = ({ content }: { content: string }) => (
  <div className="relative sm:inline-block ml-2 group z-50 hidden" style={{ zIndex: 100 }}>
    <motion.span 
      className="text-sm cursor-help opacity-70 hover:opacity-100 inline-flex items-center justify-center w-5 h-5
       rounded-full bg-gray-200 dark:bg-white/10 text-gray-700 dark:text-white "
      whileHover={{ scale: 1.2, rotate: 10 }}
    >
      ?
    </motion.span>
    <motion.div 
      className="absolute hidden group-hover:block bg-white dark:bg-gray-800 text-gray-700 dark:text-white p-2 rounded-lg 
      shadow-xl text-[12px] w-72 top-2/5 left-full transform -translate-y-1/2 ml-2 z-50 border border-gray-200 dark:border-white/10"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
    >
      {content}
      <div className="absolute -top-1.5 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-white dark:bg-gray-800 rotate-45 border-t border-l border-gray-200 dark:border-white/10" />
    </motion.div>
  </div>
);