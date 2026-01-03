'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiChevronRight, FiLogOut, FiMenu, FiX } from 'react-icons/fi';

export default function ResponsiveSidebar({ 
  active, 
  navItems, 
  portalName = 'Portal',
  portalColor = '#8b5cf6',
  portalColorEnd = '#7c3aed',
  userName = 'User',
  userEmail = 'user@compass.com',
  userInitial = 'U'
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isOpen && isMobile && !e.target.closest('.sidebar-content') && !e.target.closest('.mobile-menu-btn')) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isOpen, isMobile]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen && isMobile) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, isMobile]);

  const gradientStyle = {
    '--portal-color': portalColor,
    '--portal-color-end': portalColorEnd,
  };

  return (
    <>
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-[#0f0a1a]/95 backdrop-blur-xl border-b border-[#3d2d5c]/50 z-50 px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <h1 className="text-white font-bold text-lg">Compass <span style={{ color: portalColor }}>Inu</span></h1>
        </Link>
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="mobile-menu-btn p-2 rounded-xl bg-[#1e1433] border border-[#3d2d5c] text-gray-400 hover:text-white transition-colors"
        >
          {isOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
        </button>
      </header>

      {/* Overlay */}
      {isOpen && isMobile && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden" />
      )}

      {/* Sidebar */}
      <aside 
        className={`sidebar-content fixed left-0 top-0 h-full w-64 bg-[#0f0a1a]/95 backdrop-blur-xl border-r border-[#3d2d5c]/50 z-50 transform transition-transform duration-300 ease-in-out ${
          isMobile ? (isOpen ? 'translate-x-0' : '-translate-x-full') : 'translate-x-0'
        } lg:translate-x-0`}
        style={gradientStyle}
      >
        <div className="p-6 h-full flex flex-col">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 mb-8 group" onClick={() => isMobile && setIsOpen(false)}>
            <div>
              <h1 className="text-white font-bold text-xl group-hover:opacity-80 transition-opacity">
                Compass <span style={{ color: portalColor }}>Inu</span>
              </h1>
              <p className="text-gray-500 text-xs">{portalName}</p>
            </div>
          </Link>
          
          {/* Navigation */}
          <nav className="space-y-1 flex-1 overflow-y-auto">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => isMobile && setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden ${
                  active === item.id 
                    ? 'text-white shadow-lg' 
                    : 'text-gray-400 hover:text-white hover:bg-[#1e1433]'
                }`}
                style={active === item.id ? {
                  background: `linear-gradient(to right, ${portalColor}, ${portalColorEnd})`,
                  boxShadow: `0 10px 25px -5px ${portalColor}40`
                } : {}}
              >
                {active !== item.id && (
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300"
                    style={{ background: `linear-gradient(to right, ${portalColor}15, ${portalColorEnd}15)` }}
                  />
                )}
                <item.icon className={`text-lg transition-all duration-300 ${
                  active === item.id ? 'text-white' : 'group-hover:scale-110'
                }`} 
                style={active !== item.id ? { '--tw-text-opacity': 1 } : {}}
                />
                <span className="font-medium relative z-10">{item.name}</span>
                {active === item.id && (
                  <FiChevronRight className="ml-auto text-white/70" />
                )}
              </Link>
            ))}
          </nav>
          
          {/* User Profile */}
          <div className="pt-4 border-t border-[#3d2d5c]/50">
            <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#1e1433] transition-all duration-300 group cursor-pointer">
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center group-hover:scale-105 transition-transform"
                style={{ background: `linear-gradient(to bottom right, ${portalColor}, ${portalColorEnd})` }}
              >
                <span className="text-white font-bold">{userInitial}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium truncate text-sm">{userName}</p>
                <p className="text-gray-500 text-xs truncate">{userEmail}</p>
              </div>
              <Link 
                href="/auth/login" 
                onClick={() => isMobile && setIsOpen(false)}
                className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-300"
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
