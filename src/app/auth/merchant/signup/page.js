'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Alert from '@/components/ui/Alert';
import { CustomGoogleButton } from '@/components/ui/GoogleSignIn';
import { useAuth } from '@/context/AuthContext';

export default function MerchantSignUp() {
  const router = useRouter();
  const { loginWithGoogle } = useAuth();
  const [step, setStep] = useState(1);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [formData, setFormData] = useState({
    // Business Details
    businessName: '',
    businessEmail: '',
    businessPhone: '',
    businessCategory: '',
    registrationNumber: '',
    address: '',
    city: '',
    country: '',
    // Contact Person
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    // Account
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleNext = () => {
    if (step === 1) {
      if (!formData.businessName || !formData.businessEmail || !formData.businessCategory) {
        setError('Please fill in all required fields');
        return;
      }
    }
    setError('');
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/merchant/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessName: formData.businessName,
          email: formData.businessEmail,
          phone: formData.businessPhone,
          password: formData.password,
          category: formData.businessCategory,
          address: `${formData.address}, ${formData.city}, ${formData.country}`,
          contactPerson: formData.contactName,
          registrationNumber: formData.registrationNumber,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      // Store temp data for OTP verification
      sessionStorage.setItem('pendingSignup', JSON.stringify({
        ...formData,
        role: 'merchant',
        status: 'pending',
      }));
      router.push('/auth/verify-otp?type=merchant');
    } catch (err) {
      setError(err.message || 'Failed to submit application. Please try again.');
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
      
      // For merchants, redirect to complete profile
      sessionStorage.setItem('googleMerchant', JSON.stringify(result.user));
      setStep(1); // Show form to complete business details
      setFormData({
        ...formData,
        contactName: result.user.name || '',
        contactEmail: result.user.email || '',
      });
      setGoogleLoading(false);
      // Or redirect to pending page
      // router.push('/auth/merchant/pending');
    } catch (err) {
      setError(err.message || 'Google sign-up failed. Please try again.');
      setGoogleLoading(false);
    }
  };

  const categories = [
    'Food & Beverage',
    'Retail',
    'Electronics',
    'Fashion',
    'Health & Fitness',
    'Entertainment',
    'Travel',
    'Education',
    'Services',
    'Other',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0a1a] via-[#0d1f2e] to-[#0f0a1a] flex items-center justify-center p-4">
      <div className="bg-[#1e1433] border border-[#3d2d5c] rounded-2xl shadow-xl w-full max-w-2xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">Merchant Registration</h1>
          <p className="text-gray-400 mt-2">Submit your business details for approval</p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                s <= step ? 'bg-gradient-to-r from-[#06b6d4] to-[#0891b2] text-white' : 'bg-[#2d1b4e] text-gray-400'
              }`}>
                {s}
              </div>
              {s < 3 && (
                <div className={`w-20 h-1 ${s < step ? 'bg-[#06b6d4]' : 'bg-[#2d1b4e]'}`} />
              )}
            </div>
          ))}
        </div>

        {error && (
          <Alert type="error" message={error} onClose={() => setError('')} className="mb-6" />
        )}

        {/* Google Sign Up Option */}
        {step === 1 && (
          <>
            <div className="mb-6">
              <CustomGoogleButton 
                onClick={handleGoogleSignUp}
                loading={googleLoading}
                text="Sign up with Google"
              />
            </div>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#3d2d5c]"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-[#1e1433] text-gray-400">or fill in your details</span>
              </div>
            </div>
          </>
        )}

        <form onSubmit={handleSubmit}>
          {/* Step 1: Business Details */}
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-white mb-4">Business Details</h2>
              
              <Input
                label="Business Name *"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                placeholder="Your Business Name"
                required
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Business Email *"
                  name="businessEmail"
                  type="email"
                  value={formData.businessEmail}
                  onChange={handleChange}
                  placeholder="business@example.com"
                  required
                />
                <Input
                  label="Business Phone"
                  name="businessPhone"
                  type="tel"
                  value={formData.businessPhone}
                  onChange={handleChange}
                  placeholder="+1234567890"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Business Category *</label>
                  <select
                    name="businessCategory"
                    value={formData.businessCategory}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-[#3d2d5c] bg-[#0f0a1a] text-white focus:outline-none focus:ring-2 focus:ring-[#06b6d4]"
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <Input
                  label="Registration Number"
                  name="registrationNumber"
                  value={formData.registrationNumber}
                  onChange={handleChange}
                  placeholder="Business Reg. No."
                />
              </div>

              <Input
                label="Business Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="123 Business Street"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="City"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="City"
                />
                <Input
                  label="Country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  placeholder="Country"
                />
              </div>
            </div>
          )}

          {/* Step 2: Contact Person */}
          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-white mb-4">Contact Person</h2>
              
              <Input
                label="Contact Name *"
                name="contactName"
                value={formData.contactName}
                onChange={handleChange}
                placeholder="Full Name"
                required
              />

              <Input
                label="Contact Email *"
                name="contactEmail"
                type="email"
                value={formData.contactEmail}
                onChange={handleChange}
                placeholder="contact@example.com"
                required
              />

              <Input
                label="Contact Phone *"
                name="contactPhone"
                type="tel"
                value={formData.contactPhone}
                onChange={handleChange}
                placeholder="+1234567890"
                required
              />
            </div>
          )}

          {/* Step 3: Account Setup */}
          {step === 3 && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-white mb-4">Account Setup</h2>
              
              <Input
                label="Password *"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
              />

              <Input
                label="Confirm Password *"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                required
              />

              <div className="bg-[#f59e0b]/10 border border-[#f59e0b]/30 rounded-lg p-4 mt-4">
                <p className="text-sm text-[#fcd34d]">
                  <strong>Note:</strong> Your merchant account will be reviewed by our admin team. 
                  You will receive an email notification once your application is approved.
                </p>
              </div>

              <div className="flex items-center gap-2 text-sm mt-4">
                <input type="checkbox" id="terms" required className="rounded bg-[#0f0a1a] border-[#3d2d5c]" />
                <label htmlFor="terms" className="text-gray-400">
                  I agree to the <Link href="/terms" className="text-[#06b6d4] hover:underline">Terms & Conditions</Link> and{' '}
                  <Link href="/privacy" className="text-[#06b6d4] hover:underline">Privacy Policy</Link>
                </label>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            {step > 1 ? (
              <Button type="button" variant="outline" onClick={handleBack}>
                Back
              </Button>
            ) : (
              <div />
            )}
            
            {step < 3 ? (
              <Button type="button" variant="secondary" onClick={handleNext}>
                Next
              </Button>
            ) : (
              <Button type="submit" variant="secondary" loading={loading}>
                Submit Application
              </Button>
            )}
          </div>
        </form>

        <p className="text-center text-gray-400 mt-6">
          Already registered?{' '}
          <Link href="/auth/login?role=merchant" className="text-[#06b6d4] hover:underline font-medium">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
