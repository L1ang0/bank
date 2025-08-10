import { useQuery } from '@tanstack/react-query'

export interface CurrentRate {
  // добавьте здесь поля, которые ожидаете в ответе от API
  Cur_ID: number
  Cur_Abbreviation: string
  Cur_Scale: number
  Cur_Name: string
  Cur_OfficialRate: number
  Date: string
}

export interface CurrencyResponse {
  currencies: string[]
  rates: Record<string, number>
  base: string
  timestamp: number
}

async function fetchCurrencyRates(): Promise<CurrentRate[]> {
  const response = await fetch('https://api.nbrb.by/exrates/rates?periodicity=0');
  
  if (!response.ok) {
    throw new Error('Ошибка при получении данных с API НБРБ');
  }

  return response.json();
}

export function useCurrencyRatesQuery() {
  return useQuery({
    queryKey: ['currencyRates'],
    queryFn: fetchCurrencyRates,
    staleTime: 10 * 60 * 1000,
    refetchInterval: 10 * 60 * 1000,
    retry: 1,
  });
}