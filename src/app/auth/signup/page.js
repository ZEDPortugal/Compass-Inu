'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Alert from '@/components/ui/Alert';
import { CustomGoogleButton } from '@/components/ui/GoogleSignIn';
import PhoneInput from '@/components/ui/PhoneInput';
import { useAuth } from '@/context/AuthContext';
import { FiUser, FiMail, FiLock, FiPhone, FiArrowRight, FiCheck, FiGift, FiStar, FiAward, FiSmartphone } from 'react-icons/fi';

export default function UserSignUp() {
  const router = useRouter();
  const { loginWithGoogle, sendOTP, verifyOTP } = useAuth();
  const [authMethod, setAuthMethod] = useState('email'); // 'email', 'phone', 'google'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (!agreedToTerms) {
      setError('Please agree to the terms and conditions');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          type: 'user',
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Signup failed');
      }

      // Store temp data for OTP verification
      sessionStorage.setItem('pendingSignup', JSON.stringify({
        ...formData,
        role: 'user',
      }));
      router.push('/auth/verify-otp?type=user');
    } catch (err) {
      setError(err.message || 'Failed to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setGoogleLoading(true);
    setError('');

    try {
      // For demo, simulate Google auth
      const mockCredential = 'mock_google_credential';
      const result = await loginWithGoogle(mockCredential);
      
      if (result.isNewUser) {
        router.push('/user/dashboard?welcome=true');
      } else {
        router.push('/user/dashboard');
      }
    } catch (err) {
      setError(err.message || 'Google sign-up failed. Please try again.');
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
      router.push('/user/dashboard?welcome=true');
    }
  };

  const benefits = [
    { icon: FiGift, text: 'Earn points on every purchase', color: '#f59e0b' },
    { icon: FiStar, text: 'Exclusive member rewards', color: '#8b5cf6' },
    { icon: FiAward, text: 'Special birthday bonuses', color: '#06b6d4' },
  ];

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
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-[#8b5cf6]/20 via-transparent to-transparent rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#06b6d4]/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-[#f59e0b]/5 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        
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
              Start earning
              <span className="block bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] bg-clip-text text-transparent">
                rewards today
              </span>
            </h1>
            <p className="text-gray-400 text-lg max-w-md">
              Join thousands of users already earning points and unlocking exclusive rewards at their favorite stores.
            </p>
          </div>
          
          {/* Benefits */}
          <div className="space-y-4">
            {benefits.map((benefit, i) => (
              <div key={i} className="flex items-center gap-3 text-gray-300">
                <div className="w-10 h-10 rounded-xl bg-[#1e1433] flex items-center justify-center">
                  <benefit.icon className="w-5 h-5" style={{ color: benefit.color }} />
                </div>
                <span>{benefit.text}</span>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="flex gap-8 pt-4">
            {[
              { value: '10K+', label: 'Active Users' },
              { value: '500+', label: 'Partner Stores' },
              { value: '$2M+', label: 'Rewards Given' },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
        
        <p className="text-gray-500 text-sm">
          © 2026 Compass Inu. All rights reserved.
        </p>
      </div>

      {/* Right Panel - Signup Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 relative z-10">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <Link href="/" className="inline-flex items-center justify-center">
              <span className="text-2xl font-black text-white">Compass</span>
              <span className="text-2xl font-black text-[#f59e0b] ml-1">Inu</span>
            </Link>
          </div>

          <div className="bg-[#1e1433]/80 backdrop-blur-xl border border-[#3d2d5c]/50 rounded-3xl shadow-2xl p-8 animate-[fadeInUp_0.6s_ease-out] hover:shadow-[0_0_60px_rgba(139,92,246,0.15)] transition-all duration-500 hover:scale-[1.02]">
            {/* Header */}
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#8b5cf6] to-[#7c3aed] flex items-center justify-center shadow-lg">
                <FiUser className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">Create Account</h2>
              <p className="text-gray-400 mt-1">Join the rewards revolution</p>
            </div>

            {error && (
              <Alert type="error" message={error} onClose={() => setError('')} className="mb-6" />
            )}

            {/* Google Sign Up */}
            <div className="mb-6">
              <CustomGoogleButton 
                onClick={handleGoogleSignUp}
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

            {authMethod === 'phone' ? (
              <PhoneInput
                onSendOTP={handlePhoneSendOTP}
                onVerifyOTP={handlePhoneVerifyOTP}
                error={error}
              />
            ) : (
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                    <FiUser className="w-4 h-4" />
                    Full Name
                  </label>
                  <input
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                    className="w-full px-4 py-3 bg-[#0f0a1a]/80 border border-[#3d2d5c]/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#8b5cf6] focus:ring-1 focus:ring-[#8b5cf6] transition-all"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                    <FiMail className="w-4 h-4" />
                    Email Address
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                    className="w-full px-4 py-3 bg-[#0f0a1a]/80 border border-[#3d2d5c]/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#8b5cf6] focus:ring-1 focus:ring-[#8b5cf6] transition-all"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                    <FiPhone className="w-4 h-4" />
                    Phone Number <span className="text-gray-500 text-xs">(Optional)</span>
                  </label>
                  <input
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1234567890"
                    className="w-full px-4 py-3 bg-[#0f0a1a]/80 border border-[#3d2d5c]/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#8b5cf6] focus:ring-1 focus:ring-[#8b5cf6] transition-all"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                      <FiLock className="w-4 h-4" />
                      Password
                    </label>
                    <input
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      minLength={6}
                      required
                      className="w-full px-4 py-3 bg-[#0f0a1a]/80 border border-[#3d2d5c]/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#8b5cf6] focus:ring-1 focus:ring-[#8b5cf6] transition-all"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                      <FiCheck className="w-4 h-4" />
                      Confirm
                    </label>
                    <input
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="••••••••"
                      required
                      className="w-full px-4 py-3 bg-[#0f0a1a]/80 border border-[#3d2d5c]/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#8b5cf6] focus:ring-1 focus:ring-[#8b5cf6] transition-all"
                    />
                  </div>
                </div>

                <label className="flex items-start gap-3 cursor-pointer group p-3 bg-[#0f0a1a]/50 rounded-xl">
                  <input 
                    type="checkbox" 
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="w-4 h-4 mt-0.5 rounded bg-[#0f0a1a] border-[#3d2d5c] text-[#8b5cf6] focus:ring-[#8b5cf6]" 
                  />
                  <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                    I agree to the{' '}
                    <Link href="/terms" className="text-[#8b5cf6] hover:underline">Terms of Service</Link>
                    {' '}and{' '}
                    <Link href="/privacy" className="text-[#8b5cf6] hover:underline">Privacy Policy</Link>
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] hover:opacity-90 transition-all shadow-lg flex items-center justify-center gap-2 group disabled:opacity-50"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating Account...
                    </span>
                  ) : (
                    <>
                      Create Account
                      <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            )}

            <p className="text-center text-gray-400 mt-6">
              Already have an account?{' '}
              <Link href="/auth/login" className="text-[#8b5cf6] hover:text-[#a78bfa] font-medium transition-colors">
                Sign in
              </Link>
            </p>

            <div className="mt-4 pt-4 border-t border-[#3d2d5c]/30">
              <Link 
                href="/auth/merchant/signup"
                className="flex items-center justify-center gap-2 text-sm text-gray-400 hover:text-[#06b6d4] transition-colors"
              >
                <span>Are you a business?</span>
                <span className="text-[#06b6d4] font-medium">Register as Merchant →</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
