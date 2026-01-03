'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiHome, FiUsers, FiShoppingBag, FiRadio, FiActivity, FiPieChart, FiSettings, FiLogOut, FiTrendingUp, FiTrendingDown, FiCalendar, FiDownload, FiBarChart2, FiDollarSign, FiRefreshCw, FiTarget, FiHeart, FiAlertTriangle, FiZap } from 'react-icons/fi';
import AdminSidebar from '@/components/AdminSidebar';

// Animated Number Component
const AnimatedNumber = ({ value, prefix = '', suffix = '' }) => {
  const [displayValue, setDisplayValue] = useState(0);
  
  useEffect(() => {
    const duration = 1500;
    const startTime = Date.now();
    const endValue = typeof value === 'number' ? value : parseFloat(value) || 0;
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.floor(eased * endValue));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [value]);
  
  return <span>{prefix}{displayValue.toLocaleString()}{suffix}</span>;
};

// Chart Bar Component
const ChartBar = ({ height, label, value, color, delay }) => (
  <div 
    className="flex flex-col items-center gap-1 sm:gap-2 opacity-0 animate-fadeInUp flex-1 min-w-0"
    style={{ animationDelay: `${delay}ms`, animationFillMode: 'forwards' }}
  >
    <div className="h-24 sm:h-48 w-6 sm:w-12 bg-[#1e1433] rounded-lg relative overflow-hidden">
      <div 
        className={`absolute bottom-0 w-full rounded-lg transition-all duration-1000 ${color}`}
        style={{ height: `${height}%`, animationDelay: `${delay + 500}ms` }}
      />
    </div>
    <span className="text-gray-400 text-[10px] sm:text-xs">{label}</span>
    <span className="text-white text-[10px] sm:text-sm font-medium">{value}</span>
  </div>
);

