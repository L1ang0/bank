'use client'

import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

export const CurrencyModal = ({
  currencies,
  onSelect,
  onClose,
}: {
  currencies: string[]
  onSelect: (currency: string) => void
  onClose: () => void
}) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-opacity-30 backdrop-blur-sm flex justify-center items-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className="max-sm:w-4/5 bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-md overflow-hidden border border-gray-200 dark:border-gray-700 relative"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-5 border-b border-gray-300 dark:border-gray-700">
            <h3 className="text-xl font-semibold text-center bg-gradient-to-r from-orange-500 to-pink-600 dark:from-blue-400 dark:to-purple-600 bg-clip-text text-transparent">
              Выберите валюту
            </h3>
          </div>
          
          <div className="max-h-[60vh] overflow-y-auto pb-14 ">
            {currencies.map((currency) => (
              <motion.div
                key={currency}
                whileHover={{ scale: 1.02, backgroundColor: 'rgba(243, 244, 246, 0.5)' }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center border border-[#f7f7f7] dark:border-0 p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-all duration-200"
                onClick={() => onSelect(currency)}
              >
                <div className="flex-shrink-0 w-8 h-6 flex items-center justify-center">
                  {currency === 'XDR' ? (
                    <span className="text-xl">🌐</span>
                  ) : (
                    <Image
                      src={`https://flagcdn.com/24x18/${currency.slice(0, 2).toLowerCase()}.png`}
                      alt={currency}
                      width={24}
                      height={18}
                      className="rounded-sm object-cover"
                    />
                  )}
                </div>
                <div className="ml-3 text-gray-900 dark:text-white font-medium">
                  {currency}
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100 dark:border-gray-700 text-right bg-white dark:bg-gray-800">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium cursor-pointer text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all"
            >
              Закрыть
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}