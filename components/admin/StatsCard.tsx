import React from 'react';
import { formatCurrency } from '../../utils/helpers';

interface StatsCardProps {
  title: string;
  value: number | string;
  change?: number;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: string;
  format?: 'currency' | 'number' | 'default';
}

const StatsCard: React.FC<StatsCardProps> = ({ 
  title, 
  value, 
  change, 
  changeType = 'neutral',
  icon,
  format = 'default'
}) => {
  const formattedValue = format === 'currency' 
    ? formatCurrency(value as number)
    : format === 'number'
    ? value.toLocaleString()
    : value;

  const changeColors = {
    positive: 'text-green-600 bg-green-100',
    negative: 'text-red-600 bg-red-100',
    neutral: 'text-gray-600 bg-gray-100',
  };

  const changeIcons = {
    positive: '↗',
    negative: '↘',
    neutral: '→',
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {formattedValue}
          </p>
          {change !== undefined && (
            <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-2 ${changeColors[changeType]}`}>
              <span className="mr-1">{changeIcons[changeType]}</span>
              <span>
                {Math.abs(change)}% from last month
              </span>
            </div>
          )}
        </div>
        <div className="text-3xl">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatsCard;