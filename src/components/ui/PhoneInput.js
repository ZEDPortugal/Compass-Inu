'use client';

import { useState, useRef, useEffect } from 'react';
import Input from './Input';
import Button from './Button';

export default function PhoneInput({ 
  onSendOTP, 
  onVerifyOTP, 
  loading = false,
  error = '',
  className = '' 
}) {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [step, setStep] = useState('phone'); // 'phone' or 'otp'
  const [countdown, setCountdown] = useState(0);
  const [otpError, setOtpError] = useState('');
  const [sendingOTP, setSendingOTP] = useState(false);
  const [verifyingOTP, setVerifyingOTP] = useState(false);
  
  const otpRefs = useRef([]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleSendOTP = async () => {
    if (!phone || phone.length < 10) {
      setOtpError('Please enter a valid phone number');
      return;
    }

    setSendingOTP(true);
    setOtpError('');

    try {
      await onSendOTP(phone);
      setStep('otp');
      setCountdown(60);
      // Focus first OTP input
      setTimeout(() => otpRefs.current[0]?.focus(), 100);
    } catch (err) {
      setOtpError(err.message || 'Failed to send OTP');
    } finally {
      setSendingOTP(false);
    }
  };

  const handleOTPChange = (index, value) => {
    if (value.length > 1) {
      // Handle paste
      const digits = value.replace(/\D/g, '').slice(0, 6);
      const newOtp = [...otp];
      digits.split('').forEach((digit, i) => {
        if (index + i < 6) {
          newOtp[index + i] = digit;
        }
      });
      setOtp(newOtp);
      const lastIndex = Math.min(index + digits.length, 5);
      otpRefs.current[lastIndex]?.focus();
      return;
    }

    const digit = value.replace(/\D/g, '');
    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);

    // Auto-focus next input
    if (digit && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOTPKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOTP = async () => {
    const otpString = otp.join('');
    if (otpString.length !== 6) {
      setOtpError('Please enter the complete 6-digit OTP');
      return;
    }

    setVerifyingOTP(true);
    setOtpError('');

    try {
      await onVerifyOTP(phone, otpString);
    } catch (err) {
      setOtpError(err.message || 'Invalid OTP');
      setOtp(['', '', '', '', '', '']);
      otpRefs.current[0]?.focus();
    } finally {
      setVerifyingOTP(false);
    }
  };

  const handleResendOTP = async () => {
    if (countdown > 0) return;
    
    setSendingOTP(true);
    setOtpError('');

    try {
      await onSendOTP(phone);
      setCountdown(60);
      setOtp(['', '', '', '', '', '']);
    } catch (err) {
      setOtpError(err.message || 'Failed to resend OTP');
    } finally {
      setSendingOTP(false);
    }
  };

  const handleBackToPhone = () => {
    setStep('phone');
    setOtp(['', '', '', '', '', '']);
    setOtpError('');
  };

  return (
    <div className={className}>
      {step === 'phone' ? (
        <div className="space-y-4">
          <Input
            label="Phone Number"
            type="tel"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              setOtpError('');
            }}
            placeholder="+1 234 567 8900"
            error={otpError || error}
          />
          <Button 
            onClick={handleSendOTP} 
            loading={sendingOTP || loading}
            className="w-full"
          >
            Send OTP
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="text-center">
            <p className="text-sm text-gray-400 mb-2">
              Enter the 6-digit code sent to
            </p>
            <p className="font-medium text-white">
              {phone.replace(/(\d{3})\d{4}(\d{3})/, '$1****$2')}
            </p>
            <button 
              onClick={handleBackToPhone}
              className="text-sm text-[#8b5cf6] hover:underline mt-1"
            >
              Change number
            </button>
          </div>

          <div className="flex justify-center gap-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (otpRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={digit}
                onChange={(e) => handleOTPChange(index, e.target.value)}
                onKeyDown={(e) => handleOTPKeyDown(index, e)}
                className="w-12 h-14 text-center text-xl font-semibold border border-[#3d2d5c] bg-[#0f0a1a] text-white rounded-lg focus:border-[#8b5cf6] focus:ring-2 focus:ring-[#8b5cf6]/30 outline-none transition-all"
              />
            ))}
          </div>

          {otpError && (
            <p className="text-sm text-[#ec4899] text-center">{otpError}</p>
          )}

          <Button 
            onClick={handleVerifyOTP} 
            loading={verifyingOTP}
            className="w-full"
          >
            Verify OTP
          </Button>

          <div className="text-center">
            {countdown > 0 ? (
              <p className="text-sm text-gray-500">
                Resend OTP in {countdown}s
              </p>
            ) : (
              <button 
                onClick={handleResendOTP}
                disabled={sendingOTP}
                className="text-sm text-[#8b5cf6] hover:underline disabled:opacity-50"
              >
                Resend OTP
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
