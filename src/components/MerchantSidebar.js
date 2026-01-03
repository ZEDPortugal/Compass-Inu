'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiHome, FiUsers, FiBarChart2, FiSettings, FiLogOut, FiChevronRight, FiMenu, FiX } from 'react-icons/fi';
import { RiExchangeDollarLine, RiMegaphoneLine } from 'react-icons/ri';

const navItems = [
  { name: 'Dashboard', icon: FiHome, href: '/merchant/dashboard', id: 'dashboard' },
  { name: 'Campaigns', icon: RiMegaphoneLine, href: '/merchant/campaigns', id: 'campaigns' },
  { name: 'Redemptions', icon: RiExchangeDollarLine, href: '/merchant/redemptions', id: 'redemptions' },
  { name: 'Customers', icon: FiUsers, href: '/merchant/customers', id: 'customers' },
  { name: 'Analytics', icon: FiBarChart2, href: '/merchant/analytics', id: 'analytics' },
  { name: 'Settings', icon: FiSettings, href: '/merchant/settings', id: 'settings' },
];

export default function MerchantSidebar({ active }) {
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
          <span className="text-xl font-black text-[#06b6d4] ml-1">Inu</span>
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
          <Link href="/" className="flex items-center mb-8 group" onClick={() => isMobile && setIsOpen(false)}>
            <div>
              <div className="flex items-center">
                <span className="text-xl font-black text-white group-hover:text-[#22d3ee] transition-colors">Compass</span>
                <span className="text-xl font-black text-[#06b6d4] ml-1">Inu</span>
              </div>
              <p className="text-gray-500 text-xs">Merchant Portal</p>
            </div>
          </Link>
          
          <nav className="space-y-1 flex-1 overflow-y-auto">
            {navItems.map((item) => (
              <Link 
                key={item.name} 
                href={item.href} 
                onClick={() => isMobile && setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden ${
                  active === item.id 
                    ? 'bg-gradient-to-r from-[#06b6d4] to-[#0891b2] text-white shadow-lg shadow-cyan-500/25' 
                    : 'text-gray-400 hover:text-white hover:bg-[#1e1433]'
                }`}
              >
                {active !== item.id && (
                  <div className="absolute inset-0 bg-gradient-to-r from-[#06b6d4]/0 to-[#0891b2]/0 group-hover:from-[#06b6d4]/10 group-hover:to-[#0891b2]/10 transition-all duration-300" />
                )}
                <item.icon className={`text-lg transition-all duration-300 ${
                  active === item.id ? 'text-white' : 'group-hover:text-[#06b6d4] group-hover:scale-110'
                }`} />
                <span className="font-medium relative z-10">{item.name}</span>
                {active === item.id && <FiChevronRight className="ml-auto text-white/70" />}
              </Link>
            ))}
          </nav>
          
          <div className="pt-4 border-t border-[#3d2d5c]/50">
            <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#1e1433] transition-all duration-300 group cursor-pointer">
              <div className="w-10 h-10 bg-gradient-to-br from-[#06b6d4] to-[#0891b2] rounded-full flex items-center justify-center">
                <span className="text-white font-bold">M</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium truncate text-sm">Merchant</p>
                <p className="text-gray-500 text-xs truncate">merchant@compass.com</p>
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
