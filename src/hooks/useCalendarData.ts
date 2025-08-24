import { useState } from 'react';

interface Holiday {
  day: number;
  month: number;
  name: string;
}

const months = [
  'Январь', 'Февраль', 'Март', 'Апрель',
  'Май', 'Июнь', 'Июль', 'Август',
  'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
];

const holidays: Holiday[] = [
  { day: 1, month: 0, name: 'Новый год' },
  { day: 7, month: 0, name: 'Рождество' },
  { day: 8, month: 2, name: 'Женский день' },
  { day: 1, month: 4, name: 'День труда' },
  { day: 9, month: 4, name: 'День Победы' },
  { day: 3, month: 6, name: 'День Независимости' },
  { day: 7, month: 10, name: 'День Октябрьской революции' },
  { day: 25, month: 11, name: 'Рождество' }
];

export const useCalendarData = () => {
  const now = new Date();
  const [currentMonth, setCurrentMonth] = useState<number>(now.getMonth());
  const [currentYear, setCurrentYear] = useState<number>(now.getFullYear());

  const daysInMonth = (month: number, year: number): number => {
    return new Date(year, month + 1, 0).getDate();
  };

  const firstDayOfMonth = (): number => {
    return new Date(currentYear, currentMonth, 1).getDay();
  };

  const prevMonth = (): void => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(prev => prev - 1);
    } else {
      setCurrentMonth(prev => prev - 1);
    }
  };

  const nextMonth = (): void => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(prev => prev + 1);
    } else {
      setCurrentMonth(prev => prev + 1);
    }
  };

  const isHoliday = (day: number): boolean => {
    const date = new Date(currentYear, currentMonth, day);
    if (date.getDay() === 0) return true;
    return holidays.some(h => h.day === day && h.month === currentMonth);
  };

  const isToday = (day: number): boolean => {
    return (
      day === now.getDate() &&
      currentMonth === now.getMonth() &&
      currentYear === now.getFullYear()
    );
  };

  const getHolidayName = (day: number): string | undefined => {
    return holidays.find(h => h.day === day && h.month === currentMonth)?.name;
  };

  return {
    now,
    currentMonth,
    currentYear,
    months,
    daysInMonth,
    firstDayOfMonth,
    prevMonth,
    nextMonth,
    isHoliday,
    isToday,
    getHolidayName
  };
};