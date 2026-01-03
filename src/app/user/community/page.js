'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FiUsers, FiStar, FiBell, FiGift, FiTrendingUp, FiCalendar, FiExternalLink, FiAward, FiLock, FiClock } from 'react-icons/fi';
import { BsTrophy, BsCoin, BsPiggyBank, BsGraphUp } from 'react-icons/bs';
import { HiOutlineSparkles } from 'react-icons/hi';
import { RiGameLine, RiBookOpenLine } from 'react-icons/ri';
import UserSidebar from '@/components/UserSidebar';

export default function CommunityDashboard() {
  const [activeTab, setActiveTab] = useState('airdrop');

  const userStats = {
    totalPoints: 15750,
    rank: 234,
    totalUsers: 50000,
    vestingAmount: 0, // Non-builder/investor users have 0
    isBuilder: false,
    isInvestor: false,
    airdropEligible: true,
    nextAirdrop: '2026-04-01',
  };

  const airdropTiers = [
    { tier: 'Top 100', reward: '5,000 COMPASS', requirement: 'Top 100 wallets', eligible: userStats.rank <= 100 },
    { tier: 'Top 500', reward: '2,500 COMPASS', requirement: 'Top 500 wallets', eligible: userStats.rank <= 500 },
    { tier: 'Top 1000', reward: '1,000 COMPASS', requirement: 'Top 1000 wallets', eligible: userStats.rank <= 1000 },
    { tier: 'Participant', reward: '100 COMPASS', requirement: 'Active user', eligible: true },
  ];

  const leaderboard = [
    { rank: 1, name: 'CryptoWhale', points: 125000, badge: '🥇' },
    { rank: 2, name: 'TokenMaster', points: 98500, badge: '🥈' },
    { rank: 3, name: 'DeFiPro', points: 87200, badge: '🥉' },
    { rank: 4, name: 'BlockchainKing', points: 76800, badge: '' },
    { rank: 5, name: 'Web3Warrior', points: 72100, badge: '' },
  ];

  const externalLinks = [
    { 
      id: 1, 
      name: 'Web3 Dictionary', 
      description: 'Learn Web3 terms and concepts', 
      icon: RiBookOpenLine, 
      status: 'Live', 
      url: '#',
      color: 'from-[#8b5cf6] to-[#7c3aed]'
    },
    { 
      id: 2, 
      name: 'Roblox Platform', 
      description: 'Play and earn in the metaverse', 
      icon: RiGameLine, 
      status: 'Coming Q2 2026', 
      url: null,
      color: 'from-[#ef4444] to-[#dc2626]'
    },
  ];

  const vestingSchedule = [
    { month: 'Month 1-6', status: 'locked', percentage: 0 },
    { month: 'Month 7', status: 'upcoming', percentage: 10 },
    { month: 'Month 8', status: 'upcoming', percentage: 10 },
    { month: 'Month 9', status: 'upcoming', percentage: 10 },
    { month: 'Month 10', status: 'upcoming', percentage: 10 },
    { month: 'Month 11-16', status: 'upcoming', percentage: 60 },
  ];

  const getDaysUntilAirdrop = () => {
    const now = new Date();
    const airdrop = new Date(userStats.nextAirdrop);
    const diff = Math.ceil((airdrop - now) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  };

  return (
    <div className="min-h-screen bg-[#0f0a1a]">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#8b5cf6]/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#a78bfa]/10 rounded-full blur-[120px]" />
      </div>
      <UserSidebar active="community" />
      <main className="lg:ml-64 p-4 sm:p-6 lg:p-8 relative z-10">
        <header className="mb-6 sm:mb-8 flex flex-col sm:flex-row justify-between items-start gap-4 animate-[fadeInDown_0.5s_ease-out]">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2 flex items-center gap-3">
              <FiUsers className="text-[#8b5cf6]" />
              Community & Governance
            </h1>
            <p className="text-sm sm:text-base text-gray-400">Airdrops, treasury, and community rewards</p>
          </div>
          <button className="relative p-2.5 sm:p-3 bg-[#1e1433]/80 rounded-xl border border-[#3d2d5c]/50 hover:border-[#8b5cf6]/50 transition-all">
            <FiBell className="text-gray-400 text-lg sm:text-xl" />
          </button>
        </header>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {[
            { id: 'airdrop', name: 'Airdrop', icon: FiGift },
            { id: 'leaderboard', name: 'Leaderboard', icon: BsTrophy },
            { id: 'vesting', name: 'Vesting', icon: FiLock },
            { id: 'games', name: 'Games & Tools', icon: RiGameLine },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] text-white'
                  : 'bg-[#1e1433]/80 text-gray-400 hover:text-white border border-[#3d2d5c]/50'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.name}
            </button>
          ))}
        </div>

        {/* Airdrop Tab */}
        {activeTab === 'airdrop' && (
          <div className="space-y-6 animate-[fadeInUp_0.5s_ease-out]">
            {/* Airdrop Status Card */}
            <div className="bg-gradient-to-br from-[#8b5cf6]/20 to-[#7c3aed]/20 rounded-2xl p-6 sm:p-8 border border-[#8b5cf6]/30">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#8b5cf6] to-[#7c3aed] flex items-center justify-center">
                    <FiGift className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">Q2 2026 Airdrop</h3>
                    <p className="text-gray-400">Quarterly token distribution to top wallets</p>
                  </div>
                </div>
                <div className="text-center lg:text-right">
                  <p className="text-gray-400 text-sm">Next Airdrop In</p>
                  <p className="text-4xl font-bold text-white">{getDaysUntilAirdrop()}</p>
                  <p className="text-gray-500">days</p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-[#0f0a1a]/50 rounded-xl p-4 text-center">
                  <p className="text-gray-400 text-sm mb-1">Your Rank</p>
                  <p className="text-2xl font-bold text-white">#{userStats.rank}</p>
                </div>
                <div className="bg-[#0f0a1a]/50 rounded-xl p-4 text-center">
                  <p className="text-gray-400 text-sm mb-1">Total Points</p>
                  <p className="text-2xl font-bold text-white">{userStats.totalPoints.toLocaleString()}</p>
                </div>
                <div className="bg-[#0f0a1a]/50 rounded-xl p-4 text-center">
                  <p className="text-gray-400 text-sm mb-1">Eligible Tier</p>
                  <p className="text-2xl font-bold text-[#8b5cf6]">Top 500</p>
                </div>
                <div className="bg-[#0f0a1a]/50 rounded-xl p-4 text-center">
                  <p className="text-gray-400 text-sm mb-1">Est. Reward</p>
                  <p className="text-2xl font-bold text-green-400">2,500</p>
                </div>
              </div>
            </div>

            {/* Airdrop Tiers */}
            <div className="bg-[#1e1433]/80 rounded-2xl p-6 border border-[#3d2d5c]/50">
              <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
                <BsTrophy className="text-[#8b5cf6]" />
                Airdrop Tiers
              </h3>
              <div className="space-y-3">
                {airdropTiers.map((tier, index) => (
                  <div
                    key={tier.tier}
                    className={`flex items-center justify-between p-4 rounded-xl ${
                      tier.eligible && airdropTiers.findIndex(t => t.eligible) === index
                        ? 'bg-gradient-to-r from-[#8b5cf6]/20 to-[#7c3aed]/20 border border-[#8b5cf6]/30'
                        : tier.eligible
                        ? 'bg-[#0f0a1a]/50'
                        : 'bg-[#0f0a1a]/30 opacity-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        tier.eligible ? 'bg-[#8b5cf6]/20' : 'bg-gray-500/20'
                      }`}>
                        {tier.eligible ? <FiStar className="text-[#8b5cf6]" /> : <FiLock className="text-gray-500" />}
                      </div>
                      <div>
                        <p className="font-medium text-white">{tier.tier}</p>
                        <p className="text-sm text-gray-500">{tier.requirement}</p>
                      </div>
                    </div>
                    <span className={`font-bold ${tier.eligible ? 'text-green-400' : 'text-gray-500'}`}>
                      {tier.reward}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Leaderboard Tab */}
        {activeTab === 'leaderboard' && (
          <div className="space-y-6 animate-[fadeInUp_0.5s_ease-out]">
            <div className="bg-[#1e1433]/80 rounded-2xl p-6 border border-[#3d2d5c]/50">
              <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-6">
                <BsTrophy className="text-[#8b5cf6]" />
                Top Earners
              </h3>
              <div className="space-y-3">
                {leaderboard.map((user) => (
                  <div
                    key={user.rank}
                    className={`flex items-center justify-between p-4 rounded-xl ${
                      user.rank <= 3 ? 'bg-gradient-to-r from-[#8b5cf6]/10 to-transparent border border-[#8b5cf6]/20' : 'bg-[#0f0a1a]/50'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-2xl w-8 text-center">{user.badge || user.rank}</span>
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#8b5cf6] to-[#7c3aed] flex items-center justify-center">
                        <span className="text-white font-bold">{user.name[0]}</span>
                      </div>
                      <span className="font-medium text-white">{user.name}</span>
                    </div>
                    <span className="font-bold text-[#8b5cf6] flex items-center gap-1">
                      <FiStar className="w-4 h-4" />
                      {user.points.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              {/* Your Position */}
              <div className="mt-6 p-4 bg-[#8b5cf6]/10 rounded-xl border border-[#8b5cf6]/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-xl font-bold text-[#8b5cf6]">#{userStats.rank}</span>
                    <span className="text-white font-medium">Your Position</span>
                  </div>
                  <span className="font-bold text-white flex items-center gap-1">
                    <FiStar className="w-4 h-4 text-[#8b5cf6]" />
                    {userStats.totalPoints.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Vesting Tab */}
        {activeTab === 'vesting' && (
          <div className="space-y-6 animate-[fadeInUp_0.5s_ease-out]">
            {userStats.isBuilder || userStats.isInvestor ? (
              <div className="bg-[#1e1433]/80 rounded-2xl p-6 border border-[#3d2d5c]/50">
                <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
                  <FiLock className="text-[#8b5cf6]" />
                  Your Vesting Schedule
                </h3>
                {/* Vesting content for builders/investors */}
              </div>
            ) : (
              <div className="bg-[#1e1433]/80 rounded-2xl p-8 border border-[#3d2d5c]/50 text-center">
                <FiLock className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Vesting Portal</h3>
                <p className="text-gray-400 mb-6 max-w-md mx-auto">
                  The vesting dashboard is available for Builders and Investors. Token allocations follow a 6-month cliff with 10-month linear unlock.
                </p>
                <div className="bg-[#0f0a1a]/50 rounded-xl p-6 max-w-md mx-auto">
                  <h4 className="text-sm font-semibold text-gray-400 mb-4">Vesting Schedule Overview</h4>
                  <div className="space-y-2">
                    {vestingSchedule.map((period, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">{period.month}</span>
                        <span className={`${period.status === 'locked' ? 'text-gray-500' : 'text-green-400'}`}>
                          {period.percentage}% unlocked
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Games & Tools Tab */}
        {activeTab === 'games' && (
          <div className="space-y-6 animate-[fadeInUp_0.5s_ease-out]">
            <div className="grid sm:grid-cols-2 gap-6">
              {externalLinks.map((link) => (
                <div
                  key={link.id}
                  className="bg-[#1e1433]/80 rounded-2xl p-6 border border-[#3d2d5c]/50 hover:border-[#8b5cf6]/50 transition-all group"
                >
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${link.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <link.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{link.name}</h3>
                  <p className="text-gray-400 text-sm mb-4">{link.description}</p>
                  <div className="flex items-center justify-between">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      link.status === 'Live' ? 'bg-green-500/20 text-green-400' : 'bg-[#8b5cf6]/20 text-[#8b5cf6]'
                    }`}>
                      {link.status}
                    </span>
                    {link.url ? (
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#8b5cf6] hover:text-[#a78bfa] flex items-center gap-1 text-sm font-medium"
                      >
                        Open
                        <FiExternalLink className="w-4 h-4" />
                      </a>
                    ) : (
                      <span className="text-gray-500 text-sm flex items-center gap-1">
                        <FiClock className="w-4 h-4" />
                        Coming Soon
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Community Stats */}
            <div className="bg-gradient-to-r from-[#8b5cf6]/20 to-[#a78bfa]/20 rounded-2xl p-6 border border-[#8b5cf6]/30">
              <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
                <HiOutlineSparkles className="text-[#8b5cf6]" />
                Community Stats
              </h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-white">50K+</p>
                  <p className="text-gray-400 text-sm">Active Users</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-white">500M</p>
                  <p className="text-gray-400 text-sm">Total Supply</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-white">1,200+</p>
                  <p className="text-gray-400 text-sm">Partner MSMEs</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-white">$2.5M+</p>
                  <p className="text-gray-400 text-sm">Points Redeemed</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
