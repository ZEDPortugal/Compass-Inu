'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FiBook, FiStar, FiBell, FiClock, FiAward, FiTrendingUp, FiUsers, FiPlay, FiLock, FiCheckCircle, FiArrowRight, FiBookOpen } from 'react-icons/fi';
import { IoFlameSharp } from 'react-icons/io5';
import { BsLightningChargeFill, BsBookHalf, BsTrophy, BsGraphUp } from 'react-icons/bs';
import { HiOutlineSparkles, HiOutlineAcademicCap, HiOutlineLightBulb } from 'react-icons/hi';
import { RiMedalLine } from 'react-icons/ri';
import UserSidebar from '@/components/UserSidebar';

export default function LearnDashboard() {
  const userStats = {
    totalPoints: 1250,
    articlesRead: 24,
    streakDays: 7,
    badges: 5,
    currentLevel: 'Explorer',
    nextLevel: 'Scholar',
    xpToNext: 750,
  };

  const learningTracks = [
    {
      id: 1,
      title: 'Web3 Fundamentals',
      description: 'Master the basics of blockchain and cryptocurrency',
      progress: 60,
      totalModules: 10,
      completedModules: 6,
      reward: 500,
      status: 'in-progress',
      color: 'from-[#8b5cf6] to-[#7c3aed]',
    },
    {
      id: 2,
      title: 'DeFi Essentials',
      description: 'Learn about decentralized finance protocols',
      progress: 30,
      totalModules: 8,
      completedModules: 2,
      reward: 400,
      status: 'in-progress',
      color: 'from-[#a78bfa] to-[#8b5cf6]',
    },
    {
      id: 3,
      title: 'Smart Contracts 101',
      description: 'Understanding smart contract basics',
      progress: 0,
      totalModules: 12,
      completedModules: 0,
      reward: 600,
      status: 'locked',
      color: 'from-[#7c3aed] to-[#6d28d9]',
    },
    {
      id: 4,
      title: 'NFT Basics',
      description: 'Explore the world of non-fungible tokens',
      progress: 100,
      totalModules: 6,
      completedModules: 6,
      reward: 300,
      status: 'completed',
      color: 'from-[#a78bfa] to-[#7c3aed]',
    },
  ];

  const featuredContent = [
    { id: 1, title: 'What is Blockchain?', type: 'Article', readTime: '5 min', points: 25, category: 'Basics' },
    { id: 2, title: 'Introduction to Wallets', type: 'Video', readTime: '8 min', points: 40, category: 'Security' },
    { id: 3, title: 'Understanding Gas Fees', type: 'Article', readTime: '7 min', points: 35, category: 'DeFi' },
    { id: 4, title: 'MSME Digital Payments', type: 'Guide', readTime: '10 min', points: 50, category: 'Business' },
  ];

  const recentBadges = [
    { id: 1, name: 'First Article', Icon: FiBookOpen, color: 'text-[#8b5cf6]', description: 'Read your first article' },
    { id: 2, name: '7-Day Streak', Icon: IoFlameSharp, color: 'text-orange-500', description: 'Read for 7 days in a row' },
    { id: 3, name: 'Web3 Novice', Icon: HiOutlineAcademicCap, color: 'text-[#a78bfa]', description: 'Complete Web3 Fundamentals track' },
  ];

  return (
    <div className="min-h-screen bg-[#0f0a1a]">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#8b5cf6]/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#a78bfa]/10 rounded-full blur-[120px]" />
      </div>
      <UserSidebar active="learn" />
      <main className="lg:ml-64 p-4 sm:p-6 lg:p-8 relative z-10">
        <header className="mb-6 sm:mb-8 flex flex-col sm:flex-row justify-between items-start gap-4 animate-[fadeInDown_0.5s_ease-out]">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2 flex items-center gap-3">
              <HiOutlineAcademicCap className="text-[#8b5cf6]" />
              Digital Library
            </h1>
            <p className="text-sm sm:text-base text-gray-400">Earn points while learning about Web3 and financial literacy</p>
          </div>
          <button className="relative p-2.5 sm:p-3 bg-[#1e1433]/80 rounded-xl border border-[#3d2d5c]/50 hover:border-[#8b5cf6]/50 transition-all">
            <FiBell className="text-gray-400 text-lg sm:text-xl" />
          </button>
        </header>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6 sm:mb-8">
          {[
            { label: 'Learning Points', value: userStats.totalPoints, icon: FiStar, color: 'text-[#8b5cf6]' },
            { label: 'Articles Read', value: userStats.articlesRead, icon: BsBookHalf, color: 'text-[#a78bfa]' },
            { label: 'Day Streak', value: userStats.streakDays, icon: BsLightningChargeFill, color: 'text-[#7c3aed]', showFlame: true },
            { label: 'Badges Earned', value: userStats.badges, icon: RiMedalLine, color: 'text-[#8b5cf6]' },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className="bg-[#1e1433]/80 rounded-2xl p-4 sm:p-5 border border-[#3d2d5c]/50 hover:border-[#8b5cf6]/50 transition-all duration-300 animate-[fadeInUp_0.5s_ease-out_forwards] opacity-0"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <stat.icon className={`w-6 h-6 ${stat.color} mb-2`} />
              <p className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
                {stat.value}
                {stat.showFlame && <IoFlameSharp className="w-5 h-5 text-orange-500" />}
              </p>
              <p className="text-xs sm:text-sm text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Level Progress */}
        <div className="bg-gradient-to-r from-[#8b5cf6]/20 to-[#a78bfa]/20 rounded-2xl p-4 sm:p-6 border border-[#8b5cf6]/30 mb-6 sm:mb-8 animate-[fadeInUp_0.5s_ease-out]" style={{ animationDelay: '200ms' }}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#8b5cf6] to-[#7c3aed] flex items-center justify-center">
                <HiOutlineAcademicCap className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Current Level</p>
                <p className="text-2xl font-bold text-white">{userStats.currentLevel}</p>
              </div>
            </div>
            <div className="text-left sm:text-right">
              <p className="text-gray-400 text-sm">Next Level</p>
              <p className="text-lg font-semibold text-[#a78bfa]">{userStats.nextLevel}</p>
              <p className="text-xs text-gray-500">{userStats.xpToNext} XP needed</p>
            </div>
          </div>
          <div className="h-3 bg-[#3d2d5c]/50 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#8b5cf6] to-[#a78bfa] rounded-full" style={{ width: '65%' }} />
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Learning Tracks */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
              <BsTrophy className="text-[#8b5cf6]" />
              Learning Tracks
            </h3>
            {learningTracks.map((track, index) => (
              <div
                key={track.id}
                className={`bg-[#1e1433]/80 rounded-2xl p-5 border border-[#3d2d5c]/50 hover:border-[#8b5cf6]/50 transition-all duration-300 animate-[fadeInUp_0.5s_ease-out_forwards] opacity-0 ${track.status === 'locked' ? 'opacity-60' : ''}`}
                style={{ animationDelay: `${300 + index * 100}ms` }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${track.color} flex items-center justify-center`}>
                      {track.status === 'locked' ? (
                        <FiLock className="w-5 h-5 text-white" />
                      ) : track.status === 'completed' ? (
                        <FiCheckCircle className="w-5 h-5 text-white" />
                      ) : (
                        <FiBook className="w-5 h-5 text-white" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-bold text-white">{track.title}</h4>
                      <p className="text-sm text-gray-400">{track.description}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    track.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                    track.status === 'locked' ? 'bg-gray-500/20 text-gray-400' :
                    'bg-[#8b5cf6]/20 text-[#8b5cf6]'
                  }`}>
                    {track.status === 'completed' ? 'Completed' : track.status === 'locked' ? 'Locked' : 'In Progress'}
                  </span>
                </div>
                <div className="mb-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">{track.completedModules}/{track.totalModules} modules</span>
                    <span className="text-gray-400">{track.progress}%</span>
                  </div>
                  <div className="h-2 bg-[#3d2d5c]/50 rounded-full overflow-hidden">
                    <div className={`h-full bg-gradient-to-r ${track.color} rounded-full transition-all`} style={{ width: `${track.progress}%` }} />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400 flex items-center gap-1">
                    <FiStar className="text-[#8b5cf6]" />
                    {track.reward} pts reward
                  </span>
                  {track.status !== 'locked' && (
                    <Link
                      href={`/user/learn/track/${track.id}`}
                      className="text-sm font-medium text-[#8b5cf6] hover:text-[#a78bfa] flex items-center gap-1 transition-colors"
                    >
                      {track.status === 'completed' ? 'Review' : 'Continue'}
                      <FiArrowRight className="w-4 h-4" />
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Featured Content */}
            <div className="bg-[#1e1433]/80 rounded-2xl p-5 border border-[#3d2d5c]/50 animate-[fadeInUp_0.5s_ease-out_forwards] opacity-0" style={{ animationDelay: '400ms' }}>
              <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
                <HiOutlineLightBulb className="text-[#8b5cf6]" />
                Featured Content
              </h3>
              <div className="space-y-3">
                {featuredContent.map((item) => (
                  <Link
                    key={item.id}
                    href={`/user/learn/content/${item.id}`}
                    className="block p-3 bg-[#0f0a1a]/50 rounded-xl border border-[#3d2d5c]/30 hover:border-[#8b5cf6]/30 transition-all group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs px-2 py-1 bg-[#8b5cf6]/20 text-[#8b5cf6] rounded-full">{item.category}</span>
                      <span className="text-xs text-gray-500">{item.type}</span>
                    </div>
                    <h4 className="font-medium text-white group-hover:text-[#8b5cf6] transition-colors">{item.title}</h4>
                    <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <FiClock className="w-3 h-3" />
                        {item.readTime}
                      </span>
                      <span className="flex items-center gap-1 text-[#8b5cf6]">
                        <FiStar className="w-3 h-3" />
                        +{item.points}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
              <Link href="/user/learn/library" className="block mt-4 text-center text-sm font-medium text-[#8b5cf6] hover:text-[#a78bfa] transition-colors">
                Browse All Content →
              </Link>
            </div>

            {/* Recent Badges */}
            <div className="bg-[#1e1433]/80 rounded-2xl p-5 border border-[#3d2d5c]/50 animate-[fadeInUp_0.5s_ease-out_forwards] opacity-0" style={{ animationDelay: '500ms' }}>
              <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
                <FiAward className="text-[#8b5cf6]" />
                Recent Badges
              </h3>
              <div className="space-y-3">
                {recentBadges.map((badge) => (
                  <div key={badge.id} className="flex items-center gap-3 p-3 bg-[#0f0a1a]/50 rounded-xl">
                    <div className="w-10 h-10 rounded-lg bg-[#1e1433] flex items-center justify-center">
                      <badge.Icon className={`w-5 h-5 ${badge.color}`} />
                    </div>
                    <div>
                      <p className="font-medium text-white">{badge.name}</p>
                      <p className="text-xs text-gray-500">{badge.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Author CTA */}
            <div className="bg-gradient-to-br from-[#8b5cf6]/20 to-[#a78bfa]/20 rounded-2xl p-5 border border-[#8b5cf6]/30 animate-[fadeInUp_0.5s_ease-out_forwards] opacity-0" style={{ animationDelay: '600ms' }}>
              <HiOutlineSparkles className="w-8 h-8 text-[#8b5cf6] mb-3" />
              <h4 className="font-bold text-white mb-2">Become an Author</h4>
              <p className="text-sm text-gray-400 mb-4">Create content and earn Author Attention Rewards when others read your work.</p>
              <Link href="/user/learn/author" className="inline-flex items-center gap-2 px-4 py-2 bg-[#8b5cf6] text-white rounded-lg text-sm font-medium hover:opacity-90 transition-all">
                Start Writing
                <FiArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
