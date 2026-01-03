'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiGift, FiStar, FiBell, FiX, FiCheck, FiCoffee, FiAward, FiFilm, FiShoppingBag, FiTruck } from 'react-icons/fi';
import { RiExchangeDollarLine, RiCoupon3Line } from 'react-icons/ri';
import { BsCheckCircleFill, BsWallet2 } from 'react-icons/bs';
import { HiOutlineSparkles } from 'react-icons/hi';
import UserSidebar from '@/components/UserSidebar';

export default function UserRedeem() {
  const [selectedReward, setSelectedReward] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const userPoints = 2500;

  const rewards = [
    { id: 1, name: '20% Off Purchase', merchant: 'Urban Café', pointsCost: 500, Icon: FiCoffee, endDate: '2026-03-31' },
    { id: 2, name: 'Free Gym Session', merchant: 'FitLife Gym', pointsCost: 1000, Icon: FiAward, endDate: '2026-02-28' },
    { id: 3, name: '$50 Store Credit', merchant: 'Metro Supermarket', pointsCost: 800, Icon: FiGift, endDate: '2026-04-15' },
    { id: 4, name: 'Free Movie Ticket', merchant: 'Cineplex Theater', pointsCost: 1200, Icon: FiFilm, endDate: '2026-01-31' },
    { id: 5, name: '15% Off Fashion', merchant: 'Fashion Forward', pointsCost: 400, Icon: FiShoppingBag, endDate: '2026-02-15' },
    { id: 6, name: 'Free Delivery', merchant: 'Green Valley Market', pointsCost: 300, Icon: FiTruck, endDate: '2026-03-01' },
  ];

  const handleRedeem = () => {
    setShowModal(false);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 5000);
  };

  return (
    <div className="min-h-screen bg-[#0f0a1a]">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#8b5cf6]/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#a78bfa]/10 rounded-full blur-[120px]" />
      </div>
      <UserSidebar active="redeem" />
      <main className="lg:ml-64 p-4 sm:p-6 lg:p-8 relative z-10">
        {success && (
          <div className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-xl flex items-center gap-3 animate-[fadeInDown_0.3s_ease-out]">
            <BsCheckCircleFill className="text-green-400 text-xl" />
            <span className="text-green-400 font-medium">Reward redeemed successfully! Check your email for details.</span>
          </div>
        )}

        <header className="mb-6 sm:mb-8 flex flex-col sm:flex-row justify-between items-start gap-4 animate-[fadeInDown_0.5s_ease-out]">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2 flex items-center gap-3"><HiOutlineSparkles className="text-[#8b5cf6]" />Redeem Suki Points</h1>
            <p className="text-sm sm:text-base text-gray-400">Exchange your Suki Points for rewards from partner MSMEs</p>
          </div>
          <button className="relative p-2.5 sm:p-3 bg-[#1e1433]/80 rounded-xl border border-[#3d2d5c]/50 hover:border-[#8b5cf6]/50 transition-all"><FiBell className="text-gray-400 text-lg sm:text-xl" /></button>
        </header>

        <div className="bg-gradient-to-r from-[#8b5cf6]/20 to-[#7c3aed]/20 rounded-2xl p-4 sm:p-6 border border-[#8b5cf6]/30 mb-6 sm:mb-8 animate-[fadeInUp_0.5s_ease-out]">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-[#8b5cf6] to-[#7c3aed] flex items-center justify-center shadow-lg">
                <BsWallet2 className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <div><p className="text-gray-400 text-xs sm:text-sm">Suki Points Balance</p><p className="text-2xl sm:text-3xl font-bold text-white">{userPoints.toLocaleString()} <span className="text-base sm:text-lg text-[#8b5cf6]">pts</span></p></div>
            </div>
            <div className="text-left sm:text-right"><p className="text-gray-400 text-xs sm:text-sm">Available Rewards</p><p className="text-xl sm:text-2xl font-bold text-white">{rewards.length}</p></div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {rewards.map((reward, index) => {
            const canAfford = userPoints >= reward.pointsCost;
            return (
              <div key={reward.id} className={`bg-[#1e1433]/80 rounded-2xl p-6 border border-[#3d2d5c]/50 hover:border-[#8b5cf6]/50 transition-all duration-300 hover:scale-[1.02] group animate-[fadeInUp_0.5s_ease-out_forwards] opacity-0 ${!canAfford ? 'opacity-60' : ''}`} style={{ animationDelay: `${index * 100}ms` }}>
                <div className="aspect-video bg-gradient-to-br from-[#8b5cf6]/20 to-[#7c3aed]/20 rounded-xl mb-4 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <reward.Icon className="w-16 h-16 text-[#8b5cf6]" />
                </div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${canAfford ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-red-500/20 text-red-400 border-red-500/30'}`}>
                    {canAfford ? 'Available' : 'Insufficient'}
                  </span>
                  <span className="flex items-center gap-1 text-lg font-bold text-[#8b5cf6]"><FiStar className="w-4 h-4" />{reward.pointsCost}</span>
                </div>
                <h3 className="font-bold text-white text-lg mb-1">{reward.name}</h3>
                <p className="text-sm text-gray-400 mb-1">{reward.merchant}</p>
                <p className="text-xs text-gray-500 mb-4">Valid until {reward.endDate}</p>
                <button onClick={() => { if (canAfford) { setSelectedReward(reward); setShowModal(true); } }} disabled={!canAfford}
                  className={`w-full py-2.5 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${canAfford ? 'bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] text-white hover:opacity-90 shadow-lg shadow-violet-500/25' : 'bg-gray-600/50 text-gray-400 cursor-not-allowed'}`}>
                  <RiExchangeDollarLine className="text-lg" />Redeem Now
                </button>
              </div>
            );
          })}
        </div>

        {showModal && selectedReward && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50" onClick={() => setShowModal(false)}>
            <div className="bg-[#1e1433]/95 backdrop-blur-xl rounded-2xl p-6 w-full max-w-md border border-[#3d2d5c]/50 animate-[fadeInUp_0.3s_ease-out]" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white flex items-center gap-2"><RiCoupon3Line className="text-[#8b5cf6]" />Confirm Redemption</h3>
                <button onClick={() => setShowModal(false)} className="p-2 hover:bg-[#3d2d5c]/50 rounded-lg"><FiX className="text-gray-400 text-xl" /></button>
              </div>
              <div className="bg-[#0f0a1a]/50 rounded-xl p-4 mb-6 border border-[#3d2d5c]/30">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#8b5cf6]/20 to-[#7c3aed]/20 flex items-center justify-center"><selectedReward.Icon className="w-7 h-7 text-[#8b5cf6]" /></div>
                  <div><h4 className="font-bold text-white">{selectedReward.name}</h4><p className="text-sm text-gray-400">{selectedReward.merchant}</p></div>
                </div>
              </div>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center py-3 border-b border-[#3d2d5c]/30"><span className="text-gray-400">Your Balance</span><span className="font-bold text-white">{userPoints.toLocaleString()} pts</span></div>
                <div className="flex justify-between items-center py-3 border-b border-[#3d2d5c]/30"><span className="text-gray-400">Cost</span><span className="font-bold text-red-400">-{selectedReward.pointsCost} pts</span></div>
                <div className="flex justify-between items-center py-3"><span className="text-gray-400">New Balance</span><span className="font-bold text-green-400">{(userPoints - selectedReward.pointsCost).toLocaleString()} pts</span></div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setShowModal(false)} className="flex-1 py-3 bg-[#0f0a1a]/50 border border-[#3d2d5c]/50 rounded-xl text-gray-400 font-medium hover:text-white transition-all">Cancel</button>
                <button onClick={handleRedeem} className="flex-1 py-3 bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] rounded-xl text-white font-medium hover:opacity-90 transition-all flex items-center justify-center gap-2"><FiCheck className="text-lg" />Confirm</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

