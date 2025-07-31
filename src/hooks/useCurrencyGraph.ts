import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

// Types
export interface HistoricalRate {
  date: string;
  rate: number;
}

interface NBRBApiResponse {
  Date: string;
  Cur_OfficialRate: number;
  Cur_Scale: number;
}

interface CurrentRate {
  Cur_Abbreviation: string;
  Cur_OfficialRate: number;
}

interface TooltipContext {
  parsed: {
    y: number;
  };
}

// Constants
export const CURRENCY_IDS: Record<string, number> = {
  BYN: 1, USD: 431, EUR: 451, GBP: 429, RUB: 456,
  PLN: 452, CNY: 462, UAH: 449, KZT: 459, TRY: 460,
  CZK: 463, SEK: 464, CAD: 371, CHF: 426, AUD: 440,
  BGN: 441, BRL: 514
};

export const CURRENCY_SCALES: Record<string, { scale: number; displayScale: number }> = {
  BYN: { scale: 1, displayScale: 1 },
  USD: { scale: 1, displayScale: 1 },
  EUR: { scale: 1, displayScale: 1 },
  GBP: { scale: 1, displayScale: 1 },
  RUB: { scale: 100, displayScale: 100 },
  PLN: { scale: 10, displayScale: 10 },
  CNY: { scale: 10, displayScale: 10 },
  UAH: { scale: 100, displayScale: 100 },
  KZT: { scale: 1000, displayScale: 1000 },
  TRY: { scale: 10, displayScale: 10 },
  CZK: { scale: 10, displayScale: 10 },
  SEK: { scale: 10, displayScale: 10 },
  CAD: { scale: 1, displayScale: 1 },
  CHF: { scale: 1, displayScale: 1 },
  AUD: { scale: 1, displayScale: 1 },
  BGN: { scale: 1, displayScale: 1 },
  BRL: { scale: 10, displayScale: 10 },
};

export const CURRENCY_OPTIONS = Object.keys(CURRENCY_IDS).map(code => ({
  value: code,
  label: code
}));

export const TIME_RANGES = [
  { value: 7, label: '7 дней' },
  { value: 30, label: '30 дней' },
  { value: 90, label: '90 дней' },
  { value: 365, label: '1 год' }
];

// Utility functions
const fillMissingDates = (data: HistoricalRate[], startDate: Date, endDate: Date): HistoricalRate[] => {
  const result: HistoricalRate[] = [];
  const dateMap = new Map<string, number>();
  
  data.forEach(item => dateMap.set(item.date, item.rate));

  let lastValidRate = data.find(item => !isNaN(item.rate))?.rate ?? 1;
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    const dateStr = currentDate.toISOString().split('T')[0];
    const rate = dateMap.get(dateStr) ?? lastValidRate;
    result.push({ date: dateStr, rate });
    lastValidRate = rate;
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  return result;
};

const generateFallbackData = (start: Date, end: Date): HistoricalRate[] => {
  const days = Math.floor((end.getTime() - start.getTime()) / (1000 * 3600 * 24));
  return Array.from({ length: days + 1 }, (_, i) => ({
    date: new Date(start.getTime() + i * 86400000).toISOString().split('T')[0],
    rate: 1
  }));
};

const thinOutData = (data: HistoricalRate[], step: number): HistoricalRate[] => {
  if (step <= 1) return data;
  return data.filter((_, index) => index % step === 0);
};

