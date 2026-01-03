'use client';

export default function Badge({ 
  children, 
  variant = 'default',
  size = 'md',
  className = '',
}) {
  const variants = {
    default: 'bg-[#2d1b4e] text-gray-300',
    success: 'bg-[#06b6d4]/20 text-[#67e8f9]',
    warning: 'bg-[#f59e0b]/20 text-[#fcd34d]',
    danger: 'bg-[#ec4899]/20 text-[#f472b6]',
    info: 'bg-[#8b5cf6]/20 text-[#c4b5fd]',
    pending: 'bg-[#f59e0b]/20 text-[#fbbf24]',
    purple: 'bg-[#8b5cf6]/20 text-[#c4b5fd]',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-xs',
    lg: 'px-3 py-1 text-sm',
  };

  return (
    <span className={`inline-flex items-center font-semibold rounded-full ${variants[variant]} ${sizes[size]} ${className}`}>
      {children}
    </span>
  );
}
