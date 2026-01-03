'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiList, FiStar, FiSearch, FiBell, FiShoppingBag, FiCalendar } from 'react-icons/fi';
import { BsCheckCircleFill } from 'react-icons/bs';
import UserSidebar from '@/components/UserSidebar';

export default function UserTransactions() {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const transactions = [
    { id: 1, merchant: 'Kape Tayo', amount: 2340.00, points: 450, date: '2026-01-03', type: 'earn', status: 'completed' },
    { id: 2, merchant: 'SM Supermarket', amount: 7800.00, points: 1500, date: '2026-01-02', type: 'earn', status: 'completed' },
    { id: 3, merchant: 'Fit Filipino Gym', amount: 4160.00, points: 800, date: '2026-01-01', type: 'earn', status: 'completed' },
    { id: 4, merchant: 'Tindahan ni Aling Rosa', amount: 3380.00, points: 650, date: '2025-12-30', type: 'earn', status: 'completed' },
    { id: 5, merchant: 'Ukay-Ukay Queen', amount: 6240.00, points: 1200, date: '2025-12-28', type: 'earn', status: 'completed' },
    { id: 6, merchant: 'Jollibee', amount: 2860.00, points: 550, date: '2025-12-25', type: 'earn', status: 'completed' },
  ];

  const stats = [
    { label: 'Suki Points Earned', value: '5,150', icon: FiStar, gradient: 'from-[#8b5cf6] to-[#7c3aed]' },
    { label: 'This Month', value: '2,750', icon: FiCalendar, gradient: 'from-[#a78bfa] to-[#8b5cf6]' },
    { label: 'Transaksyon', value: '24', icon: FiList, gradient: 'from-[#7c3aed] to-[#6d28d9]' },
  ];

  const filteredTransactions = transactions.filter(t => {
    const matchesFilter = filter === 'all' || t.type === filter;
    const matchesSearch = t.merchant.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#0f0a1a]">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#8b5cf6]/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#a78bfa]/10 rounded-full blur-[120px]" />
      </div>
      <UserSidebar active="transactions" />
      <main className="lg:ml-64 p-4 sm:p-6 lg:p-8 relative z-10">
        <header className="mb-6 sm:mb-8 flex flex-col sm:flex-row justify-between items-start gap-4 animate-[fadeInDown_0.5s_ease-out]">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2 flex items-center gap-3"><FiList className="text-[#8b5cf6]" />Suki Transaksyon</h1>
            <p className="text-sm sm:text-base text-gray-400">View your Suki Points earning history</p>
          </div>
          <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-none">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10 pr-4 py-2.5 sm:py-3 bg-[#1e1433]/80 rounded-xl border border-[#3d2d5c]/50 text-white placeholder-gray-500 focus:border-[#8b5cf6]/50 focus:outline-none transition-all w-full sm:w-64 text-sm sm:text-base" />
            </div>
            <button className="relative p-2.5 sm:p-3 bg-[#1e1433]/80 rounded-xl border border-[#3d2d5c]/50 hover:border-[#8b5cf6]/50 transition-all"><FiBell className="text-gray-400 text-lg sm:text-xl" /></button>
          </div>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 mb-6 sm:mb-8">
          {stats.map((stat, index) => (
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
            <h3 className="text-lg font-bold text-white">Recent Transactions</h3>
            <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto">
              {['all', 'earn', 'redeem'].map((f) => (
                <button key={f} onClick={() => setFilter(f)} className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${filter === f ? 'bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] text-white' : 'bg-[#0f0a1a]/50 text-gray-400 hover:text-white'}`}>
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            {filteredTransactions.map((tx, index) => (
              <div key={tx.id} className="flex items-center justify-between p-4 bg-[#0f0a1a]/50 rounded-xl border border-[#3d2d5c]/30 hover:border-[#8b5cf6]/30 transition-all group animate-[fadeInUp_0.4s_ease-out_forwards] opacity-0" style={{ animationDelay: `${400 + index * 80}ms` }}>
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#8b5cf6]/20 to-[#7c3aed]/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <FiShoppingBag className="text-[#8b5cf6] text-lg" />
                  </div>
                  <div><p className="font-medium text-white">{tx.merchant}</p><p className="text-sm text-gray-500">${tx.amount.toFixed(2)}</p></div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-400 flex items-center gap-1 justify-end"><FiStar className="w-4 h-4" />+{tx.points}</p>
                  <p className="text-xs text-gray-500">{new Date(tx.date).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

