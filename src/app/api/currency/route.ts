import { NextResponse } from 'next/server'

interface NBRBItem {
  Cur_Abbreviation: string;
  Cur_OfficialRate: number;
  Cur_Scale: number;
}

export async function GET() {
  try {
    const res = await fetch('https://api.nbrb.by/exrates/rates?periodicity=0')

    if (!res.ok) {
      return NextResponse.json({ error: 'Failed to fetch NBRB currency data' }, { status: 500 })
    }

    const nbrbData = await res.json() as NBRBItem[]

    const rates: Record<string, number> = { BYN: 1 }
    const currencies: string[] = ['BYN']

    nbrbData.forEach((item) => {
      if (item.Cur_Abbreviation && item.Cur_OfficialRate && item.Cur_Scale) {
        const ratePerUnit = item.Cur_OfficialRate / item.Cur_Scale
        rates[item.Cur_Abbreviation] = ratePerUnit
        currencies.push(item.Cur_Abbreviation)
      }
    })

    return NextResponse.json({
      currencies,
      rates,
      base: 'BYN',
      timestamp: Date.now()
    })
  } catch {
    return NextResponse.json({ error: 'Unexpected error occurred' }, { status: 500 })
  }
}