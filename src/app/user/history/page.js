'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiStar, FiPlus, FiMinus, FiCalendar } from 'react-icons/fi';
import { RiHistoryLine, RiMedalLine } from 'react-icons/ri';
import { BsCheckCircleFill } from 'react-icons/bs';
import UserSidebar from '@/components/UserSidebar';

export default function UserHistory() {
  const [filter, setFilter] = useState('all');

  const ledgerEntries = [
    { id: 1, type: 'earn', description: 'Purchase at Kape Tayo', points: 450, balance: 2950, createdAt: '2026-01-03T10:30:00' },
    { id: 2, type: 'redeem', description: 'Redeemed: 20% Off Coupon', points: -500, balance: 2500, createdAt: '2026-01-02T16:00:00' },
    { id: 3, type: 'earn', description: 'Purchase at SM Supermarket', points: 1500, balance: 3000, createdAt: '2026-01-02T14:15:00' },
    { id: 4, type: 'bonus', description: 'Bonus: Weekend Double Suki Points', points: 200, balance: 1500, createdAt: '2026-01-01T12:00:00' },
    { id: 5, type: 'redeem', description: 'Redeemed: Free Kape', points: -200, balance: 1300, createdAt: '2025-12-30T09:30:00' },
    { id: 6, type: 'earn', description: 'Purchase at Fit Filipino Gym', points: 800, balance: 1500, createdAt: '2025-12-28T11:00:00' },
    { id: 7, type: 'bonus', description: 'Welcome Bonus - Maligayang Pagdating!', points: 500, balance: 700, createdAt: '2025-12-25T00:00:00' },
    { id: 8, type: 'earn', description: 'Signup Reward', points: 200, balance: 200, createdAt: '2025-12-20T10:00:00' },
  ];

  const filteredEntries = filter === 'all' ? ledgerEntries : ledgerEntries.filter(e => e.type === filter);

  const typeColors = {
    earn: { bg: 'bg-green-500/20', text: 'text-green-400', icon: FiPlus },
    redeem: { bg: 'bg-red-500/20', text: 'text-red-400', icon: FiMinus },
    bonus: { bg: 'bg-[#8b5cf6]/20', text: 'text-[#8b5cf6]', icon: FiStar },
  };

  return (
    <div className="min-h-screen bg-[#0f0a1a]">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#8b5cf6]/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#a78bfa]/10 rounded-full blur-[120px]" />
      </div>
      <UserSidebar active="history" />
      <main className="lg:ml-64 p-4 sm:p-6 lg:p-8 relative z-10">
        <header className="mb-6 sm:mb-8 animate-[fadeInDown_0.5s_ease-out]">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2 flex items-center gap-3"><RiHistoryLine className="text-[#8b5cf6]" />Suki Points History</h1>
          <p className="text-sm sm:text-base text-gray-400">Complete ledger of your Suki Points activity</p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 mb-6 sm:mb-8">
          {[
            { label: 'Suki Points Balance', value: '2,500', icon: RiMedalLine, gradient: 'from-[#8b5cf6] to-[#7c3aed]' },
            { label: 'Total Earned', value: '3,150', icon: FiPlus, gradient: 'from-[#22c55e] to-[#16a34a]' },
            { label: 'Total Redeemed', value: '700', icon: FiMinus, gradient: 'from-[#a78bfa] to-[#8b5cf6]' },
          ].map((stat, index) => (
            <div key={stat.label} className="bg-[#1e1433]/80 rounded-2xl p-6 border border-[#3d2d5c]/50 hover:border-[#8b5cf6]/50 transition-all duration-300 hover:scale-[1.02] group animate-[fadeInUp_0.5s_ease-out_forwards] opacity-0" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div><p className="text-gray-400 text-sm">{stat.label}</p><p className="text-2xl font-bold text-white">{stat.value}</p></div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-[#1e1433]/80 rounded-2xl p-4 sm:p-6 border border-[#3d2d5c]/50 animate-[fadeInUp_0.5s_ease-out_forwards] opacity-0" style={{ animationDelay: '300ms' }}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <h3 className="text-lg font-bold text-white">Activity Ledger</h3>
            <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto">
              {['all', 'earn', 'redeem', 'bonus'].map((f) => (
                <button key={f} onClick={() => setFilter(f)} className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${filter === f ? 'bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] text-white' : 'bg-[#0f0a1a]/50 text-gray-400 hover:text-white'}`}>
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {filteredEntries.map((entry, index) => {
              const config = typeColors[entry.type];
              return (
                <div key={entry.id} className="flex items-center justify-between p-4 bg-[#0f0a1a]/50 rounded-xl border border-[#3d2d5c]/30 hover:border-[#8b5cf6]/30 transition-all group animate-[fadeInUp_0.4s_ease-out_forwards] opacity-0" style={{ animationDelay: `${400 + index * 80}ms` }}>
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full ${config.bg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <config.icon className={`w-5 h-5 ${config.text}`} />
                    </div>
                    <div>
                      <p className="font-medium text-white">{entry.description}</p>
                      <p className="text-sm text-gray-500 flex items-center gap-1"><FiCalendar className="w-3 h-3" />{new Date(entry.createdAt).toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold ${entry.points > 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {entry.points > 0 ? '+' : ''}{entry.points} pts
                    </p>
                    <p className="text-xs text-gray-500">Balance: {entry.balance}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}

