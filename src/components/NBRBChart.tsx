'use client'

import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend,} from 'chart.js';
import { ArrowRightLeft } from 'lucide-react';
import { useCurrencyChart, CURRENCY_OPTIONS, TIME_RANGES } from '@/hooks/useCurrencyGraph';
import Select, { components, SingleValueProps, OptionProps } from 'react-select';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState } from 'react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type CurrencyOption = {
  value: string;
  label: string;
};

export const NBRBChart = () => {
  const {
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
  } = useCurrencyChart();

    const [isSwapping, setIsSwapping] = useState(false);
    
    const handleSwap = () => {
      setIsSwapping(true);
      swapCurrencies();
      setTimeout(() => setIsSwapping(false), 1000);
    };

    return (
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mt-6 border border-gray-100 dark:border-gray-700">
        <div className="flex flex-col gap-4 mb-4">
          {/* Первая строка: логотипы по краям и кнопки по центру */}
          <div className="flex flex-col sm:flex-row items-center justify-between">
            {/* Левое лого - теперь в отдельном div для правильного выравнивания */}
            <div className="hidden sm:block w-40 xl:w-42 xl:-mb-10">
              <motion.div
                animate={{
                  filter: [
                    'sepia(0.3) hue-rotate(0deg) saturate(2)',
                    'sepia(0.3) hue-rotate(90deg) saturate(3)',
                    'sepia(0.3) hue-rotate(180deg) saturate(2)',
                    'sepia(0.3) hue-rotate(270deg) saturate(3)',
                    'sepia(0.3) hue-rotate(360deg) saturate(2)'
                  ],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 6.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Image 
                  src="/logo.png" 
                  alt="Bank Logo" 
                  width={240} 
                  height={60}  
                  className="h-20 w-full xl:ml-15 dark:sepia-[0.3] dark:saturate-200 [filter:drop-shadow(0_10px_15px_rgba(0,0,0,0.4))]" 
                />
              </motion.div>
            </div>
  
            {/* Кнопки времени по центру - теперь в отдельном div с flex-grow и центрированием */}
            <div className="flex-grow flex justify-center">
              <div className="flex z-50 p-2 rounded-br-2xl rounded-tl-2xl bg-gradient-to-tr
              from-pink-500 via-rose-500 to-red-700 dark:from-cyan-400 dark:via-blue-500 dark:to-indigo-600 gap-1 md:gap-2">
                {TIME_RANGES.map((range) => (
                  <button
                    key={range.value}
                    onClick={() => setTimeRange(range.value)}
                    className={`xl:px-3 px-2 py-2 text-sm rounded-md hover:shadow text-[11px] md:text-[13px] xl:text-[14px] hover:text-[14.1px] hover:scale-102 transition-all transform duration-150 cursor-pointer ${
                      timeRange === range.value
                        ? 'bg-gradient-to-tr from-[#45bbc6] via-[#34bbdb] to-[#3fdbfb] dark:from-[#3b7bff] dark:via-[#3b6bff] dark:to-[#2b2bff] text-white'
                        : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                    disabled={isLoading}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>
  
            {/* Правое лого - теперь в отдельном div для правильного выравнивания */}
            <div className="hidden sm:block w-40 xl:w-42 xl:-mb-10">
              <motion.div
                animate={{
                  filter: [
                    'sepia(0.3) hue-rotate(0deg) saturate(2)',
                    'sepia(0.3) hue-rotate(90deg) saturate(3)',
                    'sepia(0.3) hue-rotate(180deg) saturate(2)',
                    'sepia(0.3) hue-rotate(270deg) saturate(3)',
                    'sepia(0.3) hue-rotate(360deg) saturate(2)'
                  ],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 6.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Image 
                  src="/logo.png" 
                  alt="Bank Logo" 
                  width={140} 
                  height={60}  
                  className="h-20 xl:-ml-15 w-full dark:sepia-[0.3] dark:saturate-200 [filter:drop-shadow(0_10px_15px_rgba(0,0,0,0.4))]" 
                />
              </motion.div>
            </div>
          </div>
          {/* Вторая строка: селекторы валют по центру */}
          <div className="flex justify-center">
            <div className="flex flex-row items-center gap-3">
              <motion.div
                animate={{
                  y: isSwapping ? [0, -10, 0] : 0,
                  x: isSwapping ? [0, -5, 0] : 0,
                }}
                transition={{
                  duration: 1.0,
                  ease: "easeInOut"
                }}
              >
                <div className="w-full sm:w-auto">
                  <div className="react-select-container">
                    <Select<CurrencyOption>
                      instanceId="from-currency-select"
                      options={CURRENCY_OPTIONS}
                      value={CURRENCY_OPTIONS.find(opt => opt.value === fromCurrency)}
                      isSearchable={false}
                      onChange={(newValue) => {
                        if (!newValue) return;
                        handleFromCurrencyChange(newValue.value);
                      }}
                      classNamePrefix="react-select"
                      formatOptionLabel={(option) => option.label}
                      menuPortalTarget={typeof document !== 'undefined' ? document.body : null}
                      menuPosition="fixed"
                      isDisabled={isLoading}
                      styles={{
                        menuPortal: base => ({ ...base, zIndex: 99999 }),
                        menu: base => ({ ...base, zIndex: 99999 }),
                        control: (base) => ({
                          ...base,
                          minHeight: '42px',
                          backgroundColor: 'rgb(255 255 255 / var(--tw-bg-opacity))',
                          borderColor: 'rgb(209 213 219 / var(--tw-border-opacity))',
                          ':hover': {
                            borderColor: 'rgb(156 163 175 / var(--tw-border-opacity))'
                          }
                        }),
                        singleValue: (base) => ({
                          ...base,
                          color: 'rgb(17 24 39 / var(--tw-text-opacity))'
                        })
                      }}
                      components={{
                        SingleValue: (props: SingleValueProps<CurrencyOption>) => (
                          <components.SingleValue {...props}>
                            <div className="flex items-center sm:gap-2 gap-1">
                              <Image
                                src={`https://flagcdn.com/24x18/${props.data.value.slice(0, 2).toLowerCase()}.png`}
                                alt={props.data.value}
                                width={22}
                                height={18}
                                className="rounded-sm"
                              />
                              {props.data.value}
                            </div>
                          </components.SingleValue>
                        ),
                        Option: (props: OptionProps<CurrencyOption>) => (
                          <components.Option {...props}>
                            <div className="flex items-center gap-2">
                              <Image
                                src={`https://flagcdn.com/24x18/${props.data.value.slice(0, 2).toLowerCase()}.png`}
                                alt={props.data.value}
                                width={24}
                                height={18}
                                className="rounded-sm"
                              />
                              {props.data.value}
                            </div>
                          </components.Option>
                        ),
                        DropdownIndicator: (props) => (
                          <components.DropdownIndicator {...props}>
                            <div className="relative w-3 h-3">
                              <motion.span
                                animate={{ 
                                  scale: [1, 1.5, 1],
                                  opacity: [1, 0.5, 0]
                                }}
                                transition={{ 
                                  duration: 1.5,
                                  repeat: Infinity,
                                  ease: "easeOut"
                                }}
                                className="absolute inset-0 rounded-full bg-green-500 dark:bg-green-400"
                              />
                              <motion.span 
                                className="absolute inset-0 rounded-full bg-green-500 dark:bg-green-400"
                              />
                            </div>
                          </components.DropdownIndicator>
                        ),
                        Menu: (props) => (
                          <components.Menu {...props} className="dark:bg-gray-800 dark:text-white" />
                        )
                      }}
                    />
                  </div>
                </div>
              </motion.div>
              
              <button 
                onClick={handleSwap}
                className="p-2 rounded-full cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                aria-label="Поменять валюты местами"
                disabled={isLoading}
              >
                <ArrowRightLeft className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </button>
              
              <motion.div
                animate={{
                  y: isSwapping ? [0, 10, 0] : 0,
                  x: isSwapping ? [0, 5, 0] : 0,
                }}
                transition={{
                  duration: 1.0,
                  ease: "easeInOut"
                }}
              >
                <div className="w-full sm:w-auto">
                  <div className="react-select-container">
                    <Select<CurrencyOption>
                      instanceId="to-currency-select"
                      options={CURRENCY_OPTIONS}
                      value={CURRENCY_OPTIONS.find(opt => opt.value === toCurrency)}
                      isSearchable={false}
                      onChange={(newValue) => {
                        if (!newValue) return;
                        handleToCurrencyChange(newValue.value);
                      }}
                      classNamePrefix="react-select"
                      formatOptionLabel={(option) => option.label}
                      menuPortalTarget={typeof document !== 'undefined' ? document.body : null}
                      menuPosition="fixed"
                      isDisabled={isLoading}
                      styles={{
                        menuPortal: base => ({ ...base, zIndex: 99999 }),
                        menu: base => ({ ...base, zIndex: 99999 }),
                        control: (base) => ({
                          ...base,
                          minHeight: '42px',
                          backgroundColor: 'rgb(255 255 255 / var(--tw-bg-opacity))',
                          borderColor: 'rgb(209 213 219 / var(--tw-border-opacity))',
                          ':hover': {
                            borderColor: 'rgb(156 163 175 / var(--tw-border-opacity))'
                          }
                        }),
                        singleValue: (base) => ({
                          ...base,
                          color: 'rgb(17 24 39 / var(--tw-text-opacity))'
                        })
                      }}
                      components={{
                        SingleValue: (props: SingleValueProps<CurrencyOption>) => (
                          <components.SingleValue {...props}>
                            <div className="flex items-center sm:gap-2 gap-1">
                              <Image
                                src={`https://flagcdn.com/24x18/${props.data.value.slice(0, 2).toLowerCase()}.png`}
                                alt={props.data.value}
                                width={22}
                                height={18}
                                className="rounded-sm"
                              />
                              {props.data.value}
                            </div>
                          </components.SingleValue>
                        ),
                        Option: (props: OptionProps<CurrencyOption>) => (
                          <components.Option {...props}>
                            <div className="flex items-center gap-2">
                              <Image
                                src={`https://flagcdn.com/24x18/${props.data.value.slice(0, 2).toLowerCase()}.png`}
                                alt={props.data.value}
                                width={24}
                                height={18}
                                className="rounded-sm"
                              />
                              {props.data.value}
                            </div>
                          </components.Option>
                        ),
                        DropdownIndicator: (props) => (
                          <components.DropdownIndicator {...props}>
                            <div className="relative w-3 h-3">
                              <motion.span
                                animate={{ 
                                  scale: [1, 1.5, 1],
                                  opacity: [1, 0.5, 0]
                                }}
                                transition={{ 
                                  duration: 1.5,
                                  repeat: Infinity,
                                  ease: "easeOut"
                                }}
                                className="absolute inset-0 rounded-full bg-rose-500 dark:bg-rose-400"
                              />
                              <motion.span 
                                className="absolute inset-0 rounded-full bg-rose-500 dark:bg-rose-400"
                              />
                            </div>
                          </components.DropdownIndicator>
                        ),
                        Menu: (props) => (
                          <components.Menu {...props} className="dark:bg-gray-800 dark:text-white" />
                        )
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
  
          {/* Current rate display */}
          <div className={`text-sm text-gray-50 dark:text-gray-50 bg-blue-100 bg-gradient-to-r from-pink-600 via-rose-500 to-red-700 dark:from-cyan-400 dark:via-blue-600 dark:to-indigo-800
          hover:text-[14.3px] transition-all transform duration-150 px-3 py-1 rounded-full ${
            isLoading ? 'opacity-70' : 'opacity-100'
          } text-center`}>
            {isLoading ? 'Загрузка...' : `Текущий курс: ${formattedRateDisplay}`}
          </div>
        </div>
  
        {/* Chart */}
        <div className="h-80 relative">
          {isLoading && (
            <div className="absolute inset-0 bg-white dark:bg-gray-800 bg-opacity-70 dark:bg-opacity-70 flex items-center justify-center z-10">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-2"></div>
                <p className="text-gray-600 dark:text-gray-400">Обновление данных...</p>
              </div>
            </div>
          )}
          {error ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-red-500">Ошибка: {error.message}</p>
            </div>
          ) : chartData.labels.length > 0 ? (
            <Line data={chartData} options={chartOptions} />
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500">Нет данных для отображения</p>
            </div>
          )}
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          Данные предоставлены Национальным банком Республики Беларусь
        </div>
      </div>
    );
  };