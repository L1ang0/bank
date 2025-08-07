'use client'
import { JSX } from 'react';
import { motion } from 'framer-motion';
import { useCalendarData } from '@/hooks/useCalendarData';

const Calendar = () => {
  const {
    currentMonth,
    currentYear,
    months,
    daysInMonth,
    firstDayOfMonth,
    prevMonth,
    nextMonth,
    isHoliday,
    isToday,
  } = useCalendarData();

  const renderDays = () => {
    const days: JSX.Element[] = [];
    const totalDays = daysInMonth(currentMonth, currentYear);
    const firstDay = firstDayOfMonth();
    
    // Пустые ячейки для дней предыдущего месяца
    for (let i = 0; i < (firstDay === 0 ? 6 : firstDay - 1); i++) {
      days.push(<div key={`empty-${i}`} className="h-10 sm:h-14 md:h-16"></div>);
    }

    // Ячейки текущего месяца
    for (let day = 1; day <= totalDays; day++) {
      const holiday = isHoliday(day);
      const today = isToday(day);

      days.push(
        <motion.div
          key={`day-${day}`}
          whileHover={{ scale: 1.05 }}
          className={`
            h-10 sm:h-14 md:h-16 flex items-center justify-center rounded-lg md:rounded-xl
            border border-gray-200 dark:border-gray-700
            ${holiday 
              ? 'bg-red-50/80 dark:bg-red-900/30 text-red-600 dark:text-red-400' 
              : 'bg-white/80 dark:bg-gray-800/90 text-gray-800 dark:text-gray-300'}
            ${today 
              ? 'ring-1 sm:ring-2 ring-blue-500 dark:ring-blue-400 shadow-sm sm:shadow-md' 
              : 'shadow-xs sm:shadow-sm'}
            transition-all duration-200
          `}
        >
          <span className="text-sm sm:text-base md:text-lg font-medium">{day}</span>
        </motion.div>
      );
    }

    return days;
  };

  return (
    <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-700 max-w-full mx-2 sm:mx-auto">
      {/* Шапка календаря */}
      <div className="p-4 sm:p-6 bg-gradient-to-r from-rose-500 to-red-600 dark:from-blue-500 dark:to-indigo-600 text-white">
        <div className="flex items-center justify-between">
          <button 
            onClick={prevMonth}
            className="p-1 sm:p-2 rounded-full hover:bg-white/20 transition-all"
            aria-label="Предыдущий месяц"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6 dark:text-cyan-300 text-rose-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
              {months[currentMonth]} {currentYear}
            </h3>
            <p className="text-xs sm:text-sm opacity-90 mt-0.5 sm:mt-1">
              Календарь обменных пунктов
            </p>
          </motion.div>
          
          <button 
            onClick={nextMonth}
            className="p-1 sm:p-2 rounded-full hover:bg-white/20 transition-all"
            aria-label="Следующий месяц"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6 dark:text-cyan-300 text-rose-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Тело календаря */}
      <div className="p-3 sm:p-4 md:p-6">
        {/* Дни недели */}
        <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2 sm:mb-3">
          {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((day, i) => (
            <div 
              key={day} 
              className={`text-xs sm:text-sm font-semibold pb-1 sm:pb-2 text-center ${
                i >= 5 
                  ? 'text-red-500 dark:text-red-400' 
                  : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              {day}
            </div>
          ))}
        </div>
        
        {/* Ячейки с днями */}
        <div className="grid grid-cols-7 gap-1 sm:gap-2">
          {renderDays()}
        </div>
      </div>
      
      {/* Подвал с легендой */}
      <div className="p-2 sm:p-4 bg-gray-50/50 dark:bg-gray-700/50 border-t border-gray-100 dark:border-gray-700">
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
          <div className="flex items-center">
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 mr-1 sm:mr-2"></div>
            <span className="text-xs text-gray-600 dark:text-gray-400">Рабочий день</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-100 dark:bg-red-900/50 mr-1 sm:mr-2"></div>
            <span className="text-xs text-gray-600 dark:text-gray-400">Выходной</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-blue-100 dark:bg-blue-900/50 ring-1 sm:ring-2 ring-blue-500 dark:ring-blue-400 mr-1 sm:mr-2"></div>
            <span className="text-xs text-gray-600 dark:text-gray-400">Сегодня</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;