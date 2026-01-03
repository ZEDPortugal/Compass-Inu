'use client';

import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function MerchantPending() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0a1a] via-[#1a0f2e] to-[#2d1b4e] flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-[#1e1433] to-[#2d1b4e] rounded-2xl shadow-xl border border-[#3d2b5e] w-full max-w-md p-8 text-center">
        <div className="w-20 h-20 bg-[#f59e0b]/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-[#f59e0b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        
        <h1 className="text-2xl font-bold text-white mb-2">Application Submitted!</h1>
        <p className="text-purple-200 mb-6">
          Your merchant application is pending approval. Our admin team will review your application 
          and get back to you within 1-2 business days.
        </p>

        <div className="bg-[#1a0f2e] rounded-lg p-4 mb-6 border border-[#3d2b5e]">
          <h3 className="font-semibold text-white mb-2">What happens next?</h3>
          <ul className="text-sm text-purple-200 text-left space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-[#06b6d4] mt-0.5">✓</span>
              Our team reviews your business details
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#06b6d4] mt-0.5">✓</span>
              We may contact you for additional information
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#06b6d4] mt-0.5">✓</span>
              You'll receive an email once approved
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#06b6d4] mt-0.5">✓</span>
              Access your merchant dashboard and start creating campaigns
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <Link href="/">
            <Button variant="secondary" className="w-full">
              Return to Home
            </Button>
          </Link>
          <Link href="/auth/login?role=merchant">
            <Button variant="outline" className="w-full">
              Login to Check Status
            </Button>
          </Link>
        </div>

        <p className="text-sm text-gray-500 mt-6">
          Questions? Contact us at{' '}
          <a href="mailto:support@compass.com" className="text-emerald-600 hover:underline">
            support@compass.com
          </a>
        </p>
      </div>
    </div>
  );
}
