import { exchangePoints } from '@/data/exchangePoints'

export const partners = [
  { 
    id: 1, 
    name: 'Беларусбанк', 
    logo: 'belarusbank.png', 
    url: 'https://www.belarusbank.by' 
  },
  { 
    id: 2, 
    name: 'Приорбанк', 
    logo: 'priorbank.png',
    url: 'https://www.priorbank.by' 
  },
  { 
    id: 3, 
    name: 'БПС-Сбербанк', 
    logo: 'bps-sberbank.png',
    url: 'https://www.bps-sberbank.by' 
  },
  { 
    id: 4, 
    name: 'Альфа-Банк', 
    logo: 'alfa-bank.png',
    url: 'https://www.alfabank.by' 
  },
  { 
    id: 5, 
    name: 'МТБанк', 
    logo: 'mtbank.png',
    url: 'https://www.mtbank.by' 
  },
  { 
    id: 6, 
    name: 'Технобанк', 
    logo: 'technobank.png',
    url: 'https://www.technobank.by' 
  },
];

export const workingHours = [
  { day: 'Понедельник', time: '09:00 - 18:00', emoji: '📅', color: 'bg-blue-100 dark:bg-blue-900/30' },
  { day: 'Вторник', time: '09:00 - 18:00', emoji: '📅', color: 'bg-blue-100 dark:bg-blue-900/30' },
  { day: 'Среда', time: '09:00 - 18:00', emoji: '📅', color: 'bg-blue-100 dark:bg-blue-900/30' },
  { day: 'Четверг', time: '09:00 - 18:00', emoji: '📅', color: 'bg-blue-100 dark:bg-blue-900/30' },
  { day: 'Пятница', time: '09:00 - 18:00', emoji: '📅', color: 'bg-blue-100 dark:bg-blue-900/30' },
  { day: 'Суббота', time: '10:00 - 16:00', emoji: '🛍️', color: 'bg-green-100 dark:bg-green-900/30' },
  { day: 'Воскресенье', time: 'Выходной', emoji: '🏖️', color: 'bg-red-100 dark:bg-red-900/30' },
];

export const colors = ["indigo-500", "blue-500", "purple-500","rose-400","red-400", "orange-500"];

export const exchangePointsData = exchangePoints.slice(0, 6);