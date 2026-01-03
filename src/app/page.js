'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { FiArrowRight, FiCheck, FiUsers, FiStar, FiGift, FiShield, FiTrendingUp, FiZap, FiAward, FiTarget, FiMenu, FiX, FiBook, FiDollarSign, FiGlobe } from 'react-icons/fi';
import { HiOutlineChartBar } from 'react-icons/hi';
import { BsBuilding, BsGraphUp, BsLightningCharge, BsShieldCheck, BsRocketTakeoff } from 'react-icons/bs';
import { RiRocketLine, RiBook2Line, RiCoinLine, RiGlobalLine } from 'react-icons/ri';

// Animated Counter Component with smart formatting
const AnimatedCounter = ({ end, suffix = '', duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let startTime;
          const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            setCount(Math.floor(progress * end));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );
    
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration, hasAnimated]);
  
  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(0) + 'M';
    return num.toLocaleString();
  };
  
  return <span ref={ref}>{formatNumber(count)}{suffix}</span>;
};

// Scroll-triggered animation hook
const useScrollAnimation = (threshold = 0.1) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );
    
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  
  return [ref, isVisible];
};

// Animated Section Wrapper
const AnimatedSection = ({ children, className = '', delay = 0 }) => {
  const [ref, isVisible] = useScrollAnimation();
  
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
        transitionDelay: `${delay}ms`
      }}
    >
      {children}
    </div>
  );
};

