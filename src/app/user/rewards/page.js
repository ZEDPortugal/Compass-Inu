'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiGift, FiStar, FiSearch, FiBell, FiX, FiCheck, FiCoffee, FiAward, FiZap, FiTarget, FiPackage } from 'react-icons/fi';
import { RiExchangeDollarLine, RiCoupon3Line } from 'react-icons/ri';
import { HiOutlineSparkles } from 'react-icons/hi';
import { BsCheckCircleFill } from 'react-icons/bs';
import UserSidebar from '@/components/UserSidebar';

export default function UserRewards() {
  const [category, setCategory] = useState('all');
  const [showRedeemModal, setShowRedeemModal] = useState(false);
  const [selectedReward, setSelectedReward] = useState(null);
  const [redeemSuccess, setRedeemSuccess] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const rewards = [
    { id: 1, name: '20% Off Purchase', merchant: 'Urban Café', category: 'Food & Beverage', points: 500, Icon: FiCoffee, endDate: '2026-03-31' },
    { id: 2, name: 'Free Gym Session', merchant: 'FitLife Gym', category: 'Health & Fitness', points: 1000, Icon: FiAward, endDate: '2026-02-28' },
    { id: 3, name: '$50 Store Credit', merchant: 'Metro Supermarket', category: 'Retail', points: 800, Icon: FiGift, endDate: '2026-04-15' },
    { id: 4, name: '2x Points Weekend', merchant: 'All Partner MSMEs', category: 'Food & Beverage', points: 200, Icon: FiZap, endDate: '2026-01-15' },
    { id: 5, name: '500 Bonus Points', merchant: 'Fashion Forward', category: 'Retail', points: 300, Icon: FiTarget, endDate: '2026-02-01' },
    { id: 6, name: 'Free Delivery', merchant: 'Green Valley Market', category: 'Retail', points: 150, Icon: FiPackage, endDate: '2026-01-31' },
  ];

  const categories = ['all', 'Food & Beverage', 'Retail', 'Health & Fitness'];
  const filteredRewards = rewards.filter(r => {
    const matchesCategory = category === 'all' || r.category === category;
    const matchesSearch = r.name.toLowerCase().includes(searchQuery.toLowerCase()) || r.merchant.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleRedeem = () => {
    setShowRedeemModal(false);
    setRedeemSuccess(true);
    setTimeout(() => setRedeemSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#0f0a1a]">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#8b5cf6]/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#a78bfa]/10 rounded-full blur-[120px]" />
      </div>

      <UserSidebar active="rewards" />
      
      <main className="lg:ml-64 p-4 sm:p-6 lg:p-8 relative z-10">
        {redeemSuccess && (
          <div className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-xl flex items-center gap-3 animate-[fadeInDown_0.3s_ease-out]">
            <BsCheckCircleFill className="text-green-400 text-xl" />
            <span className="text-green-400 font-medium">Reward redeemed successfully!</span>
          </div>
        )}

        <header className="mb-6 sm:mb-8 flex flex-col sm:flex-row justify-between items-start gap-4 animate-[fadeInDown_0.5s_ease-out]">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2 flex items-center gap-3">
              <HiOutlineSparkles className="text-[#8b5cf6]" />
              Suki Rewards
            </h1>
            <p className="text-sm sm:text-base text-gray-400">Browse and redeem Suki Points for rewards</p>
          </div>
          <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-none">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" placeholder="Search rewards..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2.5 sm:py-3 bg-[#1e1433]/80 rounded-xl border border-[#3d2d5c]/50 text-white placeholder-gray-500 focus:border-[#8b5cf6]/50 focus:outline-none transition-all w-full sm:w-64 text-sm sm:text-base" />
            </div>
            <button className="relative p-2.5 sm:p-3 bg-[#1e1433]/80 rounded-xl border border-[#3d2d5c]/50 hover:border-[#8b5cf6]/50 transition-all">
              <FiBell className="text-gray-400 text-lg sm:text-xl" />
            </button>
          </div>
        </header>

        <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setCategory(cat)}
              className={`px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${category === cat ? 'bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] text-white shadow-lg shadow-violet-500/25' : 'bg-[#1e1433]/80 text-gray-400 hover:text-white border border-[#3d2d5c]/50'}`}>
              {cat === 'all' ? 'All Rewards' : cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredRewards.map((reward, index) => (
            <div key={reward.id} className="bg-[#1e1433]/80 rounded-2xl p-6 border border-[#3d2d5c]/50 hover:border-[#8b5cf6]/50 transition-all duration-300 hover:scale-[1.02] group animate-[fadeInUp_0.5s_ease-out_forwards] opacity-0" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="aspect-video bg-gradient-to-br from-[#8b5cf6]/20 to-[#7c3aed]/20 rounded-xl mb-4 flex items-center justify-center group-hover:scale-105 transition-transform">
                <reward.Icon className="w-16 h-16 text-[#8b5cf6]" />
              </div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-semibold border border-green-500/30">Available</span>
                <span className="flex items-center gap-1 text-lg font-bold text-[#8b5cf6]"><FiStar className="w-4 h-4" />{reward.points}</span>
              </div>
              <h3 className="font-bold text-white text-lg mb-1">{reward.name}</h3>
              <p className="text-sm text-gray-400 mb-1">{reward.merchant}</p>
              <p className="text-xs text-gray-500 mb-4">Valid until {reward.endDate}</p>
              <div className="flex gap-2">
                <button onClick={() => { setSelectedReward(reward); setShowRedeemModal(true); }}
                  className="flex-1 py-2.5 bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] rounded-xl text-white font-medium hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-violet-500/25">
                  <RiExchangeDollarLine className="text-lg" />Redeem
                </button>
                <button className="px-4 py-2.5 bg-[#0f0a1a]/50 border border-[#3d2d5c]/50 rounded-xl text-gray-400 hover:text-white hover:border-[#8b5cf6]/50 transition-all">Details</button>
              </div>
            </div>
          ))}
        </div>

        {showRedeemModal && selectedReward && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50" onClick={() => setShowRedeemModal(false)}>
            <div className="bg-[#1e1433]/95 backdrop-blur-xl rounded-2xl p-6 w-full max-w-md border border-[#3d2d5c]/50 animate-[fadeInUp_0.3s_ease-out]" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white flex items-center gap-2"><RiCoupon3Line className="text-[#8b5cf6]" />Confirm Redemption</h3>
                <button onClick={() => setShowRedeemModal(false)} className="p-2 hover:bg-[#3d2d5c]/50 rounded-lg"><FiX className="text-gray-400 text-xl" /></button>
              </div>
              <div className="bg-[#0f0a1a]/50 rounded-xl p-4 mb-6 border border-[#3d2d5c]/30">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#8b5cf6]/20 to-[#7c3aed]/20 flex items-center justify-center">
                    <selectedReward.Icon className="w-7 h-7 text-[#8b5cf6]" />
                  </div>
                  <div><h4 className="font-bold text-white">{selectedReward.name}</h4><p className="text-sm text-gray-400">{selectedReward.merchant}</p></div>
                </div>
              </div>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center py-3 border-b border-[#3d2d5c]/30"><span className="text-gray-400">Your Balance</span><span className="font-bold text-white">2,500 pts</span></div>
                <div className="flex justify-between items-center py-3 border-b border-[#3d2d5c]/30"><span className="text-gray-400">Cost</span><span className="font-bold text-red-400">-{selectedReward.points} pts</span></div>
                <div className="flex justify-between items-center py-3"><span className="text-gray-400">New Balance</span><span className="font-bold text-green-400">{2500 - selectedReward.points} pts</span></div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setShowRedeemModal(false)} className="flex-1 py-3 bg-[#0f0a1a]/50 border border-[#3d2d5c]/50 rounded-xl text-gray-400 font-medium hover:text-white transition-all">Cancel</button>
                <button onClick={handleRedeem} className="flex-1 py-3 bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] rounded-xl text-white font-medium hover:opacity-90 transition-all flex items-center justify-center gap-2"><FiCheck className="text-lg" />Confirm</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

