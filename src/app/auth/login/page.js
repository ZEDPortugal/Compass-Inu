'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Alert from '@/components/ui/Alert';
import { CustomGoogleButton } from '@/components/ui/GoogleSignIn';
import PhoneInput from '@/components/ui/PhoneInput';
import { useAuth } from '@/context/AuthContext';
import { FiMail, FiLock, FiSmartphone, FiArrowRight, FiShield, FiUser, FiUsers, FiStar, FiGift, FiTrendingUp } from 'react-icons/fi';
import { BsBuilding } from 'react-icons/bs';

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultRole = searchParams.get('role') || 'user';
  const { loginWithGoogle, sendOTP, verifyOTP } = useAuth();
  
  const [role, setRole] = useState(defaultRole);
  const [authMethod, setAuthMethod] = useState('email'); // 'email' or 'phone'
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || 'Login failed');
      }
      
      // Create user session
      const userData = {
        ...data.data.user,
        role: data.data.user.role || role,
        points: data.data.user.role === 'user' ? 2500 : 0,
        isVerified: true,
        status: 'active',
      };
      
      localStorage.setItem('compass_user', JSON.stringify(userData));
      localStorage.setItem('compass_token', data.data.token);
      
      // Redirect based on role
      const userRole = userData.role;
      if (userRole === 'admin') {
        router.push('/admin/dashboard');
      } else if (userRole === 'merchant') {
        router.push('/merchant/dashboard');
      } else {
        router.push('/user/dashboard');
      }
    } catch (err) {
      setError(err.message || 'Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    setError('');

    try {
      // For demo, simulate Google auth
      const mockCredential = 'mock_google_credential';
      const result = await loginWithGoogle(mockCredential);
      
      router.push('/user/dashboard');
    } catch (err) {
      setError(err.message || 'Google sign-in failed. Please try again.');
    } finally {
      setGoogleLoading(false);
    }
  };

  const handlePhoneSendOTP = async (phone) => {
    const response = await sendOTP(phone);
    return response;
  };

  const handlePhoneVerifyOTP = async (phone, otp) => {
    const result = await verifyOTP(phone, otp);
    if (result.success) {
      router.push('/user/dashboard');
    }
  };

  const roleConfig = {
    user: { 
      icon: FiUser, 
      color: '#8b5cf6', 
      gradient: 'from-[#8b5cf6] to-[#7c3aed]',
      bgGradient: 'from-[#8b5cf6]/20 via-transparent to-transparent'
    },
    merchant: { 
      icon: BsBuilding, 
      color: '#06b6d4', 
      gradient: 'from-[#06b6d4] to-[#0891b2]',
      bgGradient: 'from-[#06b6d4]/20 via-transparent to-transparent'
    },
    admin: { 
      icon: FiShield, 
      color: '#f59e0b', 
      gradient: 'from-[#f59e0b] to-[#d97706]',
      bgGradient: 'from-[#f59e0b]/20 via-transparent to-transparent'
    },
  };

  const currentConfig = roleConfig[role];
  const RoleIcon = currentConfig.icon;

  // Floating particles for visual effect
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <div className="min-h-screen bg-[#0f0a1a] flex relative overflow-hidden">
      {/* Animated Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className={`absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br ${currentConfig.bgGradient} rounded-full blur-[120px] transition-all duration-700 animate-pulse`}></div>
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#ec4899]/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-[#06b6d4]/5 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `linear-gradient(rgba(139,92,246,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.3) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
        
        {/* Floating Particles */}
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-gradient-to-r from-[#8b5cf6]/30 to-[#06b6d4]/30"
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animation: `float ${particle.duration}s ease-in-out infinite`,
              animationDelay: `${particle.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative z-10 flex-col justify-between p-12 animate-[fadeInLeft_0.8s_ease-out]">
        <div>
          <Link href="/" className="inline-flex items-center group">
            <span className="text-3xl font-black text-white">Compass</span>
            <span className="text-3xl font-black text-[#f59e0b] ml-2">Inu</span>
          </Link>
        </div>
        
        <div className="space-y-8">
          <div>
            <h1 className="text-5xl font-bold text-white mb-4 leading-tight">
              Welcome back to your
              <span className={`block bg-gradient-to-r ${currentConfig.gradient} bg-clip-text text-transparent`}>
                rewards journey
              </span>
            </h1>
            <p className="text-gray-400 text-lg max-w-md">
              Sign in to access your dashboard, track your points, and redeem exclusive rewards.
            </p>
          </div>
          
          {/* Feature highlights */}
          <div className="space-y-4">
            {[
              { icon: FiStar, text: 'Track your reward points', color: '#f59e0b' },
              { icon: FiGift, text: 'Redeem exclusive offers', color: '#8b5cf6' },
              { icon: FiTrendingUp, text: 'View your progress', color: '#06b6d4' },
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3 text-gray-300">
                <div className="w-10 h-10 rounded-xl bg-[#1e1433] flex items-center justify-center">
                  <feature.icon className="w-5 h-5" style={{ color: feature.color }} />
                </div>
                <span>{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
        
        <p className="text-gray-500 text-sm">
          © 2026 Compass Inu. All rights reserved.
        </p>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 relative z-10">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <Link href="/" className="inline-flex items-center justify-center">
              <span className="text-2xl font-black text-white">Compass</span>
              <span className="text-2xl font-black text-[#f59e0b] ml-1">Inu</span>
            </Link>
          </div>

          <div className="bg-[#1e1433]/80 backdrop-blur-xl border border-[#3d2d5c]/50 rounded-3xl shadow-2xl p-8 animate-[fadeInUp_0.6s_ease-out] hover:shadow-[0_0_60px_rgba(139,92,246,0.15)] transition-all duration-500 ease-in-out hover:scale-[1.02]">
            {/* Header */}
            <div className="text-center mb-8 transition-all duration-300">
              <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${currentConfig.gradient} flex items-center justify-center shadow-lg transition-all duration-500`}>
                <RoleIcon className="w-8 h-8 text-white transition-all duration-300" />
              </div>
              <h2 className="text-2xl font-bold text-white">Sign In</h2>
              <p className="text-gray-400 mt-1 transition-all duration-300">Access your {role} account</p>
            </div>

            {/* Role Selector */}
            <div className="flex bg-[#0f0a1a]/80 rounded-2xl p-1.5 mb-6">
              {[
                { id: 'user', label: 'User', icon: FiUser },
                { id: 'merchant', label: 'Merchant', icon: BsBuilding },
                { id: 'admin', label: 'Admin', icon: FiShield },
              ].map((r) => (
                <button
                  key={r.id}
                  onClick={() => {
                    setRole(r.id);
                    setError('');
                  }}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-xl transition-all duration-300 ${
                    role === r.id 
                      ? `bg-gradient-to-r ${roleConfig[r.id].gradient} text-white shadow-lg` 
                      : 'text-gray-400 hover:text-white hover:bg-[#1e1433]'
                  }`}
                >
                  <r.icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{r.label}</span>
                </button>
              ))}
            </div>

            {error && (
              <Alert type="error" message={error} onClose={() => setError('')} className="mb-6" />
            )}

            {/* Google Sign In and Auth Toggle - Animated container */}
            <div className={`grid transition-all duration-500 ease-in-out overflow-hidden ${role !== 'admin' ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
              <div className="overflow-hidden">
                <div className="mb-6">
                  <CustomGoogleButton 
                    onClick={handleGoogleSignIn}
                    loading={googleLoading}
                    text="Continue with Google"
                  />
                </div>

                {/* Auth Method Toggle */}
                <div className="flex bg-[#0f0a1a]/60 rounded-xl p-1 mb-4">
                  <button
                    onClick={() => {
                      setAuthMethod('email');
                      setError('');
                    }}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-lg transition-all ${
                      authMethod === 'email'
                        ? 'bg-[#2d1b4e] text-white'
                        : 'text-gray-400 hover:text-gray-200'
                    }`}
                  >
                    <FiMail className="w-4 h-4" />
                    Email
                  </button>
                  <button
                    onClick={() => {
                      setAuthMethod('phone');
                      setError('');
                    }}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-lg transition-all ${
                      authMethod === 'phone'
                        ? 'bg-[#2d1b4e] text-white'
                        : 'text-gray-400 hover:text-gray-200'
                    }`}
                  >
                    <FiSmartphone className="w-4 h-4" />
                    Phone
                  </button>
                </div>

                <div className="relative mb-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-[#3d2d5c]/50"></div>
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="px-3 bg-[#1e1433] text-gray-500 uppercase tracking-wider">or</span>
                  </div>
                </div>
              </div>
            </div>

            {authMethod === 'phone' && role !== 'admin' ? (
              <PhoneInput
                onSendOTP={handlePhoneSendOTP}
                onVerifyOTP={handlePhoneVerifyOTP}
                error={error}
              />
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                    <FiMail className="w-4 h-4" />
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      required
                      className="w-full px-4 py-3 bg-[#0f0a1a]/80 border border-[#3d2d5c]/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#8b5cf6] focus:ring-1 focus:ring-[#8b5cf6] transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                    <FiLock className="w-4 h-4" />
                    Password
                  </label>
                  <div className="relative">
                    <input
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      required
                      className="w-full px-4 py-3 bg-[#0f0a1a]/80 border border-[#3d2d5c]/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#8b5cf6] focus:ring-1 focus:ring-[#8b5cf6] transition-all"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input type="checkbox" className="w-4 h-4 rounded bg-[#0f0a1a] border-[#3d2d5c] text-[#8b5cf6] focus:ring-[#8b5cf6]" />
                    <span className="text-gray-400 group-hover:text-gray-300 transition-colors">Remember me</span>
                  </label>
                  <Link href="/auth/forgot-password" className="text-[#8b5cf6] hover:text-[#a78bfa] transition-colors">
                    Forgot password?
                  </Link>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r ${currentConfig.gradient} hover:opacity-90 transition-all shadow-lg flex items-center justify-center gap-2 group disabled:opacity-50`}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Signing in...
                    </span>
                  ) : (
                    <>
                      Sign In
                      <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Sign up link - Animated */}
            <div className={`grid transition-all duration-500 ease-in-out overflow-hidden ${role !== 'admin' ? 'grid-rows-[1fr] opacity-100 mt-6' : 'grid-rows-[0fr] opacity-0 mt-0'}`}>
              <div className="overflow-hidden">
                <p className="text-center text-gray-400">
                  Don&apos;t have an account?{' '}
                  <Link 
                    href={role === 'merchant' ? '/auth/merchant/signup' : '/auth/signup'} 
                    className="text-[#8b5cf6] hover:text-[#a78bfa] font-medium transition-colors"
                  >
                    Sign up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Login() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#0f0a1a] flex items-center justify-center">
        <div className="flex items-center gap-3">
          <svg className="animate-spin w-6 h-6 text-[#8b5cf6]" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className="text-white">Loading...</span>
        </div>
      </div>
    }>
      <LoginContent />
    </Suspense>
  );
}
