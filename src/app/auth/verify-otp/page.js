'use client';

import { useState, useRef, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Button from '@/components/ui/Button';
import Alert from '@/components/ui/Alert';

function OTPVerificationContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = searchParams.get('type') || 'user';
  
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [resendTimer, setResendTimer] = useState(60);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const handleChange = (index, value) => {
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    const newOtp = [...otp];
    for (let i = 0; i < pastedData.length; i++) {
      if (/^\d$/.test(pastedData[i])) {
        newOtp[i] = pastedData[i];
      }
    }
    setOtp(newOtp);
  };

  const handleResend = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccess('OTP sent successfully!');
      setResendTimer(60);
    } catch (err) {
      setError('Failed to resend OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    const otpString = otp.join('');
    if (otpString.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Simulate OTP verification
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo, accept any 6-digit code
      if (otpString.length === 6) {
        setSuccess('Verification successful!');
        
        // Get pending signup data
        const pendingData = sessionStorage.getItem('pendingSignup');
        
        if (type === 'merchant') {
          // Redirect to pending approval page
          setTimeout(() => router.push('/auth/merchant/pending'), 1500);
        } else {
          // User is now active, redirect to dashboard
          if (pendingData) {
            const userData = JSON.parse(pendingData);
            localStorage.setItem('compass_user', JSON.stringify({
              ...userData,
              isVerified: true,
              status: 'active',
            }));
          }
          setTimeout(() => router.push('/user/dashboard'), 1500);
        }
      } else {
        setError('Invalid OTP. Please try again.');
      }
    } catch (err) {
      setError('Verification failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const bgColor = 'from-[#0f0a1a] via-[#1a0f2e] to-[#2d1b4e]';
  const accentColor = type === 'merchant' ? 'cyan' : 'purple';

  return (
    <div className={`min-h-screen bg-gradient-to-br ${bgColor} flex items-center justify-center p-4`}>
      <div className="bg-gradient-to-br from-[#1e1433] to-[#2d1b4e] rounded-2xl shadow-xl border border-[#3d2b5e] w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className={`w-16 h-16 bg-[#8b5cf6]/20 rounded-full flex items-center justify-center mx-auto mb-4`}>
            <svg className={`w-8 h-8 text-[#8b5cf6]`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white">OTP Verification</h1>
          <p className="text-purple-200 mt-2">
            Enter the 6-digit code sent to your email/phone
          </p>
        </div>

        {error && (
          <Alert type="error" message={error} onClose={() => setError('')} className="mb-6" />
        )}
        
        {success && (
          <Alert type="success" message={success} className="mb-6" />
        )}

        <div className="flex justify-center gap-2 mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              className={`w-12 h-14 text-center text-xl font-bold bg-[#1a0f2e] border-2 border-[#3d2b5e] text-white rounded-lg focus:outline-none focus:border-[#8b5cf6] focus:ring-2 focus:ring-[#8b5cf6]/20 transition-all`}
            />
          ))}
        </div>

        <Button 
          onClick={handleVerify} 
          className="w-full mb-4" 
          variant={type === 'merchant' ? 'secondary' : 'primary'}
          loading={loading}
        >
          Verify OTP
        </Button>

        <div className="text-center">
          {resendTimer > 0 ? (
            <p className="text-purple-300 text-sm">
              Resend code in <span className="font-medium">{resendTimer}s</span>
            </p>
          ) : (
            <button
              onClick={handleResend}
              disabled={loading}
              className={`text-[#8b5cf6] hover:text-[#a78bfa] hover:underline text-sm font-medium`}
            >
              Resend OTP
            </button>
          )}
        </div>

        <p className="text-center text-xs text-purple-300/60 mt-6">
          Demo: Enter any 6-digit code to verify
        </p>
      </div>
    </div>
  );
}

export default function OTPVerification() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-[#0f0a1a] via-[#1a0f2e] to-[#2d1b4e] flex items-center justify-center">
        <div className="animate-pulse text-purple-300">Loading...</div>
      </div>
    }>
      <OTPVerificationContent />
    </Suspense>
  );
}
