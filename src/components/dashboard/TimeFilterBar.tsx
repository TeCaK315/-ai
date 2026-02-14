'use client';

import React from 'react';
import type { TimeFilter } from '@/types';
import { Calendar } from 'lucide-react';

interface TimeFilterBarProps {
  currentFilter: TimeFilter;
  onFilterChange: (filter: TimeFilter) => void;
}

export function TimeFilterBar({ currentFilter, onFilterChange }: TimeFilterBarProps) {
  const filters: { value: TimeFilter; label: string }[] = [
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '90d', label: '90 Days' },
    { value: '1y', label: '1 Year' },
    { value: 'all', label: 'All Time' }
  ];

  return (
    <div className="bg-gray-900 rounded-lg p-4 shadow-xl border border-gray-800">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center space-x-2">
          <Calendar className="w-5 h-5 text-gray-400" />
          <span className="text-gray-300 font-medium">Time Period:</span>
        </div>
        
        <div className="flex items-center space-x-2">
          {filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => onFilterChange(filter.value)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                currentFilter === filter.value
                  ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg scale-105'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}