// Donut Chart Component
const DonutChart = ({ data }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let cumulativePercentage = 0;
  
  return (
    <div className="relative w-full h-full mx-auto">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 192 192">
        {data.map((item, index) => {
          const percentage = (item.value / total) * 100;
          const dashArray = `${percentage} ${100 - percentage}`;
          const dashOffset = -cumulativePercentage;
          cumulativePercentage += percentage;
          
          return (
            <circle
              key={index}
              cx="96"
              cy="96"
              r="60"
              fill="transparent"
              stroke={item.color}
              strokeWidth="24"
              strokeDasharray={dashArray}
              strokeDashoffset={dashOffset}
              className="animate-fadeIn"
              style={{ 
                animationDelay: `${index * 200}ms`,
                strokeLinecap: 'round'
              }}
            />
          );
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <p className="text-2xl font-bold text-white">{total.toLocaleString()}</p>
        <p className="text-gray-400 text-xs">Total</p>
      </div>
    </div>
  );
};

export default function AdminAnalytics() {
  const [timeRange, setTimeRange] = useState('7d');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  // Mock analytics data
  const stats = {
    totalRevenue: 125680,
    totalUsers: 8547,
    totalTransactions: 34521,
    avgOrderValue: 45.80,
    conversionRate: 3.2,
    retentionRate: 68,
  };

  const weeklyData = [
    { day: 'Mon', users: 1200, revenue: 15000 },
    { day: 'Tue', users: 1450, revenue: 18000 },
    { day: 'Wed', users: 1100, revenue: 14000 },
    { day: 'Thu', users: 1680, revenue: 21000 },
    { day: 'Fri', users: 1890, revenue: 24000 },
    { day: 'Sat', users: 2100, revenue: 28000 },
    { day: 'Sun', users: 1750, revenue: 22000 },
  ];

  const categoryData = [
    { name: 'Food & Beverage', value: 4200, color: '#f59e0b' },
    { name: 'Sari-Sari Stores', value: 2800, color: '#d97706' },
    { name: 'Cooperatives', value: 1900, color: '#fbbf24' },
    { name: 'Educational', value: 1200, color: '#10b981' },
    { name: 'Other MSMEs', value: 800, color: '#ec4899' },
  ];

  const topMerchants = [
    { name: 'Kape Tayo', transactions: 4521, revenue: 235092, growth: 12.5 },
    { name: 'Cooperative ng Barangay', transactions: 3890, revenue: 410790, growth: 8.3 },
    { name: 'Fit Filipino Gym', transactions: 3210, revenue: 167000, growth: 15.2 },
    { name: 'Tindahan ni Aling Rosa', transactions: 2890, revenue: 150280, growth: -2.1 },
    { name: 'Aklatan ni Lolo', transactions: 2100, revenue: 109200, growth: 5.8 },
  ];

  const maxRevenue = Math.max(...weeklyData.map(d => d.revenue));

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f0a1a] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#f59e0b] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0a1a]">
      <AdminSidebar active="analytics" />
      
      <main className="lg:ml-64 p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <header className="mb-6 sm:mb-8 flex flex-col sm:flex-row justify-between items-start gap-4 opacity-0 animate-fadeInDown" style={{ animationFillMode: 'forwards' }}>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Suki Analytics</h1>
            <p className="text-sm sm:text-base text-gray-400">Comprehensive Compass INU ecosystem performance insights</p>
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto">
            {['24h', '7d', '30d', '90d'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                  timeRange === range 
                    ? 'bg-gradient-to-r from-[#f59e0b] to-[#d97706] text-white shadow-lg shadow-orange-500/30' 
                    : 'bg-[#1e1433] text-gray-400 hover:bg-[#2a1f42] border border-[#3d2d5c]'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </header>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-6 sm:mb-8">
          {[
            { label: 'Ecosystem Value', value: stats.totalRevenue, prefix: '₱', Icon: FiDollarSign, color: 'green', change: '+12.5%' },
            { label: 'Suki Members', value: stats.totalUsers, Icon: FiUsers, color: 'purple', change: '+8.3%' },
            { label: 'Transaksyon', value: stats.totalTransactions, Icon: FiRefreshCw, color: 'cyan', change: '+15.2%' },
            { label: 'Avg Order Value', value: stats.avgOrderValue, prefix: '₱', Icon: FiBarChart2, color: 'orange', change: '+3.1%' },
            { label: 'Conversion Rate', value: stats.conversionRate, suffix: '%', Icon: FiTarget, color: 'pink', change: '+0.5%' },
            { label: 'Member Retention', value: stats.retentionRate, suffix: '%', Icon: FiHeart, color: 'red', change: '-1.2%' },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className="bg-gradient-to-br from-[#1e1433] to-[#2a1f42] rounded-xl p-3 sm:p-5 border border-[#3d2d5c] hover:border-[#f59e0b]/50 transition-all duration-300 hover:transform hover:scale-105 opacity-0 animate-fadeInUp"
              style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
            >
              <div className="flex justify-between items-start mb-2 sm:mb-3">
                <stat.Icon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-300" />
                <span className={`text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full ${
                  stat.change.startsWith('+') ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                }`}>
                  {stat.change}
                </span>
              </div>
              <p className="text-gray-400 text-[10px] sm:text-xs mb-1">{stat.label}</p>
              <p className="text-base sm:text-xl font-bold text-white">
                <AnimatedNumber value={stat.value} prefix={stat.prefix || ''} suffix={stat.suffix || ''} />
              </p>
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* Revenue Chart */}
          <div className="bg-gradient-to-br from-[#1e1433] to-[#2a1f42] rounded-2xl border border-[#3d2d5c] p-4 sm:p-6 opacity-0 animate-fadeInUp" style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}>
            <h3 className="text-base sm:text-lg font-bold text-white mb-4 sm:mb-6">Weekly Revenue</h3>
            <div className="flex items-end justify-between gap-1 sm:gap-4 px-1 sm:px-4 overflow-x-auto">
              {weeklyData.map((day, index) => (
                <ChartBar
                  key={day.day}
                  height={(day.revenue / maxRevenue) * 100}
                  label={day.day}
                  value={`$${(day.revenue / 1000).toFixed(0)}k`}
                  color="bg-gradient-to-t from-[#f59e0b] to-[#d97706]"
                  delay={500 + index * 100}
                />
              ))}
            </div>
          </div>

          {/* Category Distribution */}
          <div className="bg-gradient-to-br from-[#1e1433] to-[#2a1f42] rounded-2xl border border-[#3d2d5c] p-4 sm:p-6 opacity-0 animate-fadeInUp" style={{ animationDelay: '500ms', animationFillMode: 'forwards' }}>
            <h3 className="text-base sm:text-lg font-bold text-white mb-4 sm:mb-6">Category Distribution</h3>
            <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
              <div className="w-32 h-32 sm:w-48 sm:h-48 flex-shrink-0">
                <DonutChart data={categoryData} />
              </div>
              <div className="flex-1 space-y-2 sm:space-y-3 w-full">
                {categoryData.map((cat, index) => (
                  <div 
                    key={cat.name} 
                    className="flex items-center justify-between opacity-0 animate-fadeInRight"
                    style={{ animationDelay: `${800 + index * 100}ms`, animationFillMode: 'forwards' }}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }}></div>
                      <span className="text-gray-300 text-sm">{cat.name}</span>
                    </div>
                    <span className="text-white font-medium">{cat.value.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Top Merchants Table */}
        <div className="bg-gradient-to-br from-[#1e1433] to-[#2a1f42] rounded-2xl border border-[#3d2d5c] overflow-hidden opacity-0 animate-fadeInUp" style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}>
          <div className="p-6 border-b border-[#3d2d5c]">
            <h3 className="text-lg font-bold text-white">Top Performing Merchants</h3>
          </div>
          <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="bg-[#2a1f42]/50">
                <th className="text-left px-6 py-4 text-gray-400 font-medium text-sm">Rank</th>
                <th className="text-left px-6 py-4 text-gray-400 font-medium text-sm">Merchant</th>
                <th className="text-left px-6 py-4 text-gray-400 font-medium text-sm">Transactions</th>
                <th className="text-left px-6 py-4 text-gray-400 font-medium text-sm">Revenue</th>
                <th className="text-left px-6 py-4 text-gray-400 font-medium text-sm">Growth</th>
              </tr>
            </thead>
            <tbody>
              {topMerchants.map((merchant, index) => (
                <tr 
                  key={merchant.name}
                  className="border-t border-[#3d2d5c]/50 hover:bg-[#2a1f42]/30 transition-colors opacity-0 animate-fadeInRight"
                  style={{ animationDelay: `${800 + index * 100}ms`, animationFillMode: 'forwards' }}
                >
                  <td className="px-6 py-4">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold ${
                      index === 0 ? 'bg-yellow-500/20 text-yellow-400' :
                      index === 1 ? 'bg-gray-500/20 text-gray-300' :
                      index === 2 ? 'bg-orange-500/20 text-orange-400' :
                      'bg-[#3d2d5c] text-gray-400'
                    }`}>
                      {index + 1}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-white font-medium">{merchant.name}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-300">{merchant.transactions.toLocaleString()}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-white font-medium">${merchant.revenue.toLocaleString()}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      merchant.growth >= 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                    }`}>
                      {merchant.growth >= 0 ? '+' : ''}{merchant.growth}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>

        {/* Insights Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-6 sm:mt-8 opacity-0 animate-fadeInUp" style={{ animationDelay: '800ms', animationFillMode: 'forwards' }}>
          {[
            { 
              title: 'Growth Insight',
              Icon: FiZap,
              desc: 'User acquisition is up 23% compared to last month. The referral program is driving most new signups.',
              action: 'View Details'
            },
            { 
              title: 'Attention Needed',
              Icon: FiAlertTriangle,
              desc: 'Retention rate dropped 1.2% this week. Consider launching a re-engagement campaign.',
              action: 'Create Campaign'
            },
            { 
              title: 'Recommendation',
              Icon: FiTarget,
              desc: 'Food & Beverage category has the highest engagement. Consider featuring more F&B merchants.',
              action: 'View Report'
            },
          ].map((insight, index) => (
            <div 
              key={insight.title}
              className="bg-gradient-to-br from-[#1e1433] to-[#2a1f42] rounded-2xl border border-[#3d2d5c] p-4 sm:p-6 hover:border-[#f59e0b]/50 transition-all duration-300"
            >
              <div className="flex items-center gap-2 mb-2">
                <insight.Icon className="w-5 h-5 text-[#f59e0b]" />
                <h4 className="text-white font-bold">{insight.title}</h4>
              </div>
              <p className="text-gray-400 text-sm mb-4">{insight.desc}</p>
              <button className="text-[#f59e0b] text-sm font-medium hover:text-[#d97706] transition-colors">
                {insight.action} →
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

