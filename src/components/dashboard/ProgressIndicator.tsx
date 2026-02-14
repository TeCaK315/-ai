'use client';

import React from 'react';

interface ProgressIndicatorProps {
  value: number;
  max: number;
  label?: string;
  showPercentage?: boolean;
  className?: string;
  color?: 'primary' | 'secondary' | 'accent';
}

export function ProgressIndicator({
  value,
  max,
  label,
  showPercentage = true,
  className = '',
  color = 'accent'
}: ProgressIndicatorProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  
  const colorClasses = {
    primary: 'bg-[#4A90E2]',
    secondary: 'bg-[#50E3C2]',
    accent: 'bg-[#F5A623]'
  };

  const glowClasses = {
    primary: 'shadow-[0_0_10px_rgba(74,144,226,0.5)]',
    secondary: 'shadow-[0_0_10px_rgba(80,227,194,0.5)]',
    accent: 'shadow-[0_0_10px_rgba(245,166,35,0.5)]'
  };

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-300">{label}</span>
          {showPercentage && (
            <span className="text-sm font-semibold text-white">
              {percentage.toFixed(1)}%
            </span>
          )}
        </div>
      )}
      <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden relative">
        <div
          className={`h-full ${colorClasses[color]} ${glowClasses[color]} rounded-full transition-all duration-700 ease-out relative`}
          style={{ width: `${percentage}%` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-shimmer"></div>
        </div>
      </div>
    </div>
  );
}