// Floating Particles Background
const ParticlesBackground = () => {
  const [particles, setParticles] = useState([]);
  
  useEffect(() => {
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 15 + 10,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.3 + 0.1,
    }));
    setParticles(newParticles);
  }, []);
  
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-gradient-to-br from-[#8b5cf6] to-[#06b6d4]"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
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
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [mobileMenuOpen]);

  // Track active section with Intersection Observer
  useEffect(() => {
    const sections = ['home', 'features', 'roadmap', 'tokenomics', 'about'];
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
        const navHeight = 80;
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top: elementPosition - navHeight, behavior: 'smooth' });
      }
    }
  };

  const navLinks = [
    { name: 'Home', href: '/', sectionId: 'home' },
    { name: 'Features', href: '#features', sectionId: 'features' },
    { name: 'Roadmap', href: '#roadmap', sectionId: 'roadmap' },
    { name: 'Tokenomics', href: '#tokenomics', sectionId: 'tokenomics' },
    { name: 'About', href: '#about', sectionId: 'about' },
  ];

  return (
    <div className="min-h-screen bg-[#0f0a1a] relative overflow-x-hidden">
      <ParticlesBackground />
      
      {/* Global Animated Gradient Blobs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[10%] left-[10%] w-[500px] h-[500px] bg-[#8b5cf6]/15 rounded-full blur-[150px] animate-pulse"></div>
        <div className="absolute top-[30%] right-[5%] w-[400px] h-[400px] bg-[#06b6d4]/12 rounded-full blur-[130px] animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-[60%] left-[20%] w-[350px] h-[350px] bg-[#f59e0b]/8 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-[80%] right-[15%] w-[400px] h-[400px] bg-[#ec4899]/8 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      </div>
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 py-2 sm:py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="relative flex justify-between items-center h-14 sm:h-16 px-4 sm:px-6 rounded-2xl bg-[#1a0f2e]/60 backdrop-blur-xl border border-[#3d2d5c]/40 shadow-lg shadow-purple-500/5">
            {/* Animated border glow */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#8b5cf6]/20 via-transparent to-[#06b6d4]/20 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            
            {/* Logo */}
            <Link href="/" className="relative flex items-center gap-2 sm:gap-3 group z-10">
              <div className="relative flex items-center">
                <img 
                  src="https://images.pump.fun/coin-image/AEwvZ4Lpzt5rx4G9q4bntR2t6L7KLHvwY4kArFfWpump?variant=600x600&ipfs=bafkreihvqburnirltnnuxnzsj7svzulyhsy323q3om2yqzn6phrk7cbnqe&src=https%3A%2F%2Fipfs.io%2Fipfs%2Fbafkreihvqburnirltnnuxnzsj7svzulyhsy323q3om2yqzn6phrk7cbnqe" 
                  alt="Compass Inu Logo" 
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl shadow-lg shadow-purple-500/30 group-hover:shadow-purple-500/50 transition-shadow"
                />
                <div className="ml-2 sm:ml-3">
                  <span className="text-lg sm:text-xl font-black text-white">Compass</span>
                  <span className="text-lg sm:text-xl font-black text-[#f59e0b] ml-1">Inu</span>
                </div>
              </div>
            </Link>

            {/* Nav Links - Center (Desktop only) */}
            <div className="hidden lg:flex items-center absolute left-1/2 -translate-x-1/2">
              <div className="flex items-center gap-1">
                {navLinks.map((link) => {
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
                {navLinks.map((link) => {
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
      <section data-section="home" id="home" className="relative pt-28 sm:pt-36 pb-16 sm:pb-24 px-4 sm:px-6 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto relative z-10 w-full">
          <div className="text-center max-w-4xl mx-auto">
            <AnimatedSection delay={100}>
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white mb-6 leading-tight tracking-tight">
                Empowering
                <br />
                <span className="bg-gradient-to-r from-[#8b5cf6] via-[#ec4899] to-[#06b6d4] bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                  Global Growth
                </span>
              </h1>
            </AnimatedSection>
            
            <AnimatedSection delay={200}>
              <p className="text-base sm:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                Turn everyday actions into real rewards. Support local merchants, learn valuable skills, 
                and build your credit reputation—all with one interoperable token.
              </p>
            </AnimatedSection>
            
            <AnimatedSection delay={300}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/auth/signup" 
                  className="group relative bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all shadow-xl shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-105 inline-flex items-center justify-center gap-3 overflow-hidden"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
                  <RiRocketLine className="w-5 h-5" />
                  <span className="relative">Start Earning Now</span>
                  <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link 
                  href="/auth/login" 
                  className="group bg-[#1e1433]/80 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-[#2a1f42] transition-all border border-[#3d2d5c] hover:border-[#8b5cf6]/50 flex items-center justify-center gap-3"
                >
                  <FiUsers className="w-5 h-5" />
                  <span>Sign In</span>
                </Link>
              </div>
            </AnimatedSection>
          </div>

          {/* Stats Row */}
          <div className="mt-16 sm:mt-24 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto">
            {[
              { value: 1000000, suffix: '+', label: 'MSMEs Globally', icon: BsBuilding, color: 'cyan' },
              { value: 20000000, suffix: '+', label: 'Students', icon: FiUsers, color: 'purple' },
              { value: 70000000, suffix: '+', label: 'E-wallet Users', icon: FiStar, color: 'orange' },
              { value: 200, suffix: 'B+', label: 'Credit Gap ($)', icon: FiTrendingUp, color: 'pink' },
            ].map((stat, index) => (
              <AnimatedSection key={stat.label} delay={400 + index * 100}>
                <div className="group relative text-center p-6 sm:p-8 bg-[#1e1433]/60 backdrop-blur-sm rounded-2xl border border-[#3d2d5c]/50 hover:border-[#8b5cf6]/50 transition-all duration-500 hover:scale-105 overflow-hidden">
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${
                    stat.color === 'purple' ? 'from-[#8b5cf6]/10' : 
                    stat.color === 'cyan' ? 'from-[#06b6d4]/10' : 
                    stat.color === 'orange' ? 'from-[#f59e0b]/10' : 
                    'from-[#ec4899]/10'
                  } to-transparent`}></div>
                  
                  <stat.icon className={`relative w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-4 ${
                    stat.color === 'purple' ? 'text-[#8b5cf6]' : 
                    stat.color === 'cyan' ? 'text-[#06b6d4]' : 
                    stat.color === 'orange' ? 'text-[#f59e0b]' : 
                    'text-[#ec4899]'
                  } group-hover:scale-110 transition-transform duration-300`} />
                  <div className="relative text-2xl sm:text-4xl font-black text-white mb-2">
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="relative text-sm text-gray-500">{stat.label}</div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden sm:block">
          <div className="w-6 h-10 rounded-full border-2 border-[#3d2d5c] flex justify-center pt-2">
            <div className="w-1 h-3 bg-[#8b5cf6] rounded-full animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 sm:py-32 px-4 sm:px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl font-black text-white mb-4">
              One Token, Three Ecosystems
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              COMPASS INU unifies learning, purchasing, and borrowing into one interoperable rewards ecosystem.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            {/* Digital Library Card */}
            <AnimatedSection delay={100}>
              <div className="group h-full bg-gradient-to-br from-[#1e1433] to-[#2a1f42]/50 rounded-3xl p-8 border border-[#3d2d5c]/50 hover:border-[#8b5cf6]/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/10">
                <div className="w-16 h-16 bg-gradient-to-br from-[#8b5cf6] to-[#7c3aed] rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-purple-500/30 group-hover:scale-110 transition-transform">
                  <FiUsers className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Digital Library</h3>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  Earn rewards for reading, learning, and creating quality content. A Web3 knowledge hub for content creators.
                </p>
                <ul className="space-y-3 mb-6">
                  {['Reader engagement rewards', 'Author attention rewards', 'Curated learning tracks'].map((item, i) => (
                    <li key={i} className="flex items-center text-gray-300">
                      <div className="w-5 h-5 rounded-full bg-[#8b5cf6]/20 flex items-center justify-center mr-3">
                        <FiCheck className="w-3 h-3 text-[#8b5cf6]" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link 
                  href="/auth/signup" 
                  className="inline-flex items-center text-[#8b5cf6] font-semibold group-hover:text-[#a78bfa] transition-colors"
                >
                  Start Learning
                  <FiArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </AnimatedSection>

            {/* Suki Points Card */}
            <AnimatedSection delay={200}>
              <div className="group h-full bg-gradient-to-br from-[#1e1433] to-[#2a1f42]/50 rounded-3xl p-8 border border-[#3d2d5c]/50 hover:border-[#06b6d4]/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-cyan-500/10">
                <div className="w-16 h-16 bg-gradient-to-br from-[#06b6d4] to-[#0891b2] rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-cyan-500/30 group-hover:scale-110 transition-transform">
                  <BsBuilding className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Suki Points</h3>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  Affordable loyalty for MSMEs. Self-serve signup, on-chain integrity, and real-world redemptions.
                </p>
                <ul className="space-y-3 mb-6">
                  {['Go live in a day', 'No lost or double-spent points', 'Gift points to family (OFW-style)'].map((item, i) => (
                    <li key={i} className="flex items-center text-gray-300">
                      <div className="w-5 h-5 rounded-full bg-[#06b6d4]/20 flex items-center justify-center mr-3">
                        <FiCheck className="w-3 h-3 text-[#06b6d4]" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link 
                  href="/auth/merchant/signup" 
                  className="inline-flex items-center text-[#06b6d4] font-semibold group-hover:text-[#22d3ee] transition-colors"
                >
                  Register Your Business
                  <FiArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </AnimatedSection>

            {/* Everyday Points Card */}
            <AnimatedSection delay={300}>
              <div className="group h-full bg-gradient-to-br from-[#1e1433] to-[#2a1f42]/50 rounded-3xl p-8 border border-[#3d2d5c]/50 hover:border-[#f59e0b]/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-orange-500/10">
                <div className="w-16 h-16 bg-gradient-to-br from-[#f59e0b] to-[#d97706] rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-orange-500/30 group-hover:scale-110 transition-transform">
                  <BsShieldCheck className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Everyday Points</h3>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  Responsible lending rewards. Earn points for on-time repayments and build your credit reputation.
                </p>
                <ul className="space-y-3 mb-6">
                  {['Bi-weekly reward accrual', 'Token-backed credit profile', 'Unlock better loan offers'].map((item, i) => (
                    <li key={i} className="flex items-center text-gray-300">
                      <div className="w-5 h-5 rounded-full bg-[#f59e0b]/20 flex items-center justify-center mr-3">
                        <FiCheck className="w-3 h-3 text-[#f59e0b]" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link 
                  href="/auth/login" 
                  className="inline-flex items-center text-[#f59e0b] font-semibold group-hover:text-[#fbbf24] transition-colors"
                >
                  Learn More
                  <FiArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 sm:py-32 px-4 sm:px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl font-black text-white mb-4">How It Works</h2>
            <p className="text-gray-400 text-lg">Get started in just three simple steps</p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connection line - hidden on mobile */}
            <div className="hidden md:block absolute top-24 left-[20%] right-[20%] h-1 bg-gradient-to-r from-[#8b5cf6] via-[#06b6d4] to-[#f59e0b] rounded-full opacity-30"></div>
            
            {[
              { step: 1, title: 'Create Account', desc: 'Sign up in seconds with email, Google, or phone number', icon: FiUsers, color: 'purple', gradient: 'from-[#8b5cf6] to-[#7c3aed]' },
              { step: 2, title: 'Earn Points', desc: 'Shop at participating merchants and collect points automatically', icon: FiStar, color: 'cyan', gradient: 'from-[#06b6d4] to-[#0891b2]' },
              { step: 3, title: 'Redeem Rewards', desc: 'Exchange your points for amazing discounts and exclusive offers', icon: FiGift, color: 'orange', gradient: 'from-[#f59e0b] to-[#d97706]' },
            ].map((item, index) => (
              <AnimatedSection key={item.step} delay={index * 150}>
                <div className="relative text-center">
                  <div className={`absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold z-20 bg-gradient-to-r ${item.gradient} text-white shadow-lg`}>
                    {item.step}
                  </div>
                  
                  <div className={`relative w-24 h-24 mx-auto mb-6 rounded-2xl flex items-center justify-center shadow-xl z-10 transition-all duration-500 hover:scale-110 bg-gradient-to-br ${item.gradient}`} style={{ boxShadow: item.color === 'purple' ? '0 20px 40px rgba(139, 92, 246, 0.3)' : item.color === 'cyan' ? '0 20px 40px rgba(6, 182, 212, 0.3)' : '0 20px 40px rgba(245, 158, 11, 0.3)' }}>
                    <item.icon className="w-10 h-10 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-gray-400 max-w-xs mx-auto">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 sm:py-32 px-4 sm:px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">Built for Global Communities</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Simplicity • Community • Transparency • Practicality • Education</p>
          </AnimatedSection>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { icon: BsLightningCharge, title: 'Mobile-First', desc: 'Designed for modern payment systems and digital wallets', color: '#8b5cf6' },
              { icon: FiShield, title: 'On-Chain Integrity', desc: 'No lost or double-spent points—transparent ledger', color: '#06b6d4' },
              { icon: HiOutlineChartBar, title: 'Real-World Value', desc: 'Convert points to tangible goods and services', color: '#f59e0b' },
              { icon: FiAward, title: 'Community-Driven', desc: 'Governed by the community, built for everyone', color: '#ec4899' },
            ].map((feature, index) => (
              <AnimatedSection key={feature.title} delay={index * 100}>
                <div className="group bg-gradient-to-br from-[#1e1433] to-[#2a1f42]/50 rounded-2xl p-6 border border-[#3d2d5c]/50 hover:border-[#8b5cf6]/30 transition-all duration-500 hover:scale-105 h-full">
                  <feature.icon className="w-10 h-10 mb-4 group-hover:scale-110 transition-transform" style={{ color: feature.color }} />
                  <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm">{feature.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap Section - Redesigned */}
      <section id="roadmap" className="py-20 sm:py-32 px-4 sm:px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl font-black text-white mb-4">Roadmap</h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">Building the future of financial empowerment, one milestone at a time.</p>
          </AnimatedSection>

          {/* Horizontal Timeline for Desktop */}
          <div className="hidden lg:block relative mb-16">
            {/* Progress Line */}
            <div className="absolute top-[60px] left-0 right-0 h-1 bg-[#1e1433] rounded-full">
              <div className="h-full w-[6%] bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] rounded-full animate-pulse"></div>
            </div>
            
            {/* Timeline Points */}
            <div className="flex justify-between relative">
              {[
                { quarter: 'Q1 2026', title: 'Foundation', status: 'in-progress', color: '#8b5cf6', Icon: BsRocketTakeoff, progress: 25 },
                { quarter: 'Q2 2026', title: 'Digital Library', status: 'upcoming', color: '#06b6d4', Icon: RiBook2Line, progress: 0 },
                { quarter: 'Q3 2026', title: 'Everyday Points', status: 'upcoming', color: '#f59e0b', Icon: RiCoinLine, progress: 0 },
                { quarter: 'Q4 2026', title: 'Ecosystem Expansion', status: 'upcoming', color: '#ec4899', Icon: RiGlobalLine, progress: 0 },
              ].map((phase, index) => (
                <AnimatedSection key={phase.quarter} delay={index * 100} className="flex-1 text-center">
                  <div className="relative inline-flex flex-col items-center">
                    {/* Glowing Dot */}
                    <div 
                      className={`w-10 h-10 rounded-full flex items-center justify-center z-10 transition-all duration-500 ${
                        phase.status === 'in-progress' 
                          ? 'animate-pulse shadow-lg' 
                          : phase.status === 'completed'
                          ? 'shadow-lg'
                          : 'opacity-50'
                      }`}
                      style={{ 
                        backgroundColor: phase.status !== 'upcoming' ? phase.color : '#1e1433',
                        boxShadow: phase.status === 'in-progress' ? `0 0 30px ${phase.color}` : 'none',
                        border: phase.status === 'upcoming' ? `2px solid ${phase.color}40` : 'none'
                      }}
                    >
                      <phase.Icon className={`w-5 h-5 ${phase.status === 'upcoming' ? 'text-gray-500' : 'text-white'}`} />
                    </div>
                    
                    {/* Quarter Label */}
                    <div className="mt-4 mb-2">
                      <span className={`text-sm font-bold ${phase.status === 'in-progress' ? 'text-white' : 'text-gray-500'}`}>
                        {phase.quarter}
                      </span>
                    </div>
                    
                    {/* Status Badge */}
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold mb-4 ${
                      phase.status === 'completed' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                      phase.status === 'in-progress' ? 'bg-[#8b5cf6]/20 text-[#a78bfa] border border-[#8b5cf6]/30 animate-pulse' :
                      'bg-gray-500/10 text-gray-500 border border-gray-500/20'
                    }`}>
                      {phase.status === 'completed' ? '✓ Done' : phase.status === 'in-progress' ? '◎ Building' : '○ Soon'}
                    </span>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>

          {/* Roadmap Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                quarter: 'Q1 2026', 
                title: 'Foundation', 
                status: 'in-progress', 
                color: '#8b5cf6', 
                gradient: 'from-[#8b5cf6] to-[#7c3aed]',
                Icon: BsRocketTakeoff,
                items: [
                  { text: 'Platform development', done: true },
                  { text: 'UI/UX testing', done: true },
                  { text: 'Suki Points ecosystem', done: false },
                  { text: 'MSME onboarding', done: false },
                ],
                progress: 25
              },
              { 
                quarter: 'Q2 2026', 
                title: 'Digital Library', 
                status: 'upcoming', 
                color: '#06b6d4',
                gradient: 'from-[#06b6d4] to-[#0891b2]',
                Icon: RiBook2Line,
                items: [
                  { text: 'Web3 knowledge hub', done: false },
                  { text: 'Reader engagement rewards', done: false },
                  { text: 'Author attention system', done: false },
                  { text: 'Taglish Web3 Dictionary', done: false },
                ],
                progress: 0
              },
              { 
                quarter: 'Q3 2026', 
                title: 'Everyday Points', 
                status: 'upcoming', 
                color: '#f59e0b',
                gradient: 'from-[#f59e0b] to-[#d97706]',
                Icon: RiCoinLine,
                items: [
                  { text: 'Lending partner integrations', done: false },
                  { text: 'Credit profile system', done: false },
                  { text: 'Repayment rewards', done: false },
                  { text: 'Proof certificates', done: false },
                ],
                progress: 0
              },
              { 
                quarter: 'Q4 2026', 
                title: 'Ecosystem Expansion', 
                status: 'upcoming', 
                color: '#ec4899',
                gradient: 'from-[#ec4899] to-[#db2777]',
                Icon: RiGlobalLine,
                items: [
                  { text: 'Roblox integration', done: false },
                  { text: 'Multi-chain support', done: false },
                  { text: 'Community governance', done: false },
                  { text: 'Token utility expansion', done: false },
                ],
                progress: 0
              },
            ].map((phase, index) => (
              <AnimatedSection key={phase.quarter} delay={index * 100}>
                <div className={`group relative h-full rounded-2xl p-6 border transition-all duration-500 hover:scale-[1.02] overflow-hidden ${
                  phase.status === 'in-progress' 
                    ? 'bg-gradient-to-br from-[#1e1433] to-[#2a1f42] border-[#8b5cf6]/50 shadow-xl shadow-purple-500/10' 
                    : 'bg-[#1e1433]/50 border-[#3d2d5c]/30 hover:border-[#3d2d5c]/60'
                }`}>
                  {/* Glow Effect for In Progress */}
                  {phase.status === 'in-progress' && (
                    <div className="absolute inset-0 bg-gradient-to-br from-[#8b5cf6]/10 to-transparent pointer-events-none"></div>
                  )}
                  
                  {/* Header */}
                  <div className="relative flex items-start justify-between mb-4">
                    <div>
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 ${
                        phase.status === 'in-progress' 
                          ? `bg-gradient-to-br ${phase.gradient} shadow-lg`
                          : 'bg-[#0f0a1a]/50 border border-[#3d2d5c]/50'
                      }`} style={{ boxShadow: phase.status === 'in-progress' ? `0 10px 30px ${phase.color}30` : 'none' }}>
                        <phase.Icon className={`w-6 h-6 ${phase.status === 'in-progress' ? 'text-white' : 'text-gray-500'}`} />
                      </div>
                      <span className={`text-xs font-bold ${phase.status === 'in-progress' ? 'text-[#a78bfa]' : 'text-gray-500'}`}>
                        {phase.quarter}
                      </span>
                      <h3 className={`text-lg font-bold ${phase.status === 'in-progress' ? 'text-white' : 'text-gray-400'}`}>
                        {phase.title}
                      </h3>
                    </div>
                    
                    {/* Status */}
                    <span className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
                      phase.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                      phase.status === 'in-progress' ? 'bg-[#8b5cf6]/20 text-[#a78bfa]' :
                      'bg-gray-500/10 text-gray-600'
                    }`}>
                      {phase.status === 'completed' ? 'Done' : phase.status === 'in-progress' ? 'Live' : 'Soon'}
                    </span>
                  </div>
                  
                  {/* Progress Bar for In Progress */}
                  {phase.status === 'in-progress' && (
                    <div className="relative mb-4">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-400">Progress</span>
                        <span className="text-[#a78bfa] font-bold">{phase.progress}%</span>
                      </div>
                      <div className="h-2 bg-[#0f0a1a] rounded-full overflow-hidden">
                        <div 
                          className={`h-full bg-gradient-to-r ${phase.gradient} rounded-full transition-all duration-1000`}
                          style={{ width: `${phase.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                  
                  {/* Items List */}
                  <ul className="relative space-y-2">
                    {phase.items.map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                          item.done 
                            ? `bg-gradient-to-br ${phase.gradient}` 
                            : phase.status === 'in-progress'
                            ? 'bg-[#0f0a1a] border border-[#3d2d5c]'
                            : 'bg-[#0f0a1a]/50 border border-[#3d2d5c]/30'
                        }`}>
                          {item.done ? (
                            <FiCheck className="w-3 h-3 text-white" />
                          ) : (
                            <div className={`w-1.5 h-1.5 rounded-full ${phase.status === 'in-progress' ? 'bg-gray-500' : 'bg-gray-700'}`}></div>
                          )}
                        </div>
                        <span className={`${
                          item.done 
                            ? 'text-white' 
                            : phase.status === 'in-progress'
                            ? 'text-gray-400'
                            : 'text-gray-600'
                        }`}>
                          {item.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Tokenomics Section */}
      <section id="tokenomics" className="py-20 sm:py-32 px-4 sm:px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl font-black text-white mb-4">Tokenomics</h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">Built with fairness and sustainability at its core.</p>
          </AnimatedSection>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Supply Info */}
            <AnimatedSection delay={100}>
              <div className="bg-gradient-to-br from-[#1e1433] to-[#2a1f42]/50 rounded-3xl p-8 border border-[#3d2d5c]/50 h-full">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <BsGraphUp className="text-[#f59e0b]" />
                  Supply Policy
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-[#0f0a1a]/50 rounded-xl border border-[#3d2d5c]/30">
                    <span className="text-gray-400">Total Supply</span>
                    <span className="text-2xl font-black text-white">500,000,000</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-[#0f0a1a]/50 rounded-xl border border-[#3d2d5c]/30">
                    <span className="text-gray-400">Initial Circulating</span>
                    <span className="text-xl font-bold text-[#06b6d4]">~15%</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-[#0f0a1a]/50 rounded-xl border border-[#3d2d5c]/30">
                    <span className="text-gray-400">Vesting Period</span>
                    <span className="text-xl font-bold text-[#8b5cf6]">6-16 months</span>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-[#3d2d5c]/50">
                  <h4 className="text-lg font-semibold text-white mb-6">Token Allocation</h4>
                  <div className="space-y-4">
                    {[
                      { label: 'Community Rewards', percent: 40, color: '#8b5cf6' },
                      { label: 'Treasury', percent: 25, color: '#06b6d4' },
                      { label: 'Team & Builders', percent: 20, color: '#f59e0b' },
                      { label: 'Liquidity', percent: 15, color: '#ec4899' },
                    ].map((item) => (
                      <div key={item.label}>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-400">{item.label}</span>
                          <span className="text-white font-semibold">{item.percent}%</span>
                        </div>
                        <div className="h-3 bg-[#3d2d5c]/30 rounded-full overflow-hidden">
                          <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${item.percent}%`, backgroundColor: item.color }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Disclaimer & Airdrops */}
            <div className="space-y-6">
              <AnimatedSection delay={200}>
                <div className="bg-gradient-to-br from-[#1e1433] to-[#2a1f42]/50 rounded-3xl p-8 border border-[#3d2d5c]/50">
                  <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <FiShield className="text-[#06b6d4]" />
                    Important Notice
                  </h3>
                  <div className="bg-[#f59e0b]/10 border border-[#f59e0b]/30 rounded-2xl p-5 mb-6">
                    <p className="text-[#fbbf24] font-semibold mb-2 text-lg">⚠️ No ROI / Profit Claims</p>
                    <p className="text-gray-400">COMPASS INU is a utility token designed for rewards and ecosystem participation. It is NOT an investment product and makes no promises of financial returns.</p>
                  </div>
                  <ul className="space-y-3">
                    {[
                      'Points are earned through genuine activity',
                      'No purchase required to participate',
                      'All transactions are on-chain for transparency',
                      'Community-governed treasury management',
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-400">
                        <FiCheck className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={300}>
                <div className="bg-gradient-to-br from-[#1e1433] to-[#2a1f42]/50 rounded-3xl p-8 border border-[#3d2d5c]/50">
                  <h4 className="text-xl font-bold text-white mb-4">Quarterly Airdrops</h4>
                  <p className="text-gray-400 mb-6">Top 500 wallets receive quarterly token distributions based on ecosystem activity.</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-[#0f0a1a]/50 rounded-2xl border border-[#8b5cf6]/20">
                      <p className="text-3xl font-black text-[#8b5cf6]">Top 100</p>
                      <p className="text-sm text-gray-500">5,000 COMPASS</p>
                    </div>
                    <div className="text-center p-4 bg-[#0f0a1a]/50 rounded-2xl border border-[#06b6d4]/20">
                      <p className="text-3xl font-black text-[#06b6d4]">Top 500</p>
                      <p className="text-sm text-gray-500">2,500 COMPASS</p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="about" className="py-20 sm:py-32 px-4 sm:px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <div className="bg-gradient-to-br from-[#1e1433] to-[#2a1f42]/50 rounded-3xl p-8 sm:p-12 border border-[#3d2d5c]/50 relative overflow-hidden">
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#8b5cf6]/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#06b6d4]/10 rounded-full blur-3xl"></div>
              
              <div className="text-center relative z-10">
                <h2 className="text-3xl sm:text-5xl font-black text-white mb-6">
                  Ready to Grow with Us?
                </h2>
                <p className="text-gray-400 mb-10 text-lg max-w-2xl mx-auto">
                  Join MSMEs, students, and cooperatives worldwide building a brighter future with COMPASS INU.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link 
                    href="/auth/signup" 
                    className="group bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all shadow-xl shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-105 flex items-center justify-center gap-3"
                  >
                    <RiRocketLine className="w-5 h-5" />
                    Create Free Account
                    <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link 
                    href="/auth/merchant/signup" 
                    className="bg-[#1e1433]/80 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-[#2a1f42] transition-all border border-[#3d2d5c] hover:border-[#06b6d4]/50 flex items-center justify-center gap-3"
                  >
                    <BsBuilding className="w-5 h-5" />
                    Register as Merchant
                  </Link>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0a0612] text-gray-400 py-12 border-t border-[#2d1b4e]/50 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-[#8b5cf6] via-[#7c3aed] to-[#06b6d4] rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-black text-lg">C</span>
                </div>
                <span className="text-xl font-bold text-white">Compass <span className="text-[#f59e0b]">Inu</span></span>
              </div>
              <p className="text-sm text-gray-500">Empowering communities through blockchain rewards.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Ecosystem</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#features" className="hover:text-[#8b5cf6] transition-colors">Digital Library</a></li>
                <li><a href="#features" className="hover:text-[#8b5cf6] transition-colors">Suki Points</a></li>
                <li><a href="#features" className="hover:text-[#8b5cf6] transition-colors">Everyday Points</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">For Business</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/auth/merchant/signup" className="hover:text-[#06b6d4] transition-colors">MSME Enrollment</Link></li>
                <li><a href="#" className="hover:text-[#06b6d4] transition-colors">Cooperative Partners</a></li>
                <li><a href="#" className="hover:text-[#06b6d4] transition-colors">Community Program</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-[#f59e0b] transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-[#f59e0b] transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-[#f59e0b] transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-[#2d1b4e]/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm">© 2026 Compass Inu. All rights reserved.</div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">Built with ❤️ for global communities</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
