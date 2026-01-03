'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FiHome, FiUsers, FiBarChart2, FiSettings, FiLogOut, FiChevronRight, FiTrendingUp, FiTrendingDown, FiStar, FiDollarSign, FiShoppingBag, FiCalendar, FiDownload, FiRefreshCw } from 'react-icons/fi';
import { RiExchangeDollarLine, RiMegaphoneLine } from 'react-icons/ri';
import MerchantSidebar from '@/components/MerchantSidebar';

export default function MerchantAnalytics() {
  const [timeRange, setTimeRange] = useState('7d');

  const metrics = [
    { label: 'Revenue', value: '$64,740', change: '+12.5%', trend: 'up', icon: FiDollarSign, gradient: 'from-[#22c55e] to-[#16a34a]' },
    { label: 'Points Issued', value: '45,200', change: '+8.2%', trend: 'up', icon: FiStar, gradient: 'from-[#06b6d4] to-[#0891b2]' },
    { label: 'Redemptions', value: '234', change: '-3.1%', trend: 'down', icon: RiExchangeDollarLine, gradient: 'from-[#8b5cf6] to-[#7c3aed]' },
    { label: 'New Customers', value: '89', change: '+15.3%', trend: 'up', icon: FiUsers, gradient: 'from-[#3b82f6] to-[#2563eb]' },
  ];

  const chartData = [
    { day: 'Mon', revenue: 1200, points: 4500, redemptions: 28 },
    { day: 'Tue', revenue: 1800, points: 5200, redemptions: 35 },
    { day: 'Wed', revenue: 1600, points: 4800, redemptions: 31 },
    { day: 'Thu', revenue: 2200, points: 6100, redemptions: 42 },
    { day: 'Fri', revenue: 2800, points: 7200, redemptions: 48 },
    { day: 'Sat', revenue: 3100, points: 8500, redemptions: 55 },
    { day: 'Sun', revenue: 2400, points: 6800, redemptions: 38 },
  ];

  const maxRevenue = Math.max(...chartData.map(d => d.revenue));
  const maxPoints = Math.max(...chartData.map(d => d.points));

  const topRewards = [
    { name: '20% Off Purchase', redemptions: 89, percentage: 38 },
    { name: 'Free Coffee', redemptions: 67, percentage: 29 },
    { name: '$50 Voucher', redemptions: 45, percentage: 19 },
    { name: 'Free Delivery', redemptions: 33, percentage: 14 },
  ];

  return (
    <div className="min-h-screen bg-[#0f0a1a]">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#06b6d4]/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#22d3ee]/10 rounded-full blur-[120px]" />
      </div>
      <MerchantSidebar active="analytics" />
      <main className="lg:ml-64 p-4 sm:p-6 lg:p-8 relative z-10">
        <header className="mb-6 sm:mb-8 flex flex-col sm:flex-row justify-between items-start gap-4 animate-[fadeInDown_0.5s_ease-out]">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2 flex items-center gap-3"><FiBarChart2 className="text-[#06b6d4]" />Suki Analytics</h1>
            <p className="text-sm sm:text-base text-gray-400">Track your Suki loyalty program performance</p>
          </div>
          <div className="flex gap-3 w-full sm:w-auto">
            <div className="flex bg-[#1e1433]/80 rounded-lg p-1 overflow-x-auto flex-1 sm:flex-none">
              {['24h', '7d', '30d', '90d'].map((range) => (
                <button key={range} onClick={() => setTimeRange(range)} className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${timeRange === range ? 'bg-gradient-to-r from-[#06b6d4] to-[#0891b2] text-white' : 'text-gray-400 hover:text-white'}`}>
                  {range}
                </button>
              ))}
            </div>
            <button className="p-3 bg-[#1e1433]/80 rounded-lg text-gray-400 hover:text-white border border-[#3d2d5c]/50 hover:border-[#06b6d4]/50 transition-all">
              <FiDownload className="w-5 h-5" />
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {metrics.map((metric, index) => (
            <div key={metric.label} className="bg-[#1e1433]/80 rounded-2xl p-6 border border-[#3d2d5c]/50 hover:border-[#06b6d4]/50 transition-all duration-300 hover:scale-[1.02] group animate-[fadeInUp_0.5s_ease-out_forwards] opacity-0" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${metric.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                  <metric.icon className="w-6 h-6 text-white" />
                </div>
                <span className={`flex items-center gap-1 text-sm font-medium ${metric.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                  {metric.trend === 'up' ? <FiTrendingUp className="w-4 h-4" /> : <FiTrendingDown className="w-4 h-4" />}
                  {metric.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-white mb-1">{metric.value}</p>
              <p className="text-gray-400 text-sm">{metric.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 bg-[#1e1433]/80 rounded-2xl p-6 border border-[#3d2d5c]/50 animate-[fadeInUp_0.5s_ease-out_forwards] opacity-0" style={{ animationDelay: '400ms' }}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-white">Revenue Overview</h3>
              <button className="p-2 text-gray-400 hover:text-white hover:bg-[#3d2d5c]/50 rounded-lg transition-all">
                <FiRefreshCw className="w-4 h-4" />
              </button>
            </div>
            <div className="flex items-end gap-3 h-48">
              {chartData.map((data, index) => (
                <div key={data.day} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full flex flex-col items-center">
                    <div className="w-full bg-[#3d2d5c]/30 rounded-t-lg relative overflow-hidden" style={{ height: `${(data.revenue / maxRevenue) * 160}px` }}>
                      <div className="absolute inset-0 bg-gradient-to-t from-[#06b6d4] to-[#0891b2] animate-[growUp_0.6s_ease-out_forwards]" style={{ animationDelay: `${600 + index * 100}ms` }} />
                    </div>
                  </div>
                  <span className="text-gray-500 text-xs">{data.day}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-[#3d2d5c]/30">
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-gradient-to-r from-[#06b6d4] to-[#0891b2]" /><span className="text-gray-400 text-sm">Revenue ($)</span></div>
            </div>
          </div>

          <div className="bg-[#1e1433]/80 rounded-2xl p-6 border border-[#3d2d5c]/50 animate-[fadeInUp_0.5s_ease-out_forwards] opacity-0" style={{ animationDelay: '500ms' }}>
            <h3 className="text-lg font-bold text-white mb-6">Top Rewards</h3>
            <div className="space-y-4">
              {topRewards.map((reward, index) => (
                <div key={reward.name} className="animate-[fadeInRight_0.4s_ease-out_forwards] opacity-0" style={{ animationDelay: `${700 + index * 100}ms` }}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white text-sm">{reward.name}</span>
                    <span className="text-gray-400 text-xs">{reward.redemptions} redemptions</span>
                  </div>
                  <div className="h-2 bg-[#3d2d5c]/30 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#06b6d4] to-[#0891b2] rounded-full transition-all duration-1000" style={{ width: `${reward.percentage}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-[#1e1433]/80 rounded-2xl p-6 border border-[#3d2d5c]/50 animate-[fadeInUp_0.5s_ease-out_forwards] opacity-0" style={{ animationDelay: '600ms' }}>
            <h3 className="text-lg font-bold text-white mb-6">Points Activity</h3>
            <div className="flex items-end gap-2 h-32">
              {chartData.map((data, index) => (
                <div key={data.day} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full bg-[#3d2d5c]/30 rounded-t-lg relative overflow-hidden" style={{ height: `${(data.points / maxPoints) * 100}px` }}>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#8b5cf6] to-[#a78bfa] animate-[growUp_0.6s_ease-out_forwards]" style={{ animationDelay: `${800 + index * 100}ms` }} />
                  </div>
                  <span className="text-gray-500 text-xs">{data.day}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#1e1433]/80 rounded-2xl p-6 border border-[#3d2d5c]/50 animate-[fadeInUp_0.5s_ease-out_forwards] opacity-0" style={{ animationDelay: '700ms' }}>
            <h3 className="text-lg font-bold text-white mb-6">Customer Segments</h3>
            <div className="flex items-center justify-center">
              <div className="relative w-40 h-40">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#3d2d5c" strokeWidth="12" />
                  <circle cx="50" cy="50" r="40" fill="none" stroke="url(#gradient1)" strokeWidth="12" strokeDasharray="251.2" strokeDashoffset="125.6" strokeLinecap="round" />
                  <defs>
                    <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#06b6d4" />
                      <stop offset="100%" stopColor="#0891b2" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold text-white">2,456</span>
                  <span className="text-gray-400 text-xs">Total</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-6">
              {[
                { label: 'Platinum', value: '245', color: 'bg-purple-400' },
                { label: 'Gold', value: '612', color: 'bg-yellow-400' },
                { label: 'Silver', value: '891', color: 'bg-gray-400' },
                { label: 'Bronze', value: '708', color: 'bg-orange-400' },
              ].map((segment) => (
                <div key={segment.label} className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${segment.color}`} />
                  <span className="text-gray-400 text-sm">{segment.label}</span>
                  <span className="text-white text-sm font-medium ml-auto">{segment.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}


