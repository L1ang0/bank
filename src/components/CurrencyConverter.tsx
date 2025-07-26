'use client'

import Image from 'next/image'
import Select from 'react-select'
import { motion } from 'framer-motion'
import { components } from 'react-select'

const LoadingState = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-200 bg-opacity-90 z-50">
    <div className="text-center p-8 bg-gray-300 rounded-xl shadow-lg max-w-md w-full mx-4 border border-gray-500 transform transition-all">
      <div className="animate-spin text-4xl mb-3">🔄</div>
      <h2 className="text-xl font-semibold text-gray-800">Загрузка курсов валют</h2>
      <p className="text-gray-700 mt-1">Пожалуйста, подождите...</p>
    </div>
  </div>
)

const ErrorState = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-90 z-50">
    <div className="text-center p-8 bg-gray-200 rounded-xl shadow-lg max-w-md w-full mx-4 border border-red-100 transform transition-all">
      <div className="text-4xl mb-3 animate-pulse">⚠️</div>
      <h2 className="text-xl font-semibold text-red-600">Ошибка загрузки</h2>
      <p className="text-gray-600 mt-2">Не удалось загрузить данные о валютах</p>
      <button 
        className="mt-4 px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-300"
        onClick={() => window.location.reload()}
      >
        Попробовать снова
      </button>
    </div>
  </div>
)

