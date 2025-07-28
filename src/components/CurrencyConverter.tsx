'use client'

import Image from 'next/image'
import Select, { components, SingleValueProps, OptionProps } from 'react-select'
import { AnimatePresence, motion } from 'framer-motion'
import { useCurrencyConverter } from '@/hooks/useCurrencyConverter';
import { CurrencyModal } from './CurrencyModal'
import { useMemo, useState } from 'react';

type CurrencyConverter = ReturnType<typeof useCurrencyConverter>;

const LoadingState = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 flex items-center justify-center bg-gray-200/90 dark:bg-gray-900/90 z-50 backdrop-blur-sm"
  >
    <motion.div
      initial={{ scale: 0.9, y: 20 }}
      animate={{ scale: 1, y: 0 }}
      transition={{ type: 'spring' }}
      className="text-center p-8 bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full mx-4 border border-gray-200 dark:border-gray-700"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
        className="text-4xl mb-4"
      >
        💱
      </motion.div>
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Загрузка курсов валют</h2>
      <p className="text-gray-600 dark:text-gray-300 mt-2">Пожалуйста, подождите...</p>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: '100%' }}
        transition={{ duration: 2, repeat: Infinity }}
        className="h-1 bg-gradient-to-r from-blue-500 to-green-500 rounded-full mt-4"
      />
    </motion.div>
  </motion.div>
)

const ErrorState = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="fixed inset-0 flex items-center justify-center bg-gray-100/90 dark:bg-gray-900/90 z-50 backdrop-blur-sm"
  >
    <motion.div
      initial={{ scale: 0.9 }}
      animate={{ scale: 1 }}
      className="text-center p-8 bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full mx-4 border border-red-200 dark:border-red-800"
    >
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="text-4xl mb-4 text-red-500"
      >
        ⚠️
      </motion.div>
      <h2 className="text-xl font-semibold text-red-600 dark:text-red-400">Ошибка загрузки</h2>
      <p className="text-gray-600 dark:text-gray-300 mt-2">Не удалось загрузить данные о валютах</p>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-6 px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all"
        onClick={() => window.location.reload()}
      >
        Попробовать снова
      </motion.button>
    </motion.div>
  </motion.div>
)

const InfoTooltip = ({ content }: { content: string }) => (
  <div className="relative inline-block ml-1 mb-2 group">
    <span className="text-[12px] cursor-help opacity-70 hover:opacity-100">ℹ️</span>
    <div className="absolute hidden group-hover:block bg-white dark:bg-gray-800 text-black dark:text-white p-2 rounded shadow-lg text-xs w-48  top-1/2 left-full transform -translate-y-1/2 ml-1">
      {content}
    </div>
  </div>
);

