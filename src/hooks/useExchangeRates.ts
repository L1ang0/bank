import { useState, useMemo } from 'react';

const DEFAULT_MARGINS = {
  sell: 2,
  buy: 2.5
};

type ExchangeRate = {
  currency: string;
  nbrb: number;
  sell: number;
  buy: number;
};

export default function useExchangeRates(
  rates: Record<string, number>,
  currenciesList: string[]
) {
  const [activeTable, setActiveTable] = useState<'nbrb' | 'exchange'>('nbrb');
  
  const currencyListForTable = useMemo(() => {
    return ['USD', 'EUR', 'GBP', 'JPY', 'CNY', 'RUB'].filter(c => 
      currenciesList.includes(c)
    );
  }, [currenciesList]);

  const exchangeRates = useMemo(() => {
    return currencyListForTable
      .map(cur => {
        const nbrbRate = rates[cur];
        if (!nbrbRate) return null;
        
        return {
          currency: cur,
          nbrb: nbrbRate,
          sell: nbrbRate * (1 - DEFAULT_MARGINS.sell / 100),
          buy: nbrbRate * (1 + DEFAULT_MARGINS.buy / 100)
        };
      })
      .filter((rate): rate is ExchangeRate => rate !== null); // Type guard
  }, [rates, currencyListForTable]);

  return {
    activeTable,
    setActiveTable,
    currencyListForTable,
    exchangeRates,
    margins: DEFAULT_MARGINS
  };
}