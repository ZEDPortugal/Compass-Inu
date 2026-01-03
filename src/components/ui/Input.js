'use client';

import { forwardRef } from 'react';

const Input = forwardRef(({ 
  label, 
  error, 
  type = 'text', 
  className = '',
  ...props 
}, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-300 mb-1">
          {label}
        </label>
      )}
      <input
        ref={ref}
        type={type}
        className={`w-full px-4 py-2 rounded-lg border bg-[#0f0a1a] text-white placeholder-gray-500 ${error ? 'border-red-500' : 'border-[#3d2d5c]'} focus:outline-none focus:ring-2 ${error ? 'focus:ring-red-500' : 'focus:ring-[#8b5cf6]'} focus:border-transparent transition-all ${className}`}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-400">{error}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
