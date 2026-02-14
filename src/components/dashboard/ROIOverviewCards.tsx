'use client';

import React from 'react';
import type { ROIReport } from '@/types';
import { TrendingUp, DollarSign, Calendar, Target } from 'lucide-react';

interface ROIOverviewCardsProps {
  report: ROIReport;
}

export function ROIOverviewCards({ report }: ROIOverviewCardsProps) {
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatPercentage = (value: number): string => {
    return `${value >= 0 ? '+' : ''}${value.toFixed(1)}%`;
  };

  const cards = [
    {
      title: 'Total ROI',
      value: formatCurrency(report.totalROI),
      icon: TrendingUp,
      gradient: 'from-primary to-blue-600',
      trend: report.roiPercentage,
      trendLabel: 'ROI Percentage'
    },
    {
      title: 'Net Profit',
      value: formatCurrency(report.netProfit),
      icon: DollarSign,
      gradient: 'from-secondary to-green-600',
      trend: report.revenueGrowthRate,
      trendLabel: 'Revenue Growth'
    },
    {
      title: 'Payback Period',
      value: `${Math.round(report.paybackPeriod)} days`,
      icon: Calendar,
      gradient: 'from-accent to-orange-600',
      subValue: `Total Costs: ${formatCurrency(report.totalCosts)}`
    },
    {
      title: 'Cost Per Acquisition',
      value: formatCurrency(report.costPerAcquisition),
      icon: Target,
      gradient: 'from-purple-500 to-pink-600',
      subValue: `Total Revenue: ${formatCurrency(report.totalRevenue)}`
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <div
            key={index}
            className="bg-gray-900 rounded-lg p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-gray-800 hover:border-gray-700"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg bg-gradient-to-br ${card.gradient}`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              {card.trend !== undefined && (
                <div className={`text-sm font-semibold ${card.trend >= 0 ? 'text-secondary' : 'text-red-500'}`}>
                  {formatPercentage(card.trend)}
                </div>
              )}
            </div>
            
            <h3 className="text-gray-400 text-sm font-medium mb-2">{card.title}</h3>
            <div className="text-2xl font-bold mb-1">{card.value}</div>
            
            {card.trendLabel && (
              <div className="text-xs text-gray-500">{card.trendLabel}</div>
            )}
            
            {card.subValue && (
              <div className="text-xs text-gray-500 mt-2">{card.subValue}</div>
            )}
          </div>
        );
      })}
    </div>
  );
}