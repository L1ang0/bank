'use client'

import { useEffect, useState } from 'react'
import Header from '@/components/header'
import SideNav from '@/components/sideNav'
import CurrencyConverter from '@/components/CurrencyConverter'
import RightSidebar from '@/components/RightSidebar'

type CurrencyEntry = { value: string; amount: string }

export default function HomePage() {
  const [sideOpen, setSideOpen] = useState(false)
  const [data, setData] = useState<null | {
    rates: Record<string, number>
    currencies: string[]
    base: string
    timestamp: number
  }>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  // States for three independent converters
  const [nbrbCurrencies, setNbrbCurrencies] = useState([
    { value: 'BYN', amount: '' },
    { value: 'USD', amount: '' },
    { value: 'EUR', amount: '' },
    { value: 'RUB', amount: '' },
    { value: 'CNY', amount: '' },
    { value: 'PLN', amount: '' },
  ])

  const [buyCurrencies, setBuyCurrencies] = useState([
    { value: 'BYN', amount: '' },
    { value: 'USD', amount: '' },
    { value: 'EUR', amount: '' },
    { value: 'RUB', amount: '' },
    { value: 'CNY', amount: '' },
    { value: 'PLN', amount: '' },
  ])

  const [sellCurrencies, setSellCurrencies] = useState([
    { value: 'BYN', amount: '' },
    { value: 'USD', amount: '' },
    { value: 'EUR', amount: '' },
    { value: 'RUB', amount: '' },
    { value: 'CNY', amount: '' },
    { value: 'PLN', amount: '' },
  ])

  useEffect(() => {
    async function fetchRates() {
      setIsLoading(true)
      setIsError(false)
      try {
        const res = await fetch('/api/currency')
        if (!res.ok) throw new Error('Ошибка запроса')
        const json = await res.json()
        setData(json)
      } catch {
        setIsError(true)
      } finally {
        setIsLoading(false)
      }
    }

    fetchRates()
  }, [])

  // Handlers for NBRB converter
  const handleNbrbAmountChange = (index: number, newAmount: string) => {
    handleAmountChange(index, newAmount, nbrbCurrencies, setNbrbCurrencies, data?.rates ?? {})
  }

  const handleNbrbCurrencyChange = (index: number, newCurrency: string) => {
    handleCurrencyChange(index, newCurrency, nbrbCurrencies, setNbrbCurrencies, handleNbrbAmountChange)
  }

  // Handlers for buy converter
  const handleBuyAmountChange = (index: number, newAmount: string) => {
    const adjustedRates = adjustRates(data?.rates ?? {}, 'buy')
    handleAmountChange(index, newAmount, buyCurrencies, setBuyCurrencies, adjustedRates)
  }

  const handleBuyCurrencyChange = (index: number, newCurrency: string) => {
    handleCurrencyChange(index, newCurrency, buyCurrencies, setBuyCurrencies, handleBuyAmountChange)
  }

  // Handlers for sell converter
  const handleSellAmountChange = (index: number, newAmount: string) => {
    const adjustedRates = adjustRates(data?.rates ?? {}, 'sell')
    handleAmountChange(index, newAmount, sellCurrencies, setSellCurrencies, adjustedRates)
  }

  const handleSellCurrencyChange = (index: number, newCurrency: string) => {
    handleCurrencyChange(index, newCurrency, sellCurrencies, setSellCurrencies, handleSellAmountChange)
  }

  const handleAddNbrbCurrency = () => {
    if (nbrbCurrencies.length < 10) {
      setNbrbCurrencies([...nbrbCurrencies, { value: 'BYN', amount: '' }])
    }
  }
  
  const handleAddBuyCurrency = () => {
    if (buyCurrencies.length < 10) {
      setBuyCurrencies([...buyCurrencies, { value: 'BYN', amount: '' }])
    }
  }
  
  const handleAddSellCurrency = () => {
    if (sellCurrencies.length < 10) {
      setSellCurrencies([...sellCurrencies, { value: 'BYN', amount: '' }])
    }
  }
  
  const handleRemoveNbrbCurrency = () => {
    if (nbrbCurrencies.length > 2) {
      setNbrbCurrencies(nbrbCurrencies.slice(0, -1))
    }
  }
  
  const handleRemoveBuyCurrency = () => {
    if (buyCurrencies.length > 2) {
      setBuyCurrencies(buyCurrencies.slice(0, -1))
    }
  }
  
  const handleRemoveSellCurrency = () => {
    if (sellCurrencies.length > 2) {
      setSellCurrencies(sellCurrencies.slice(0, -1))
    }
  }

  // Common amount change function
  const handleAmountChange = (
    index: number,
    newAmount: string,
    currencies: CurrencyEntry[],
    setCurrencies: React.Dispatch<React.SetStateAction<CurrencyEntry[]>>,
    rates: Record<string, number>
  ) => {
    const updated = [...currencies]
    if (newAmount === '') {
      updated.forEach((item) => (item.amount = ''))
      setCurrencies(updated)
      return
    }

    const baseCurrency = updated[index].value
    const baseValue = parseFloat(newAmount)
    if (!rates[baseCurrency] || isNaN(baseValue)) return

    const valueInBYN = baseValue * rates[baseCurrency]

    updated.forEach((item, i) => {
      if (i === index) {
        item.amount = newAmount
      } else {
        const targetRate = rates[item.value]
        item.amount = targetRate ? (valueInBYN / targetRate).toFixed(4) : ''
      }
    })

    setCurrencies(updated)
  }

  // Common currency change function
  const handleCurrencyChange = (
    index: number,
    newCurrency: string,
    currencies: CurrencyEntry[],
    setCurrencies: React.Dispatch<React.SetStateAction<CurrencyEntry[]>>,
    amountHandler: (index: number, amount: string) => void
  ) => {
    const updated = [...currencies]
    updated[index].value = newCurrency
    setCurrencies(updated)

    if (updated[index].amount) {
      amountHandler(index, updated[index].amount)
    }
  }

  // Rate adjustment function for buy/sell
  const adjustRates = (rates: Record<string, number>, type: 'buy' | 'sell') => {
    const sellMargin = 2
    const buyMargin = 2.5
    const adjustedRates = {...rates}
    
    if (type === 'buy') {
      Object.keys(adjustedRates).forEach(currency => {
        if (currency !== 'BYN') {
          adjustedRates[currency] *= (1 + buyMargin / 100)
        }
      })
    } else if (type === 'sell') {
      Object.keys(adjustedRates).forEach(currency => {
        if (currency !== 'BYN') {
          adjustedRates[currency] *= (1 - sellMargin / 100)
        }
      })
    }
    
    return adjustedRates
  }

  return (
    <div className="flex flex-col h-screen w-screen">
      <Header onMenuClick={() => setSideOpen(!sideOpen)} />
      <div className="flex flex-1 overflow-hidden">
        <SideNav open={sideOpen} onClose={() => setSideOpen(false)} />
        
        <main className="flex-1 overflow-y-auto">
            <CurrencyConverter
              isLoading={isLoading}
              isError={isError}
              rates={data?.rates ?? {}}
              currenciesList={data?.currencies ?? []}
              nbrbCurrencies={nbrbCurrencies}
              buyCurrencies={buyCurrencies}
              sellCurrencies={sellCurrencies}
              onNbrbAmountChange={handleNbrbAmountChange}
              onNbrbCurrencyChange={handleNbrbCurrencyChange}
              onBuyAmountChange={handleBuyAmountChange}
              onBuyCurrencyChange={handleBuyCurrencyChange}
              onSellAmountChange={handleSellAmountChange}
              onSellCurrencyChange={handleSellCurrencyChange}
              onAddNbrbCurrency={handleAddNbrbCurrency}
              onAddBuyCurrency={handleAddBuyCurrency}
              onAddSellCurrency={handleAddSellCurrency}
              onRemoveNbrbCurrency={handleRemoveNbrbCurrency}
              onRemoveBuyCurrency={handleRemoveBuyCurrency}
              onRemoveSellCurrency={handleRemoveSellCurrency}
            />
        </main>
        <RightSidebar 
          rates={data?.rates ?? {}} 
          currenciesList={data?.currencies ?? []} 
        />
      </div>
    </div>
  )
}