'use client';

import React, { useMemo } from 'react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import type { ROIData } from '@/types';
import { format } from 'date-fns';

interface ROIChartProps {
  data: ROIData[];
}

export function ROIChart({ data }: ROIChartProps) {
  const chartData = useMemo(() => {
    const sortedData = [...data].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    return sortedData.map(item => {
      const roi = item.revenue - item.costs;
      const roiPercentage = item.costs > 0 ? ((item.revenue - item.costs) / item.costs) * 100 : 0;
      
      return {
        date: format(new Date(item.date), 'MMM dd'),
        roi: roi,
        roiPercentage: roiPercentage,
        revenue: item.revenue,
        costs: item.costs
      };
    });
  }, [data]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 shadow-xl">
          <p className="text-white font-semibold mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.name.includes('Percentage') 
                ? `${entry.value.toFixed(1)}%` 
                : `$${entry.value.toLocaleString()}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  if (chartData.length === 0) {
    return (
      <div className="h-80 flex items-center justify-center text-gray-500">
        No data available for the selected period
      </div>
    );
  }

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorROI" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4A90E2" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#4A90E2" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorPercentage" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#50E3C2" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#50E3C2" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis 
            dataKey="date" 
            stroke="#9CA3AF"
            style={{ fontSize: '12px' }}
          />
          <YAxis 
            stroke="#9CA3AF"
            style={{ fontSize: '12px' }}
            tickFormatter={(value) => `$${value.toLocaleString()}`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            wrapperStyle={{ paddingTop: '20px' }}
            iconType="circle"
          />
          <Area
            type="monotone"
            dataKey="roi"
            stroke="#4A90E2"
            fillOpacity={1}
            fill="url(#colorROI)"
            name="ROI ($)"
          />
          <Area
            type="monotone"
            dataKey="roiPercentage"
            stroke="#50E3C2"
            fillOpacity={1}
            fill="url(#colorPercentage)"
            name="ROI Percentage"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}