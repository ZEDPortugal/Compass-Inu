'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiHome, FiUsers, FiShoppingBag, FiRadio, FiActivity, FiPieChart, FiSettings, FiLogOut, FiSave, FiShield, FiLock, FiBell, FiKey, FiGlobe, FiDatabase, FiServer, FiMail, FiStar, FiLink, FiCheck, FiLoader } from 'react-icons/fi';
import AdminSidebar from '@/components/AdminSidebar';

// Toggle Switch Component
const Toggle = ({ enabled, onChange }) => (
  <button
    onClick={() => onChange(!enabled)}
    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
      enabled ? 'bg-[#f59e0b]' : 'bg-[#3d2d5c]'
    }`}
  >
    <span
      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
        enabled ? 'translate-x-6' : 'translate-x-1'
      }`}
    />
  </button>
);

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState('general');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Settings state
  const [settings, setSettings] = useState({
    // General
    platformName: 'Compass Inu',
    supportEmail: 'support@compassinu.com',
    timezone: 'UTC',
    currency: 'USD',
    
    // Points
    pointsPerDollar: 10,
    minRedemption: 100,
    maxDailyEarn: 5000,
    expirationDays: 365,
    
    // Security
    twoFactorRequired: false,
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    ipWhitelist: '',
    
    // Notifications
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    marketingEmails: true,
    
    // API
    apiRateLimit: 1000,
    webhookUrl: '',
    apiKey: 'sk_live_xxxxxxxxxxxxxxxxxxxxx',
  });

  const handleSave = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
    setSuccess('Settings saved successfully!');
    setTimeout(() => setSuccess(''), 3000);
  };

  const tabs = [
    { id: 'general', label: 'General', Icon: FiSettings },
    { id: 'points', label: 'Points System', Icon: FiStar },
    { id: 'security', label: 'Security', Icon: FiLock },
    { id: 'notifications', label: 'Notifications', Icon: FiBell },
    { id: 'api', label: 'API & Integrations', Icon: FiLink },
  ];

  return (
    <div className="min-h-screen bg-[#0f0a1a]">
      <AdminSidebar active="settings" />
      
      <main className="lg:ml-64 p-4 sm:p-6 lg:p-8">
        {/* Success Alert */}
        {success && (
          <div className="fixed top-4 right-4 z-50 bg-green-500/20 border border-green-500/50 text-green-400 px-6 py-4 rounded-xl animate-slideInRight flex items-center gap-3">
            <FiCheck className="w-5 h-5" />
            {success}
          </div>
        )}

        {/* Header */}
        <header className="mb-6 sm:mb-8 opacity-0 animate-fadeInDown" style={{ animationFillMode: 'forwards' }}>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Platform Settings</h1>
          <p className="text-sm sm:text-base text-gray-400">Configure your loyalty platform settings</p>
        </header>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 sm:mb-8 overflow-x-auto pb-2 sm:pb-0 opacity-0 animate-fadeInUp" style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                activeTab === tab.id 
                  ? 'bg-gradient-to-r from-[#f59e0b] to-[#d97706] text-white shadow-lg shadow-orange-500/30' 
                  : 'bg-[#1e1433] text-gray-400 hover:bg-[#2a1f42] border border-[#3d2d5c]'
              }`}
            >
              <tab.Icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Settings Content */}
        <div className="bg-gradient-to-br from-[#1e1433] to-[#2a1f42] rounded-2xl border border-[#3d2d5c] p-8 opacity-0 animate-fadeInUp" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
          
          {/* General Settings */}
          {activeTab === 'general' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <FiSettings className="w-5 h-5 text-[#f59e0b]" /> General Settings
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Platform Name</label>
                  <input
                    type="text"
                    value={settings.platformName}
                    onChange={(e) => setSettings({ ...settings, platformName: e.target.value })}
                    className="w-full px-4 py-3 bg-[#1e1433] border border-[#3d2d5c] rounded-xl text-white focus:border-[#f59e0b] outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Support Email</label>
                  <input
                    type="email"
                    value={settings.supportEmail}
                    onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
                    className="w-full px-4 py-3 bg-[#1e1433] border border-[#3d2d5c] rounded-xl text-white focus:border-[#f59e0b] outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Timezone</label>
                  <select
                    value={settings.timezone}
                    onChange={(e) => setSettings({ ...settings, timezone: e.target.value })}
                    className="w-full px-4 py-3 bg-[#1e1433] border border-[#3d2d5c] rounded-xl text-white focus:border-[#f59e0b] outline-none transition-all"
                  >
                    <option value="UTC">UTC</option>
                    <option value="EST">Eastern Time (EST)</option>
                    <option value="PST">Pacific Time (PST)</option>
                    <option value="CST">Central Time (CST)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Currency</label>
                  <select
                    value={settings.currency}
                    onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
                    className="w-full px-4 py-3 bg-[#1e1433] border border-[#3d2d5c] rounded-xl text-white focus:border-[#f59e0b] outline-none transition-all"
                  >
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="JPY">JPY (¥)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Points System */}
          {activeTab === 'points' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <FiStar className="w-5 h-5 text-[#f59e0b]" /> Points System Configuration
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Points per Dollar</label>
                  <input
                    type="number"
                    value={settings.pointsPerDollar}
                    onChange={(e) => setSettings({ ...settings, pointsPerDollar: parseInt(e.target.value) })}
                    className="w-full px-4 py-3 bg-[#1e1433] border border-[#3d2d5c] rounded-xl text-white focus:border-[#f59e0b] outline-none transition-all"
                  />
                  <p className="text-gray-500 text-xs mt-1">Points earned per $1 spent</p>
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Minimum Redemption</label>
                  <input
                    type="number"
                    value={settings.minRedemption}
                    onChange={(e) => setSettings({ ...settings, minRedemption: parseInt(e.target.value) })}
                    className="w-full px-4 py-3 bg-[#1e1433] border border-[#3d2d5c] rounded-xl text-white focus:border-[#f59e0b] outline-none transition-all"
                  />
                  <p className="text-gray-500 text-xs mt-1">Minimum points required for redemption</p>
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Max Daily Earn Limit</label>
                  <input
                    type="number"
                    value={settings.maxDailyEarn}
                    onChange={(e) => setSettings({ ...settings, maxDailyEarn: parseInt(e.target.value) })}
                    className="w-full px-4 py-3 bg-[#1e1433] border border-[#3d2d5c] rounded-xl text-white focus:border-[#f59e0b] outline-none transition-all"
                  />
                  <p className="text-gray-500 text-xs mt-1">Maximum points a user can earn per day</p>
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Points Expiration (Days)</label>
                  <input
                    type="number"
                    value={settings.expirationDays}
                    onChange={(e) => setSettings({ ...settings, expirationDays: parseInt(e.target.value) })}
                    className="w-full px-4 py-3 bg-[#1e1433] border border-[#3d2d5c] rounded-xl text-white focus:border-[#f59e0b] outline-none transition-all"
                  />
                  <p className="text-gray-500 text-xs mt-1">Days until inactive points expire</p>
                </div>
              </div>
            </div>
          )}

          {/* Security */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <FiLock className="w-5 h-5 text-[#f59e0b]" /> Security Settings
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-[#1e1433]/50 rounded-xl border border-[#3d2d5c]">
                  <div>
                    <h3 className="text-white font-medium">Two-Factor Authentication Required</h3>
                    <p className="text-gray-500 text-sm">Require 2FA for all admin accounts</p>
                  </div>
                  <Toggle
                    enabled={settings.twoFactorRequired}
                    onChange={(v) => setSettings({ ...settings, twoFactorRequired: v })}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Session Timeout (minutes)</label>
                    <input
                      type="number"
                      value={settings.sessionTimeout}
                      onChange={(e) => setSettings({ ...settings, sessionTimeout: parseInt(e.target.value) })}
                      className="w-full px-4 py-3 bg-[#1e1433] border border-[#3d2d5c] rounded-xl text-white focus:border-[#f59e0b] outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Max Login Attempts</label>
                    <input
                      type="number"
                      value={settings.maxLoginAttempts}
                      onChange={(e) => setSettings({ ...settings, maxLoginAttempts: parseInt(e.target.value) })}
                      className="w-full px-4 py-3 bg-[#1e1433] border border-[#3d2d5c] rounded-xl text-white focus:border-[#f59e0b] outline-none transition-all"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-400 text-sm mb-2">IP Whitelist</label>
                  <textarea
                    value={settings.ipWhitelist}
                    onChange={(e) => setSettings({ ...settings, ipWhitelist: e.target.value })}
                    placeholder="Enter IP addresses (one per line)"
                    className="w-full px-4 py-3 bg-[#1e1433] border border-[#3d2d5c] rounded-xl text-white placeholder-gray-500 focus:border-[#f59e0b] outline-none transition-all h-24 resize-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Notifications */}
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <FiBell className="w-5 h-5 text-[#f59e0b]" /> Notification Settings
              </h2>
              
              <div className="space-y-4">
                {[
                  { key: 'emailNotifications', label: 'Email Notifications', desc: 'Send transactional emails to users' },
                  { key: 'pushNotifications', label: 'Push Notifications', desc: 'Send push notifications to mobile app users' },
                  { key: 'smsNotifications', label: 'SMS Notifications', desc: 'Send SMS alerts for important updates' },
                  { key: 'marketingEmails', label: 'Marketing Emails', desc: 'Send promotional emails and newsletters' },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between p-4 bg-[#1e1433]/50 rounded-xl border border-[#3d2d5c]">
                    <div>
                      <h3 className="text-white font-medium">{item.label}</h3>
                      <p className="text-gray-500 text-sm">{item.desc}</p>
                    </div>
                    <Toggle
                      enabled={settings[item.key]}
                      onChange={(v) => setSettings({ ...settings, [item.key]: v })}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* API & Integrations */}
          {activeTab === 'api' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <FiLink className="w-5 h-5 text-[#f59e0b]" /> API & Integrations
              </h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-gray-400 text-sm mb-2">API Rate Limit (requests/minute)</label>
                  <input
                    type="number"
                    value={settings.apiRateLimit}
                    onChange={(e) => setSettings({ ...settings, apiRateLimit: parseInt(e.target.value) })}
                    className="w-full px-4 py-3 bg-[#1e1433] border border-[#3d2d5c] rounded-xl text-white focus:border-[#f59e0b] outline-none transition-all"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Webhook URL</label>
                  <input
                    type="url"
                    value={settings.webhookUrl}
                    onChange={(e) => setSettings({ ...settings, webhookUrl: e.target.value })}
                    placeholder="https://your-webhook-endpoint.com"
                    className="w-full px-4 py-3 bg-[#1e1433] border border-[#3d2d5c] rounded-xl text-white placeholder-gray-500 focus:border-[#f59e0b] outline-none transition-all"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-400 text-sm mb-2">API Key</label>
                  <div className="flex gap-3">
                    <input
                      type="password"
                      value={settings.apiKey}
                      readOnly
                      className="flex-1 px-4 py-3 bg-[#1e1433] border border-[#3d2d5c] rounded-xl text-white"
                    />
                    <button className="px-4 py-3 bg-[#f59e0b]/20 text-[#f59e0b] rounded-xl hover:bg-[#f59e0b]/30 transition-all font-medium">
                      Regenerate
                    </button>
                  </div>
                  <p className="text-gray-500 text-xs mt-1">Use this key to authenticate API requests</p>
                </div>
              </div>
            </div>
          )}

          {/* Save Button */}
          <div className="flex justify-end pt-8 border-t border-[#3d2d5c] mt-8">
            <button
              onClick={handleSave}
              disabled={loading}
              className="px-8 py-3 bg-gradient-to-r from-[#f59e0b] to-[#d97706] text-white rounded-xl font-medium hover:opacity-90 transition-all shadow-lg shadow-orange-500/30 disabled:opacity-50 flex items-center gap-2"
            >
              {loading ? (
                <>
                  <FiLoader className="w-5 h-5 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <FiSave className="w-5 h-5" />
                  Save Settings
                </>
              )}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

