'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FiGift, FiSend, FiBell, FiX, FiCheck, FiUser, FiMail, FiPhone, FiHeart } from 'react-icons/fi';
import { BsCheckCircleFill, BsWallet2, BsGift } from 'react-icons/bs';
import { HiOutlineSparkles } from 'react-icons/hi';
import UserSidebar from '@/components/UserSidebar';

export default function GiftPoints() {
  const [recipient, setRecipient] = useState('');
  const [recipientType, setRecipientType] = useState('phone'); // phone or email
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const userPoints = 2500;

  const quickAmounts = [100, 250, 500, 1000];

  const recentRecipients = [
    { id: 1, name: 'Sarah Chen', phone: '+1 555 XXX 1234', lastSent: '500 pts', avatar: 'S' },
    { id: 2, name: 'David Park', email: 'david.park@email.com', lastSent: '200 pts', avatar: 'D' },
    { id: 3, name: 'Emily Roberts', phone: '+1 555 XXX 5678', lastSent: '1000 pts', avatar: 'E' },
  ];

  const handleSendGift = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setShowConfirm(false);
      setSuccess(true);
      setRecipient('');
      setAmount('');
      setMessage('');
      setTimeout(() => setSuccess(false), 5000);
    }, 1500);
  };

  const canSend = recipient && amount && parseInt(amount) > 0 && parseInt(amount) <= userPoints;

  return (
    <div className="min-h-screen bg-[#0f0a1a]">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#8b5cf6]/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#a78bfa]/10 rounded-full blur-[120px]" />
      </div>
      <UserSidebar active="gift" />
      <main className="lg:ml-64 p-4 sm:p-6 lg:p-8 relative z-10">
        {success && (
          <div className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-xl flex items-center gap-3 animate-[fadeInDown_0.3s_ease-out]">
            <BsCheckCircleFill className="text-green-400 text-xl" />
            <span className="text-green-400 font-medium">Points sent successfully! Your recipient will receive a notification.</span>
          </div>
        )}

        <header className="mb-6 sm:mb-8 flex flex-col sm:flex-row justify-between items-start gap-4 animate-[fadeInDown_0.5s_ease-out]">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2 flex items-center gap-3">
              <BsGift className="text-[#8b5cf6]" />
              Send Suki Points
            </h1>
            <p className="text-sm sm:text-base text-gray-400">Gift points to family and friends (OFW remittance style)</p>
          </div>
          <button className="relative p-2.5 sm:p-3 bg-[#1e1433]/80 rounded-xl border border-[#3d2d5c]/50 hover:border-[#8b5cf6]/50 transition-all">
            <FiBell className="text-gray-400 text-lg sm:text-xl" />
          </button>
        </header>

        {/* Balance Card */}
        <div className="bg-gradient-to-r from-[#8b5cf6]/20 to-[#7c3aed]/20 rounded-2xl p-4 sm:p-6 border border-[#8b5cf6]/30 mb-6 sm:mb-8 animate-[fadeInUp_0.5s_ease-out]">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-[#8b5cf6] to-[#7c3aed] flex items-center justify-center shadow-lg">
                <BsWallet2 className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <div>
                <p className="text-gray-400 text-xs sm:text-sm">Available Balance</p>
                <p className="text-2xl sm:text-3xl font-bold text-white">{userPoints.toLocaleString()} <span className="text-base sm:text-lg text-[#8b5cf6]">pts</span></p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Send Form */}
          <div className="lg:col-span-2 bg-[#1e1433]/80 rounded-2xl p-6 border border-[#3d2d5c]/50 animate-[fadeInUp_0.5s_ease-out]" style={{ animationDelay: '100ms' }}>
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <FiSend className="text-[#8b5cf6]" />
              Send Points
            </h3>

            {/* Recipient Type Toggle */}
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setRecipientType('phone')}
                className={`flex-1 py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
                  recipientType === 'phone'
                    ? 'bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] text-white'
                    : 'bg-[#0f0a1a]/50 text-gray-400 hover:text-white border border-[#3d2d5c]/50'
                }`}
              >
                <FiPhone className="text-lg" />
                Phone Number
              </button>
              <button
                onClick={() => setRecipientType('email')}
                className={`flex-1 py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
                  recipientType === 'email'
                    ? 'bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] text-white'
                    : 'bg-[#0f0a1a]/50 text-gray-400 hover:text-white border border-[#3d2d5c]/50'
                }`}
              >
                <FiMail className="text-lg" />
                Email Address
              </button>
            </div>

            {/* Recipient Input */}
            <div className="mb-4">
              <label className="block text-sm text-gray-400 mb-2">Recipient's {recipientType === 'phone' ? 'Phone Number' : 'Email'}</label>
              <div className="relative">
                {recipientType === 'phone' ? (
                  <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                ) : (
                  <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                )}
                <input
                  type={recipientType === 'phone' ? 'tel' : 'email'}
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  placeholder={recipientType === 'phone' ? '+63 917 XXX XXXX' : 'email@example.com'}
                  className="w-full pl-12 pr-4 py-3 bg-[#0f0a1a]/50 rounded-xl border border-[#3d2d5c]/50 text-white placeholder-gray-500 focus:border-[#8b5cf6]/50 focus:outline-none transition-all"
                />
              </div>
            </div>

            {/* Amount Input */}
            <div className="mb-4">
              <label className="block text-sm text-gray-400 mb-2">Amount to Send</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter points amount"
                min="1"
                max={userPoints}
                className="w-full px-4 py-3 bg-[#0f0a1a]/50 rounded-xl border border-[#3d2d5c]/50 text-white placeholder-gray-500 focus:border-[#8b5cf6]/50 focus:outline-none transition-all"
              />
              <div className="flex gap-2 mt-3">
                {quickAmounts.map((amt) => (
                  <button
                    key={amt}
                    onClick={() => setAmount(amt.toString())}
                    className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                      amount === amt.toString()
                        ? 'bg-[#8b5cf6] text-white'
                        : 'bg-[#0f0a1a]/50 text-gray-400 hover:text-white border border-[#3d2d5c]/50'
                    }`}
                  >
                    {amt}
                  </button>
                ))}
              </div>
            </div>

            {/* Message Input */}
            <div className="mb-6">
              <label className="block text-sm text-gray-400 mb-2">Message (Optional)</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Add a personal message..."
                rows={3}
                className="w-full px-4 py-3 bg-[#0f0a1a]/50 rounded-xl border border-[#3d2d5c]/50 text-white placeholder-gray-500 focus:border-[#8b5cf6]/50 focus:outline-none transition-all resize-none"
              />
            </div>

            {/* Send Button */}
            <button
              onClick={() => setShowConfirm(true)}
              disabled={!canSend}
              className={`w-full py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
                canSend
                  ? 'bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] text-white hover:opacity-90 shadow-lg shadow-violet-500/25'
                  : 'bg-gray-600/50 text-gray-400 cursor-not-allowed'
              }`}
            >
              <FiSend className="text-lg" />
              Send {amount ? `${parseInt(amount).toLocaleString()} Points` : 'Points'}
            </button>

            {amount && parseInt(amount) > userPoints && (
              <p className="text-red-400 text-sm mt-2 text-center">Insufficient balance</p>
            )}
          </div>

          {/* Recent Recipients */}
          <div className="bg-[#1e1433]/80 rounded-2xl p-6 border border-[#3d2d5c]/50 animate-[fadeInUp_0.5s_ease-out]" style={{ animationDelay: '200ms' }}>
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <FiHeart className="text-[#8b5cf6]" />
              Recent Recipients
            </h3>
            <div className="space-y-3">
              {recentRecipients.map((person) => (
                <button
                  key={person.id}
                  onClick={() => {
                    setRecipient(person.phone || person.email);
                    setRecipientType(person.phone ? 'phone' : 'email');
                  }}
                  className="w-full p-3 bg-[#0f0a1a]/50 rounded-xl border border-[#3d2d5c]/30 hover:border-[#8b5cf6]/30 transition-all text-left group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#8b5cf6] to-[#7c3aed] flex items-center justify-center">
                      <span className="text-white font-bold">{person.avatar}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-white truncate">{person.name}</p>
                      <p className="text-xs text-gray-500 truncate">{person.phone || person.email}</p>
                    </div>
                    <span className="text-xs text-gray-500">{person.lastSent}</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-6 p-4 bg-[#8b5cf6]/10 rounded-xl border border-[#8b5cf6]/20">
              <h4 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                <HiOutlineSparkles className="text-[#8b5cf6]" />
                OFW Remittance Feature
              </h4>
              <p className="text-xs text-gray-400">
                Send points to your loved ones anywhere in the world. They can redeem points for goods and services at partner merchants.
              </p>
            </div>
          </div>
        </div>

        {/* Confirmation Modal */}
        {showConfirm && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50" onClick={() => setShowConfirm(false)}>
            <div className="bg-[#1e1433]/95 backdrop-blur-xl rounded-2xl p-6 w-full max-w-md border border-[#3d2d5c]/50 animate-[fadeInUp_0.3s_ease-out]" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <FiGift className="text-[#8b5cf6]" />
                  Confirm Transfer
                </h3>
                <button onClick={() => setShowConfirm(false)} className="p-2 hover:bg-[#3d2d5c]/50 rounded-lg">
                  <FiX className="text-gray-400 text-xl" />
                </button>
              </div>

              <div className="bg-[#0f0a1a]/50 rounded-xl p-4 mb-6 border border-[#3d2d5c]/30">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#8b5cf6]/20 to-[#7c3aed]/20 flex items-center justify-center">
                    <FiUser className="w-7 h-7 text-[#8b5cf6]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Sending to</p>
                    <p className="font-medium text-white">{recipient}</p>
                  </div>
                </div>
                {message && (
                  <div className="pt-3 border-t border-[#3d2d5c]/30">
                    <p className="text-xs text-gray-500 mb-1">Message:</p>
                    <p className="text-sm text-gray-300 italic">"{message}"</p>
                  </div>
                )}
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center py-3 border-b border-[#3d2d5c]/30">
                  <span className="text-gray-400">Your Balance</span>
                  <span className="font-bold text-white">{userPoints.toLocaleString()} pts</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-[#3d2d5c]/30">
                  <span className="text-gray-400">Amount to Send</span>
                  <span className="font-bold text-red-400">-{parseInt(amount).toLocaleString()} pts</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-400">New Balance</span>
                  <span className="font-bold text-green-400">{(userPoints - parseInt(amount)).toLocaleString()} pts</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="flex-1 py-3 bg-[#0f0a1a]/50 border border-[#3d2d5c]/50 rounded-xl text-gray-400 font-medium hover:text-white transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSendGift}
                  disabled={loading}
                  className="flex-1 py-3 bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] rounded-xl text-white font-medium hover:opacity-90 transition-all flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <FiCheck className="text-lg" />
                      Confirm Send
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
