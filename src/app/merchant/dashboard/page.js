'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FiHome, FiUsers, FiBarChart2, FiSettings, FiLogOut, FiChevronRight, FiStar, FiTrendingUp, FiTrendingDown, FiDollarSign, FiShoppingBag, FiClock, FiEye, FiPlus } from 'react-icons/fi';
import { RiExchangeDollarLine, RiMegaphoneLine } from 'react-icons/ri';
import MerchantSidebar from '@/components/MerchantSidebar';

export default function MerchantDashboard() {
  // Floating particles for visual effect
  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
  }));

  const stats = [
    { label: 'Total Revenue', value: '$12,450', change: '+12.5%', trend: 'up', icon: FiDollarSign, gradient: 'from-[#22c55e] to-[#16a34a]' },
    { label: 'Points Issued', value: '45,200', change: '+8.2%', trend: 'up', icon: FiStar, gradient: 'from-[#06b6d4] to-[#0891b2]' },
    { label: 'Active Members', value: '2,456', change: '+15.3%', trend: 'up', icon: FiUsers, gradient: 'from-[#8b5cf6] to-[#7c3aed]' },
    { label: 'Redemptions', value: '234', change: '-3.1%', trend: 'down', icon: RiExchangeDollarLine, gradient: 'from-[#3b82f6] to-[#2563eb]' },
  ];

  const recentRedemptions = [
    { id: 1, customer: 'Michael Johnson', reward: '20% Discount', points: 500, status: 'approved', time: '2 min ago' },
    { id: 2, customer: 'Sarah Chen', reward: 'Free Coffee', points: 200, status: 'pending', time: '15 min ago' },
    { id: 3, customer: 'David Park', reward: '$50 Voucher', points: 800, status: 'approved', time: '1 hour ago' },
    { id: 4, customer: 'Emily Roberts', reward: 'Free Delivery', points: 300, status: 'approved', time: '2 hours ago' },
  ];

  const activeCampaigns = [
    { id: 1, name: 'Double Points Weekend', type: 'Multiplier', status: 'active', enrolled: 456 },
    { id: 2, name: 'New Year Promo', type: 'Discount', status: 'active', enrolled: 823 },
    { id: 3, name: 'Referral Bonus', type: 'Bonus Points', status: 'scheduled', enrolled: 0 },
  ];

  return (
    <div className="min-h-screen bg-[#0f0a1a]">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#06b6d4]/10 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#22d3ee]/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/3 w-[300px] h-[300px] bg-[#0891b2]/5 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `linear-gradient(rgba(6,182,212,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.3) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
        
        {/* Floating Particles */}
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-gradient-to-r from-[#06b6d4]/20 to-[#22d3ee]/20"
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animation: `float ${particle.duration}s ease-in-out infinite`,
              animationDelay: `${particle.delay}s`,
            }}
          />
        ))}
      </div>
      <MerchantSidebar active="dashboard" />
      <main className="lg:ml-64 p-4 sm:p-6 lg:p-8 relative z-10">
        <header className="mb-6 sm:mb-8 flex flex-col sm:flex-row justify-between items-start gap-4 animate-[fadeInDown_0.5s_ease-out]">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Suki Points Dashboard</h1>
            <p className="text-sm sm:text-base text-gray-400">Welcome! Here's your business overview</p>
          </div>
          <Link href="/merchant/campaigns/new" className="px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-[#06b6d4] to-[#0891b2] text-white rounded-xl font-medium flex items-center gap-2 hover:shadow-lg hover:shadow-cyan-500/25 transition-all text-sm sm:text-base w-full sm:w-auto justify-center">
            <FiPlus className="w-5 h-5" />New Campaign
          </Link>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 mb-6 sm:mb-8">
          {stats.map((stat, index) => (
            <div key={stat.label} className="bg-[#1e1433]/80 rounded-2xl p-4 sm:p-6 border border-[#3d2d5c]/50 hover:border-[#06b6d4]/50 transition-all duration-300 hover:scale-[1.02] group animate-[fadeInUp_0.5s_ease-out_forwards] opacity-0" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                  <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <span className={`flex items-center gap-1 text-xs sm:text-sm font-medium ${stat.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                  {stat.trend === 'up' ? <FiTrendingUp className="w-3 h-3 sm:w-4 sm:h-4" /> : <FiTrendingDown className="w-3 h-3 sm:w-4 sm:h-4" />}
                  {stat.change}
                </span>
              </div>
              <p className="text-xl sm:text-2xl font-bold text-white mb-1">{stat.value}</p>
              <p className="text-gray-400 text-xs sm:text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Redemptions */}
          <div className="bg-[#1e1433]/80 rounded-2xl p-6 border border-[#3d2d5c]/50 animate-[fadeInUp_0.5s_ease-out_forwards] opacity-0" style={{ animationDelay: '400ms' }}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-white">Recent Suki Redemptions</h3>
              <Link href="/merchant/redemptions" className="text-[#06b6d4] hover:text-[#0891b2] text-sm font-medium transition-colors">View All</Link>
            </div>
            <div className="space-y-4">
              {recentRedemptions.map((redemption, index) => (
                <div key={redemption.id} className="flex items-center justify-between p-4 bg-[#0f0a1a]/50 rounded-xl border border-[#3d2d5c]/30 hover:border-[#06b6d4]/30 transition-all animate-[fadeInRight_0.4s_ease-out_forwards] opacity-0" style={{ animationDelay: `${500 + index * 100}ms` }}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#06b6d4]/20 to-[#0891b2]/20 flex items-center justify-center">
                      <FiUsers className="text-[#06b6d4]" />
                    </div>
                    <div>
                      <p className="text-white font-medium">{redemption.customer}</p>
                      <p className="text-gray-500 text-sm">{redemption.reward}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${redemption.status === 'approved' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'}`}>
                      {redemption.status}
                    </span>
                    <p className="text-gray-500 text-xs mt-1 flex items-center justify-end gap-1"><FiClock className="w-3 h-3" />{redemption.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Active Campaigns */}
          <div className="bg-[#1e1433]/80 rounded-2xl p-6 border border-[#3d2d5c]/50 animate-[fadeInUp_0.5s_ease-out_forwards] opacity-0" style={{ animationDelay: '500ms' }}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-white">Active Campaigns</h3>
              <Link href="/merchant/campaigns" className="text-[#06b6d4] hover:text-[#0891b2] text-sm font-medium transition-colors">View All</Link>
            </div>
            <div className="space-y-4">
              {activeCampaigns.map((campaign, index) => (
                <div key={campaign.id} className="p-4 bg-[#0f0a1a]/50 rounded-xl border border-[#3d2d5c]/30 hover:border-[#06b6d4]/30 transition-all animate-[fadeInRight_0.4s_ease-out_forwards] opacity-0" style={{ animationDelay: `${600 + index * 100}ms` }}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8b5cf6]/20 to-[#7c3aed]/20 flex items-center justify-center">
                        <RiMegaphoneLine className="text-[#8b5cf6]" />
                      </div>
                      <div>
                        <p className="text-white font-medium">{campaign.name}</p>
                        <p className="text-gray-500 text-sm">{campaign.type}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${campaign.status === 'active' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'}`}>
                      {campaign.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">{campaign.enrolled} enrolled</span>
                    <button className="p-2 text-gray-400 hover:text-[#06b6d4] hover:bg-[#06b6d4]/10 rounded-lg transition-all"><FiEye className="w-4 h-4" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}


