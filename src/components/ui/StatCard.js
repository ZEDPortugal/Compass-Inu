'use client';

export default function StatCard({ 
  title, 
  value, 
  change, 
  changeType = 'neutral',
  icon,
  variant = 'default',
  className = '',
}) {
  const changeColors = {
    positive: 'text-[#22d3d8]',
    negative: 'text-[#ec4899]',
    neutral: 'text-gray-400',
  };

  const variants = {
    default: {
      bg: 'bg-gradient-to-br from-[#1e1433] to-[#2d1b4e]',
      icon: 'bg-[#8b5cf6]/20 text-[#8b5cf6]',
      value: 'text-white',
    },
    purple: {
      bg: 'bg-gradient-to-br from-[#2d1b4e] to-[#3d2d5c]',
      icon: 'bg-[#8b5cf6]/30 text-[#c4b5fd]',
      value: 'text-white',
    },
    cyan: {
      bg: 'bg-gradient-to-br from-[#0d1f2e] to-[#1a3a4a]',
      icon: 'bg-[#06b6d4]/20 text-[#06b6d4]',
      value: 'text-[#22d3d8]',
    },
    orange: {
      bg: 'bg-gradient-to-br from-[#1f1a0f] to-[#2d260d]',
      icon: 'bg-[#f59e0b]/20 text-[#f59e0b]',
      value: 'text-[#fbbf24]',
    },
  };

  const v = variants[variant] || variants.default;

  return (
    <div className={`${v.bg} rounded-xl p-6 shadow-lg border border-[#3d2d5c]/50 ${className}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-400 font-medium">{title}</p>
          <p className={`text-3xl font-bold ${v.value} mt-1`}>{value}</p>
          {change && (
            <p className={`text-sm mt-2 ${changeColors[changeType]}`}>
              {changeType === 'positive' && '↑ '}
              {changeType === 'negative' && '↓ '}
              {change}
            </p>
          )}
        </div>
        {icon && (
          <div className={`p-3 rounded-xl ${v.icon}`}>
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