// API functions
const fetchHistoricalRates = async (from: string, to: string, days: number): Promise<HistoricalRate[]> => {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - days);
  const formatDate = (date: Date) => date.toISOString().split('T')[0];

  if (from === to) return generateFallbackData(startDate, endDate);

  if (from === 'BYN') {
    const currencyId = CURRENCY_IDS[to];
    if (!currencyId) throw new Error(`Unknown currency: ${to}`);

    const response = await fetch(
      `https://api.nbrb.by/exrates/rates/dynamics/${currencyId}?startdate=${formatDate(startDate)}&enddate=${formatDate(endDate)}`,
      { headers: { 'Accept': 'application/json' } }
    );
    
    if (!response.ok) throw new Error(`API Error: ${response.status}`);
    
    const data: NBRBApiResponse[] = await response.json();
    const scale = CURRENCY_SCALES[to].scale;
    
    return data.map(item => ({
      date: item.Date.split('T')[0],
      rate: scale / item.Cur_OfficialRate
    }));
  } 
  else if (to === 'BYN') {
    const currencyId = CURRENCY_IDS[from];
    if (!currencyId) throw new Error(`Unknown currency: ${from}`);

    const response = await fetch(
      `https://api.nbrb.by/ExRates/Rates/Dynamics/${currencyId}?startDate=${formatDate(startDate)}&endDate=${formatDate(endDate)}`
    );
    
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    
    const data: NBRBApiResponse[] = await response.json();
    const scale = CURRENCY_SCALES[from].scale;
    
    return data.map(item => ({
      date: item.Date.split('T')[0],
      rate: item.Cur_OfficialRate / scale
    }));
  }

  throw new Error('Cross-currency conversion not implemented');
};

// Custom hooks
export const useCurrencyRatesQuery = () => {
  return useQuery<CurrentRate[]>({
    queryKey: ['currencyRates'],
    queryFn: async () => {
      const response = await fetch('https://api.nbrb.by/exrates/rates?periodicity=0');
      if (!response.ok) throw new Error('Failed to fetch rates');
      return response.json();
    },
    staleTime: 1000 * 60 * 5,
  });
};

export const useHistoricalRatesQuery = (from: string, to: string, days: number) => {
  return useQuery<HistoricalRate[]>({
    queryKey: ['historicalRates', from, to, days],
    queryFn: () => fetchHistoricalRates(from, to, days),
    select: (data) => {
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(endDate.getDate() - days);
      
      let thinningStep = 1;
      if (days === 90) thinningStep = 3;
      if (days === 365) thinningStep = 7;
      
      const filledData = fillMissingDates(data.filter(d => !isNaN(d.rate)), startDate, endDate);
      return thinOutData(filledData, thinningStep);
    },
    staleTime: 1000 * 60 * 60,
    retry: 2,
  });
};

