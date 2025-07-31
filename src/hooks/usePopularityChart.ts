import { useState } from 'react';

const currencyData = [
  { currency: 'USD', percentage: 42.3, color: { start: '#7C3AED', end: '#4F46E5' }, icon: '$' },
  { currency: 'EUR', percentage: 31.4, color: { start: '#10B981', end: '#059669' }, icon: '€' },
  { currency: 'RUB', percentage: 15.7, color: { start: '#EF4444', end: '#DC2626' }, icon: '₽' },
  { currency: 'PLN', percentage: 4.6, color: { start: '#F59E0B', end: '#D97706' }, icon: 'zł' },
  { currency: 'CNY', percentage: 2, color: { start: '#EC4899', end: '#DB2777' }, icon: '¥' },
  { currency: 'OTHERS', percentage: 4, color: { start: '#64748B', end: '#475569' }, icon: '⋯' }
];

function lightenColor(color: string, percent: number) {
  const num = parseInt(color.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = (num >> 8 & 0x00FF) + amt;
  const B = (num & 0x0000FF) + amt;
  
  return `#${(
    0x1000000 +
    (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
    (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
    (B < 255 ? (B < 1 ? 0 : B) : 255)
  ).toString(16).slice(1)}`;
}

function getCurrencyName(currency: string) {
  const names: Record<string, string> = {
    USD: 'Доллар США',
    EUR: 'Евро',
    RUB: 'Российский рубль',
    PLN: 'Польский злотый',
    CNY: 'Китайский юань',
    OTHERS: 'Другие валюты (GBP, JPY, CHF)'
  };
  return names[currency] || currency;
}

export const usePopularityChart = () => {
  const [hovered, setHovered] = useState<string | null>(null);
  const radius = 140;
  const center = 150;

  const getSliceData = () => {
    let startAngle = 0;
    return currencyData.map((item, i) => {
      const angle = (item.percentage / 100) * 360;
      const endAngle = startAngle + angle;

      const x1 = center + radius * Math.cos((Math.PI * startAngle) / 180);
      const y1 = center + radius * Math.sin((Math.PI * startAngle) / 180);
      const x2 = center + radius * Math.cos((Math.PI * endAngle) / 180);
      const y2 = center + radius * Math.sin((Math.PI * endAngle) / 180);

      const largeArcFlag = angle > 180 ? 1 : 0;
      const d = `M${center},${center} L${x1},${y1} A${radius},${radius} 0 ${largeArcFlag},1 ${x2},${y2} Z`;

      const transformOffset = hovered === item.currency ? -15 : 0;
      const midAngle = (startAngle + endAngle) / 2;
      const dx = Math.cos((Math.PI * midAngle) / 180) * transformOffset;
      const dy = Math.sin((Math.PI * midAngle) / 180) * transformOffset;

      startAngle = endAngle;

      return {
        ...item,
        d,
        dx,
        dy,
        index: i,
        transformOffset
      };
    });
  };

  return {
    currencyData,
    hovered,
    setHovered,
    getSliceData,
    lightenColor,
    getCurrencyName,
    radius,
    center
  };
};