const ConverterBlock = ({
  title,
  gradientClass,
  currencies,
  currenciesList,
  onAmountChange,
  onCurrencyChange,
  onAddCurrency,
  onRemoveCurrency
}: {
  title: string
  gradientClass: string
  currencies: { value: string; amount: string }[]
  currenciesList: string[]
  onAmountChange: (index: number, value: string) => void
  onCurrencyChange: (index: number, currency: string) => void
  onAddCurrency: () => void
  onRemoveCurrency: () => void
}) => (
  <motion.div 
    initial={{ opacity: 0, y: -20, x: -30 }}
    animate={{ opacity: 1, y: 0, x: 0 }}
    transition={{ duration: 0.8 }}
    className="flex-1 bg-white dark:bg-[#2d3748] rounded-2xl shadow-lg p-6 w-full mb-6"
  >
    <div className={`${gradientClass} p-8 rounded-xl max-md:-mt-[50px] max-sm:-ml-[10px] max-sm:-mr-[10px]`}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-amber-300 dark:text-green-400">{title}</h2>
        <div className="flex gap-2">
          <button 
            onClick={onAddCurrency}
            disabled={currencies.length >= 10}
            className={`px-4 py-2 bg-white dark:bg-gray-700 text-black dark:text-white rounded-lg transition-colors ${
              currencies.length >= 10 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:bg-gray-100 dark:hover:bg-gray-600'
            }`}
            title={currencies.length >= 10 ? "Максимум 10 валют" : "Добавить валюту"}
          >
            +
          </button>
          <button 
            onClick={onRemoveCurrency}
            disabled={currencies.length <= 2}
            className={`px-4 py-2 bg-white dark:bg-gray-700 text-black dark:text-white rounded-lg transition-colors ${
              currencies.length <= 2 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:bg-gray-100 dark:hover:bg-gray-600'
            }`}
            title={currencies.length <= 2 ? "Минимум 2 валюты" : "Удалить валюту"}
          >
            -
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {currencies.map((entry, index) => (
          <div key={`${title}-${index}`} className="flex items-center gap-2">
            <input
              type="text"
              value={entry.amount}
              onChange={(e) => {
                const value = e.target.value
                if (value === '' || /^[0-9]*\.?[0-9]*$/.test(value)) {
                  onAmountChange(index, value)
                }
              }}
              placeholder="Сумма"
              className="flex-1 p-3 rounded-lg bg-gray-100 dark:bg-gray-700 focus:ring-2 focus:ring-red-500 dark:focus:ring-blue-500 transition-all duration-200"
            />
            
            <div className="relative w-auto group">
              <div className="react-select-container">
                <Select
                  instanceId={`${title}-currency-select-${index}`}
                  options={currenciesList.map(cur => ({ value: cur, label: cur }))}
                  value={{ value: entry.value, label: entry.value }}
                  isSearchable={false}
                  onChange={(selectedOption) => 
                    onCurrencyChange(index, selectedOption?.value || 'BYN')
                  }
                  classNamePrefix="react-select"
                  formatOptionLabel={(option) => option.label}
                  components={{
                    SingleValue: ({ children, ...props }) => (
                      <components.SingleValue {...props}>
                        <div className="flex items-center gap-2">
                          {props.data.value === 'XDR' ? (
                            <span className="text-lg">🌐</span>
                          ) : (
                            <Image
                              src={`https://flagcdn.com/24x18/${props.data.value.slice(0, 2).toLowerCase()}.png`}
                              alt={props.data.value}
                              width={24}
                              height={18}
                              className="rounded-sm"
                            />
                          )}
                          {props.data.value}
                        </div>
                      </components.SingleValue>
                    ),
                    Option: ({ children, ...props }) => (
                      <components.Option {...props}>
                        <div className="flex items-center gap-2">
                          {props.data.value === 'XDR' ? (
                            <span className="text-lg">🌐</span>
                          ) : (
                            <Image
                              src={`https://flagcdn.com/24x18/${props.data.value.slice(0, 2).toLowerCase()}.png`}
                              alt={props.data.value}
                              width={24}
                              height={18}
                              className="rounded-sm"
                            />
                          )}
                          {props.data.value}
                        </div>
                      </components.Option>
                    )
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </motion.div>
)


export default function CurrencyConverter({
  isLoading,
  isError,
  rates,
  currenciesList,
  nbrbCurrencies,
  buyCurrencies,
  sellCurrencies,
  onNbrbAmountChange,
  onNbrbCurrencyChange,
  onBuyAmountChange,
  onBuyCurrencyChange,
  onSellAmountChange,
  onSellCurrencyChange,
  onAddNbrbCurrency,
  onAddBuyCurrency,
  onAddSellCurrency,
  onRemoveNbrbCurrency,
  onRemoveBuyCurrency,
  onRemoveSellCurrency,
}: {
  isLoading: boolean
  isError: boolean
  rates: Record<string, number>
  currenciesList: string[]
  nbrbCurrencies: { value: string; amount: string }[]
  buyCurrencies: { value: string; amount: string }[]
  sellCurrencies: { value: string; amount: string }[]
  onNbrbAmountChange: (index: number, value: string) => void
  onNbrbCurrencyChange: (index: number, currency: string) => void
  onBuyAmountChange: (index: number, value: string) => void
  onBuyCurrencyChange: (index: number, currency: string) => void
  onSellAmountChange: (index: number, value: string) => void
  onSellCurrencyChange: (index: number, currency: string) => void
  onAddNbrbCurrency: () => void
  onAddBuyCurrency: () => void
  onAddSellCurrency: () => void
  onRemoveNbrbCurrency: () => void
  onRemoveBuyCurrency: () => void
  onRemoveSellCurrency: () => void
}) {
  if (isLoading) return <LoadingState />
  if (isError) return <ErrorState />

  return (
    <div className="w-full bg-[#f9fafb] dark:bg-[#1f2937] text-gray-900 dark:text-white p-4 sm:p-6">
      <ConverterBlock
        title="💱 Конвертер валют НБРБ"
        gradientClass="bg-gradient-to-l from-pink-700 via-rose-600 to-red-700 dark:bg-gradient-to-l dark:from-cyan-400 dark:via-cyan-600 dark:to-blue-600"
        currencies={nbrbCurrencies}
        currenciesList={currenciesList}
        onAmountChange={onNbrbAmountChange}
        onCurrencyChange={onNbrbCurrencyChange}
        onAddCurrency={onAddNbrbCurrency}
        onRemoveCurrency={onRemoveNbrbCurrency}
      />

      <ConverterBlock
        title="💱 Конвертер (Покупка валюты у банка)"
        gradientClass="bg-gradient-to-l from-green-700 via-emerald-600 to-teal-700"
        currencies={buyCurrencies}
        currenciesList={currenciesList}
        onAmountChange={onBuyAmountChange}
        onCurrencyChange={onBuyCurrencyChange}
        onAddCurrency={onAddBuyCurrency}
        onRemoveCurrency={onRemoveBuyCurrency}
      />

      <ConverterBlock
        title="💱 Конвертер (Продажа валюты банку)"
        gradientClass="bg-gradient-to-l from-blue-700 via-indigo-600 to-purple-700"
        currencies={sellCurrencies}
        currenciesList={currenciesList}
        onAmountChange={onSellAmountChange}
        onCurrencyChange={onSellCurrencyChange}
        onAddCurrency={onAddSellCurrency}
        onRemoveCurrency={onRemoveSellCurrency}
      />
    </div>
  )
}