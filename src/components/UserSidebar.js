'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiHome, FiGift, FiList, FiUser, FiLogOut, FiChevronRight, FiMenu, FiX, FiShoppingCart, FiUsers } from 'react-icons/fi';
import { RiExchangeDollarLine, RiHistoryLine } from 'react-icons/ri';
import { BsQrCodeScan, BsBank, BsGift } from 'react-icons/bs';
import { HiOutlineAcademicCap } from 'react-icons/hi';

// Three Pillars Navigation Structure
const navSections = [
  {
    title: 'Suki Points',
    color: 'text-[#06b6d4]',
    items: [
      { name: 'Dashboard', icon: FiHome, href: '/user/dashboard', id: 'dashboard' },
      { name: 'Scan to Earn', icon: BsQrCodeScan, href: '/user/scan', id: 'scan' },
      { name: 'Gift Points', icon: BsGift, href: '/user/gift', id: 'gift' },
      { name: 'Rewards', icon: FiGift, href: '/user/rewards', id: 'rewards' },
      { name: 'Catalog', icon: FiShoppingCart, href: '/user/catalog', id: 'catalog' },
      { name: 'Redeem', icon: RiExchangeDollarLine, href: '/user/redeem', id: 'redeem' },
    ]
  },
  {
    title: 'Digital Library',
    color: 'text-[#8b5cf6]',
    items: [
      { name: 'Learn', icon: HiOutlineAcademicCap, href: '/user/learn', id: 'learn' },
    ]
  },
  {
    title: 'Everyday Points',
    color: 'text-[#f59e0b]',
    items: [
      { name: 'Credit Profile', icon: BsBank, href: '/user/borrow', id: 'borrow' },
    ]
  },
  {
    title: 'Community',
    color: 'text-[#ec4899]',
    items: [
      { name: 'Governance', icon: FiUsers, href: '/user/community', id: 'community' },
    ]
  },
  {
    title: 'Account',
    color: 'text-gray-400',
    items: [
      { name: 'Ledger', icon: FiList, href: '/user/transactions', id: 'transactions' },
      { name: 'History', icon: RiHistoryLine, href: '/user/history', id: 'history' },
      { name: 'Profile', icon: FiUser, href: '/user/profile', id: 'profile' },
    ]
  },
];

export default function UserSidebar({ active }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-[#0f0a1a]/95 backdrop-blur-xl border-b border-[#3d2d5c]/50 z-50 px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <span className="text-xl font-black text-white">Compass</span>
          <span className="text-xl font-black text-[#8b5cf6] ml-1">Inu</span>
        </Link>
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="p-2 rounded-xl bg-[#1e1433] border border-[#3d2d5c] text-gray-400 hover:text-white transition-colors"
        >
          {isOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
        </button>
      </header>

      {/* Backdrop */}
      {isOpen && isMobile && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden" 
          onClick={() => setIsOpen(false)} 
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 h-full w-64 bg-[#0f0a1a]/95 backdrop-blur-xl border-r border-[#3d2d5c]/50 z-50 transform transition-transform duration-300 ${
        isMobile ? (isOpen ? 'translate-x-0' : '-translate-x-full') : 'translate-x-0'
      } lg:translate-x-0`}>
        <div className="p-6 h-full flex flex-col">
          <Link href="/" className="flex items-center mb-6 group" onClick={() => isMobile && setIsOpen(false)}>
            <div>
              <div className="flex items-center">
                <span className="text-xl font-black text-white group-hover:text-[#a78bfa] transition-colors">Compass</span>
                <span className="text-xl font-black text-[#8b5cf6] ml-1">Inu</span>
              </div>
              <p className="text-gray-500 text-xs">User Portal</p>
            </div>
          </Link>
          
          <nav className="space-y-4 flex-1 overflow-y-auto pr-2 -mr-2">
            {navSections.map((section) => (
              <div key={section.title}>
                <p className={`text-xs font-semibold uppercase tracking-wider mb-2 px-4 ${section.color}`}>
                  {section.title}
                </p>
                <div className="space-y-1">
                  {section.items.map((item) => (
                    <Link 
                      key={item.name} 
                      href={item.href} 
                      onClick={() => isMobile && setIsOpen(false)}
                      className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300 group relative overflow-hidden ${
                        active === item.id 
                          ? 'bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] text-white shadow-lg shadow-violet-500/25' 
                          : 'text-gray-400 hover:text-white hover:bg-[#1e1433]'
                      }`}
                    >
                      {active !== item.id && (
                        <div className="absolute inset-0 bg-gradient-to-r from-[#8b5cf6]/0 to-[#7c3aed]/0 group-hover:from-[#8b5cf6]/10 group-hover:to-[#7c3aed]/10 transition-all duration-300" />
                      )}
                      <item.icon className={`text-lg transition-all duration-300 ${
                        active === item.id ? 'text-white' : 'group-hover:text-[#8b5cf6] group-hover:scale-110'
                      }`} />
                      <span className="font-medium relative z-10 text-sm">{item.name}</span>
                      {active === item.id && <FiChevronRight className="ml-auto text-white/70" />}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </nav>
          
          <div className="pt-4 border-t border-[#3d2d5c]/50">
            <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#1e1433] transition-all duration-300 group cursor-pointer">
              <div className="w-10 h-10 bg-gradient-to-br from-[#8b5cf6] to-[#7c3aed] rounded-full flex items-center justify-center">
                <span className="text-white font-bold">U</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium truncate text-sm">User Account</p>
                <p className="text-gray-500 text-xs truncate">user@compass.com</p>
              </div>
              <Link 
                href="/auth/login" 
                onClick={() => isMobile && setIsOpen(false)}
                className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
              >
                <FiLogOut className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </aside>
      
      {/* Spacer for mobile header */}
      <div className="lg:hidden h-16" />
    </>
  );
}
