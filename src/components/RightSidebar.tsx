'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import useExchangeRates from '@/hooks/useExchangeRates'

export default function RightSidebar({
  rates,
  currenciesList,
}: {
  rates: Record<string, number>
  currenciesList: string[]
}) {
  const {
    activeTable,
    setActiveTable,
    currencyListForTable,
    exchangeRates
    } = useExchangeRates(rates, currenciesList);

  return (
      <div className="w-full lg:w-[350px] xl:w-[400px] bg-[#f9fafb] dark:bg-[#1f2937] flex flex-col p-4 sm:p-4">

      {/* Table block */}
      <motion.div 
        initial={{ opacity: 0, y: -10, x: 10 }}
        animate={{ opacity: 1, y: 0, x: 0 }}
        transition={{ duration: 1.0 }}
        className="bg-[#fcfff6] dark:bg-[#2d3748] rounded-2xl shadow-lg mb-3 overflow-hidden"
      >
        <div className="flex p-3 pt-3 pb-1">
          <button
            onClick={() => setActiveTable('nbrb')}
            className={`mr-2 px-3 py-1 rounded-lg text-sm font-bold text-[#444444] hover:cursor-pointer transition-all transform hover:scale-102 duration-400 ${
              activeTable === 'nbrb'
                ? 'dark:bg-blue-500 hover:dark:bg-blue-400 dark:text-gray-100 hover:bg-red-300 bg-red-400 text-white'
                : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-[#dddddd]'
            }`}
          >
            Курсы НБРБ
          </button>
          <button
            onClick={() => setActiveTable('exchange')}
            className={`px-3 py-1 rounded-lg text-sm font-bold hover:cursor-pointer text-[#444444] transition-all transform duration-400 hover:scale-102 ${
              activeTable === 'exchange'
                ? 'dark:bg-blue-500 hover:dark:bg-blue-400 dark:text-gray-100 hover:bg-red-300 bg-red-400 text-white'
                : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-[#dddddd]'
            }`}
          >
            Обменные курсы
          </button>
        </div>
        <div className="p-3 pt-0 pb-0 mb-7 relative 
                      before:-mb-2.5 before:absolute before:inset-1 before:rounded-xl before:border-2 before:border-red-400 dark:before:border-blue-600 before:pointer-events-none">
          {activeTable === 'nbrb' ? (
            <table className="w-full text-sm relative ">
              <thead>
                <tr>
                  <th className="text-left italic p-2">Флаг</th>
                  <th className="text-left italic p-2">Валюта</th>
                  <th className="text-right italic pr-6">Курс НБРБ</th>
                </tr>
              </thead>
              <tbody>
                {currencyListForTable.map((cur) => (
                  <tr key={cur} className="border-t border-gray-200 dark:border-gray-700">
                    <td className="p-2 pl-4">
                      <Image
                        src={`https://flagcdn.com/24x18/${cur.slice(0, 2).toLowerCase()}.png`}
                        alt={cur}
                        width={24}
                        height={18}
                        className="rounded-sm hover:scale-115 transform transition-all duration-150"
                      />
                    </td>
                    <td className="p-2 pl-3 hover:underline hover:underline-offset-2 transform transition-all duration-300">{cur}</td>
                    <td className="p-2 pr-6 text-right">
                      {rates[cur] ? rates[cur].toFixed(4) : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table className="w-full text-sm relative ">
              <thead>
                <tr>
                  <th className="text-left italic p-2">Флаг</th>
                  <th className="text-left italic p-2 pl-6">Валюта</th>
                  <th className="text-right italic p-2">Сдать</th>
                  <th className="text-right italic p-2">Купить</th>
                </tr>
              </thead>
              <tbody>
                {exchangeRates.map((rate) => (
                  <tr key={rate.currency} className="border-t border-gray-200 dark:border-gray-700">
                    <td className="p-2 pl-4">
                      <Image
                        src={`https://flagcdn.com/24x18/${rate.currency.slice(0, 2).toLowerCase()}.png`}
                        alt={rate.currency}
                        width={24}
                        height={18}
                        className="rounded-sm hover:scale-115 transform transition-all duration-150"
                      />
                    </td>
                    <td className="p-2 pl-7 hover:underline hover:underline-offset-2 transition-all duration-300">
                      {rate.currency}
                    </td>
                    <td className="p-2 pr-4 text-right text-red-600 dark:text-red-400 hover:text-red-500 dark:hover:text-red-300 transition-all transform duration-300">
                      {rate.sell.toFixed(4)}
                    </td>
                    <td className="p-2 pr-4 text-right text-green-600 dark:text-green-400 hover:text-green-500 dark:hover:text-green-300 transition-all transform duration-300">
                      {rate.buy.toFixed(4)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </motion.div>
      
      {/* Calculator - остается без изменений */}
      <motion.div 
        initial={{ opacity: 0, y: 20, x: 10 }}
        animate={{ opacity: 1, y: 0, x:0 }}
        transition={{ duration: 1.2 }}
        className="bg-white dark:bg-[#2d3748] rounded-2xl shadow-lg p-6 pt-5 overflow-hidden"
      >
        <Calculator />
      </motion.div>
    </div>
  )
}

function Calculator() {
  const [value, setValue] = useState('')
  const [activeButton, setActiveButton] = useState<string | null>(null)

  const handleClick = (val: string) => {
    setActiveButton(val)
    setTimeout(() => setActiveButton(null), 400)
    
    if (val === 'C') return setValue('')
    if (val === '⌫') return setValue(prev => prev.slice(0, -1))
    if (val === '=') {
      try {
        const result = eval(value.replace(/[×]/g, '*').replace(/[÷]/g, '/'))
        setValue(Number.isInteger(result) ? result.toString() : parseFloat(result.toFixed(10)).toString())
      } catch {
        setValue('Ошибка')
      }
    } else {
      setValue(prev => prev + val)
    }
  }

  const buttons = ['7', '8', '9', '÷', '4', '5', '6', '×', '1', '2', '3', '-', '0', '.', '=', '+']

  return (
    <div>
      <div className="flex items-start mb-3 gap-1.5">
        <input
          className="flex w-1/2 p-2 -mt-2 text-left rounded-lg bg-gray-100 dark:bg-gray-700"
          value={value}
          readOnly
        />
        <button
          className={`p-2 w-1/4 -mt-2 bg-red-300/70 dark:bg-blue-600 rounded-lg hover:bg-red-400 dark:hover:bg-blue-400 transition-colors duration-200 ${
            activeButton === '⌫' ? 'bg-red-400 dark:bg-blue-400' : ''
          }`}
          onClick={() => handleClick('⌫')}
        >
          ⌫
        </button>
        <button
          className={`p-2 w-1/4 -mt-2 bg-amber-500 dark:bg-amber-500 rounded-lg hover:bg-amber-400 dark:hover:bg-amber-400 transition-colors duration-200 ${
            activeButton === 'C' ? 'bg-amber-400 dark:bg-amber-400' : ''
          }`}
          onClick={() => handleClick('C')}
        >
          C
        </button>
      </div>
      <div className="grid grid-cols-4 gap-1.5">
        {buttons.map((b) => (
          <button
            key={b}
            className={`p-3 rounded-lg transition-colors duration-300 ${
              activeButton === b 
                ? 'bg-red-400 dark:bg-blue-400' 
                : 'bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500'
            }`}
            onClick={() => handleClick(b)}
          >
            {b}
          </button>
        ))}
      </div>
    </div>
  )
}