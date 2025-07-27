import { useState, useCallback, useEffect, useMemo } from 'react';

type CurrencyEntry = { value: string; amount: string };
type ConverterType = 'nbrb' | 'buy' | 'sell';

const initialCurrencies = [
  { value: 'BYN', amount: '' },
  { value: 'USD', amount: '' },
  { value: 'EUR', amount: '' },
  { value: 'RUB', amount: '' },
  { value: 'CNY', amount: '' },
  { value: 'PLN', amount: '' },
];

export default function useCurrencyData() {
  const [data, setData] = useState<null | {
    rates: Record<string, number>;
    currencies: string[];
    base: string;
    timestamp: number;
  }>(null);
  
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  // Инициализация конвертеров
  const nbrbConverter = useCurrencyConverter(
    initialCurrencies, 
    data?.rates || null, 
    'nbrb',
    data?.currencies || [] 
  );
  
  const buyConverter = useCurrencyConverter(
    initialCurrencies,
    data?.rates || null,
    'buy',
    data?.currencies || []
  );
  
  const sellConverter = useCurrencyConverter(
    initialCurrencies,
    data?.rates || null,
    'sell',
    data?.currencies || []
  );

  useEffect(() => {
    async function fetchRates() {
      setIsLoading(true);
      setIsError(false);
      try {
        const res = await fetch('/api/currency');
        if (!res.ok) throw new Error('Ошибка запроса');
        setData(await res.json());
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchRates();
  }, []);

  return {
    data,
    isLoading,
    isError,
    nbrbConverter,
    buyConverter,
    sellConverter
  };
}

export const useCurrencyConverter = (
  initialCurrencies: CurrencyEntry[],
  rates: Record<string, number> | null,
  type: ConverterType,
  allCurrencies: string[] = []
) => {
  const [currencies, setCurrencies] = useState<CurrencyEntry[]>(initialCurrencies);
  const [isAddingCurrency, setIsAddingCurrency] = useState(false);

   // Доступные для добавления валюты
  const availableCurrencies = useMemo(() => {
    const usedCurrencies = new Set(currencies.map(c => c.value));
    return allCurrencies.filter(currency => !usedCurrencies.has(currency));
  }, [currencies, allCurrencies]);

  // Можно ли добавить валюту
  const canAddCurrency = useMemo(() => {
    return currencies.length < 10 && availableCurrencies.length > 0;
  }, [currencies.length, availableCurrencies.length]);

  // Можно ли удалить валюту
  const canRemoveCurrency = currencies.length > 2;

  // Корректировка курсов для покупки/продажи
  const getAdjustedRates = useCallback(() => {
    if (!rates) return {};
    
    const adjusted = {...rates};
    const sellMargin = 2;
    const buyMargin = 2.5;
    
    if (type === 'buy') {
      Object.keys(adjusted).forEach(currency => {
        if (currency !== 'BYN') adjusted[currency] *= (1 + buyMargin / 100);
      });
    } 
    else if (type === 'sell') {
      Object.keys(adjusted).forEach(currency => {
        if (currency !== 'BYN') adjusted[currency] *= (1 - sellMargin / 100);
      });
    }
    
    return adjusted;
  }, [rates, type]);

  // Обработчик изменения суммы
  const handleAmountChange = useCallback((index: number, newAmount: string) => {
    setCurrencies(prev => {

      if (prev[index].amount === newAmount) return prev;
      
      const adjustedRates = getAdjustedRates();
      
      if (newAmount === '') {
        return prev.map(item => ({...item, amount: ''}));
      }
  
      const baseCurrency = prev[index].value;
      const baseValue = parseFloat(newAmount);
      
      if (!adjustedRates[baseCurrency] || isNaN(baseValue)) return prev;
  
      const valueInBYN = baseValue * adjustedRates[baseCurrency];
  
      return prev.map((item, i) => {
        if (i === index) return {...item, amount: newAmount};
        const targetRate = adjustedRates[item.value];
        return {
          ...item,
          amount: targetRate ? (valueInBYN / targetRate).toFixed(4) : ''
        };
      });
    });
  }, [getAdjustedRates]);

  // Обработчик изменения валюты
  const handleCurrencyChange = useCallback((index: number, newCurrency: string) => {
    setCurrencies(prev => {
      const updated = prev.map((item, i) => 
        i === index ? {...item, value: newCurrency} : item
      );
      
      if (updated[index].amount) {
        const adjustedRates = getAdjustedRates();
        const baseAmount = updated[index].amount;
        const baseValue = parseFloat(baseAmount);
        
        if (!adjustedRates[newCurrency] || isNaN(baseValue)) return updated;

        const valueInBYN = baseValue * adjustedRates[newCurrency];

        return updated.map(item => {
          const targetRate = adjustedRates[item.value];
          return {
            ...item,
            amount: targetRate ? (valueInBYN / targetRate).toFixed(4) : item.amount
          };
        });
      }
      
      return updated;
    });
  }, [getAdjustedRates]);

  // Добавление валюты
  const addCurrency = useCallback((currency: string) => {
    if (currencies.length < 10) {
      setCurrencies(prev => [...prev, { value: currency, amount: '' }]);
      setIsAddingCurrency(false);
    }
  }, [currencies.length]);

  // Удаление валюты
  const removeCurrency = useCallback(() => {
    if (currencies.length > 2) {
      setCurrencies(prev => prev.slice(0, -1));
    }
  }, [currencies.length]);

  // Открытие модального окна добавления валюты
  const openAddCurrencyModal = useCallback(() => {
    if (availableCurrencies.length > 0) {
      setIsAddingCurrency(true);
    }
  }, [availableCurrencies.length]);

  // Закрытие модального окна
  const closeAddCurrencyModal = useCallback(() => {
    setIsAddingCurrency(false);
  }, []);

  
  useEffect(() => {
    if (!rates) return;
  
    // Создаем копию текущего состояния для использования в эффекте
    const currentCurrencies = [...currencies];
    const adjustedRates = getAdjustedRates();
  
    const firstNonEmptyIndex = currentCurrencies.findIndex(c => c.amount);
    if (firstNonEmptyIndex === -1) return;
  
    const currentAmount = currentCurrencies[firstNonEmptyIndex].amount;
    if (!currentAmount) return;
  
    const baseCurrency = currentCurrencies[firstNonEmptyIndex].value;
    const baseValue = parseFloat(currentAmount);
    
    if (!adjustedRates[baseCurrency] || isNaN(baseValue)) return;
  
    const valueInBYN = baseValue * adjustedRates[baseCurrency];
  
    setCurrencies(prev => prev.map((item, i) => {
      if (i === firstNonEmptyIndex) return item;
      const targetRate = adjustedRates[item.value];
      return {
        ...item,
        amount: targetRate ? (valueInBYN / targetRate).toFixed(4) : ''
      };
    }));
  }, [rates, type]);

  return {
    currencies,
    availableCurrencies,
    isAddingCurrency,
    canAddCurrency,
    canRemoveCurrency,
    handleAmountChange,
    handleCurrencyChange,
    addCurrency,
    removeCurrency,
    openAddCurrencyModal,
    closeAddCurrencyModal
  };
};