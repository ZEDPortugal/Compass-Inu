'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FiHome, FiUsers, FiBarChart2, FiSettings, FiLogOut, FiChevronRight, FiCheck, FiX, FiClock, FiEye, FiStar, FiUser, FiFilter, FiSearch } from 'react-icons/fi';
import { RiExchangeDollarLine, RiMegaphoneLine } from 'react-icons/ri';
import { BsCheckCircleFill } from 'react-icons/bs';
import MerchantSidebar from '@/components/MerchantSidebar';

export default function MerchantRedemptions() {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const redemptions = [
    { id: 1, userId: 'USR001', userName: 'Maria Santos', reward: '20% Off Purchase', pointsSpent: 500, status: 'approved', redeemedAt: '2026-01-03T10:30:00' },
    { id: 2, userId: 'USR002', userName: 'Juan dela Cruz', reward: 'Free Kape', pointsSpent: 200, status: 'pending', redeemedAt: '2026-01-02T16:00:00' },
    { id: 3, userId: 'USR003', userName: 'Pedro Reyes', reward: '₱500 Voucher', pointsSpent: 800, status: 'approved', redeemedAt: '2026-01-01T14:15:00' },
    { id: 4, userId: 'USR004', userName: 'Ana Gonzales', reward: 'Free Delivery', pointsSpent: 300, status: 'approved', redeemedAt: '2025-12-31T12:00:00' },
    { id: 5, userId: 'USR005', userName: 'Jose Mendoza', reward: '15% Discount', pointsSpent: 400, status: 'rejected', redeemedAt: '2025-12-30T09:30:00' },
  ];

  const statusConfig = {
    approved: { bg: 'bg-green-500/20', text: 'text-green-400', border: 'border-green-500/30', icon: FiCheck },
    pending: { bg: 'bg-yellow-500/20', text: 'text-yellow-400', border: 'border-yellow-500/30', icon: FiClock },
    rejected: { bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500/30', icon: FiX },
  };

  const filteredRedemptions = redemptions.filter(r => {
    const matchesFilter = filter === 'all' || r.status === filter;
    const matchesSearch = r.userName.toLowerCase().includes(searchQuery.toLowerCase()) || r.reward.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#0f0a1a]">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#06b6d4]/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#22d3ee]/10 rounded-full blur-[120px]" />
      </div>
      <MerchantSidebar active="redemptions" />
      <main className="lg:ml-64 p-4 sm:p-6 lg:p-8 relative z-10">
        <header className="mb-6 sm:mb-8 flex flex-col sm:flex-row justify-between items-start gap-4 animate-[fadeInDown_0.5s_ease-out]">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2 flex items-center gap-3"><RiExchangeDollarLine className="text-[#06b6d4]" />Suki Redemptions</h1>
            <p className="text-sm sm:text-base text-gray-400">Manage Suki member reward redemptions</p>
          </div>
          <div className="relative w-full sm:w-auto">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10 pr-4 py-2.5 sm:py-3 bg-[#1e1433]/80 rounded-xl border border-[#3d2d5c]/50 text-white placeholder-gray-500 focus:border-[#06b6d4]/50 focus:outline-none transition-all w-full sm:w-64 text-sm sm:text-base" />
          </div>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {[
            { label: 'Suki Redemptions', value: redemptions.length, icon: RiExchangeDollarLine, gradient: 'from-[#06b6d4] to-[#0891b2]' },
            { label: 'Approved', value: redemptions.filter(r => r.status === 'approved').length, icon: FiCheck, gradient: 'from-[#22c55e] to-[#16a34a]' },
            { label: 'Pending', value: redemptions.filter(r => r.status === 'pending').length, icon: FiClock, gradient: 'from-[#eab308] to-[#ca8a04]' },
            { label: 'Suki Points Used', value: redemptions.reduce((a, r) => a + r.pointsSpent, 0).toLocaleString(), icon: FiStar, gradient: 'from-[#8b5cf6] to-[#7c3aed]' },
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
            <h3 className="text-lg font-bold text-white">Recent Redemptions</h3>
            <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto">
              {['all', 'approved', 'pending', 'rejected'].map((f) => (
                <button key={f} onClick={() => setFilter(f)} className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${filter === f ? 'bg-gradient-to-r from-[#06b6d4] to-[#0891b2] text-white' : 'bg-[#0f0a1a]/50 text-gray-400 hover:text-white'}`}>
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-400 border-b border-[#3d2d5c]/50">
                  <th className="pb-4 font-medium">Customer</th>
                  <th className="pb-4 font-medium">Reward</th>
                  <th className="pb-4 font-medium">Points</th>
                  <th className="pb-4 font-medium">Status</th>
                  <th className="pb-4 font-medium">Date</th>
                  <th className="pb-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRedemptions.map((redemption, index) => {
                  const config = statusConfig[redemption.status];
                  return (
                    <tr key={redemption.id} className="border-b border-[#3d2d5c]/30 hover:bg-[#0f0a1a]/30 transition-colors animate-[fadeInUp_0.4s_ease-out_forwards] opacity-0" style={{ animationDelay: `${500 + index * 80}ms` }}>
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#06b6d4]/20 to-[#0891b2]/20 flex items-center justify-center">
                            <FiUser className="text-[#06b6d4] text-sm" />
                          </div>
                          <span className="text-white font-medium">{redemption.userName}</span>
                        </div>
                      </td>
                      <td className="py-4 text-white">{redemption.reward}</td>
                      <td className="py-4 text-[#06b6d4] font-medium">{redemption.pointsSpent} pts</td>
                      <td className="py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 w-fit ${config.bg} ${config.text} border ${config.border}`}>
                          <config.icon className="w-3 h-3" />{redemption.status}
                        </span>
                      </td>
                      <td className="py-4 text-gray-500 text-sm">{new Date(redemption.redeemedAt).toLocaleDateString()}</td>
                      <td className="py-4">
                        <div className="flex gap-2">
                          <button className="p-2 text-gray-400 hover:text-white hover:bg-[#3d2d5c]/50 rounded-lg transition-all"><FiEye className="w-4 h-4" /></button>
                          {redemption.status === 'pending' && (
                            <>
                              <button className="p-2 text-green-400 hover:bg-green-500/20 rounded-lg transition-all"><FiCheck className="w-4 h-4" /></button>
                              <button className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-all"><FiX className="w-4 h-4" /></button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}


