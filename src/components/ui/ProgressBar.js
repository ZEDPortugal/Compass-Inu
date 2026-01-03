'use client';

export default function ProgressBar({ 
  value, 
  max = 100, 
  label,
  showValue = true,
  color = 'blue',
  size = 'md',
  className = '',
}) {
  const percentage = Math.min((value / max) * 100, 100);
  
  const colors = {
    blue: 'bg-blue-600',
    green: 'bg-green-600',
    yellow: 'bg-yellow-500',
    red: 'bg-red-600',
    purple: 'bg-purple-600',
  };

  const sizes = {
    sm: 'h-1.5',
    md: 'h-2',
    lg: 'h-3',
  };

  return (
    <div className={className}>
      {(label || showValue) && (
        <div className="flex justify-between items-center mb-1">
          {label && <span className="text-sm text-purple-200">{label}</span>}
          {showValue && <span className="text-sm font-medium text-white">{Math.round(percentage)}%</span>}
        </div>
      )}
      <div className={`w-full bg-[#2d1b4e] rounded-full overflow-hidden ${sizes[size]}`}>
        <div 
          className={`${sizes[size]} ${colors[color]} rounded-full transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
