import { useMemo } from 'react'
import { exchangePoints } from '@/data/exchangePoints'

export const useDaboutPage = () => {
  const partners = useMemo(() => [
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
  ], [])

  const workingHours = useMemo(() => [
    { day: 'Понедельник', time: '09:00 - 18:00', emoji: '📅', color: 'bg-blue-100 dark:bg-blue-900/30' },
    { day: 'Вторник', time: '09:00 - 18:00', emoji: '📅', color: 'bg-blue-100 dark:bg-blue-900/30' },
    { day: 'Среда', time: '09:00 - 18:00', emoji: '📅', color: 'bg-blue-100 dark:bg-blue-900/30' },
    { day: 'Четверг', time: '09:00 - 18:00', emoji: '📅', color: 'bg-blue-100 dark:bg-blue-900/30' },
    { day: 'Пятница', time: '09:00 - 18:00', emoji: '📅', color: 'bg-blue-100 dark:bg-blue-900/30' },
    { day: 'Суббота', time: '10:00 - 16:00', emoji: '🛍️', color: 'bg-green-100 dark:bg-green-900/30' },
    { day: 'Воскресенье', time: 'Выходной', emoji: '🏖️', color: 'bg-red-100 dark:bg-red-900/30' },
  ], [])

  const colors = useMemo(() => [
    '#FF0000', '#FF3300', '#FF6600', '#FF9900', '#FFCC00', '#FFFF00',
    '#CCFF00', '#99FF00', '#66FF00', '#33FF00', '#00FF00', '#00FF33',
    '#00FF66', '#00FF99', '#00FFCC', '#00FFFF', '#00CCFF', '#0099FF',
    '#0066FF', '#0033FF', '#0000FF', '#3300FF', '#6600FF', '#9900FF',
    '#CC00FF', '#FF00FF', '#FF00CC', '#FF0099', '#FF0066', '#FF0033'
  ], [])

  const exchangePointsData = useMemo(() => exchangePoints.slice(0, 6), [])

  return {
    partners,
    workingHours,
    colors,
    exchangePoints: exchangePointsData
  }
}