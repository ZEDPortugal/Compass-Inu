'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiHome, FiGift, FiList, FiUser, FiLogOut, FiChevronRight, FiStar, FiTrendingUp, FiClock, FiAward, FiShoppingBag, FiArrowUp, FiMenu, FiX } from 'react-icons/fi';
import { RiExchangeDollarLine, RiHistoryLine } from 'react-icons/ri';

const Sidebar = ({ active }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const navItems = [
    { name: 'Dashboard', icon: FiHome, href: '/user/dashboard', id: 'dashboard' },
    { name: 'Rewards', icon: FiGift, href: '/user/rewards', id: 'rewards' },
    { name: 'Transactions', icon: FiList, href: '/user/transactions', id: 'transactions' },
    { name: 'Redeem', icon: RiExchangeDollarLine, href: '/user/redeem', id: 'redeem' },
    { name: 'History', icon: RiHistoryLine, href: '/user/history', id: 'history' },
    { name: 'Profile', icon: FiUser, href: '/user/profile', id: 'profile' },
  ];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) setIsOpen(false);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen && isMobile ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen, isMobile]);

  return (
    <>
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-[#0f0a1a]/95 backdrop-blur-xl border-b border-[#3d2d5c]/50 z-50 px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <h1 className="text-white font-bold text-lg">Compass <span className="text-[#8b5cf6]">Inu</span></h1>
        </Link>
        <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-xl bg-[#1e1433] border border-[#3d2d5c] text-gray-400 hover:text-white transition-colors">
          {isOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
        </button>
      </header>

      {isOpen && isMobile && <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden" onClick={() => setIsOpen(false)} />}

      <aside className={`fixed left-0 top-0 h-full w-64 bg-[#0f0a1a]/95 backdrop-blur-xl border-r border-[#3d2d5c]/50 z-50 transform transition-transform duration-300 ${isMobile ? (isOpen ? 'translate-x-0' : '-translate-x-full') : 'translate-x-0'} lg:translate-x-0`}>
        <div className="p-6 h-full flex flex-col">
          <Link href="/" className="flex items-center gap-3 mb-8 group" onClick={() => isMobile && setIsOpen(false)}>
            <div>
              <h1 className="text-white font-bold text-xl group-hover:text-[#8b5cf6] transition-colors">Compass Inu</h1>
              <p className="text-gray-500 text-xs">User Portal</p>
            </div>
          </Link>
          <nav className="space-y-1 flex-1 overflow-y-auto">
            {navItems.map((item) => (
              <Link key={item.name} href={item.href} onClick={() => isMobile && setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden ${active === item.id ? 'bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] text-white shadow-lg shadow-violet-500/25' : 'text-gray-400 hover:text-white hover:bg-[#1e1433]'}`}>
                {active !== item.id && <div className="absolute inset-0 bg-gradient-to-r from-[#8b5cf6]/0 to-[#7c3aed]/0 group-hover:from-[#8b5cf6]/10 group-hover:to-[#7c3aed]/10 transition-all duration-300" />}
                <item.icon className={`text-lg transition-all duration-300 ${active === item.id ? 'text-white' : 'group-hover:text-[#8b5cf6] group-hover:scale-110'}`} />
                <span className="font-medium relative z-10">{item.name}</span>
                {active === item.id && <FiChevronRight className="ml-auto text-white/70" />}
              </Link>
            ))}
          </nav>
          <div className="pt-4 border-t border-[#3d2d5c]/50">
            <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#1e1433] transition-all duration-300 group cursor-pointer">
              <div className="w-10 h-10 bg-gradient-to-br from-[#8b5cf6] to-[#7c3aed] rounded-full flex items-center justify-center"><span className="text-white font-bold">U</span></div>
              <div className="flex-1 min-w-0"><p className="text-white font-medium truncate text-sm">User</p><p className="text-gray-500 text-xs truncate">user@compass.com</p></div>
              <Link href="/auth/login" onClick={() => isMobile && setIsOpen(false)} className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"><FiLogOut className="w-4 h-4" /></Link>
            </div>
          </div>
        </div>
      </aside>
      <div className="lg:hidden h-16" />
    </>
  );
};

export default function UserDashboard() {
  const userData = {
    name: 'Juan',
    points: 3250,
    tier: 'Suki',
    nextTier: 'Super Suki',
    pointsToNext: 1750,
    totalEarned: 12500,
  };

  const recentTransactions = [
    { id: 1, merchant: 'Aling Nena\'s Carinderia', points: 150, type: 'earned', date: '2026-01-03' },
    { id: 2, merchant: 'TechMart Electronics', points: 300, type: 'earned', date: '2026-01-02' },
    { id: 3, merchant: 'Reward Redemption', points: -500, type: 'redeemed', date: '2026-01-01' },
    { id: 4, merchant: 'Sari-Sari ni Mang Boy', points: 200, type: 'earned', date: '2025-12-31' },
  ];

  const availableRewards = [
    { id: 1, name: 'Free Kape', points: 200, merchant: 'Kape Tayo' },
    { id: 2, name: '20% Off sa Bilihin', points: 500, merchant: 'TechMart' },
    { id: 3, name: '₱500 Load', points: 800, merchant: 'COMPASS INU' },
  ];

  return (
    <div className="min-h-screen bg-[#0f0a1a]">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#8b5cf6]/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#a78bfa]/10 rounded-full blur-[120px]" />
      </div>
      <Sidebar active="dashboard" />
      <main className="lg:ml-64 p-4 sm:p-6 lg:p-8 relative z-10">
        <header className="mb-6 sm:mb-8 animate-[fadeInDown_0.5s_ease-out]">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Mabuhay, {userData.name}! 👋</h1>
          <p className="text-sm sm:text-base text-gray-400">Here's your COMPASS INU rewards overview</p>
        </header>

        {/* Points Overview Card */}
        <div className="bg-gradient-to-br from-[#8b5cf6]/20 to-[#7c3aed]/10 rounded-2xl p-4 sm:p-6 lg:p-8 border border-[#8b5cf6]/30 mb-6 sm:mb-8 animate-[fadeInUp_0.5s_ease-out_forwards] opacity-0" style={{ animationDelay: '100ms' }}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-gray-400 text-xs sm:text-sm mb-1">Your Points Balance</p>
              <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2">{userData.points.toLocaleString()}</p>
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2 sm:px-3 py-1 rounded-full bg-violet-500/20 text-violet-400 border border-violet-500/30 text-xs sm:text-sm font-semibold">{userData.tier}</span>
                <span className="text-gray-400 text-xs sm:text-sm">{userData.pointsToNext} pts to {userData.nextTier}</span>
              </div>
            </div>
            <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full bg-gradient-to-br from-[#8b5cf6] to-[#7c3aed] flex items-center justify-center self-center sm:self-auto">
              <FiStar className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-white" />
            </div>
          </div>
          <div className="mt-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-400">{userData.tier}</span>
              <span className="text-gray-400">{userData.nextTier}</span>
            </div>
            <div className="h-2 bg-[#3d2d5c]/50 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] rounded-full" style={{ width: `${((5000 - userData.pointsToNext) / 5000) * 100}%` }} />
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {[
            { label: 'Total Earned', value: userData.totalEarned.toLocaleString(), icon: FiTrendingUp, gradient: 'from-[#8b5cf6] to-[#7c3aed]' },
            { label: 'Current Tier', value: userData.tier, icon: FiAward, gradient: 'from-[#a78bfa] to-[#8b5cf6]' },
            { label: 'Transactions', value: '24', icon: FiShoppingBag, gradient: 'from-[#7c3aed] to-[#6d28d9]' },
            { label: 'Rewards Redeemed', value: '8', icon: FiGift, gradient: 'from-[#c4b5fd] to-[#a78bfa]' },
          ].map((stat, index) => (
            <div key={stat.label} className="bg-[#1e1433]/80 rounded-2xl p-6 border border-[#3d2d5c]/50 hover:border-[#8b5cf6]/50 transition-all duration-300 hover:scale-[1.02] group animate-[fadeInUp_0.5s_ease-out_forwards] opacity-0" style={{ animationDelay: `${200 + index * 100}ms` }}>
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div><p className="text-gray-400 text-sm">{stat.label}</p><p className="text-2xl font-bold text-white">{stat.value}</p></div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Transactions */}
          <div className="bg-[#1e1433]/80 rounded-2xl p-6 border border-[#3d2d5c]/50 animate-[fadeInUp_0.5s_ease-out_forwards] opacity-0" style={{ animationDelay: '600ms' }}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-white">Recent Activity</h3>
              <Link href="/user/transactions" className="text-[#8b5cf6] hover:text-[#7c3aed] text-sm font-medium transition-colors">View All</Link>
            </div>
            <div className="space-y-4">
              {recentTransactions.map((tx, index) => (
                <div key={tx.id} className="flex items-center justify-between p-4 bg-[#0f0a1a]/50 rounded-xl border border-[#3d2d5c]/30 hover:border-[#8b5cf6]/30 transition-all animate-[fadeInRight_0.4s_ease-out_forwards] opacity-0" style={{ animationDelay: `${700 + index * 100}ms` }}>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.type === 'earned' ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                      {tx.type === 'earned' ? <FiArrowUp className="text-green-400" /> : <RiExchangeDollarLine className="text-red-400" />}
                    </div>
                    <div>
                      <p className="text-white font-medium">{tx.merchant}</p>
                      <p className="text-gray-500 text-sm">{new Date(tx.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <span className={`font-bold ${tx.type === 'earned' ? 'text-green-400' : 'text-red-400'}`}>
                    {tx.type === 'earned' ? '+' : ''}{tx.points} pts
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Available Rewards */}
          <div className="bg-[#1e1433]/80 rounded-2xl p-6 border border-[#3d2d5c]/50 animate-[fadeInUp_0.5s_ease-out_forwards] opacity-0" style={{ animationDelay: '700ms' }}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-white">Available Rewards</h3>
              <Link href="/user/rewards" className="text-[#8b5cf6] hover:text-[#7c3aed] text-sm font-medium transition-colors">View All</Link>
            </div>
            <div className="space-y-4">
              {availableRewards.map((reward, index) => (
                <div key={reward.id} className="flex items-center justify-between p-4 bg-[#0f0a1a]/50 rounded-xl border border-[#3d2d5c]/30 hover:border-[#8b5cf6]/30 transition-all animate-[fadeInRight_0.4s_ease-out_forwards] opacity-0" style={{ animationDelay: `${800 + index * 100}ms` }}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#8b5cf6]/20 to-[#7c3aed]/20 flex items-center justify-center">
                      <FiGift className="text-[#8b5cf6]" />
                    </div>
                    <div>
                      <p className="text-white font-medium">{reward.name}</p>
                      <p className="text-gray-500 text-sm">{reward.merchant}</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] text-white rounded-lg text-sm font-medium hover:shadow-lg hover:shadow-violet-500/25 transition-all">
                    {reward.points} pts
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}


