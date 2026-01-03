'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiHome, FiUsers, FiShoppingBag, FiRadio, FiActivity, FiPieChart, FiSettings, FiLogOut, FiBell, FiDollarSign, FiStar, FiCreditCard, FiUser, FiTrendingUp, FiChevronRight, FiArrowRight, FiCheck, FiClipboard, FiMessageSquare, FiAlertTriangle, FiMenu, FiX } from 'react-icons/fi';
import { BsCheckCircleFill } from 'react-icons/bs';
import AdminSidebar from '@/components/AdminSidebar';

// Activity Item Component
const ActivityItem = ({ activity, index }) => {
  const icons = {
    transaction: FiDollarSign,
    user: FiUser,
    merchant: FiShoppingBag,
    campaign: FiRadio,
  };
  const colors = {
    transaction: 'bg-green-500/20 text-green-400',
    user: 'bg-orange-500/20 text-orange-400',
    merchant: 'bg-amber-500/20 text-amber-400',
    campaign: 'bg-yellow-500/20 text-yellow-400',
  };
  const Icon = icons[activity.type] || FiActivity;

  return (
    <div 
      className="flex items-center gap-4 p-4 bg-[#0f0a1a]/50 rounded-xl border border-[#3d2d5c]/30 hover:border-[#f59e0b]/30 hover:bg-[#1a0f2e] transition-all duration-300 group animate-[fadeInUp_0.4s_ease-out_forwards] opacity-0"
      style={{ animationDelay: `${500 + index * 80}ms` }}
    >
      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${colors[activity.type]} group-hover:scale-110 transition-transform duration-300`}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-white font-medium truncate">{activity.title}</p>
        <p className="text-gray-500 text-sm truncate">{activity.description}</p>
      </div>
      <div className="text-right">
        <p className="text-gray-500 text-xs">{activity.time}</p>
        {activity.amount && (
          <p className={`text-sm font-semibold ${activity.amount > 0 ? 'text-green-400' : 'text-red-400'}`}>
            {activity.amount > 0 ? '+' : ''}{activity.amount.toLocaleString()} pts
          </p>
        )}
      </div>
    </div>
  );
};

export default function AdminDashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const stats = {
    totalUsers: 12458,
    totalMerchants: 534,
    totalTransactions: 89234,
    totalPointsIssued: 4567890,
  };

  const activities = [
    { type: 'transaction', title: 'New Transaction', description: 'Maria Santos earned 500 Suki Points at Kape Tayo', time: '2 min ago', amount: 500 },
    { type: 'user', title: 'New Member', description: 'juan.delacruz@email.com joined as student member', time: '5 min ago' },
    { type: 'merchant', title: 'MSME Approved', description: 'Tindahan ni Aling Rosa has been verified', time: '12 min ago' },
    { type: 'campaign', title: 'Campaign Started', description: 'Pasko Double Suki Points is now live', time: '25 min ago' },
    { type: 'transaction', title: 'Suki Points Redeemed', description: 'Pedro Reyes redeemed 2000 pts for ₱200 discount', time: '32 min ago', amount: -2000 },
  ];

  const statCards = [
    { 
      label: 'Suki Members', 
      value: stats.totalUsers, 
      icon: FiUsers, 
      gradient: 'from-[#f59e0b] to-[#d97706]',
      change: '+12.5%',
      positive: true
    },
    { 
      label: 'Partner MSMEs', 
      value: stats.totalMerchants, 
      icon: FiShoppingBag, 
      gradient: 'from-[#f59e0b] to-[#d97706]',
      change: '+8.3%',
      positive: true
    },
    { 
      label: 'Transactions', 
      value: stats.totalTransactions, 
      icon: FiCreditCard, 
      gradient: 'from-[#22c55e] to-[#16a34a]',
      change: '+23.1%',
      positive: true
    },
    { 
      label: 'Suki Points Issued', 
      value: stats.totalPointsIssued, 
      icon: FiStar, 
      gradient: 'from-[#f59e0b] to-[#d97706]',
      change: '+15.7%',
      positive: true
    },
  ];

  const quickActions = [
    { label: 'Approve MSMEs', Icon: FiCheck, count: 23, gradient: 'from-green-500 to-green-600', href: '/admin/merchants' },
    { label: 'Review Reports', Icon: FiClipboard, count: 12, gradient: 'from-orange-500 to-orange-600', href: '/admin/monitoring' },
    { label: 'Member Support', Icon: FiMessageSquare, count: 8, gradient: 'from-amber-500 to-amber-600', href: '/admin/users' },
    { label: 'System Alerts', Icon: FiAlertTriangle, count: 3, gradient: 'from-red-500 to-red-600', href: '/admin/settings' },
  ];

  return (
    <div className="min-h-screen bg-[#0f0a1a]">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-[#f59e0b]/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[200px] sm:w-[400px] h-[200px] sm:h-[400px] bg-[#f59e0b]/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 w-[150px] sm:w-[300px] h-[150px] sm:h-[300px] bg-[#d97706]/5 rounded-full blur-[100px]" />
      </div>
      
      <AdminSidebar active="dashboard" />

      {/* Main Content */}
      <main className="lg:ml-64 p-4 sm:p-6 lg:p-8 relative z-10">
        {/* Header */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8 animate-[fadeInDown_0.5s_ease-out]">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">Compass INU Ecosystem</h1>
            <p className="text-sm sm:text-base text-gray-400">Empowering Filipino MSMEs, students, and cooperatives through Suki Points.</p>
          </div>
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="hidden sm:block bg-[#1e1433]/80 backdrop-blur-sm rounded-xl px-4 py-2.5 border border-[#3d2d5c]/50">
              <p className="text-gray-500 text-xs">Current Time</p>
              <p className="text-white font-mono font-bold">
                {currentTime.toLocaleTimeString()}
              </p>
            </div>
            <button className="relative p-2.5 sm:p-3 bg-[#1e1433]/80 backdrop-blur-sm rounded-xl border border-[#3d2d5c]/50 hover:border-[#f59e0b]/50 hover:bg-[#2a1f42] transition-all duration-300 group">
              <FiBell className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
              <span className="absolute top-2 right-2 w-2 sm:w-2.5 h-2 sm:h-2.5 bg-red-500 rounded-full animate-pulse" />
            </button>
          </div>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 mb-6 sm:mb-8">
          {statCards.map((stat, index) => (
            <div
              key={stat.label}
              className="relative overflow-hidden bg-[#1e1433]/80 backdrop-blur-sm rounded-2xl p-6 border border-[#3d2d5c]/50 hover:border-[#f59e0b]/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-xl hover:shadow-orange-500/10 group animate-[fadeInUp_0.5s_ease-out_forwards] opacity-0"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Hover gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
              
              {/* Shimmer effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </div>
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${stat.positive ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'}`}>
                    <FiTrendingUp className={`w-3 h-3 ${stat.positive ? '' : 'rotate-180'}`} />
                    {stat.change}
                  </div>
                </div>
                <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-white">{stat.value.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Points Distribution Chart */}
          <div className="bg-[#1e1433]/80 backdrop-blur-sm rounded-2xl p-6 border border-[#3d2d5c]/50 animate-[fadeInLeft_0.6s_ease-out_forwards] opacity-0" style={{ animationDelay: '300ms' }}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-white">Suki Points Distribution</h3>
              <select className="bg-[#0f0a1a]/50 text-gray-300 rounded-lg px-3 py-2 border border-[#3d2d5c]/50 focus:border-[#f59e0b]/50 outline-none text-sm transition-colors">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 90 days</option>
              </select>
            </div>
            
            {/* Animated Bar Chart */}
            <div className="flex items-end justify-between h-48 gap-3">
              {[65, 45, 80, 55, 90, 70, 85].map((height, index) => (
                <div key={index} className="flex-1 flex flex-col items-center gap-2 group">
                  <div 
                    className="w-full bg-gradient-to-t from-[#f59e0b] to-[#d97706] rounded-t-lg group-hover:from-[#fbbf24] group-hover:to-[#f59e0b] transition-all duration-300 animate-[barGrow_0.8s_ease-out_forwards]"
                    style={{ 
                      height: `${height}%`,
                      animationDelay: `${400 + index * 100}ms`,
                    }}
                  />
                  <span className="text-gray-500 text-xs">{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* User Growth Chart */}
          <div className="bg-[#1e1433]/80 backdrop-blur-sm rounded-2xl p-6 border border-[#3d2d5c]/50 animate-[fadeInRight_0.6s_ease-out_forwards] opacity-0" style={{ animationDelay: '350ms' }}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-white">Member Growth</h3>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-[#f59e0b] rounded-full" />
                <span className="text-gray-400 text-sm">Bagong Miyembro</span>
              </div>
            </div>
            
            {/* Line Chart */}
            <div className="relative h-48">
              <svg className="w-full h-full" viewBox="0 0 400 150" preserveAspectRatio="none">
                {/* Grid Lines */}
                {[0, 1, 2, 3].map((i) => (
                  <line key={i} x1="0" y1={i * 50} x2="400" y2={i * 50} stroke="#3d2d5c" strokeWidth="1" strokeDasharray="5,5" opacity="0.3" />
                ))}
                
                {/* Gradient Area */}
                <defs>
                  <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#f59e0b" />
                    <stop offset="100%" stopColor="#d97706" />
                  </linearGradient>
                </defs>
                
                <path
                  d="M0,120 Q50,100 100,80 T200,60 T300,40 T400,30 V150 H0 Z"
                  fill="url(#areaGradient)"
                  className="animate-[fadeIn_1s_ease-out_forwards] opacity-0"
                  style={{ animationDelay: '500ms' }}
                />
                
                {/* Line */}
                <path
                  d="M0,120 Q50,100 100,80 T200,60 T300,40 T400,30"
                  stroke="url(#lineGradient)"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  className="animate-[drawLine_1.5s_ease-out_forwards]"
                  style={{ strokeDasharray: 500, strokeDashoffset: 500, animationDelay: '600ms' }}
                />
                
                {/* Data Points */}
                {[[0, 120], [100, 80], [200, 60], [300, 40], [400, 30]].map(([x, y], i) => (
                  <circle
                    key={i}
                    cx={x}
                    cy={y}
                    r="6"
                    fill="#0f0a1a"
                    stroke="#f59e0b"
                    strokeWidth="3"
                    className="animate-[scaleIn_0.3s_ease-out_forwards] opacity-0"
                    style={{ animationDelay: `${800 + i * 100}ms` }}
                  />
                ))}
              </svg>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <div className="lg:col-span-2 bg-[#1e1433]/80 backdrop-blur-sm rounded-2xl p-6 border border-[#3d2d5c]/50 animate-[fadeInUp_0.6s_ease-out_forwards] opacity-0" style={{ animationDelay: '400ms' }}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-white">Recent Activity</h3>
              <Link href="/admin/monitoring" className="text-[#f59e0b] hover:text-[#fbbf24] transition-colors text-sm font-medium flex items-center gap-1 group">
                View All <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            
            <div className="space-y-3">
              {activities.map((activity, index) => (
                <ActivityItem key={index} activity={activity} index={index} />
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-[#1e1433]/80 backdrop-blur-sm rounded-2xl p-6 border border-[#3d2d5c]/50 animate-[fadeInUp_0.6s_ease-out_forwards] opacity-0" style={{ animationDelay: '450ms' }}>
            <h3 className="text-lg font-bold text-white mb-6">Quick Actions</h3>
            
            <div className="space-y-3">
              {quickActions.map((action, index) => (
                <Link
                  key={action.label}
                  href={action.href}
                  className="flex items-center justify-between p-4 bg-[#0f0a1a]/50 rounded-xl border border-[#3d2d5c]/30 hover:border-[#f59e0b]/30 transition-all duration-300 hover:bg-[#1a0f2e] group animate-[fadeInRight_0.4s_ease-out_forwards] opacity-0"
                  style={{ animationDelay: `${600 + index * 80}ms` }}
                >
                  <div className="flex items-center gap-3">
                    <action.Icon className="w-5 h-5 text-gray-300 group-hover:scale-125 transition-transform duration-300" />
                    <span className="text-gray-300 group-hover:text-white transition-colors">{action.label}</span>
                  </div>
                  <span className={`px-3 py-1 bg-gradient-to-r ${action.gradient} rounded-full text-white text-sm font-bold shadow-lg`}>
                    {action.count}
                  </span>
                </Link>
              ))}
            </div>

            {/* Platform Health */}
            <div className="mt-6 p-4 bg-gradient-to-r from-[#f59e0b]/10 to-[#d97706]/10 rounded-xl border border-[#f59e0b]/20">
              <div className="flex items-center gap-3 mb-3">
                <BsCheckCircleFill className="text-green-400 text-lg" />
                <span className="text-white font-semibold text-sm">Platform Health</span>
              </div>
              <p className="text-gray-400 text-sm mb-3">All systems operational</p>
              <div className="w-full bg-[#0f0a1a] rounded-full h-2 overflow-hidden">
                <div className="bg-gradient-to-r from-green-500 to-green-400 h-2 rounded-full w-[98%] animate-[progressGrow_1.5s_ease-out_forwards]" />
              </div>
              <p className="text-green-400 text-xs mt-2">98% uptime this month</p>
            </div>
          </div>
        </div>
      </main>
      
      <style jsx>{`
        @keyframes barGrow {
          from { height: 0; }
        }
        @keyframes drawLine {
          to { stroke-dashoffset: 0; }
        }
        @keyframes scaleIn {
          from { transform: scale(0); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes progressGrow {
          from { width: 0; }
          to { width: 98%; }
        }
      `}</style>
    </div>
  );
}

