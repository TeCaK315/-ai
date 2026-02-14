'use client';

import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'default';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Badge({
  children,
  variant = 'default',
  size = 'md',
  className = ''
}: BadgeProps) {
  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-full transition-all duration-200';
  
  const variantClasses = {
    primary: 'bg-[#4A90E2] text-white',
    secondary: 'bg-[#50E3C2] text-gray-900',
    success: 'bg-green-500 text-white',
    warning: 'bg-[#F5A623] text-white',
    danger: 'bg-red-500 text-white',
    info: 'bg-blue-400 text-white',
    default: 'bg-gray-700 text-gray-300'
  };

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base'
  };

  return (
    <span className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}>
      {children}
    </span>
  );
}