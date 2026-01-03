'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiArrowRight, FiCheck, FiUsers, FiStar, FiGift, FiShield, FiTrendingUp, FiZap, FiAward, FiTarget, FiMenu, FiX } from 'react-icons/fi';
import { HiOutlineSparkles, HiOutlineShoppingBag, HiOutlineChartBar, HiOutlineCog } from 'react-icons/hi';
import { BsBuilding, BsGraphUp, BsLightningCharge, BsShieldCheck } from 'react-icons/bs';
import { RiExchangeDollarLine, RiMedalLine, RiRocketLine } from 'react-icons/ri';

// Animated Counter Component with smart formatting
const AnimatedCounter = ({ end, suffix = '', duration = 2000 }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let startTime;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [end, duration]);
  
  // Format large numbers: 1,000,000+ becomes 1M+, 20,000,000+ becomes 20M+
  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(0) + 'M';
    }
    return num.toLocaleString();
  };
  
  return <span>{formatNumber(count)}{suffix}</span>;
};

// Floating Particles Background
const ParticlesBackground = () => {
  const [particles, setParticles] = useState([]);
  
  useEffect(() => {
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, []);
  
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-gradient-to-br from-[#8b5cf6]/30 to-[#06b6d4]/20"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animation: `float ${particle.duration}s ease-in-out infinite`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  // Track active section with Intersection Observer
  useEffect(() => {
    const sections = ['home', 'features', 'how-it-works', 'about'];
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id || 'home');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((sectionId) => {
      const element = sectionId === 'home' 
        ? document.querySelector('[data-section="home"]') 
        : document.getElementById(sectionId);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  // Smooth scroll handler
  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    
    if (href === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActiveSection('home');
    } else {
      const targetId = href.replace('#', '');
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0a1a] relative">
      <ParticlesBackground />
      
      {/* Global Animated Gradient Blobs - These flow through all sections */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-visible">
        <div className="absolute top-[15%] left-[20%] w-[600px] h-[600px] bg-[#8b5cf6]/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute top-[40%] right-[15%] w-[500px] h-[500px] bg-[#06b6d4]/15 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-[65%] left-[30%] w-[400px] h-[400px] bg-[#f59e0b]/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-[85%] right-[25%] w-[450px] h-[450px] bg-[#ec4899]/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      </div>
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 py-2 sm:py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="relative flex justify-between items-center h-14 sm:h-16 px-4 sm:px-6 rounded-2xl bg-[#1a0f2e]/60 backdrop-blur-xl border border-[#3d2d5c]/40 shadow-lg shadow-purple-500/5">
            {/* Animated border glow */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#8b5cf6]/20 via-transparent to-[#06b6d4]/20 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            
            {/* Logo */}
            <Link href="/" className="relative flex items-center gap-2 sm:gap-3 group z-10">
              <div className="relative">
                <span className="text-xl sm:text-2xl font-black bg-gradient-to-r from-white via-[#a78bfa] to-white bg-clip-text text-transparent bg-[length:200%_auto] animate-shimmer">
                  Compass
                </span>
                <span className="text-xl sm:text-2xl font-black text-[#f59e0b] ml-1 group-hover:text-[#fbbf24] transition-colors">
                  Inu
                </span>
              </div>
            </Link>

            {/* Nav Links - Center (Desktop only) */}
            <div className="hidden lg:flex items-center absolute left-1/2 -translate-x-1/2">
              <div className="flex items-center gap-1">
                {[
                  { name: 'Home', href: '/', sectionId: 'home', icon: '✦' },
                  { name: 'Features', href: '#features', sectionId: 'features', icon: '◈' },
                  { name: 'How It Works', href: '#how-it-works', sectionId: 'how-it-works', icon: '◇' },
                  { name: 'About', href: '#about', sectionId: 'about', icon: '○' },
                ].map((link) => {
                  const isActive = activeSection === link.sectionId;
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-xl group overflow-hidden ${isActive ? 'text-white' : 'text-gray-400 hover:text-white'}`}
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-[#8b5cf6]/0 via-[#8b5cf6]/10 to-[#8b5cf6]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
                      <span className="relative flex items-center gap-2">
                        <span className={`text-[#8b5cf6] transition-opacity text-xs ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>{link.icon}</span>
                        {link.name}
                      </span>
                      <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] transition-all duration-300 rounded-full ${isActive ? 'w-3/4' : 'w-0 group-hover:w-3/4'}`}></span>
                      {isActive && (
                        <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#8b5cf6] rounded-full animate-pulse"></span>
                      )}
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Auth Buttons (Desktop) */}
            <div className="hidden sm:flex items-center gap-2 z-10">
              <Link 
                href="/auth/login" 
                className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-white font-medium transition-all duration-300 rounded-xl border border-transparent hover:border-[#3d2d5c] hover:bg-[#1e1433]/50 group"
              >
                <span className="w-2 h-2 rounded-full bg-[#3d2d5c] group-hover:bg-[#8b5cf6] transition-colors"></span>
                Sign In
              </Link>
              <Link 
                href="/auth/signup" 
                className="relative group overflow-hidden bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/50 hover:scale-[1.02]"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-[#06b6d4] to-[#8b5cf6] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                <span className="relative flex items-center gap-2">
                  <span className="hidden sm:inline">Get Started</span>
                  <span className="sm:hidden">Start</span>
                  <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="sm:hidden flex items-center justify-center w-10 h-10 rounded-xl bg-[#1e1433] border border-[#3d2d5c] text-gray-400 hover:text-white hover:border-[#8b5cf6]/50 transition-all z-10"
            >
              {mobileMenuOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="sm:hidden mt-2 p-4 rounded-2xl bg-[#1a0f2e]/95 backdrop-blur-xl border border-[#3d2d5c]/40 animate-fadeIn">
              <div className="space-y-2 mb-4">
                {[
                  { name: 'Home', href: '/', sectionId: 'home' },
                  { name: 'Features', href: '#features', sectionId: 'features' },
                  { name: 'How It Works', href: '#how-it-works', sectionId: 'how-it-works' },
                  { name: 'About', href: '#about', sectionId: 'about' },
                ].map((link) => {
                  const isActive = activeSection === link.sectionId;
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className={`block px-4 py-3 rounded-xl transition-colors ${isActive ? 'text-white bg-[#8b5cf6]/20 border border-[#8b5cf6]/30' : 'text-gray-300 hover:text-white hover:bg-[#1e1433]'}`}
                    >
                      <span className="flex items-center gap-2">
                        {isActive && <span className="w-2 h-2 bg-[#8b5cf6] rounded-full animate-pulse"></span>}
                        {link.name}
                      </span>
                    </a>
                  );
                })}
              </div>
              <div className="space-y-2 pt-4 border-t border-[#3d2d5c]">
                <Link 
                  href="/auth/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full px-4 py-3 text-center text-gray-300 hover:text-white hover:bg-[#1e1433] rounded-xl transition-colors"
                >
                  Sign In
                </Link>
                <Link 
                  href="/auth/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full px-4 py-3 text-center bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] text-white rounded-xl font-semibold"
                >
                  Get Started
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section data-section="home" id="home" className="relative pt-28 sm:pt-32 pb-16 sm:pb-24 px-4 sm:px-6">
        {/* Floating Shiba Inu Paw Prints - Hidden on mobile */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none hidden sm:block">
          {/* Animated paw prints using react-icons */}
          <div className="absolute top-[20%] left-[10%] animate-float opacity-10">
            <FiTarget className="w-12 h-12 text-[#f59e0b]" />
          </div>
          <div className="absolute top-[35%] right-[8%] animate-float opacity-10" style={{ animationDelay: '1s' }}>
            <FiStar className="w-10 h-10 text-[#8b5cf6]" />
          </div>
          <div className="absolute bottom-[40%] left-[5%] animate-float opacity-10" style={{ animationDelay: '2s' }}>
            <FiGift className="w-8 h-8 text-[#06b6d4]" />
          </div>
          <div className="absolute top-[55%] right-[12%] animate-float opacity-10" style={{ animationDelay: '1.5s' }}>
            <FiAward className="w-14 h-14 text-[#f59e0b]" />
          </div>
          <div className="absolute bottom-[25%] right-[5%] animate-float opacity-10" style={{ animationDelay: '0.5s' }}>
            <FiTrendingUp className="w-10 h-10 text-[#22c55e]" />
          </div>
          <div className="absolute top-[70%] left-[15%] animate-float opacity-10" style={{ animationDelay: '2.5s' }}>
            <FiZap className="w-8 h-8 text-[#ec4899]" />
          </div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight">
              <span className="inline-block animate-fadeInUp">Empowering</span>
              <br />
              <span className="inline-block animate-fadeInUp" style={{ animationDelay: '150ms' }}>
                <span className="relative">
                  <span className="bg-gradient-to-r from-[#8b5cf6] via-[#ec4899] to-[#06b6d4] bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                    Filipino Growth
                  </span>
                  {/* Underline animation */}
                  <span className="absolute -bottom-1 sm:-bottom-2 left-0 w-full h-0.5 sm:h-1 bg-gradient-to-r from-[#8b5cf6] via-[#ec4899] to-[#06b6d4] rounded-full animate-scaleX origin-left"></span>
                </span>
              </span>
            </h1>
            
            <p className="text-base sm:text-xl text-gray-400 mb-8 sm:mb-10 max-w-2xl mx-auto px-4 animate-fadeInUp" style={{ animationDelay: '300ms' }}>
              Turn everyday actions into real rewards. Support local merchants, learn valuable skills, 
              and build your credit reputation—all with one interoperable token.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 animate-fadeInUp" style={{ animationDelay: '450ms' }}>
              <Link 
                href="/auth/signup" 
                className="group relative bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg transition-all shadow-lg shadow-purple-500/40 hover:shadow-purple-500/60 hover:scale-105 inline-flex items-center justify-center gap-2 overflow-hidden"
              >
                {/* Button shine effect */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
                <RiRocketLine className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                <span className="relative">Start Earning Now</span>
                <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/auth/login" 
                className="group bg-[#1e1433] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg hover:bg-[#2a1f42] transition-all border border-[#3d2d5c] hover:border-[#8b5cf6]/50 flex items-center justify-center gap-2 relative overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-[#8b5cf6]/0 via-[#8b5cf6]/5 to-[#8b5cf6]/0 -translate-x-full group-hover:translate-x-full transition-transform duration-500"></span>
                <FiUsers className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="relative">Sign In</span>
              </Link>
            </div>
          </div>

          {/* Stats Row */}
          <div className="mt-12 sm:mt-20 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 max-w-5xl mx-auto px-2 sm:px-4">
            {[
              { value: 1000000, suffix: '+', label: 'MSMEs in PH', icon: BsBuilding, color: 'cyan' },
              { value: 20000000, suffix: '+', label: 'Students', icon: FiUsers, color: 'purple' },
              { value: 70000000, suffix: '+', label: 'E-wallet Users', icon: FiStar, color: 'orange' },
              { value: 200, suffix: 'B+', label: 'Credit Gap (₱)', icon: FiTrendingUp, color: 'pink' },
            ].map((stat, index) => (
              <div 
                key={stat.label}
                className="group relative text-center p-5 sm:p-6 lg:p-8 bg-[#1e1433]/50 rounded-xl sm:rounded-2xl border border-[#3d2d5c]/50 hover:border-[#8b5cf6]/50 transition-all duration-500 hover:transform hover:scale-105 animate-fadeInUp overflow-hidden backdrop-blur-sm"
                style={{ animationDelay: `${750 + index * 100}ms` }}
              >
                {/* Hover glow effect */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${
                  stat.color === 'purple' ? 'from-[#8b5cf6]/10' : 
                  stat.color === 'cyan' ? 'from-[#06b6d4]/10' : 
                  stat.color === 'orange' ? 'from-[#f59e0b]/10' : 
                  'from-[#ec4899]/10'
                } to-transparent`}></div>
                
                <stat.icon className={`relative w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 mx-auto mb-3 sm:mb-4 ${
                  stat.color === 'purple' ? 'text-[#8b5cf6]' : 
                  stat.color === 'cyan' ? 'text-[#06b6d4]' : 
                  stat.color === 'orange' ? 'text-[#f59e0b]' : 
                  'text-[#ec4899]'
                } group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`} />
                <div className="relative text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1 sm:mb-2">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="relative text-xs sm:text-sm lg:text-base text-gray-500 group-hover:text-gray-400 transition-colors">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 sm:py-24 px-4 sm:px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-16 animate-fadeInUp">
            <span className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-[#06b6d4]/20 border border-[#06b6d4]/30 rounded-full text-[#67e8f9] text-xs sm:text-sm mb-4">
              <FiZap className="w-4 h-4" />
              Three Pillars
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
              One Token, Three Ecosystems
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-base sm:text-lg px-4">
              COMPASS INU unifies learning, purchasing, and borrowing into one interoperable rewards ecosystem.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8">
            {/* Digital Library Card */}
            <div className="bg-gradient-to-br from-[#1e1433] to-[#2a1f42] rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-[#3d2d5c] hover:border-[#8b5cf6] transition-all group hover:transform hover:scale-[1.02] animate-fadeInUp">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-[#8b5cf6] to-[#7c3aed] rounded-xl flex items-center justify-center mb-4 sm:mb-6 shadow-lg shadow-purple-500/30 group-hover:scale-110 transition-transform">
                <FiUsers className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">Digital Library</h3>
              <p className="text-sm sm:text-base text-gray-400 mb-4 sm:mb-6">
                Earn rewards for reading, learning, and creating quality content. A Web3 knowledge hub for Filipino creators.
              </p>
              <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                {['Reader engagement rewards', 'Author attention rewards', 'Curated learning tracks'].map((item, i) => (
                  <li key={i} className="flex items-center text-sm sm:text-base text-gray-300">
                    <FiCheck className="w-4 h-4 sm:w-5 sm:h-5 text-[#8b5cf6] mr-2 sm:mr-3 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link 
                href="/auth/signup" 
                className="inline-flex items-center text-sm sm:text-base text-[#8b5cf6] font-semibold group-hover:text-[#a78bfa] transition-colors"
              >
                Start Learning
                <FiArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Suki Points Card */}
            <div className="bg-gradient-to-br from-[#1e1433] to-[#2a1f42] rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-[#3d2d5c] hover:border-[#06b6d4] transition-all group hover:transform hover:scale-[1.02] animate-fadeInUp" style={{ animationDelay: '100ms' }}>
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-[#06b6d4] to-[#0891b2] rounded-xl flex items-center justify-center mb-4 sm:mb-6 shadow-lg shadow-cyan-500/30 group-hover:scale-110 transition-transform">
                <BsBuilding className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">Suki Points</h3>
              <p className="text-sm sm:text-base text-gray-400 mb-4 sm:mb-6">
                Affordable loyalty for MSMEs. Self-serve signup, on-chain integrity, and real-world redemptions.
              </p>
              <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                {['Go live in a day', 'No lost or double-spent points', 'Gift points to family (OFW-style)'].map((item, i) => (
                  <li key={i} className="flex items-center text-sm sm:text-base text-gray-300">
                    <FiCheck className="w-4 h-4 sm:w-5 sm:h-5 text-[#06b6d4] mr-2 sm:mr-3 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link 
                href="/auth/merchant/signup" 
                className="inline-flex items-center text-sm sm:text-base text-[#06b6d4] font-semibold group-hover:text-[#22d3ee] transition-colors"
              >
                Register Your Negosyo
                <FiArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Everyday Points Card */}
            <div className="bg-gradient-to-br from-[#1e1433] to-[#2a1f42] rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-[#3d2d5c] hover:border-[#f59e0b] transition-all group hover:transform hover:scale-[1.02] animate-fadeInUp sm:col-span-2 md:col-span-1" style={{ animationDelay: '200ms' }}>
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-[#f59e0b] to-[#d97706] rounded-xl flex items-center justify-center mb-4 sm:mb-6 shadow-lg shadow-orange-500/30 group-hover:scale-110 transition-transform">
                <BsShieldCheck className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">Everyday Points</h3>
              <p className="text-sm sm:text-base text-gray-400 mb-4 sm:mb-6">
                Responsible lending rewards. Earn points for on-time repayments and build your credit reputation.
              </p>
              <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                {['Bi-weekly reward accrual', 'Token-backed credit profile', 'Unlock better loan offers'].map((item, i) => (
                  <li key={i} className="flex items-center text-sm sm:text-base text-gray-300">
                    <FiCheck className="w-4 h-4 sm:w-5 sm:h-5 text-[#f59e0b] mr-2 sm:mr-3 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link 
                href="/auth/login" 
                className="inline-flex items-center text-sm sm:text-base text-[#f59e0b] font-semibold group-hover:text-[#fbbf24] transition-colors"
              >
                Learn More
                <FiArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 sm:py-24 px-4 sm:px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-16 animate-fadeInUp">
            <span className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-[#f59e0b]/20 border border-[#f59e0b]/30 rounded-full text-[#fbbf24] text-xs sm:text-sm mb-4">
              <FiTarget className="w-4 h-4" />
              Simple Steps
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">How It Works</h2>
            <p className="text-gray-400 text-base sm:text-lg">Get started in just three simple steps</p>
          </div>

          <div className="grid sm:grid-cols-3 gap-8 sm:gap-8 relative">
            {/* Connection line - hidden on mobile */}
            <div className="hidden sm:block absolute top-20 left-[20%] right-[20%] h-1 bg-gradient-to-r from-[#8b5cf6] via-[#06b6d4] to-[#f59e0b] rounded-full"></div>
            
            {[
              { step: 1, title: 'Create Account', desc: 'Sign up in seconds with email, Google, or phone number', icon: FiUsers, color: 'purple' },
              { step: 2, title: 'Earn Points', desc: 'Shop at participating merchants and collect points automatically', icon: FiStar, color: 'cyan' },
              { step: 3, title: 'Redeem Rewards', desc: 'Exchange your points for amazing discounts and exclusive offers', icon: FiGift, color: 'orange' },
            ].map((item, index) => (
              <div key={item.step} className="relative text-center animate-fadeInUp" style={{ animationDelay: `${index * 150}ms` }}>
                {/* Step Number Badge */}
                <div className={`absolute -top-3 left-1/2 -translate-x-1/2 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold z-20 ${
                  item.color === 'purple' ? 'bg-[#8b5cf6] text-white' :
                  item.color === 'cyan' ? 'bg-[#06b6d4] text-white' :
                  'bg-[#f59e0b] text-white'
                } shadow-lg`}>
                  {item.step}
                </div>
                
                {/* Icon Box */}
                <div className={`relative w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-xl z-10 transition-transform hover:scale-110 ${
                  item.color === 'purple' ? 'bg-gradient-to-br from-[#8b5cf6] to-[#7c3aed] shadow-purple-500/30' :
                  item.color === 'cyan' ? 'bg-gradient-to-br from-[#06b6d4] to-[#0891b2] shadow-cyan-500/30' :
                  'bg-gradient-to-br from-[#f59e0b] to-[#d97706] shadow-orange-500/30'
                }`}>
                  <item.icon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>
                
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">{item.title}</h3>
                <p className="text-sm sm:text-base text-gray-400 max-w-xs mx-auto">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-16 animate-fadeInUp">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3 sm:mb-4">Built for Filipino Communities</h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">Simplicity • Community • Transparency • Practicality • Education</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {[
              { icon: BsLightningCharge, title: 'Mobile-First', desc: 'Designed for GCash, Maya, and everyday Filipino tools' },
              { icon: FiShield, title: 'On-Chain Integrity', desc: 'No lost or double-spent points—transparent ledger' },
              { icon: HiOutlineChartBar, title: 'Real-World Value', desc: 'Convert points to tangible goods and services' },
              { icon: FiAward, title: 'Community-Driven', desc: 'Governed by the community, built for Filipinos' },
            ].map((feature, index) => (
              <div 
                key={feature.title}
                className="bg-gradient-to-br from-[#1e1433] to-[#2a1f42] rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-[#3d2d5c] hover:border-[#8b5cf6]/50 transition-all hover:transform hover:scale-105 group animate-fadeInUp"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <feature.icon className="w-8 h-8 sm:w-10 sm:h-10 text-[#8b5cf6] mb-3 sm:mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-sm sm:text-lg font-bold text-white mb-1 sm:mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-xs sm:text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="about" className="py-16 sm:py-24 px-4 sm:px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-[#1e1433] to-[#2a1f42] rounded-2xl sm:rounded-3xl p-6 sm:p-12 border border-[#3d2d5c] relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 bg-[#8b5cf6]/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-48 sm:w-64 h-48 sm:h-64 bg-[#06b6d4]/10 rounded-full blur-3xl"></div>
            
            <div className="text-center relative z-10">
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-[#8b5cf6]/20 border border-[#8b5cf6]/30 rounded-full text-[#a78bfa] text-xs sm:text-sm mb-4 sm:mb-6">
                <RiMedalLine className="w-4 h-4" />
                Maging Bahagi ng Komunidad
              </div>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
                Ready to Grow with Us?
              </h2>
              <p className="text-gray-400 mb-6 sm:mb-10 text-sm sm:text-lg max-w-2xl mx-auto">
                Join MSMEs, students, and cooperatives across the Philippines building a brighter future with COMPASS INU.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <Link 
                  href="/auth/signup" 
                  className="group bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg hover:opacity-90 transition-all shadow-lg shadow-purple-500/40 hover:shadow-purple-500/60 hover:scale-105 flex items-center justify-center gap-2"
                >
                  <RiRocketLine className="w-5 h-5" />
                  Create Free Account
                  <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link 
                  href="/auth/merchant/signup" 
                  className="bg-[#1e1433] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg hover:bg-[#2a1f42] transition-all border border-[#3d2d5c] hover:border-[#06b6d4]/50 flex items-center justify-center gap-2"
                >
                  <BsBuilding className="w-5 h-5" />
                  Register as Merchant
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0a0612] text-gray-400 py-8 sm:py-12 border-t border-[#2d1b4e] relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-8">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 sm:gap-3 mb-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#8b5cf6] via-[#7c3aed] to-[#06b6d4] rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-black text-sm sm:text-lg">C</span>
                </div>
                <span className="text-lg sm:text-xl font-bold text-white">Compass <span className="text-[#f59e0b]">Inu</span></span>
              </div>
              <p className="text-xs sm:text-sm text-gray-500">Empowering Filipinos through blockchain rewards.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Ecosystem</h4>
              <ul className="space-y-2 text-xs sm:text-sm">
                <li><Link href="#features" className="hover:text-[#8b5cf6] transition-colors">Digital Library</Link></li>
                <li><Link href="#features" className="hover:text-[#8b5cf6] transition-colors">Suki Points</Link></li>
                <li><Link href="#features" className="hover:text-[#8b5cf6] transition-colors">Everyday Points</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Para sa Negosyo</h4>
              <ul className="space-y-2 text-xs sm:text-sm">
                <li><Link href="/auth/merchant/signup" className="hover:text-[#06b6d4] transition-colors">MSME Enrollment</Link></li>
                <li><Link href="#" className="hover:text-[#06b6d4] transition-colors">Cooperative Partners</Link></li>
                <li><Link href="#" className="hover:text-[#06b6d4] transition-colors">Barangay Program</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Support</h4>
              <ul className="space-y-2 text-xs sm:text-sm">
                <li><Link href="#" className="hover:text-[#f59e0b] transition-colors">Help Center</Link></li>
                <li><Link href="#" className="hover:text-[#f59e0b] transition-colors">Contact Us</Link></li>
                <li><Link href="#" className="hover:text-[#f59e0b] transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-[#2d1b4e] pt-6 sm:pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-xs sm:text-sm text-center md:text-left">
              © 2026 Compass Inu. All rights reserved.
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xs sm:text-sm text-gray-500">Built with ❤️ for Filipino communities</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
