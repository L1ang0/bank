'use client'

import { useEffect, useState } from 'react'
import Header from '@/components/header'
import SideNav from '@/components/sideNav'
import CurrencyConverter from '@/components/CurrencyConverter'

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

  const [currencies, setCurrencies] = useState([
    { value: 'BYN', amount: '' },
    { value: 'USD', amount: '' },
    { value: 'EUR', amount: '' },
    { value: 'GBP', amount: '' },
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

  const handleAmountChange = (index: number, newAmount: string) => {
    const updated = [...currencies]
    if (newAmount === '') {
      updated.forEach((item) => (item.amount = ''))
      setCurrencies(updated)
      return
    }

    const baseCurrency = updated[index].value
    const baseValue = parseFloat(newAmount)
    if (!data?.rates[baseCurrency] || isNaN(baseValue)) return

    const valueInBYN = baseValue * data.rates[baseCurrency]

    updated.forEach((item, i) => {
      if (i === index) {
        item.amount = newAmount
      } else {
        const targetRate = data.rates[item.value]
        item.amount = targetRate ? (valueInBYN / targetRate).toFixed(2) : ''
      }
    })

    setCurrencies(updated)
  }

  const handleCurrencyChange = (index: number, newCurrency: string) => {
    const updated = [...currencies]
    updated[index].value = newCurrency
    setCurrencies(updated)

    if (updated[index].amount) {
      handleAmountChange(index, updated[index].amount)
    }
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
            currencies={currencies}
            onAmountChange={handleAmountChange}
            onCurrencyChange={handleCurrencyChange}
          />
        </main>
      </div>
    </div>
  )
}