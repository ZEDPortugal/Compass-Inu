'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FiHome, FiUsers, FiBarChart2, FiSettings, FiLogOut, FiChevronRight, FiSearch, FiUser, FiStar, FiMail, FiCalendar, FiTrendingUp, FiFilter, FiEye, FiMessageSquare } from 'react-icons/fi';
import { RiExchangeDollarLine, RiMegaphoneLine, RiVipCrownLine } from 'react-icons/ri';
import MerchantSidebar from '@/components/MerchantSidebar';

export default function MerchantCustomers() {
  const [searchQuery, setSearchQuery] = useState('');
  const [tierFilter, setTierFilter] = useState('all');

  const customers = [
    { id: 1, name: 'Sarah Chen', email: 'sarah.chen@email.com', tier: 'Gold', points: 3250, totalSpent: 23400, visits: 24, joinedAt: '2025-06-15' },
    { id: 2, name: 'Michael Johnson', email: 'michael.j@email.com', tier: 'Platinum', points: 8750, totalSpent: 62400, visits: 56, joinedAt: '2025-03-10' },
    { id: 3, name: 'David Park', email: 'david.park@email.com', tier: 'Silver', points: 1200, totalSpent: 9360, visits: 12, joinedAt: '2025-09-22' },
    { id: 4, name: 'Emily Roberts', email: 'emily.r@email.com', tier: 'Gold', points: 4100, totalSpent: 27040, visits: 31, joinedAt: '2025-05-08' },
    { id: 5, name: 'James Wilson', email: 'james.w@email.com', tier: 'Bronze', points: 650, totalSpent: 4940, visits: 8, joinedAt: '2025-11-01' },
    { id: 6, name: 'Lisa Anderson', email: 'lisa.a@email.com', tier: 'Platinum', points: 12500, totalSpent: 96200, visits: 72, joinedAt: '2025-01-20' },
  ];

  const tierConfig = {
    Bronze: { bg: 'bg-orange-900/30', text: 'text-orange-400', border: 'border-orange-500/30' },
    Silver: { bg: 'bg-gray-500/30', text: 'text-gray-300', border: 'border-gray-500/30' },
    Gold: { bg: 'bg-yellow-500/20', text: 'text-yellow-400', border: 'border-yellow-500/30' },
    Platinum: { bg: 'bg-purple-500/20', text: 'text-purple-400', border: 'border-purple-500/30' },
  };

  const filteredCustomers = customers.filter(c => {
    const matchesTier = tierFilter === 'all' || c.tier === tierFilter;
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTier && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#0f0a1a]">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#06b6d4]/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#22d3ee]/10 rounded-full blur-[120px]" />
      </div>
      <MerchantSidebar active="customers" />
      <main className="lg:ml-64 p-4 sm:p-6 lg:p-8 relative z-10">
        <header className="mb-6 sm:mb-8 flex flex-col sm:flex-row justify-between items-start gap-4 animate-[fadeInDown_0.5s_ease-out]">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2 flex items-center gap-3"><FiUsers className="text-[#06b6d4]" />Suki Members</h1>
            <p className="text-sm sm:text-base text-gray-400">Manage your Suki loyalty program members</p>
          </div>
          <div className="relative w-full sm:w-auto">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Search customers..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10 pr-4 py-2.5 sm:py-3 bg-[#1e1433]/80 rounded-xl border border-[#3d2d5c]/50 text-white placeholder-gray-500 focus:border-[#06b6d4]/50 focus:outline-none transition-all w-full sm:w-64 text-sm sm:text-base" />
          </div>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {[
            { label: 'Suki Members', value: customers.length, icon: FiUsers, gradient: 'from-[#06b6d4] to-[#0891b2]' },
            { label: 'Platinum Suki', value: customers.filter(c => c.tier === 'Platinum').length, icon: RiVipCrownLine, gradient: 'from-[#8b5cf6] to-[#7c3aed]' },
            { label: 'Avg. Suki Points', value: Math.round(customers.reduce((a, c) => a + c.points, 0) / customers.length).toLocaleString(), icon: FiStar, gradient: 'from-[#22c55e] to-[#16a34a]' },
            { label: 'Total Visits', value: customers.reduce((a, c) => a + c.visits, 0), icon: FiTrendingUp, gradient: 'from-[#3b82f6] to-[#2563eb]' },
          ].map((stat, index) => (
            <div key={stat.label} className="bg-[#1e1433]/80 rounded-2xl p-6 border border-[#3d2d5c]/50 hover:border-[#06b6d4]/50 transition-all duration-300 hover:scale-[1.02] group animate-[fadeInUp_0.5s_ease-out_forwards] opacity-0" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div><p className="text-gray-400 text-sm">{stat.label}</p><p className="text-2xl font-bold text-white">{stat.value}</p></div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-[#1e1433]/80 rounded-2xl p-4 sm:p-6 border border-[#3d2d5c]/50 animate-[fadeInUp_0.5s_ease-out_forwards] opacity-0" style={{ animationDelay: '400ms' }}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <h3 className="text-lg font-bold text-white">Suki Directory</h3>
            <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto">
              {['all', 'Bronze', 'Silver', 'Gold', 'Platinum'].map((t) => (
                <button key={t} onClick={() => setTierFilter(t)} className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${tierFilter === t ? 'bg-gradient-to-r from-[#06b6d4] to-[#0891b2] text-white' : 'bg-[#0f0a1a]/50 text-gray-400 hover:text-white'}`}>
                  {t === 'all' ? 'All' : t}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCustomers.map((customer, index) => {
              const config = tierConfig[customer.tier];
              return (
                <div key={customer.id} className="bg-[#0f0a1a]/50 rounded-xl p-5 border border-[#3d2d5c]/30 hover:border-[#06b6d4]/50 transition-all duration-300 group animate-[fadeInUp_0.4s_ease-out_forwards] opacity-0" style={{ animationDelay: `${500 + index * 80}ms` }}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#06b6d4]/20 to-[#0891b2]/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <FiUser className="text-[#06b6d4] text-lg" />
                      </div>
                      <div>
                        <h4 className="text-white font-medium">{customer.name}</h4>
                        <p className="text-gray-500 text-sm flex items-center gap-1"><FiMail className="w-3 h-3" />{customer.email}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text} border ${config.border}`}>{customer.tier}</span>
                  </div>

                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="text-center p-2 bg-[#1e1433]/50 rounded-lg">
                      <p className="text-[#06b6d4] font-bold text-lg">{customer.points.toLocaleString()}</p>
                      <p className="text-gray-500 text-xs">Points</p>
                    </div>
                    <div className="text-center p-2 bg-[#1e1433]/50 rounded-lg">
                      <p className="text-white font-bold text-lg">${customer.totalSpent}</p>
                      <p className="text-gray-500 text-xs">Spent</p>
                    </div>
                    <div className="text-center p-2 bg-[#1e1433]/50 rounded-lg">
                      <p className="text-white font-bold text-lg">{customer.visits}</p>
                      <p className="text-gray-500 text-xs">Visits</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-[#3d2d5c]/30">
                    <span className="text-gray-500 text-xs flex items-center gap-1"><FiCalendar className="w-3 h-3" />Joined {new Date(customer.joinedAt).toLocaleDateString()}</span>
                    <div className="flex gap-2">
                      <button className="p-2 text-gray-400 hover:text-white hover:bg-[#3d2d5c]/50 rounded-lg transition-all"><FiEye className="w-4 h-4" /></button>
                      <button className="p-2 text-gray-400 hover:text-[#06b6d4] hover:bg-[#06b6d4]/10 rounded-lg transition-all"><FiMessageSquare className="w-4 h-4" /></button>
                    </div>
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


