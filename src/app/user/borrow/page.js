'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FiCreditCard, FiStar, FiBell, FiTrendingUp, FiShield, FiAward, FiCheckCircle, FiClock, FiDownload, FiArrowRight, FiLock } from 'react-icons/fi';
import { IoFlameSharp } from 'react-icons/io5';
import { BsBank, BsCashCoin, BsGraphUp, BsShieldCheck } from 'react-icons/bs';
import { HiOutlineSparkles, HiOutlineBadgeCheck } from 'react-icons/hi';
import { RiMedalLine, RiVipCrownLine } from 'react-icons/ri';
import UserSidebar from '@/components/UserSidebar';

export default function BorrowDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const creditProfile = {
    score: 720,
    maxScore: 850,
    tier: 'Silver',
    nextTier: 'Gold',
    pointsToNext: 180,
    totalEverydayPoints: 2450,
    repaymentStreak: 12, // bi-weekly periods
    onTimePayments: 24,
    totalPayments: 26,
  };

  const repaymentHistory = [
    { id: 1, date: '2026-01-01', amount: 2500, points: 50, status: 'completed' },
    { id: 2, date: '2025-12-15', amount: 2500, points: 50, status: 'completed' },
    { id: 3, date: '2025-12-01', amount: 2500, points: 50, status: 'completed' },
    { id: 4, date: '2025-11-15', amount: 2500, points: 50, status: 'completed' },
  ];

  const platinumBenefits = [
    { icon: RiVipCrownLine, title: 'Expert Consults', description: 'Free 1-on-1 financial advice sessions', locked: creditProfile.tier !== 'Platinum' },
    { icon: FiTrendingUp, title: 'Lower Interest Rates', description: 'Up to 2% reduction on partner lenders', locked: creditProfile.tier !== 'Platinum' },
    { icon: BsShieldCheck, title: 'Priority Processing', description: 'Fast-track loan applications', locked: creditProfile.tier !== 'Platinum' },
    { icon: FiAward, title: 'Exclusive Rewards', description: 'Access to Platinum-only redemptions', locked: creditProfile.tier !== 'Platinum' },
  ];

  const getScoreColor = (score) => {
    if (score >= 750) return 'text-[#a78bfa]';
    if (score >= 650) return 'text-[#8b5cf6]';
    return 'text-[#7c3aed]';
  };

  return (
    <div className="min-h-screen bg-[#0f0a1a]">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#8b5cf6]/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#a78bfa]/10 rounded-full blur-[120px]" />
      </div>
      <UserSidebar active="borrow" />
      <main className="lg:ml-64 p-4 sm:p-6 lg:p-8 relative z-10">
        <header className="mb-6 sm:mb-8 flex flex-col sm:flex-row justify-between items-start gap-4 animate-[fadeInDown_0.5s_ease-out]">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2 flex items-center gap-3">
              <BsBank className="text-[#8b5cf6]" />
              Everyday Points
            </h1>
            <p className="text-sm sm:text-base text-gray-400">Build your credit profile with responsible borrowing</p>
          </div>
          <button className="relative p-2.5 sm:p-3 bg-[#1e1433]/80 rounded-xl border border-[#3d2d5c]/50 hover:border-[#8b5cf6]/50 transition-all">
            <FiBell className="text-gray-400 text-lg sm:text-xl" />
          </button>
        </header>

        {/* Credit Score Card */}
        <div className="bg-gradient-to-br from-[#1e1433] to-[#2a1f42] rounded-2xl p-6 sm:p-8 border border-[#3d2d5c]/50 mb-6 sm:mb-8 animate-[fadeInUp_0.5s_ease-out]">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            {/* Score Circle */}
            <div className="relative">
              <svg className="w-40 h-40 transform -rotate-90">
                <circle cx="80" cy="80" r="70" fill="none" stroke="#3d2d5c" strokeWidth="12" />
                <circle
                  cx="80" cy="80" r="70" fill="none"
                  stroke="url(#scoreGradient)"
                  strokeWidth="12"
                  strokeLinecap="round"
                  strokeDasharray={`${(creditProfile.score / creditProfile.maxScore) * 440} 440`}
                />
                <defs>
                  <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#a78bfa" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={`text-4xl font-bold ${getScoreColor(creditProfile.score)}`}>{creditProfile.score}</span>
                <span className="text-gray-400 text-sm">Credit Score</span>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="flex-1 grid grid-cols-2 gap-4 w-full">
              <div className="bg-[#0f0a1a]/50 rounded-xl p-4 border border-[#3d2d5c]/30">
                <div className="flex items-center gap-2 mb-2">
                  <RiMedalLine className="text-[#8b5cf6]" />
                  <span className="text-gray-400 text-sm">Credit Tier</span>
                </div>
                <p className="text-xl font-bold text-white">{creditProfile.tier}</p>
                <p className="text-xs text-gray-500">{creditProfile.pointsToNext} pts to {creditProfile.nextTier}</p>
              </div>
              <div className="bg-[#0f0a1a]/50 rounded-xl p-4 border border-[#3d2d5c]/30">
                <div className="flex items-center gap-2 mb-2">
                  <BsCashCoin className="text-[#8b5cf6]" />
                  <span className="text-gray-400 text-sm">Everyday Points</span>
                </div>
                <p className="text-xl font-bold text-white">{creditProfile.totalEverydayPoints.toLocaleString()}</p>
                <p className="text-xs text-gray-500">Lifetime earned</p>
              </div>
              <div className="bg-[#0f0a1a]/50 rounded-xl p-4 border border-[#3d2d5c]/30">
                <div className="flex items-center gap-2 mb-2">
                  <FiTrendingUp className="text-green-400" />
                  <span className="text-gray-400 text-sm">Repayment Streak</span>
                </div>
                <p className="text-xl font-bold text-white flex items-center gap-2">{creditProfile.repaymentStreak} <IoFlameSharp className="w-5 h-5 text-orange-500" /></p>
                <p className="text-xs text-gray-500">Bi-weekly periods</p>
              </div>
              <div className="bg-[#0f0a1a]/50 rounded-xl p-4 border border-[#3d2d5c]/30">
                <div className="flex items-center gap-2 mb-2">
                  <FiCheckCircle className="text-[#8b5cf6]" />
                  <span className="text-gray-400 text-sm">On-Time Rate</span>
                </div>
                <p className="text-xl font-bold text-white">{Math.round((creditProfile.onTimePayments / creditProfile.totalPayments) * 100)}%</p>
                <p className="text-xs text-gray-500">{creditProfile.onTimePayments}/{creditProfile.totalPayments} payments</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Proof Certificate */}
            <div className="bg-gradient-to-r from-[#8b5cf6]/20 to-[#a78bfa]/20 rounded-2xl p-6 border border-[#8b5cf6]/30 animate-[fadeInUp_0.5s_ease-out]" style={{ animationDelay: '100ms' }}>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#8b5cf6] to-[#a78bfa] flex items-center justify-center">
                    <HiOutlineBadgeCheck className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Proof Certificate</h3>
                    <p className="text-sm text-gray-400">Generate your credit profile certificate to unlock better loan offers</p>
                  </div>
                </div>
                <button className="px-5 py-2.5 bg-gradient-to-r from-[#8b5cf6] to-[#a78bfa] text-white rounded-xl font-medium hover:opacity-90 transition-all flex items-center gap-2">
                  <FiDownload className="w-4 h-4" />
                  Generate Certificate
                </button>
              </div>
            </div>

            {/* Repayment Tracker */}
            <div className="bg-[#1e1433]/80 rounded-2xl p-6 border border-[#3d2d5c]/50 animate-[fadeInUp_0.5s_ease-out]" style={{ animationDelay: '200ms' }}>
              <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
                <FiClock className="text-[#8b5cf6]" />
                Repayment History
              </h3>
              <div className="space-y-3">
                {repaymentHistory.map((payment) => (
                  <div key={payment.id} className="flex items-center justify-between p-4 bg-[#0f0a1a]/50 rounded-xl border border-[#3d2d5c]/30">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                        <FiCheckCircle className="text-green-400" />
                      </div>
                      <div>
                        <p className="font-medium text-white">${payment.amount.toLocaleString()}</p>
                        <p className="text-sm text-gray-500">{new Date(payment.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-green-400 font-bold flex items-center gap-1">
                        <FiStar className="w-4 h-4" />
                        +{payment.points}
                      </span>
                      <span className="text-xs text-gray-500">Everyday Points</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-4 bg-[#8b5cf6]/10 rounded-xl border border-[#8b5cf6]/20">
                <p className="text-sm text-gray-400 flex items-start gap-2">
                  <HiOutlineSparkles className="w-4 h-4 text-[#8b5cf6] mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Completion Bonus:</strong> Earn 500 bonus points when you fully repay a loan!</span>
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Tier Progress */}
            <div className="bg-[#1e1433]/80 rounded-2xl p-5 border border-[#3d2d5c]/50 animate-[fadeInUp_0.5s_ease-out]" style={{ animationDelay: '300ms' }}>
              <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
                <RiMedalLine className="text-[#8b5cf6]" />
                Tier Progress
              </h3>
              <div className="space-y-3">
                {['Bronze', 'Silver', 'Gold', 'Platinum'].map((tier, index) => {
                  const isActive = tier === creditProfile.tier;
                  const isPast = ['Bronze', 'Silver', 'Gold', 'Platinum'].indexOf(tier) < ['Bronze', 'Silver', 'Gold', 'Platinum'].indexOf(creditProfile.tier);
                  return (
                    <div key={tier} className={`flex items-center gap-3 p-3 rounded-xl ${isActive ? 'bg-[#8b5cf6]/20 border border-[#8b5cf6]/30' : 'bg-[#0f0a1a]/50'}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isPast || isActive ? 'bg-[#8b5cf6]' : 'bg-[#3d2d5c]'}`}>
                        {isPast ? <FiCheckCircle className="text-white w-4 h-4" /> : isActive ? <RiMedalLine className="text-white w-4 h-4" /> : <span className="text-gray-500">{index + 1}</span>}
                      </div>
                      <span className={`font-medium ${isActive ? 'text-[#8b5cf6]' : isPast ? 'text-white' : 'text-gray-500'}`}>{tier}</span>
                      {isActive && <span className="ml-auto text-xs bg-[#8b5cf6] text-white px-2 py-0.5 rounded-full font-bold">Current</span>}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Platinum Benefits */}
            <div className="bg-gradient-to-br from-[#1e1433] to-[#2a1f42] rounded-2xl p-5 border border-[#3d2d5c]/50 animate-[fadeInUp_0.5s_ease-out]" style={{ animationDelay: '400ms' }}>
              <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
                <RiVipCrownLine className="text-[#a78bfa]" />
                Platinum Benefits
              </h3>
              <div className="space-y-3">
                {platinumBenefits.map((benefit, index) => (
                  <div key={index} className={`p-3 rounded-xl ${benefit.locked ? 'bg-[#0f0a1a]/30' : 'bg-[#8b5cf6]/10 border border-[#8b5cf6]/20'}`}>
                    <div className="flex items-center gap-3">
                      <benefit.icon className={`w-5 h-5 ${benefit.locked ? 'text-gray-500' : 'text-[#8b5cf6]'}`} />
                      <div className="flex-1">
                        <p className={`font-medium ${benefit.locked ? 'text-gray-500' : 'text-white'}`}>{benefit.title}</p>
                        <p className="text-xs text-gray-500">{benefit.description}</p>
                      </div>
                      {benefit.locked && <FiLock className="w-4 h-4 text-gray-500" />}
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-4 text-center">Reach Platinum tier to unlock all benefits</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