export const useCurrencyChart = () => {
  const [fromCurrency, setFromCurrency] = useState('BYN');
  const [toCurrency, setToCurrency] = useState('USD');
  const [timeRange, setTimeRange] = useState(30);

  const { data: currentRates } = useCurrencyRatesQuery();
  const { 
    data: historicalData = [], 
    isLoading, 
    error 
  } = useHistoricalRatesQuery(fromCurrency, toCurrency, timeRange);

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const handleFromCurrencyChange = (newCurrency: string) => {
    if (newCurrency === toCurrency) {
      swapCurrencies();
    } else if (newCurrency !== 'BYN' && toCurrency !== 'BYN') {
      setToCurrency(fromCurrency);
      setFromCurrency(newCurrency);
    } else {
      setFromCurrency(newCurrency);
    }
  };

  const handleToCurrencyChange = (newCurrency: string) => {
    if (newCurrency === fromCurrency) {
      swapCurrencies();
    } else if (newCurrency !== 'BYN' && fromCurrency !== 'BYN') {
      setFromCurrency(toCurrency);
      setToCurrency(newCurrency);
    } else {
      setToCurrency(newCurrency);
    }
  };

  const formatRateDisplay = (rateStr: string, from: string, to: string) => {
    const rate = parseFloat(rateStr);
    if (isNaN(rate)) return '...';
    if (from === to) return `1 ${from} = 1 ${to}`;
    
    if (from === 'BYN') {
      return `1 ${from} = ${(rate).toFixed(4)} ${to}`;
    } 
    else if (to === 'BYN') {
      const fromConfig = CURRENCY_SCALES[from];
      return `${fromConfig.scale} ${from} = ${(rate * fromConfig.scale ).toFixed(4)} ${to}`;
    }
    else {
      return `1 ${from} = ${rate.toFixed(4)} ${to}`;
    }
  };

  const calculateCurrentRate = () => {
    if (fromCurrency === toCurrency) return '1.0000';
    if (!currentRates) return '...';
    
    if (fromCurrency === 'BYN') {
      const rate = currentRates.find((r) => r.Cur_Abbreviation === toCurrency)?.Cur_OfficialRate;
      const scale = CURRENCY_SCALES[toCurrency].scale;
      return rate ? (scale / rate).toString() : '...';
    } 
    else if (toCurrency === 'BYN') {
      const rate = currentRates.find((r) => r.Cur_Abbreviation === fromCurrency)?.Cur_OfficialRate;
      const scale = CURRENCY_SCALES[fromCurrency].scale;
      return rate ? (rate / scale).toString() : '...';
    }
    else {
      const fromRate = currentRates.find((r) => r.Cur_Abbreviation === fromCurrency)?.Cur_OfficialRate;
      const toRate = currentRates.find((r) => r.Cur_Abbreviation === toCurrency)?.Cur_OfficialRate;
      const fromScale = CURRENCY_SCALES[fromCurrency].scale;
      const toScale = CURRENCY_SCALES[toCurrency].scale;
      
      return fromRate && toRate ? ((toScale / toRate) / (fromScale / fromRate)).toString() : '...';
    }
  };

  const currentRate = calculateCurrentRate();
  const formattedRateDisplay = formatRateDisplay(currentRate, fromCurrency, toCurrency);

  const validData = historicalData.filter(d => !isNaN(d.rate));
  const validRates = validData.map(d => d.rate);
  const minRate = validRates.length > 0 ? Math.min(...validRates) : 0;
  const maxRate = validRates.length > 0 ? Math.max(...validRates) : 1;

  const pointSettings = timeRange <= 30 ? {
    pointRadius: 3,
    pointHoverRadius: 5
  } : {
    pointRadius: 2,
    pointHoverRadius: 4
  };

  const chartData = {
    labels: validData.map(item => item.date),
    datasets: [{
      label: `${fromCurrency}/${toCurrency}`,
      data: validData.map(item => item.rate),
      borderColor: 'rgb(75, 192, 192)',
      backgroundColor: 'rgba(75, 192, 192, 0.5)',
      borderWidth: 2,
      tension: 0.1,
      ...pointSettings
    }],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true, position: 'top' as const },
      title: { 
        display: true, 
        text: `Курс ${fromCurrency} к ${toCurrency} за ${TIME_RANGES.find(r => r.value === timeRange)?.label}`
      },
      tooltip: {
        callbacks: {
          label: (context: TooltipContext) => {
            const fromConfig = CURRENCY_SCALES[fromCurrency];
            const toConfig = CURRENCY_SCALES[toCurrency];
            
            if (fromCurrency === 'BYN') {
              return `1 ${fromCurrency} = ${(context.parsed.y).toFixed(4)} ${toCurrency}`;
            } else if (toCurrency === 'BYN') {
              return `${fromConfig.displayScale} ${fromCurrency} = ${(context.parsed.y * fromConfig.displayScale).toFixed(4)} ${toCurrency}`;
            } else {
              return `${fromConfig.displayScale} ${fromCurrency} = ${(context.parsed.y * fromConfig.displayScale / toConfig.displayScale).toFixed(4)} ${toCurrency} (за ${toConfig.displayScale} ${toCurrency})`;
            }
          }
        }
      }
    },
    scales: {
      x: {
        title: { display: true, text: 'Дата' },
        ticks: { 
          maxTicksLimit: timeRange <= 30 ? 10 : timeRange === 90 ? 15 : 20,
          autoSkip: true 
        }
      },
      y: {
        title: { display: true, text: `Курс (${toCurrency})` },
        beginAtZero: false,
        min: fromCurrency === toCurrency ? 0.95 : Math.max(minRate * 0.95, minRate - (maxRate - minRate) * 0.5),
        max: fromCurrency === toCurrency ? 1.05 : Math.min(maxRate * 1.05, maxRate + (maxRate - minRate) * 0.5)
      }
    }
  };

  return {
    fromCurrency,
    toCurrency,
    timeRange,
    setTimeRange,
    handleFromCurrencyChange,
    handleToCurrencyChange,
    swapCurrencies,
    isLoading,
    error,
    formattedRateDisplay,
    chartData,
    chartOptions,
    historicalData
  };
};