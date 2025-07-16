import { NextResponse } from 'next/server'

export async function GET() {
  const res = await fetch(
    `https://open.er-api.com/v6/latest/USD`
  )

  if (!res.ok) {
    return NextResponse.json({ error: 'Failed to fetch currency data' }, { status: 500 })
  }

  const data = await res.json()

  const allCurrencies = Object.keys(data.rates)
  
  allCurrencies.unshift(data.base_code)

  const currencyList = allCurrencies

  return NextResponse.json({
    currencies: currencyList,
    rates: data.rates,
    base: data.base_code,
    timestamp: data.time_last_update_unix
  })

}