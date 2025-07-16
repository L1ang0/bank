'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Select from 'react-select';
import { useId } from 'react'

export default function CurrencyConverter() {
    const instanceId = useId()
    const [rates, setRates] = useState<Record<string, number>>({})
    const [currencyList, setCurrencyList] = useState<string[]>([])
    const [currencyListForTable, setCurrencyListForTable] = useState<string[]>([])
    const [currencies, setCurrencies] = useState([
      { value: 'BYN', amount: '' },
      { value: 'USD', amount: '' },
      { value: 'EUR', amount: '' },
      { value: 'GBP', amount: '' },
    ])
  
    useEffect(() => {
      const fetchRates = async () => {
        try {
          const res = await fetch('/api/currency')
          const data = await res.json()
          setRates(data.rates || {})
          
          const allCurrencies = Object.keys(data.rates || {})
          setCurrencyList(allCurrencies)
          
          const mainCurrencies = ['USD', 'BYN', 'EUR', 'GBP', 'JPY', 'CNY', 'RUB']
          setCurrencyListForTable(mainCurrencies.filter(cur => allCurrencies.includes(cur)))
        } catch (error) {
          console.error('Error fetching rates:', error)
        }
      }
      
      fetchRates()
      const interval = setInterval(fetchRates, 10 * 60 * 1000)
      return () => clearInterval(interval)
    }, [])

    const handleAmountChange = (index: number, newAmount: string) => {
        const updated = [...currencies];
        
        if (newAmount === '') {
          updated.forEach(item => item.amount = '');
          setCurrencies(updated);
          return;
        }
      
        const baseCurrency = updated[index].value;
        const baseValue = parseFloat(newAmount);
        
        if (!rates[baseCurrency] || isNaN(baseValue)) return;
      
        const baseAmount = baseValue / rates[baseCurrency];

        updated.forEach((item, i) => {
          if (i === index) {
            item.amount = newAmount;
          } else {
            item.amount = (baseAmount * rates[item.value]).toFixed(2);
          }
        });
        
        setCurrencies(updated);
      };

  const handleCurrencyChange = (index: number, newCurrency: string) => {
    const updated = [...currencies]
    updated[index].value = newCurrency
    setCurrencies(updated)
    if (updated[index].amount) {
      handleAmountChange(index, updated[index].amount)
    }
  }

  return (
    <div className="h-full w-screen bg-[#f9fafb] dark:bg-[#1f2937] text-gray-900 dark:text-white p-4 sm:p-6 flex flex-col md:flex-row gap-6">
  {/* Левая часть — Конвертер */}
  <div className="flex-1 bg-white dark:bg-[#2d3748] rounded-2xl shadow-lg p-6 w-full">
    <h2 className="text-2xl font-bold mb-6 text-center text-red-500 dark:text-blue-500">💱 Конвертер валют БГБ Банка</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {currencies.map((entry, index) => (
        <div key={index} className="flex items-center gap-2">
          <input
            type="text"
            value={entry.amount}
            onChange={(e) => {
              const value = e.target.value;
              if (value === '' || /^[0-9]*\.?[0-9]*$/.test(value)) {
                handleAmountChange(index, value);
              }
            }}
            placeholder="Сумма"
            className="flex-1 p-3 rounded-lg bg-gray-100 dark:bg-gray-700 focus:ring-2 focus:ring-red-500 dark:focus:ring-blue-500 transition-all duration-200"
          />
          
          <div className="relative w-auto group ">
                <Select
                 instanceId={`currency-select-${index}-${instanceId}`}
                  options={currencyList.map(cur => ({ value: cur, label: cur }))}
                  value={{ value: entry.value, label: entry.value }}
                  onChange={(selectedOption) => 
                    handleCurrencyChange(index, selectedOption?.value || 'USD')
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
      <div className="w-full md:w-[400px] flex flex-col justify-between">
        {/* Верх — Таблица */}
        <div className="bg-[#fcfff6] dark:bg-[#2d3748] rounded-2xl shadow-lg p-3 pt-1 pb-0 mb-4 overflow-x-auto h-1/2 relative 
                      before:-mb-0.5 before:absolute before:inset-1 before:rounded-xl before:border-2 before:border-red-400 dark:before:border-blue-600 before:pointer-events-none">
          <table className="w-full text-sm relative z-10">
            <thead>
              <tr>
                <th className="text-left italic p-2">Флаг</th>
                <th className="text-left italic p-2">Валюта</th>
                <th className="text-right italic p-2">Курс</th>
              </tr>
            </thead>
            <tbody>
              {currencyListForTable.map((cur) => (
                <tr key={cur} className="border-t border-gray-200 dark:border-gray-700">
                  <td className="p-2">
                    <Image
                      src={`https://flagcdn.com/24x18/${cur.slice(0, 2).toLowerCase()}.png`}
                      alt={cur}
                      width={24}
                      height={18}
                      className="rounded-sm hover:scale-115 transform transition-all duration-150"
                    />
                  </td>
                  <td className="p-2">{cur}</td>
                  <td className="p-2 text-right">
                    {rates[cur] && rates['USD'] ? (rates[cur] / rates['USD']).toFixed(4) : '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Низ — Калькулятор */}
        <div className="bg-white dark:bg-[#2d3748] rounded-2xl shadow-lg p-6 h-1/2 overflow-hidden">
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
      setTimeout(() => setActiveButton(null), 400) // Сбрасываем активное состояние через 200ms
      
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
