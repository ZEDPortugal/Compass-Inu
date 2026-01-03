'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FiHome, FiUsers, FiBarChart2, FiSettings, FiLogOut, FiChevronRight, FiPlus, FiEdit, FiEye, FiPause, FiPlay, FiTarget, FiCalendar, FiStar, FiX } from 'react-icons/fi';
import { RiExchangeDollarLine, RiMegaphoneLine } from 'react-icons/ri';
import { BsCheckCircleFill, BsClock } from 'react-icons/bs';
import MerchantSidebar from '@/components/MerchantSidebar';

export default function MerchantCampaigns() {
  const [filter, setFilter] = useState('all');
  const [selectedCampaign, setSelectedCampaign] = useState(null);

  const campaigns = [
    { id: 1, name: 'Summer Sale Event', type: 'discount', status: 'live', startDate: '2024-06-01', endDate: '2024-08-31', redemptions: 156, pointsCost: 500 },
    { id: 2, name: 'Double Points Weekend', type: 'multiplier', status: 'live', startDate: '2026-01-05', endDate: '2026-01-07', redemptions: 89, pointsCost: 200 },
    { id: 3, name: 'New Year Special', type: 'bonus', status: 'live', startDate: '2025-12-26', endDate: '2026-01-15', redemptions: 234, pointsCost: 300 },
    { id: 4, name: 'Valentine\'s Day Deal', type: 'discount', status: 'pending', startDate: '2026-02-10', endDate: '2026-02-14', redemptions: 0, pointsCost: 400 },
    { id: 5, name: 'Community Referral Bonus', type: 'reward', status: 'draft', startDate: '', endDate: '', redemptions: 0, pointsCost: 800 },
  ];

  const statusColors = {
    live: 'bg-green-500/20 text-green-400 border-green-500/30',
    pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    draft: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
    paused: 'bg-red-500/20 text-red-400 border-red-500/30',
  };

  const filteredCampaigns = filter === 'all' ? campaigns : campaigns.filter(c => c.status === filter);

  return (
    <div className="min-h-screen bg-[#0f0a1a]">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#06b6d4]/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#22d3ee]/10 rounded-full blur-[120px]" />
      </div>
      <MerchantSidebar active="campaigns" />
      <main className="lg:ml-64 p-4 sm:p-6 lg:p-8 relative z-10">
        <header className="mb-6 sm:mb-8 flex flex-col sm:flex-row justify-between items-start gap-4 animate-[fadeInDown_0.5s_ease-out]">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2 flex items-center gap-3"><RiMegaphoneLine className="text-[#06b6d4]" />Suki Campaigns</h1>
            <p className="text-sm sm:text-base text-gray-400">Manage your Suki Points loyalty campaigns</p>
          </div>
          <Link href="/merchant/campaigns/new" className="flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 bg-gradient-to-r from-[#06b6d4] to-[#0891b2] rounded-xl text-white font-medium hover:opacity-90 transition-all shadow-lg shadow-cyan-500/25 text-sm sm:text-base w-full sm:w-auto justify-center">
            <FiPlus className="text-lg" />New Campaign
          </Link>
        </header>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 mb-6 sm:mb-8">
          {[
            { label: 'Suki Campaigns', value: campaigns.length, icon: RiMegaphoneLine, gradient: 'from-[#06b6d4] to-[#0891b2]' },
            { label: 'Active', value: campaigns.filter(c => c.status === 'live').length, icon: FiPlay, gradient: 'from-[#22c55e] to-[#16a34a]' },
            { label: 'Suki Redemptions', value: campaigns.reduce((a, c) => a + c.redemptions, 0), icon: RiExchangeDollarLine, gradient: 'from-[#8b5cf6] to-[#7c3aed]' },
            { label: 'Pending', value: campaigns.filter(c => c.status === 'pending').length, icon: BsClock, gradient: 'from-[#06b6d4] to-[#0891b2]' },
          ].map((stat, index) => (
            <div key={stat.label} className="bg-[#1e1433]/80 rounded-2xl p-4 sm:p-6 border border-[#3d2d5c]/50 hover:border-[#06b6d4]/50 transition-all duration-300 hover:scale-[1.02] group animate-[fadeInUp_0.5s_ease-out_forwards] opacity-0" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="flex items-center gap-3 sm:gap-4">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform flex-shrink-0`}>
                  <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="min-w-0"><p className="text-gray-400 text-xs sm:text-sm truncate">{stat.label}</p><p className="text-xl sm:text-2xl font-bold text-white">{stat.value}</p></div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-[#1e1433]/80 rounded-2xl p-4 sm:p-6 border border-[#3d2d5c]/50 animate-[fadeInUp_0.5s_ease-out_forwards] opacity-0" style={{ animationDelay: '400ms' }}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <h3 className="text-lg font-bold text-white">All Campaigns</h3>
            <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto">
              {['all', 'live', 'pending', 'draft'].map((f) => (
                <button key={f} onClick={() => setFilter(f)} className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${filter === f ? 'bg-gradient-to-r from-[#06b6d4] to-[#0891b2] text-white' : 'bg-[#0f0a1a]/50 text-gray-400 hover:text-white'}`}>
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {filteredCampaigns.map((campaign, index) => (
              <div key={campaign.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 p-4 bg-[#0f0a1a]/50 rounded-xl border border-[#3d2d5c]/30 hover:border-[#06b6d4]/30 transition-all group animate-[fadeInUp_0.4s_ease-out_forwards] opacity-0" style={{ animationDelay: `${500 + index * 80}ms` }}>
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-[#06b6d4]/20 to-[#0891b2]/20 flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                    <FiTarget className="text-[#06b6d4] text-base sm:text-lg" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-white text-sm sm:text-base truncate">{campaign.name}</p>
                    <p className="text-xs sm:text-sm text-gray-500">{campaign.startDate ? `${campaign.startDate} - ${campaign.endDate}` : 'Not scheduled'}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-4 pl-12 sm:pl-0">
                  <span className={`px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold border ${statusColors[campaign.status]}`}>{campaign.status}</span>
                  <span className="text-gray-400 text-xs sm:text-sm whitespace-nowrap">{campaign.redemptions} redeemed</span>
                  <div className="flex gap-1 sm:gap-2">
                    <button className="p-1.5 sm:p-2 text-gray-400 hover:text-white hover:bg-[#3d2d5c]/50 rounded-lg transition-all"><FiEye className="w-3.5 h-3.5 sm:w-4 sm:h-4" /></button>
                    <button className="p-1.5 sm:p-2 text-gray-400 hover:text-white hover:bg-[#3d2d5c]/50 rounded-lg transition-all"><FiEdit className="w-3.5 h-3.5 sm:w-4 sm:h-4" /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}


