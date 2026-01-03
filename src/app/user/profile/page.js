'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiUser, FiMail, FiPhone, FiCalendar, FiEdit2, FiSave, FiX, FiShield, FiKey, FiGift, FiCamera } from 'react-icons/fi';
import { RiMedalLine } from 'react-icons/ri';
import { BsCheckCircleFill, BsShieldCheck } from 'react-icons/bs';
import UserSidebar from '@/components/UserSidebar';

export default function UserProfile() {
  const [editing, setEditing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({ name: 'John Doe', email: 'john@example.com', phone: '+1234567890' });

  const handleSave = () => {
    setEditing(false);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  const stats = [
    { label: 'Total Points', value: '2,500', icon: RiMedalLine, gradient: 'from-[#8b5cf6] to-[#7c3aed]' },
    { label: 'Member Since', value: 'Dec 2025', icon: FiCalendar, gradient: 'from-[#a78bfa] to-[#8b5cf6]' },
    { label: 'Rewards Redeemed', value: '8', icon: FiGift, gradient: 'from-[#7c3aed] to-[#6d28d9]' },
  ];

  return (
    <div className="min-h-screen bg-[#0f0a1a]">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#8b5cf6]/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#a78bfa]/10 rounded-full blur-[120px]" />
      </div>
      <UserSidebar active="profile" />
      <main className="lg:ml-64 p-4 sm:p-6 lg:p-8 relative z-10">
        {success && (
          <div className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-xl flex items-center gap-3 animate-[fadeInDown_0.3s_ease-out]">
            <BsCheckCircleFill className="text-green-400 text-xl" />
            <span className="text-green-400 font-medium">Profile updated successfully!</span>
          </div>
        )}

        <header className="mb-6 sm:mb-8 animate-[fadeInDown_0.5s_ease-out]">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2 flex items-center gap-3"><FiUser className="text-[#8b5cf6]" />My Profile</h1>
          <p className="text-sm sm:text-base text-gray-400">Manage your account settings</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <div className="bg-[#1e1433]/80 rounded-2xl p-6 border border-[#3d2d5c]/50 text-center animate-[fadeInLeft_0.5s_ease-out]">
              <div className="relative inline-block mb-4">
                <div className="w-24 h-24 bg-gradient-to-br from-[#8b5cf6] to-[#7c3aed] rounded-full flex items-center justify-center text-4xl font-bold text-white shadow-lg">
                  {formData.name.charAt(0)}
                </div>
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-[#1e1433] border border-[#3d2d5c] rounded-full flex items-center justify-center hover:border-[#8b5cf6] transition-all">
                  <FiCamera className="w-4 h-4 text-gray-400" />
                </button>
              </div>
              <h3 className="text-xl font-bold text-white mb-1">{formData.name}</h3>
              <p className="text-gray-400 text-sm mb-4">{formData.email}</p>
              <div className="flex items-center justify-center gap-2 px-4 py-2 bg-green-500/20 text-green-400 rounded-full text-sm">
                <BsShieldCheck className="w-4 h-4" />
                Verified Account
              </div>
            </div>
            <div className="mt-6 space-y-3">
              {stats.map((stat, index) => (
                <div key={stat.label} className="bg-[#1e1433]/80 rounded-xl p-4 border border-[#3d2d5c]/50 flex items-center gap-4 animate-[fadeInLeft_0.5s_ease-out]" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.gradient} flex items-center justify-center`}>
                    <stat.icon className="w-5 h-5 text-white" />
                  </div>
                  <div><p className="text-gray-400 text-xs">{stat.label}</p><p className="text-white font-bold">{stat.value}</p></div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-[#1e1433]/80 rounded-2xl p-6 border border-[#3d2d5c]/50 animate-[fadeInRight_0.5s_ease-out]">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-white">Account Information</h3>
                <button onClick={() => setEditing(!editing)} className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${editing ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' : 'bg-[#8b5cf6]/20 text-[#8b5cf6] hover:bg-[#8b5cf6]/30'}`}>
                  {editing ? <><FiX className="w-4 h-4" />Cancel</> : <><FiEdit2 className="w-4 h-4" />Edit</>}
                </button>
              </div>
              <div className="space-y-4">
                <div><label className="block text-gray-400 text-sm mb-2">Full Name</label>
                  <div className="relative">
                    <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} disabled={!editing}
                      className={`w-full pl-12 pr-4 py-3 bg-[#0f0a1a]/50 rounded-xl border text-white ${editing ? 'border-[#8b5cf6]/50 focus:border-[#8b5cf6]' : 'border-[#3d2d5c]/30'} focus:outline-none transition-all`} />
                  </div>
                </div>
                <div><label className="block text-gray-400 text-sm mb-2">Email Address</label>
                  <div className="relative">
                    <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} disabled={!editing}
                      className={`w-full pl-12 pr-4 py-3 bg-[#0f0a1a]/50 rounded-xl border text-white ${editing ? 'border-[#8b5cf6]/50 focus:border-[#8b5cf6]' : 'border-[#3d2d5c]/30'} focus:outline-none transition-all`} />
                  </div>
                </div>
                <div><label className="block text-gray-400 text-sm mb-2">Phone Number</label>
                  <div className="relative">
                    <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} disabled={!editing}
                      className={`w-full pl-12 pr-4 py-3 bg-[#0f0a1a]/50 rounded-xl border text-white ${editing ? 'border-[#8b5cf6]/50 focus:border-[#8b5cf6]' : 'border-[#3d2d5c]/30'} focus:outline-none transition-all`} />
                  </div>
                </div>
                {editing && (
                  <button onClick={handleSave} className="w-full py-3 bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] rounded-xl text-white font-medium hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-violet-500/25">
                    <FiSave className="w-5 h-5" />Save Changes
                  </button>
                )}
              </div>
            </div>

            <div className="mt-6 bg-[#1e1433]/80 rounded-2xl p-6 border border-[#3d2d5c]/50 animate-[fadeInRight_0.5s_ease-out]" style={{ animationDelay: '100ms' }}>
              <h3 className="text-lg font-bold text-white mb-4">Security</h3>
              <div className="space-y-3">
                <button className="w-full p-4 bg-[#0f0a1a]/50 rounded-xl border border-[#3d2d5c]/30 hover:border-[#8b5cf6]/50 transition-all flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-lg bg-[#8b5cf6]/20 flex items-center justify-center group-hover:scale-110 transition-transform"><FiKey className="w-5 h-5 text-[#8b5cf6]" /></div>
                  <div className="text-left"><p className="text-white font-medium">Change Password</p><p className="text-gray-500 text-sm">Update your password regularly</p></div>
                </button>
                <button className="w-full p-4 bg-[#0f0a1a]/50 rounded-xl border border-[#3d2d5c]/30 hover:border-[#8b5cf6]/50 transition-all flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-lg bg-[#a78bfa]/20 flex items-center justify-center group-hover:scale-110 transition-transform"><FiShield className="w-5 h-5 text-[#a78bfa]" /></div>
                  <div className="text-left"><p className="text-white font-medium">Two-Factor Auth</p><p className="text-gray-500 text-sm">Add extra security to your account</p></div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

