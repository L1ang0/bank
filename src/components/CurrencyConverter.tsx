'use client'

import { useState } from 'react'
import Image from 'next/image'
import Select from 'react-select';

export default function CurrencyConverter({
  isLoading,
  isError,
  rates,
  currenciesList,
  currencies,
  onAmountChange,
  onCurrencyChange,
}: {
  isLoading: boolean
  isError: boolean
  rates: Record<string, number>
  currenciesList: string[]
  currencies: { value: string; amount: string }[]
  onAmountChange: (index: number, value: string) => void
  onCurrencyChange: (index: number, currency: string) => void
}) {

  const [activeTable, setActiveTable] = useState('nbrb');

  // Проценты маржи (можно настроить по вашему усмотрению)
  const sellMargin = 2; // % ниже курса НБРБ при продаже валюты банку
  const buyMargin = 2.5; // % выше курса НБРБ при покупке валюты у банка

  const currencyListForTable = ['USD', 'EUR', 'GBP', 'JPY', 'CNY', 'RUB'].filter(c =>
    currenciesList.includes(c)
  )

  if (isLoading) 
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-200 bg-opacity-90 z-50">
      <div className="text-center p-8 bg-gray-300 rounded-xl shadow-lg max-w-md w-full mx-4 border border-gray-500 transform transition-all">
        <div className="animate-spin text-4xl mb-3">🔄</div>
        <h2 className="text-xl font-semibold text-gray-800">Загрузка курсов валют</h2>
        <p className="text-gray-700 mt-1">Пожалуйста, подождите...</p>
      </div>
    </div>
  );

if (isError)
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-90 z-50">
      <div className="text-center p-8 bg-gray-200 rounded-xl shadow-lg max-w-md w-full mx-4 border border-red-100 transform transition-all">
        <div className="text-4xl mb-3 animate-pulse">⚠️</div>
        <h2 className="text-xl font-semibold text-red-600">Ошибка загрузки</h2>
        <p className="text-gray-600 mt-2">Не удалось загрузить данные о валютах</p>
        <button 
          className="mt-4 px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-300"
          onClick={() => window.location.reload()}
        >
          Попробовать снова
        </button>
      </div>
    </div>
  );

  return (
    <div className="h-full w-screen bg-[#f9fafb] dark:bg-[#1f2937] text-gray-900 dark:text-white p-4 sm:p-6 flex flex-col md:flex-row gap-6">
  {/* Левая часть — Конвертер */}
  <div className="flex-1 bg-white dark:bg-[#2d3748] rounded-2xl shadow-lg p-6 w-full">
    <h2 className="text-2xl font-bold mb-6 text-center text-red-500 dark:text-blue-500">💱 Конвертер валют НБРБ</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {currencies.map((entry, index) => (
        <div key={index} className="flex items-center gap-2">
          <input
            type="text"
            value={entry.amount}
            onChange={(e) => {
              const value = e.target.value;
              if (value === '' || /^[0-9]*\.?[0-9]*$/.test(value)) {
                onAmountChange(index, value);
              }
            }}
            placeholder="Сумма"
            className="flex-1 p-3 rounded-lg bg-gray-100 dark:bg-gray-700 focus:ring-2 focus:ring-red-500 dark:focus:ring-blue-500 transition-all duration-200"
          />
          
          <div className="relative w-auto group ">
                <Select
                 instanceId={`currency-select-${index}`}
                  options={currenciesList.map(cur => ({ value: cur, label: cur }))}
                  value={{ value: entry.value, label: entry.value }}
                  onChange={(selectedOption) => 
                    onCurrencyChange(index, selectedOption?.value || 'BYN')
                  }
                  className="react-select-container"
                  classNamePrefix="react-select"
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      backgroundColor: '#ececee',
                      borderColor: '#ececee',
                      minHeight: '48px',
                      width: '100px',
                      '&:hover': {
                        borderColor: '#9ca3af',
                      },
                    }),
                    menu: (provided) => ({
                      ...provided,
                      maxHeight: '100px',
                      backgroundColor: '#f3f4f6',
                    }),
                    option: (provided, state) => ({
                      ...provided,
                      backgroundColor: state.isSelected 
                        ? '#ef4444'
                        : state.isFocused
                        ? '#e5e7eb'
                        : '#f3f4f6',
                      color: state.isSelected ? 'white' : '#111827',
                    }),
                  }}
                  theme={(theme) => ({
                    ...theme,
                    colors: {
                      ...theme.colors,
                      primary: '#ef4444',
                    },
                  })}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Правая часть */}
<div className="w-full md:w-[400px] flex flex-col">
  {/* Блок с таблицей */}
  <div className="bg-[#fcfff6] dark:bg-[#2d3748] rounded-2xl shadow-lg mb-3 overflow-hidden">
    <div className="flex p-3 pt-3 pb-1">
      <button
        onClick={() => setActiveTable('nbrb')}
        className={`mr-2 px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
          activeTable === 'nbrb'
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600'
        }`}
      >
        Курсы НБРБ
      </button>
      <button
        onClick={() => setActiveTable('exchange')}
        className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
          activeTable === 'exchange'
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600'
        }`}
      >
        Обменные курсы
      </button>
    </div>
    <div className="p-3 pt-0 pb-0 mb-2 relative 
                  before:-mb-0.5 before:absolute before:inset-1 before:rounded-xl before:border-2 before:border-red-400 dark:before:border-blue-600 before:pointer-events-none">
    {activeTable === 'nbrb' ? (
      // Таблица курсов НБРБ
      <table className="w-full text-sm relative z-10">
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
              <td className="p-2 pl-3">{cur}</td>
              <td className="p-2 pr-6 text-right">
                {rates[cur] ? rates[cur].toFixed(4) : '-'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      // Таблица обменных курсов (рассчитывается на основе НБРБ)
      <table className="w-full text-sm relative z-10">
        <thead>
          <tr>
            <th className="text-left italic p-2">Флаг</th>
            <th className="text-left italic p-2">Валюта</th>
            <th className="text-right italic p-2">Сдать</th>
            <th className="text-right italic p-2">Купить</th>
          </tr>
        </thead>
        <tbody>
          {currencyListForTable.map((cur) => {
            const nbrbRate = rates[cur];
            if (!nbrbRate) return null;
            
            const sellRate = nbrbRate * (1 - sellMargin / 100); // Банк покупает дешевле
            const buyRate = nbrbRate * (1 + buyMargin / 100);  // Банк продает дороже
            
            return (
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
                <td className="p-2 pl-3">{cur}</td>
                <td className="p-2 pr-4 text-right text-red-600 dark:text-red-400">
                  {sellRate.toFixed(4)}
                </td>
                <td className="p-2 pr-4 text-right text-green-600 dark:text-green-400">
                  {buyRate.toFixed(4)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    )}
    </div>
        </div>
      
        {/* Низ — Калькулятор */}
        <div className="bg-white dark:bg-[#2d3748] rounded-2xl shadow-lg p-6 overflow-hidden">
    <Calculator />
    </div>
  </div>
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

