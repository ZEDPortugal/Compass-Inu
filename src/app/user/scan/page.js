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
    <div className="min-h-screen bg-[#0f0a1a] overflow-x-hidden">
      {/* Background blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-[#8b5cf6]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#a78bfa]/10 rounded-full blur-3xl" />
      </div>
      
      <UserSidebar active="scan" />
      
      {/* Main Content */}
      <main className="lg:ml-64 pt-16 lg:pt-0 min-h-screen overflow-x-hidden">
        <div className="p-4 sm:p-6 lg:p-8 relative z-10 max-w-full overflow-hidden">
          
          {/* Success Message */}
          {success && (
            <div className="mb-4 p-4 bg-green-500/20 border border-green-500/30 rounded-xl flex items-center gap-3">
              <BsCheckCircleFill className="text-green-400 text-xl flex-shrink-0" />
              <span className="text-green-400 font-medium">
                You earned <span className="font-bold">{earnedPoints}</span> Suki Points!
              </span>
            </div>
          )}

          {/* Page Header */}
          <header className="mb-6">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-1 flex items-center gap-2">
              <BsQrCodeScan className="text-[#8b5cf6] flex-shrink-0" />
              <span>Scan to Earn</span>
            </h1>
            <p className="text-sm text-gray-400">Scan merchant QR codes to earn Suki Points</p>
          </header>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* Scanner Section */}
            <div className="bg-[#1e1433]/80 rounded-2xl p-4 sm:p-6 border border-[#3d2d5c]/50 w-full min-w-0">
              <h3 className="text-base sm:text-lg font-bold text-white mb-3 sm:mb-4 flex items-center gap-2">
                <FiCamera className="text-[#8b5cf6] shrink-0" />
                QR Scanner
              </h3>

              {/* Scanner Preview */}
              <div className="relative w-full aspect-video sm:aspect-square bg-[#0f0a1a] rounded-xl overflow-hidden mb-4 border border-[#3d2d5c]/50">
                {scanning ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-28 h-28 sm:w-40 sm:h-40">
                      <div className="absolute inset-0 border-2 border-[#8b5cf6] rounded-lg overflow-hidden">
                        <div className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#8b5cf6] to-transparent animate-scan" />
                      </div>
                      <div className="absolute top-0 left-0 w-4 h-4 sm:w-6 sm:h-6 border-l-2 border-t-2 border-[#8b5cf6] rounded-tl" />
                      <div className="absolute top-0 right-0 w-4 h-4 sm:w-6 sm:h-6 border-r-2 border-t-2 border-[#8b5cf6] rounded-tr" />
                      <div className="absolute bottom-0 left-0 w-4 h-4 sm:w-6 sm:h-6 border-l-2 border-b-2 border-[#8b5cf6] rounded-bl" />
                      <div className="absolute bottom-0 right-0 w-4 h-4 sm:w-6 sm:h-6 border-r-2 border-b-2 border-[#8b5cf6] rounded-br" />
                    </div>
                    <p className="absolute bottom-3 text-gray-400 text-xs sm:text-sm">Scanning...</p>
                  </div>
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <BsQrCodeScan className="w-12 h-12 sm:w-16 sm:h-16 text-[#3d2d5c] mb-2" />
                    <p className="text-gray-500 text-xs sm:text-sm">Position QR code in frame</p>
                  </div>
                )}
              </div>

              <button
                onClick={startScanning}
                disabled={scanning}
                className={`w-full py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 text-sm sm:text-base ${
                  scanning
                    ? 'bg-[#3d2d5c]/50 text-gray-400'
                    : 'bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] text-white hover:opacity-90 shadow-lg shadow-violet-500/25'
                }`}
              >
                {scanning ? (
                  <>
                    <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Scanning...
                  </>
                ) : (
                  <>
                    <FiCamera />
                    Start Scanning
                  </>
                )}
              </button>

              {/* Manual Code Entry */}
              <div className="mt-4 pt-4 border-t border-[#3d2d5c]/50">
                <p className="text-xs sm:text-sm text-gray-400 mb-2">Or enter code manually:</p>
                <form onSubmit={handleManualSubmit} className="flex gap-2">
                  <input
                    type="text"
                    value={manualCode}
                    onChange={(e) => setManualCode(e.target.value.toUpperCase())}
                    placeholder="ENTER 6-DIGIT CODE"
                    maxLength={10}
                    className="flex-1 px-3 py-2.5 bg-[#0f0a1a]/50 rounded-xl border border-[#3d2d5c]/50 text-white placeholder-gray-500 focus:border-[#8b5cf6]/50 focus:outline-none text-sm uppercase tracking-wider"
                  />
                  <button
                    type="submit"
                    disabled={manualCode.length < 6}
                    className={`px-4 py-2.5 rounded-xl font-medium text-sm ${
                      manualCode.length >= 6
                        ? 'bg-[#8b5cf6] text-white hover:opacity-90'
                        : 'bg-[#3d2d5c]/50 text-gray-500'
                    }`}
                  >
                    Go
                  </button>
                </form>
              </div>
            </div>

            {/* Info & Recent Section */}
            <div className="space-y-4 sm:space-y-6 min-w-0">
              {/* How it works */}
              <div className="bg-gradient-to-br from-[#8b5cf6]/20 to-[#7c3aed]/10 rounded-2xl p-4 sm:p-6 border border-[#8b5cf6]/30 w-full">
                <h3 className="text-base sm:text-lg font-bold text-white mb-3 sm:mb-4 flex items-center gap-2">
                  <HiOutlineSparkles className="text-[#8b5cf6] shrink-0" />
                  How It Works
                </h3>
                <div className="space-y-3">
                  {[
                    { step: '1', title: 'Make a Purchase', desc: 'Shop at any partner MSME merchant' },
                    { step: '2', title: 'Scan QR Code', desc: 'Ask the merchant for their Suki QR code' },
                    { step: '3', title: 'Earn Points', desc: 'Points are credited instantly to your wallet' },
                  ].map((item) => (
                    <div key={item.step} className="flex items-start gap-3">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#8b5cf6] flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-xs sm:text-sm">{item.step}</span>
                      </div>
                      <div>
                        <p className="font-medium text-white text-sm sm:text-base">{item.title}</p>
                        <p className="text-xs sm:text-sm text-gray-400">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Scans */}
              <div className="bg-[#1e1433]/80 rounded-2xl p-4 sm:p-6 border border-[#3d2d5c]/50 w-full">
                <h3 className="text-base sm:text-lg font-bold text-white mb-3 sm:mb-4 flex items-center gap-2">
                  <FiShoppingBag className="text-[#8b5cf6] shrink-0" />
                  Recent Earnings
                </h3>
                <div className="space-y-2 sm:space-y-3">
                  {recentScans.map((scan) => (
                    <div key={scan.id} className="flex items-center justify-between p-2.5 sm:p-3 bg-[#0f0a1a]/50 rounded-xl border border-[#3d2d5c]/30 min-w-0">
                      <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-[#8b5cf6]/20 to-[#7c3aed]/20 flex items-center justify-center shrink-0">
                          <FiShoppingBag className="text-[#8b5cf6] text-sm sm:text-base" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-white text-xs sm:text-sm truncate">{scan.merchant}</p>
                          <p className="text-[10px] sm:text-xs text-gray-500">{scan.date}</p>
                        </div>
                      </div>
                      <span className="text-green-400 font-bold text-xs sm:text-sm flex items-center gap-1 shrink-0 ml-2">
                        <FiStar className="w-3 h-3 sm:w-4 sm:h-4" />
                        +{scan.points}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setShowModal(false)}>
          <div className="bg-[#1e1433] rounded-2xl p-5 sm:p-6 w-full max-w-md border border-[#3d2d5c]/50" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <BsCheckCircleFill className="text-green-400" />
                QR Scanned!
              </h3>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-[#3d2d5c]/50 rounded-lg">
                <FiX className="text-gray-400 text-xl" />
              </button>
            </div>

            <div className="bg-[#0f0a1a]/50 rounded-xl p-4 mb-4 border border-[#3d2d5c]/30">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#8b5cf6] to-[#7c3aed] flex items-center justify-center">
                  <span className="text-white font-bold">{mockMerchant.logo}</span>
                </div>
                <div>
                  <p className="font-bold text-white text-sm">{mockMerchant.name}</p>
                  <span className="text-xs px-2 py-0.5 bg-[#8b5cf6]/20 text-[#8b5cf6] rounded-full">{mockMerchant.tier}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between items-center py-2 border-b border-[#3d2d5c]/30">
                <span className="text-gray-400 text-sm">Purchase Amount</span>
                <span className="font-bold text-white">${mockMerchant.transactionAmount}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-400 text-sm">Points to Earn</span>
                <span className="font-bold text-green-400 flex items-center gap-1">
                  <FiStar className="w-4 h-4" />
                  +{mockMerchant.pointsToEarn}
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-2.5 bg-[#0f0a1a]/50 border border-[#3d2d5c]/50 rounded-xl text-gray-400 font-medium text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmEarn}
                className="flex-1 py-2.5 bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] rounded-xl text-white font-medium text-sm flex items-center justify-center gap-2"
              >
                <FiCheck />
                Claim Points
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
