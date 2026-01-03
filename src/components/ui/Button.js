'use client';

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  disabled = false, 
  loading = false,
  className = '',
  ...props 
}) {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0f0a1a]';
  
  const variants = {
    primary: 'bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] text-white hover:opacity-90 focus:ring-[#8b5cf6] shadow-lg shadow-purple-500/30',
    secondary: 'bg-gradient-to-r from-[#06b6d4] to-[#0891b2] text-white hover:opacity-90 focus:ring-[#06b6d4] shadow-lg shadow-cyan-500/30',
    danger: 'bg-gradient-to-r from-red-600 to-red-700 text-white hover:opacity-90 focus:ring-red-500',
    warning: 'bg-gradient-to-r from-[#f59e0b] to-[#d97706] text-white hover:opacity-90 focus:ring-[#f59e0b] shadow-lg shadow-orange-500/30',
    outline: 'border-2 border-[#8b5cf6] text-[#c4b5fd] hover:bg-[#8b5cf6]/10 focus:ring-[#8b5cf6]',
    ghost: 'text-gray-300 hover:bg-[#2d1b4e] focus:ring-[#8b5cf6]',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${disabled || loading ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      {children}
    </button>
  );
}
