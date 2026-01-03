'use client';

export default function Card({ 
  children, 
  title, 
  subtitle,
  action,
  className = '',
  ...props 
}) {
  return (
    <div 
      className={`bg-gradient-to-br from-[#1e1433] to-[#2d1b4e] rounded-xl shadow-lg border border-[#3d2d5c] overflow-hidden ${className}`}
      {...props}
    >
      {(title || action) && (
        <div className="px-6 py-4 border-b border-[#3d2d5c] flex items-center justify-between">
          <div>
            {title && <h3 className="text-lg font-semibold text-white">{title}</h3>}
            {subtitle && <p className="text-sm text-gray-400 mt-0.5">{subtitle}</p>}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      <div className="p-6">
        {children}
      </div>
    </div>
  );
}
