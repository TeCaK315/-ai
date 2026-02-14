'use client';

import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  gradient?: boolean;
  hover?: boolean;
  onClick?: () => void;
}

export function Card({
  children,
  className = '',
  gradient = false,
  hover = true,
  onClick
}: CardProps) {
  const baseClasses = 'bg-gray-900 rounded-lg shadow-lg transition-all duration-300';
  const hoverClasses = hover ? 'hover:shadow-xl hover:shadow-gray-800/50 hover:-translate-y-1' : '';
  const gradientClasses = gradient ? 'border-2 border-transparent bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 relative before:absolute before:inset-0 before:rounded-lg before:p-[2px] before:bg-gradient-to-br before:from-[#4A90E2] before:via-[#50E3C2] before:to-[#F5A623] before:-z-10' : '';
  const cursorClass = onClick ? 'cursor-pointer' : '';

  return (
    <div
      className={`${baseClasses} ${hoverClasses} ${gradientClasses} ${cursorClass} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}