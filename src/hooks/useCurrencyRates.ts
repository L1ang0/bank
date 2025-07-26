import { useQuery } from '@tanstack/react-query'

export interface CurrencyResponse {
  currencies: string[]
  rates: Record<string, number>
  base: string
  timestamp: number
}

async function fetchCurrencyRates(): Promise<CurrencyResponse> {
  const res = await fetch('/api/currency')

  if (!res.ok) {
    throw new Error('Ошибка при получении данных с /api/currency')
  }

  return res.json()
}

export function useCurrencyRates() {
  return useQuery<CurrencyResponse>({
    queryKey: ['currencyRates'],
    queryFn: fetchCurrencyRates,
    staleTime: 10 * 60 * 1000,
    refetchInterval: 10 * 60 * 1000,
    retry: 1,
  })
}
