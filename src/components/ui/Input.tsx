'use client';

import React from 'react';

interface InputProps {
  type?: 'text' | 'number' | 'email' | 'password' | 'date' | 'datetime-local';
  value: string | number;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  min?: string | number;
  max?: string | number;
  step?: string | number;
}

export function Input({
  type = 'text',
  value,
  onChange,
  placeholder,
  label,
  error,
  disabled = false,
  required = false,
  className = '',
  min,
  max,
  step
}: InputProps) {
  const baseClasses = 'w-full px-4 py-2.5 bg-gray-800 border-2 rounded-lg text-white placeholder-gray-500 transition-all duration-200 focus:outline-none';
  const normalClasses = 'border-gray-700 focus:border-[#4A90E2] focus:shadow-lg focus:shadow-[#4A90E2]/20';
  const errorClasses = 'border-red-500 focus:border-red-400';
  const disabledClasses = 'opacity-50 cursor-not-allowed';

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label className="text-sm font-medium text-gray-300">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        min={min}
        max={max}
        step={step}
        className={`${baseClasses} ${error ? errorClasses : normalClasses} ${disabled ? disabledClasses : ''}`}
      />
      {error && (
        <span className="text-sm text-red-400 flex items-center gap-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </span>
      )}
    </div>
  );
}