const ConverterBlock = ({
  title,
  gradientClass,
  converter,
  currenciesList,
  tooltipContent = '',
}: {
  title: string;
  gradientClass: string;
  converter: CurrencyConverter;
  currenciesList: string[];
  tooltipContent?: string;
}) => {
  // Получить текст для тултипа
  const getAddButtonTitle = useMemo(() => {
    if (converter.currencies.length >= 10) return "Максимум 10 валют";
    if (converter.availableCurrencies.length === 0) return "Все валюты добавлены";
    return "Добавить валюту";
  }, [converter.currencies.length, converter.availableCurrencies.length]);
  const [isRemoving, setIsRemoving] = useState(false);
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex-1 bg-white dark:bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300
      p-6 w-full mb-6 border border-gray-100 dark:border-gray-700"
    >
      <div className={`${gradientClass} p-8 rounded-xl max-sm:-mx-[10px] relative overflow-hidden`}>
        {/* Анимированный фон */}
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
            backgroundSize: ['20px 20px', '40px 40px']
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'linear'
          }}
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
          }}
        />
        
        <div className="relative ">
        <div className="flex justify-between items-center mb-6">
          <motion.h2 
            whileHover={{ x: 2 }}
            className="xl:text-2xl lg:text-[18px] md:text-xl sm:text-[18px] text-[16px] italic max-sm:mr-2 font-bold text-white drop-shadow-md"
          >
            {title}
            {tooltipContent && <InfoTooltip content={tooltipContent} />}
          </motion.h2>
                  
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
                onClick={converter.openAddCurrencyModal}
                disabled={!converter.canAddCurrency}
                className={`px-4 py-2 xl:text-[18px] sm:text-[16px] xs:text-[12px] text-[11px] max-sm:-mr-0 max-sm:max-h-12 
                 bg-white/90 dark:bg-gray-700/90 text-[#505050] dark:text-white hover:cursor-pointer rounded-lg transition-all italic ${
                  !converter.canAddCurrency
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'hover:bg-gray-100 dark:hover:bg-gray-600 hover:shadow-md'
                }`}
                title={getAddButtonTitle}
              >
                Добавить валюту
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  if (converter.canRemoveCurrency) {
                    setIsRemoving(true);
                    setTimeout(() => {
                      converter.removeCurrency();
                      setIsRemoving(false);
                    }, 300);
                  }
                }}
                disabled={!converter.canRemoveCurrency || isRemoving}
                className={`px-4 py-2 max-sm:-mr-5.5 lg:-mr-2.5 xl:-mr-0 bg-white/90 dark:bg-gray-700/90 text-black dark:text-white 
                rounded-lg transition-all hover:cursor-pointer ${
                  !converter.canRemoveCurrency || isRemoving
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'hover:bg-gray-100 dark:hover:bg-gray-600 hover:shadow-md'
                }`}
                title={!converter.canRemoveCurrency ? "Минимум 2 валюты" : "Удалить валюту"}
              >
                -
              </motion.button>
            </div>
          </div>
          
          {converter.isAddingCurrency && (
            <CurrencyModal
              currencies={converter.availableCurrencies}
              onSelect={converter.addCurrency}
              onClose={converter.closeAddCurrencyModal}
            />
          )}

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              <AnimatePresence>
                {converter.currencies.map((entry, index) => (
                  <motion.div
                    key={`${title}-${entry.value}-${index}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -50, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                    layout
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-2 bg-white/20 backdrop-blur-sm p-3 rounded-xl border border-white/10 hover:bg-white/30
                    max-sm:min-w-[270px] transition-all relative"
                  >
                <motion.input
                  type="text"
                  value={entry.amount}
                  onChange={(e) => {
                    const value = e.target.value
                    if (value === '' || /^[0-9]*\.?[0-9]*$/.test(value)) {
                      converter.handleAmountChange(index, value)
                    }
                  }}
                  placeholder="Сумма"
                  className="flex-1 p-3 rounded-lg bg-white/70 dark:bg-gray-700/70 focus:ring-2 focus:ring-white/50 transition-all
                   duration-200 hover:bg-white/80 dark:hover:bg-gray-600/80 xl:w-auto max-sm:min-w-[130px] focus:outline-none"
                />
                
                <div className="relative w-auto group" style={{ zIndex: 9999 }}>
                <div className="react-select-container">
                  <Select
                    instanceId={`${title}-currency-select-${index}`}
                    options={currenciesList.map(cur => ({ value: cur, label: cur }))}
                    value={{ value: entry.value, label: entry.value }}
                    isSearchable={false}
                    onChange={(newValue) => {
                      if (!newValue || Array.isArray(newValue)) return;
                      const singleValue = newValue as { value: string; label: string };
                      converter.handleCurrencyChange(index, singleValue.value);
                    }}
                    classNamePrefix="react-select"
                    formatOptionLabel={(option) => option.label}
                    menuPortalTarget={typeof document !== 'undefined' ? document.body : null}
                    menuPosition="fixed"
                    styles={{
                      menuPortal: base => ({ ...base, zIndex: 99999 }),
                      menu: base => ({ ...base, zIndex: 99999 })
                    }}
                    components={{
                      SingleValue: (props: SingleValueProps<{ value: string; label: string }>) => (
                        <components.SingleValue {...props}>
                          <div className="flex items-center sm:gap-2 gap-1">
                            {props.data.value === 'XDR' ? (
                              <span className="text-lg">🌐</span>
                            ) : (
                              <Image
                                src={`https://flagcdn.com/24x18/${props.data.value.slice(0, 2).toLowerCase()}.png`}
                                alt={props.data.value}
                                width={22}
                                height={18}
                                className="rounded-sm"
                              />
                            )}
                            {props.data.value}
                          </div>
                        </components.SingleValue>
                      ),
                      Option: (props: OptionProps<{ value: string; label: string }>) => (
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
                      ),
                      DropdownIndicator: (props) => (
                        <components.DropdownIndicator {...props}>
                          <motion.div
                            animate={{ y: [0, 2, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="2xl:text-[16px] xl:text-[14px] sm:text-[16px] text-[12px]"
                          >
                            ⬇️
                          </motion.div>
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
            ))}
            </AnimatePresence>
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xs text-white/80 flex justify-between mt-5 pl-2"
          >
            <span>Обновлено: {new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}</span>
            <span className='max-sm:pl-15 pl-0'>Курсы обновляются ежедневно</span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default function CurrencyConverter({
  isLoading,
  isError,
  currenciesList,
  nbrbConverter,
  buyConverter,
  sellConverter,
}: {
  isLoading: boolean;
  isError: boolean;
  currenciesList: string[];
  nbrbConverter: CurrencyConverter;
  buyConverter: CurrencyConverter;
  sellConverter: CurrencyConverter;
}) {
  const [activeConverter, setActiveConverter] = useState<'buy' | 'sell'>('buy');

  if (isLoading) return <LoadingState />;
  if (isError) return <ErrorState />;

  return (
    <div className="w-full bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white p-4 sm:p-6 min-h-screen">
      <AnimatePresence mode="wait">
        <motion.div
          key="converter"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto space-y-6"
        >
          <ConverterBlock
            title="💱 Конвертер валют НБ РБ"
            gradientClass="bg-gradient-to-l from-pink-700 via-rose-600 to-red-700 dark:from-cyan-400 dark:via-cyan-600 dark:to-blue-600"
            converter={nbrbConverter}
            currenciesList={currenciesList}
          />
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
            <motion.div 
              className="flex mb-0 pt-5 px-6 relative"
            >
              <motion.div
                layout
                className={`absolute bottom-0 h-1 ${
                  activeConverter === 'buy' 
                    ? 'bg-gradient-to-r from-green-500 to-emerald-400' 
                    : 'bg-gradient-to-r from-blue-500 to-indigo-400'
                }`}
                style={{
                  width: '50%',
                  left: activeConverter === 'buy' ? '0%' : '50%',
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
              
              <button
                onClick={() => setActiveConverter('buy')}
                className={`flex-1 py-3 px-4 font-medium transition-colors cursor-pointer relative z-0 ${
                  activeConverter === 'buy' 
                    ? 'text-green-600 dark:text-green-400' 
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 border-b-1 border-[#eeeeee] dark:border-[#444444]'
                }`}
              >
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center justify-center gap-2"
                >
                  <span>🛒</span>
                  <span>Покупка валюты</span>
                </motion.span>
              </button>
              
              <button
                onClick={() => setActiveConverter('sell')}
                className={`flex-1 py-3 px-4 font-medium transition-colors cursor-pointer relative z-0 ${
                  activeConverter === 'sell' 
                    ? 'text-blue-600 dark:text-blue-400' 
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 border-b-1 border-[#eeeeee] dark:border-[#444444]'
                }`}
              >
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center justify-center gap-2"
                >
                  <span>💰</span>
                  <span>Продажа валюты</span>
                </motion.span>
              </button>
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeConverter}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {activeConverter === 'buy' ? (
                  <ConverterBlock
                    title="Купить валюту по курсу БГБ"
                    gradientClass="bg-gradient-to-l from-green-700 via-emerald-600 to-teal-700 "
                    converter={buyConverter}
                    currenciesList={currenciesList}
                    tooltipContent="Курсы покупки валюты банками. При конвертации могут применяться комиссии."
                  />
                ) : (
                  <ConverterBlock
                    title="Сдать валюту по курсу БГБ"
                    gradientClass="bg-gradient-to-l from-blue-700 via-indigo-600 to-purple-700 "
                    converter={sellConverter}
                    currenciesList={currenciesList}
                    tooltipContent="Курсы продажи валюты банками. Фактическая сумма может отличаться из-за комиссий."
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}