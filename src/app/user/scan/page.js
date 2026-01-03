'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { FiCamera, FiBell, FiCheck, FiX, FiStar, FiShoppingBag, FiAlertCircle } from 'react-icons/fi';
import { BsCheckCircleFill, BsQrCodeScan } from 'react-icons/bs';
import { HiOutlineSparkles } from 'react-icons/hi';
import UserSidebar from '@/components/UserSidebar';

export default function ScanQR() {
  const [scanning, setScanning] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const [manualCode, setManualCode] = useState('');
  const [earnedPoints, setEarnedPoints] = useState(0);
  const videoRef = useRef(null);

  const mockMerchant = {
    name: 'Urban Café Coffee Shop',
    logo: 'UC',
    transactionAmount: 450,
    pointsToEarn: 90,
    tier: 'Gold Partner',
  };

  const recentScans = [
    { id: 1, merchant: 'Metro Supermarket', points: 150, date: '2026-01-03', time: '2:30 PM' },
    { id: 2, merchant: 'Quick Bites Diner', points: 75, date: '2026-01-02', time: '12:15 PM' },
    { id: 3, merchant: 'Green Valley Market', points: 45, date: '2026-01-01', time: '4:45 PM' },
  ];

  const startScanning = async () => {
    setScanning(true);
    // Simulate camera permission and scanning
    // In production, you'd use a library like @zxing/library or html5-qrcode
    setTimeout(() => {
      // Simulate successful scan
      setScanning(false);
      setScanned(true);
      setShowModal(true);
    }, 2000);
  };

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (manualCode.length >= 6) {
      setScanned(true);
      setShowModal(true);
    }
  };

  const handleConfirmEarn = () => {
    setShowModal(false);
    setEarnedPoints(mockMerchant.pointsToEarn);
    setSuccess(true);
    setScanned(false);
    setManualCode('');
    setTimeout(() => {
      setSuccess(false);
      setEarnedPoints(0);
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-[#0f0a1a]">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#8b5cf6]/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#a78bfa]/10 rounded-full blur-[120px]" />
      </div>
      <UserSidebar active="scan" />
      <main className="lg:ml-64 p-4 sm:p-6 lg:p-8 relative z-10">
        {success && (
          <div className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-xl flex items-center gap-3 animate-[fadeInDown_0.3s_ease-out]">
            <BsCheckCircleFill className="text-green-400 text-xl" />
            <span className="text-green-400 font-medium">
              🎉 You earned <span className="font-bold">{earnedPoints}</span> Suki Points!
            </span>
          </div>
        )}

        <header className="mb-6 sm:mb-8 flex flex-col sm:flex-row justify-between items-start gap-4 animate-[fadeInDown_0.5s_ease-out]">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2 flex items-center gap-3">
              <BsQrCodeScan className="text-[#8b5cf6]" />
              Scan to Earn
            </h1>
            <p className="text-sm sm:text-base text-gray-400">Scan merchant QR codes to earn Suki Points on purchases</p>
          </div>
          <button className="relative p-2.5 sm:p-3 bg-[#1e1433]/80 rounded-xl border border-[#3d2d5c]/50 hover:border-[#8b5cf6]/50 transition-all">
            <FiBell className="text-gray-400 text-lg sm:text-xl" />
          </button>
        </header>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Scanner Section */}
          <div className="bg-[#1e1433]/80 rounded-2xl p-6 border border-[#3d2d5c]/50 animate-[fadeInUp_0.5s_ease-out]">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <FiCamera className="text-[#8b5cf6]" />
              QR Scanner
            </h3>

            {/* Scanner Preview */}
            <div className="relative aspect-square bg-[#0f0a1a] rounded-xl overflow-hidden mb-4 border border-[#3d2d5c]/50">
              {scanning ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-48 h-48">
                    {/* Scanner animation */}
                    <div className="absolute inset-0 border-2 border-[#8b5cf6] rounded-lg" />
                    <div className="absolute top-0 left-0 right-0 h-1 bg-[#8b5cf6] animate-scan" />
                    <div className="absolute top-0 left-0 w-8 h-8 border-l-4 border-t-4 border-[#8b5cf6] rounded-tl-lg" />
                    <div className="absolute top-0 right-0 w-8 h-8 border-r-4 border-t-4 border-[#8b5cf6] rounded-tr-lg" />
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-l-4 border-b-4 border-[#8b5cf6] rounded-bl-lg" />
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-r-4 border-b-4 border-[#8b5cf6] rounded-br-lg" />
                  </div>
                  <p className="absolute bottom-8 text-gray-400 text-sm">Scanning...</p>
                </div>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <BsQrCodeScan className="w-20 h-20 text-[#3d2d5c] mb-4" />
                  <p className="text-gray-500 text-sm">Position QR code in frame</p>
                </div>
              )}
            </div>

            <button
              onClick={startScanning}
              disabled={scanning}
              className={`w-full py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
                scanning
                  ? 'bg-[#3d2d5c]/50 text-gray-400'
                  : 'bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] text-white hover:opacity-90 shadow-lg shadow-violet-500/25'
              }`}
            >
              {scanning ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Scanning...
                </>
              ) : (
                <>
                  <FiCamera className="text-lg" />
                  Start Scanning
                </>
              )}
            </button>

            {/* Manual Code Entry */}
            <div className="mt-6 pt-6 border-t border-[#3d2d5c]/50">
              <p className="text-sm text-gray-400 mb-3">Or enter code manually:</p>
              <form onSubmit={handleManualSubmit} className="flex gap-2">
                <input
                  type="text"
                  value={manualCode}
                  onChange={(e) => setManualCode(e.target.value.toUpperCase())}
                  placeholder="Enter 6-digit code"
                  maxLength={10}
                  className="flex-1 px-4 py-3 bg-[#0f0a1a]/50 rounded-xl border border-[#3d2d5c]/50 text-white placeholder-gray-500 focus:border-[#8b5cf6]/50 focus:outline-none transition-all uppercase tracking-wider"
                />
                <button
                  type="submit"
                  disabled={manualCode.length < 6}
                  className={`px-6 py-3 rounded-xl font-medium transition-all ${
                    manualCode.length >= 6
                      ? 'bg-[#8b5cf6] text-white hover:opacity-90'
                      : 'bg-[#3d2d5c]/50 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>

          {/* Recent Scans & Info */}
          <div className="space-y-6">
            {/* How it works */}
            <div className="bg-gradient-to-br from-[#8b5cf6]/20 to-[#7c3aed]/10 rounded-2xl p-6 border border-[#8b5cf6]/30 animate-[fadeInUp_0.5s_ease-out]" style={{ animationDelay: '100ms' }}>
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <HiOutlineSparkles className="text-[#8b5cf6]" />
                How It Works
              </h3>
              <div className="space-y-4">
                {[
                  { step: '1', title: 'Make a Purchase', desc: 'Shop at any partner MSME merchant' },
                  { step: '2', title: 'Scan QR Code', desc: 'Ask the merchant for their Suki QR code' },
                  { step: '3', title: 'Earn Points', desc: 'Points are credited instantly to your wallet' },
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#8b5cf6] flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-sm">{item.step}</span>
                    </div>
                    <div>
                      <p className="font-medium text-white">{item.title}</p>
                      <p className="text-sm text-gray-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Scans */}
            <div className="bg-[#1e1433]/80 rounded-2xl p-6 border border-[#3d2d5c]/50 animate-[fadeInUp_0.5s_ease-out]" style={{ animationDelay: '200ms' }}>
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <FiShoppingBag className="text-[#8b5cf6]" />
                Recent Earnings
              </h3>
              <div className="space-y-3">
                {recentScans.map((scan) => (
                  <div key={scan.id} className="flex items-center justify-between p-3 bg-[#0f0a1a]/50 rounded-xl border border-[#3d2d5c]/30">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8b5cf6]/20 to-[#7c3aed]/20 flex items-center justify-center">
                        <FiShoppingBag className="text-[#8b5cf6]" />
                      </div>
                      <div>
                        <p className="font-medium text-white text-sm">{scan.merchant}</p>
                        <p className="text-xs text-gray-500">{scan.date} at {scan.time}</p>
                      </div>
                    </div>
                    <span className="text-green-400 font-bold flex items-center gap-1">
                      <FiStar className="w-4 h-4" />
                      +{scan.points}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Confirmation Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50" onClick={() => setShowModal(false)}>
            <div className="bg-[#1e1433]/95 backdrop-blur-xl rounded-2xl p-6 w-full max-w-md border border-[#3d2d5c]/50 animate-[fadeInUp_0.3s_ease-out]" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <BsCheckCircleFill className="text-green-400" />
                  QR Scanned!
                </h3>
                <button onClick={() => setShowModal(false)} className="p-2 hover:bg-[#3d2d5c]/50 rounded-lg">
                  <FiX className="text-gray-400 text-xl" />
                </button>
              </div>

              <div className="bg-[#0f0a1a]/50 rounded-xl p-4 mb-6 border border-[#3d2d5c]/30">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#8b5cf6] to-[#7c3aed] flex items-center justify-center">
                    <span className="text-white font-bold">{mockMerchant.logo}</span>
                  </div>
                  <div>
                    <p className="font-bold text-white">{mockMerchant.name}</p>
                    <span className="text-xs px-2 py-1 bg-[#8b5cf6]/20 text-[#8b5cf6] rounded-full">{mockMerchant.tier}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center py-3 border-b border-[#3d2d5c]/30">
                  <span className="text-gray-400">Purchase Amount</span>
                  <span className="font-bold text-white">${mockMerchant.transactionAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-400">Points to Earn</span>
                  <span className="font-bold text-green-400 flex items-center gap-1">
                    <FiStar className="w-4 h-4" />
                    +{mockMerchant.pointsToEarn}
                  </span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-3 bg-[#0f0a1a]/50 border border-[#3d2d5c]/50 rounded-xl text-gray-400 font-medium hover:text-white transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmEarn}
                  className="flex-1 py-3 bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] rounded-xl text-white font-medium hover:opacity-90 transition-all flex items-center justify-center gap-2"
                >
                  <FiCheck className="text-lg" />
                  Claim Points
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <style jsx>{`
        @keyframes scan {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(188px); }
        }
        .animate-scan {
          animation: scan 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
