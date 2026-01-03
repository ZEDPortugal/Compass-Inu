'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiHome, FiUsers, FiShoppingBag, FiRadio, FiActivity, FiPieChart, FiSettings, FiLogOut, FiChevronRight, FiMenu, FiX } from 'react-icons/fi';

const navItems = [
  { name: 'Dashboard', icon: FiHome, href: '/admin/dashboard', id: 'dashboard' },
  { name: 'Users', icon: FiUsers, href: '/admin/users', id: 'users' },
  { name: 'Merchants', icon: FiShoppingBag, href: '/admin/merchants', id: 'merchants' },
  { name: 'Campaigns', icon: FiRadio, href: '/admin/campaigns', id: 'campaigns' },
  { name: 'Monitoring', icon: FiActivity, href: '/admin/monitoring', id: 'monitoring' },
  { name: 'Analytics', icon: FiPieChart, href: '/admin/analytics', id: 'analytics' },
  { name: 'Settings', icon: FiSettings, href: '/admin/settings', id: 'settings' },
];

export default function AdminSidebar({ active }) {
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
        <Link href="/" className="flex items-center gap-2">
          <img 
            src="https://images.pump.fun/coin-image/AEwvZ4Lpzt5rx4G9q4bntR2t6L7KLHvwY4kArFfWpump?variant=600x600&ipfs=bafkreihvqburnirltnnuxnzsj7svzulyhsy323q3om2yqzn6phrk7cbnqe&src=https%3A%2F%2Fipfs.io%2Fipfs%2Fbafkreihvqburnirltnnuxnzsj7svzulyhsy323q3om2yqzn6phrk7cbnqe" 
            alt="Compass Inu Logo" 
            className="w-8 h-8 rounded-lg"
          />
          <h1 className="text-white font-bold text-lg">Compass <span className="text-[#f59e0b]">Inu</span></h1>
          <span className="text-[10px] text-gray-500 bg-[#1e1433] px-2 py-0.5 rounded">Admin</span>
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
          <Link href="/" className="flex items-center gap-3 mb-8 group" onClick={() => isMobile && setIsOpen(false)}>
            <img 
              src="https://images.pump.fun/coin-image/AEwvZ4Lpzt5rx4G9q4bntR2t6L7KLHvwY4kArFfWpump?variant=600x600&ipfs=bafkreihvqburnirltnnuxnzsj7svzulyhsy323q3om2yqzn6phrk7cbnqe&src=https%3A%2F%2Fipfs.io%2Fipfs%2Fbafkreihvqburnirltnnuxnzsj7svzulyhsy323q3om2yqzn6phrk7cbnqe" 
              alt="Compass Inu Logo" 
              className="w-10 h-10 rounded-xl group-hover:scale-105 transition-transform"
            />
            <div>
              <h1 className="text-white font-bold text-xl group-hover:text-[#f59e0b] transition-colors">Compass Inu</h1>
              <p className="text-gray-500 text-xs">Admin Panel</p>
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
                    ? 'bg-gradient-to-r from-[#f59e0b] to-[#d97706] text-white shadow-lg shadow-orange-500/25' 
                    : 'text-gray-400 hover:text-white hover:bg-[#1e1433]'
                }`}
              >
                {active !== item.id && (
                  <div className="absolute inset-0 bg-gradient-to-r from-[#f59e0b]/0 to-[#d97706]/0 group-hover:from-[#f59e0b]/10 group-hover:to-[#d97706]/10 transition-all duration-300" />
                )}
                <item.icon className={`text-lg transition-all duration-300 ${
                  active === item.id ? 'text-white' : 'group-hover:text-[#f59e0b] group-hover:scale-110'
                }`} />
                <span className="font-medium relative z-10">{item.name}</span>
                {active === item.id && <FiChevronRight className="ml-auto text-white/70" />}
              </Link>
            ))}
          </nav>
          
          <div className="pt-4 border-t border-[#3d2d5c]/50">
            <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#1e1433] transition-all duration-300 group cursor-pointer">
              <div className="w-10 h-10 bg-gradient-to-br from-[#f59e0b] to-[#d97706] rounded-full flex items-center justify-center">
                <span className="text-white font-bold">A</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium truncate text-sm">Admin</p>
                <p className="text-gray-500 text-xs truncate">admin@compass.com</p>
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
