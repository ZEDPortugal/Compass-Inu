'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FiHome, FiUsers, FiBarChart2, FiSettings, FiLogOut, FiChevronRight, FiSave, FiBell, FiLock, FiGlobe, FiCreditCard, FiMail, FiShield, FiToggleLeft, FiToggleRight, FiEdit2, FiCheck, FiUser } from 'react-icons/fi';
import { RiExchangeDollarLine, RiMegaphoneLine } from 'react-icons/ri';
import MerchantSidebar from '@/components/MerchantSidebar';

export default function MerchantSettings() {
  const [activeTab, setActiveTab] = useState('profile');
  const [saved, setSaved] = useState(false);

  const [profile, setProfile] = useState({
    businessName: 'Compass Cafe',
    email: 'merchant@compass.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main Street, New York, NY 10001',
    website: 'https://compasscafe.com',
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    redemptionAlerts: true,
    weeklyReports: true,
    marketingEmails: false,
  });

  const [loyalty, setLoyalty] = useState({
    pointsPerDollar: 10,
    pointsExpiry: 365,
    minRedemption: 100,
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const tabs = [
    { id: 'profile', label: 'Business Profile', icon: FiUser },
    { id: 'notifications', label: 'Notifications', icon: FiBell },
    { id: 'loyalty', label: 'Loyalty Program', icon: FiCreditCard },
    { id: 'security', label: 'Security', icon: FiShield },
  ];

  return (
    <div className="min-h-screen bg-[#0f0a1a]">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#06b6d4]/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#22d3ee]/10 rounded-full blur-[120px]" />
      </div>
      <MerchantSidebar active="settings" />
      <main className="lg:ml-64 p-4 sm:p-6 lg:p-8 relative z-10">
        <header className="mb-6 sm:mb-8 flex flex-col sm:flex-row justify-between items-start gap-4 animate-[fadeInDown_0.5s_ease-out]">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2 flex items-center gap-3"><FiSettings className="text-[#06b6d4]" />Settings</h1>
            <p className="text-sm sm:text-base text-gray-400">Manage your account and preferences</p>
          </div>
          <button onClick={handleSave} className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-medium flex items-center gap-2 transition-all duration-300 w-full sm:w-auto justify-center text-sm sm:text-base ${saved ? 'bg-green-500 text-white' : 'bg-gradient-to-r from-[#06b6d4] to-[#0891b2] text-white hover:shadow-lg hover:shadow-cyan-500/25'}`}>
            {saved ? <><FiCheck className="w-5 h-5" />Saved!</> : <><FiSave className="w-5 h-5" />Save Changes</>}
          </button>
        </header>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-64 bg-[#1e1433]/80 rounded-2xl p-4 border border-[#3d2d5c]/50 h-fit animate-[fadeInLeft_0.5s_ease-out]">
            <nav className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
              {tabs.map((tab) => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${activeTab === tab.id ? 'bg-gradient-to-r from-[#06b6d4] to-[#0891b2] text-white' : 'text-gray-400 hover:text-white hover:bg-[#0f0a1a]/50'}`}>
                  <tab.icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="flex-1 bg-[#1e1433]/80 rounded-2xl p-8 border border-[#3d2d5c]/50 animate-[fadeInUp_0.5s_ease-out_forwards] opacity-0" style={{ animationDelay: '200ms' }}>
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-white mb-6">Business Profile</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Business Name</label>
                    <input type="text" value={profile.businessName} onChange={(e) => setProfile({ ...profile, businessName: e.target.value })} className="w-full px-4 py-3 bg-[#0f0a1a]/50 rounded-xl border border-[#3d2d5c]/50 text-white placeholder-gray-500 focus:border-[#06b6d4]/50 focus:outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Email Address</label>
                    <input type="email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} className="w-full px-4 py-3 bg-[#0f0a1a]/50 rounded-xl border border-[#3d2d5c]/50 text-white placeholder-gray-500 focus:border-[#06b6d4]/50 focus:outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Phone Number</label>
                    <input type="tel" value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} className="w-full px-4 py-3 bg-[#0f0a1a]/50 rounded-xl border border-[#3d2d5c]/50 text-white placeholder-gray-500 focus:border-[#06b6d4]/50 focus:outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Website</label>
                    <input type="url" value={profile.website} onChange={(e) => setProfile({ ...profile, website: e.target.value })} className="w-full px-4 py-3 bg-[#0f0a1a]/50 rounded-xl border border-[#3d2d5c]/50 text-white placeholder-gray-500 focus:border-[#06b6d4]/50 focus:outline-none transition-all" />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Address</label>
                  <input type="text" value={profile.address} onChange={(e) => setProfile({ ...profile, address: e.target.value })} className="w-full px-4 py-3 bg-[#0f0a1a]/50 rounded-xl border border-[#3d2d5c]/50 text-white placeholder-gray-500 focus:border-[#06b6d4]/50 focus:outline-none transition-all" />
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-white mb-6">Notification Preferences</h3>
                {Object.entries(notifications).map(([key, value], index) => (
                  <div key={key} className="flex items-center justify-between p-4 bg-[#0f0a1a]/50 rounded-xl border border-[#3d2d5c]/30 animate-[fadeInRight_0.4s_ease-out_forwards] opacity-0" style={{ animationDelay: `${index * 100}ms` }}>
                    <div>
                      <p className="text-white font-medium">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</p>
                      <p className="text-gray-500 text-sm">Receive {key.toLowerCase()} updates</p>
                    </div>
                    <button onClick={() => setNotifications({ ...notifications, [key]: !value })} className={`w-12 h-6 rounded-full transition-all duration-300 ${value ? 'bg-gradient-to-r from-[#06b6d4] to-[#0891b2]' : 'bg-[#3d2d5c]'}`}>
                      <div className={`w-5 h-5 bg-white rounded-full transition-transform duration-300 ${value ? 'translate-x-6' : 'translate-x-0.5'}`} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'loyalty' && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-white mb-6">Loyalty Program Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-6 bg-[#0f0a1a]/50 rounded-xl border border-[#3d2d5c]/30">
                    <label className="block text-gray-400 text-sm mb-2">Points Per Dollar</label>
                    <input type="number" value={loyalty.pointsPerDollar} onChange={(e) => setLoyalty({ ...loyalty, pointsPerDollar: parseInt(e.target.value) })} className="w-full px-4 py-3 bg-[#1e1433]/80 rounded-xl border border-[#3d2d5c]/50 text-white text-2xl font-bold text-center focus:border-[#06b6d4]/50 focus:outline-none transition-all" />
                    <p className="text-gray-500 text-xs mt-2 text-center">Points earned per $1 spent</p>
                  </div>
                  <div className="p-6 bg-[#0f0a1a]/50 rounded-xl border border-[#3d2d5c]/30">
                    <label className="block text-gray-400 text-sm mb-2">Points Expiry (Days)</label>
                    <input type="number" value={loyalty.pointsExpiry} onChange={(e) => setLoyalty({ ...loyalty, pointsExpiry: parseInt(e.target.value) })} className="w-full px-4 py-3 bg-[#1e1433]/80 rounded-xl border border-[#3d2d5c]/50 text-white text-2xl font-bold text-center focus:border-[#06b6d4]/50 focus:outline-none transition-all" />
                    <p className="text-gray-500 text-xs mt-2 text-center">Days until points expire</p>
                  </div>
                  <div className="p-6 bg-[#0f0a1a]/50 rounded-xl border border-[#3d2d5c]/30">
                    <label className="block text-gray-400 text-sm mb-2">Min. Redemption</label>
                    <input type="number" value={loyalty.minRedemption} onChange={(e) => setLoyalty({ ...loyalty, minRedemption: parseInt(e.target.value) })} className="w-full px-4 py-3 bg-[#1e1433]/80 rounded-xl border border-[#3d2d5c]/50 text-white text-2xl font-bold text-center focus:border-[#06b6d4]/50 focus:outline-none transition-all" />
                    <p className="text-gray-500 text-xs mt-2 text-center">Minimum points to redeem</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-white mb-6">Security Settings</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-[#0f0a1a]/50 rounded-xl border border-[#3d2d5c]/30 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#06b6d4]/20 to-[#0891b2]/20 flex items-center justify-center">
                        <FiLock className="text-[#06b6d4]" />
                      </div>
                      <div>
                        <p className="text-white font-medium">Change Password</p>
                        <p className="text-gray-500 text-sm">Update your account password</p>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-[#3d2d5c]/50 text-white rounded-lg hover:bg-[#3d2d5c] transition-all">Update</button>
                  </div>
                  <div className="p-4 bg-[#0f0a1a]/50 rounded-xl border border-[#3d2d5c]/30 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8b5cf6]/20 to-[#7c3aed]/20 flex items-center justify-center">
                        <FiShield className="text-[#8b5cf6]" />
                      </div>
                      <div>
                        <p className="text-white font-medium">Two-Factor Authentication</p>
                        <p className="text-gray-500 text-sm">Add an extra layer of security</p>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-gradient-to-r from-[#06b6d4] to-[#0891b2] text-white rounded-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all">Enable</button>
                  </div>
                  <div className="p-4 bg-[#0f0a1a]/50 rounded-xl border border-[#3d2d5c]/30 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#22c55e]/20 to-[#16a34a]/20 flex items-center justify-center">
                        <FiGlobe className="text-[#22c55e]" />
                      </div>
                      <div>
                        <p className="text-white font-medium">API Access</p>
                        <p className="text-gray-500 text-sm">Manage API keys and webhooks</p>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-[#3d2d5c]/50 text-white rounded-lg hover:bg-[#3d2d5c] transition-all">Manage</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

