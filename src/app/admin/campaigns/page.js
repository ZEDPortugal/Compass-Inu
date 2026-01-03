'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiHome, FiUsers, FiShoppingBag, FiRadio, FiActivity, FiPieChart, FiSettings, FiLogOut, FiSearch, FiFilter, FiPlay, FiPause, FiStopCircle, FiPlus, FiCalendar, FiDollarSign, FiTrendingUp, FiVolume2, FiCircle, FiCreditCard, FiCheck, FiX } from 'react-icons/fi';
import AdminSidebar from '@/components/AdminSidebar';

// Mock campaigns data
const mockCampaigns = [
  { id: 1, name: 'Summer Coffee Rewards', merchant: 'Coffee House', type: 'points', status: 'active', startDate: '2025-12-01', endDate: '2026-02-28', participants: 1250, redemptions: 890, budget: 5000, spent: 3200 },
  { id: 2, name: 'Tech Cashback Bonanza', merchant: 'Tech Store', type: 'cashback', status: 'active', startDate: '2025-12-15', endDate: '2026-01-31', participants: 680, redemptions: 320, budget: 10000, spent: 4800 },
  { id: 3, name: 'Fashion Friday Deals', merchant: 'Fashion Outlet', type: 'discount', status: 'scheduled', startDate: '2026-01-10', endDate: '2026-03-10', participants: 0, redemptions: 0, budget: 3000, spent: 0 },
  { id: 4, name: 'Fitness New Year', merchant: 'Fitness Center', type: 'points', status: 'active', startDate: '2025-12-20', endDate: '2026-02-20', participants: 450, redemptions: 180, budget: 2500, spent: 900 },
  { id: 5, name: 'Book Lovers Week', merchant: 'Book Corner', type: 'discount', status: 'completed', startDate: '2025-11-01', endDate: '2025-12-15', participants: 890, redemptions: 650, budget: 1500, spent: 1500 },
  { id: 6, name: 'Pet Paradise Loyalty', merchant: 'Pet Paradise', type: 'points', status: 'active', startDate: '2025-11-15', endDate: '2026-05-15', participants: 1680, redemptions: 1200, budget: 8000, spent: 5600 },
];

export default function AdminCampaigns() {
  const [filter, setFilter] = useState('all');
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [success, setSuccess] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [campaigns, setCampaigns] = useState(mockCampaigns);
  const [loading, setLoading] = useState(false);

  const filteredCampaigns = campaigns
    .filter(c => filter === 'all' || c.status === filter || c.type === filter)
    .filter(c => 
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.merchant.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const stats = {
    total: campaigns.length,
    active: campaigns.filter(c => c.status === 'active').length,
    scheduled: campaigns.filter(c => c.status === 'scheduled').length,
    totalBudget: campaigns.reduce((sum, c) => sum + c.budget, 0),
    totalSpent: campaigns.reduce((sum, c) => sum + c.spent, 0),
  };

  const handleAction = async (action) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (selectedCampaign) {
      setCampaigns(prev => prev.map(c => 
        c.id === selectedCampaign.id 
          ? { ...c, status: action === 'pause' ? 'paused' : action === 'resume' ? 'active' : action === 'end' ? 'completed' : c.status }
          : c
      ));
    }
    
    setShowModal(false);
    setLoading(false);
    setSuccess(`Campaign ${action === 'pause' ? 'paused' : action === 'resume' ? 'resumed' : 'ended'} successfully!`);
    setTimeout(() => setSuccess(''), 3000);
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'points': return 'bg-orange-500/20 text-orange-400';
      case 'cashback': return 'bg-amber-500/20 text-amber-400';
      case 'discount': return 'bg-yellow-500/20 text-yellow-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-400';
      case 'scheduled': return 'bg-blue-500/20 text-blue-400';
      case 'paused': return 'bg-orange-500/20 text-orange-400';
      case 'completed': return 'bg-gray-500/20 text-gray-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0a1a]">
      <AdminSidebar active="campaigns" />
      
      <main className="lg:ml-64 p-4 sm:p-6 lg:p-8">
        {/* Success Alert */}
        {success && (
          <div className="fixed top-4 right-4 z-50 bg-green-500/20 border border-green-500/50 text-green-400 px-6 py-4 rounded-xl animate-slideInRight flex items-center gap-3">
            <FiCheck className="w-5 h-5" />
            {success}
          </div>
        )}

        {/* Header */}
        <header className="mb-6 sm:mb-8 flex flex-col sm:flex-row justify-between items-start gap-4 opacity-0 animate-fadeInDown" style={{ animationFillMode: 'forwards' }}>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Campaign Management</h1>
            <p className="text-sm sm:text-base text-gray-400">Create and monitor marketing campaigns</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-[#f59e0b] to-[#d97706] text-white rounded-xl font-medium hover:opacity-90 transition-all shadow-lg shadow-orange-500/30 flex items-center gap-2 text-sm sm:text-base w-full sm:w-auto justify-center"
          >
            <FiPlus className="w-5 h-5" />
            Create Campaign
          </button>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-6 sm:mb-8">
          {[
            { label: 'Total Campaigns', value: stats.total, Icon: FiVolume2, color: 'purple' },
            { label: 'Active', value: stats.active, Icon: FiCircle, color: 'green' },
            { label: 'Scheduled', value: stats.scheduled, Icon: FiCalendar, color: 'blue' },
            { label: 'Total Budget', value: `$${stats.totalBudget.toLocaleString()}`, Icon: FiDollarSign, color: 'cyan' },
            { label: 'Total Spent', value: `$${stats.totalSpent.toLocaleString()}`, Icon: FiCreditCard, color: 'orange' },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className="bg-gradient-to-br from-[#1e1433] to-[#2a1f42] rounded-xl p-5 border border-[#3d2d5c] hover:border-[#f59e0b]/50 transition-all duration-300 hover:transform hover:scale-105 opacity-0 animate-fadeInUp"
              style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
            >
              <stat.Icon className="w-6 h-6 text-gray-300 mb-2" />
              <p className="text-gray-400 text-sm">{stat.label}</p>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col gap-4 mb-6 opacity-0 animate-fadeInUp" style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}>
          <div className="relative">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search campaigns..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-2.5 sm:py-3 bg-[#1e1433] border border-[#3d2d5c] rounded-xl text-white placeholder-gray-500 focus:border-[#f59e0b] outline-none transition-all text-sm sm:text-base"
            />
          </div>
          
          <div className="flex gap-2 flex-wrap overflow-x-auto pb-2">
            {['all', 'active', 'scheduled', 'completed', 'points', 'cashback', 'discount'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 sm:px-4 py-2 sm:py-3 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                  filter === f 
                    ? 'bg-gradient-to-r from-[#f59e0b] to-[#d97706] text-white shadow-lg shadow-orange-500/30' 
                    : 'bg-[#1e1433] text-gray-400 hover:bg-[#2a1f42] border border-[#3d2d5c]'
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Campaigns List */}
        <div className="space-y-4 opacity-0 animate-fadeInUp" style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}>
          {filteredCampaigns.map((campaign, index) => (
            <div
              key={campaign.id}
              className="bg-gradient-to-br from-[#1e1433] to-[#2a1f42] rounded-2xl border border-[#3d2d5c] overflow-hidden hover:border-[#f59e0b]/50 transition-all duration-300 cursor-pointer opacity-0 animate-fadeInRight"
              style={{ animationDelay: `${(index + 5) * 100}ms`, animationFillMode: 'forwards' }}
              onClick={() => { setSelectedCampaign(campaign); setShowModal(true); }}
            >
              <div className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-white">{campaign.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(campaign.status)}`}>
                        {campaign.status}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getTypeColor(campaign.type)}`}>
                        {campaign.type}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm">{campaign.merchant}</p>
                    <p className="text-gray-500 text-xs mt-1">
                      {new Date(campaign.startDate).toLocaleDateString()} - {new Date(campaign.endDate).toLocaleDateString()}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-8">
                    <div className="text-center">
                      <p className="text-white font-bold text-lg">{campaign.participants.toLocaleString()}</p>
                      <p className="text-gray-500 text-xs">Participants</p>
                    </div>
                    <div className="text-center">
                      <p className="text-white font-bold text-lg">{campaign.redemptions.toLocaleString()}</p>
                      <p className="text-gray-500 text-xs">Redemptions</p>
                    </div>
                    <div className="text-center min-w-[100px]">
                      <div className="flex items-center gap-2 justify-center">
                        <p className="text-white font-bold">${campaign.spent.toLocaleString()}</p>
                        <p className="text-gray-500">/ ${campaign.budget.toLocaleString()}</p>
                      </div>
                      <div className="w-full bg-[#3d2d5c] rounded-full h-2 mt-2">
                        <div 
                          className="bg-gradient-to-r from-[#f59e0b] to-[#d97706] h-2 rounded-full transition-all duration-500"
                          style={{ width: `${Math.min((campaign.spent / campaign.budget) * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Campaign Modal */}
        {showModal && selectedCampaign && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
            <div className="bg-gradient-to-br from-[#1e1433] to-[#2a1f42] rounded-2xl border border-[#3d2d5c] w-full max-w-2xl animate-scaleIn">
              <div className="p-6 border-b border-[#3d2d5c] flex justify-between items-center">
                <h2 className="text-xl font-bold text-white">Campaign Details</h2>
                <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white transition-colors">
                  <FiX className="w-6 h-6" />
                </button>
              </div>
              
              <div className="p-6">
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-2xl font-bold text-white">{selectedCampaign.name}</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(selectedCampaign.status)}`}>
                      {selectedCampaign.status}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getTypeColor(selectedCampaign.type)}`}>
                      {selectedCampaign.type}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  {[
                    { label: 'Merchant', value: selectedCampaign.merchant },
                    { label: 'Start Date', value: new Date(selectedCampaign.startDate).toLocaleDateString() },
                    { label: 'End Date', value: new Date(selectedCampaign.endDate).toLocaleDateString() },
                    { label: 'Participants', value: selectedCampaign.participants.toLocaleString() },
                    { label: 'Redemptions', value: selectedCampaign.redemptions.toLocaleString() },
                    { label: 'Budget', value: `$${selectedCampaign.budget.toLocaleString()}` },
                    { label: 'Spent', value: `$${selectedCampaign.spent.toLocaleString()}` },
                    { label: 'Remaining', value: `$${(selectedCampaign.budget - selectedCampaign.spent).toLocaleString()}` },
                  ].map((item) => (
                    <div key={item.label} className="bg-[#1e1433]/50 rounded-xl p-4">
                      <p className="text-gray-400 text-sm">{item.label}</p>
                      <p className="text-white font-bold text-lg">{item.value}</p>
                    </div>
                  ))}
                </div>

                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Budget Usage</span>
                    <span className="text-white">{Math.round((selectedCampaign.spent / selectedCampaign.budget) * 100)}%</span>
                  </div>
                  <div className="w-full bg-[#3d2d5c] rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-[#f59e0b] to-[#d97706] h-3 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min((selectedCampaign.spent / selectedCampaign.budget) * 100, 100)}%` }}
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  {selectedCampaign.status === 'active' ? (
                    <>
                      <button
                        onClick={() => handleAction('pause')}
                        disabled={loading}
                        className="flex-1 py-3 bg-gradient-to-r from-orange-500 to-orange-700 text-white rounded-xl font-medium hover:opacity-90 transition-all disabled:opacity-50"
                      >
                        {loading ? 'Processing...' : '⏸️ Pause Campaign'}
                      </button>
                      <button
                        onClick={() => handleAction('end')}
                        disabled={loading}
                        className="flex-1 py-3 bg-gradient-to-r from-red-500 to-red-700 text-white rounded-xl font-medium hover:opacity-90 transition-all disabled:opacity-50"
                      >
                        {loading ? 'Processing...' : '⏹️ End Campaign'}
                      </button>
                    </>
                  ) : selectedCampaign.status === 'paused' ? (
                    <button
                      onClick={() => handleAction('resume')}
                      disabled={loading}
                      className="flex-1 py-3 bg-gradient-to-r from-green-500 to-green-700 text-white rounded-xl font-medium hover:opacity-90 transition-all disabled:opacity-50"
                    >
                      {loading ? 'Processing...' : '▶️ Resume Campaign'}
                    </button>
                  ) : null}
                  <button
                    onClick={() => setShowModal(false)}
                    className="flex-1 py-3 bg-[#2a1f42] text-gray-300 rounded-xl font-medium hover:bg-[#3d2d5c] transition-all border border-[#3d2d5c]"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Create Campaign Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
            <div className="bg-gradient-to-br from-[#1e1433] to-[#2a1f42] rounded-2xl border border-[#3d2d5c] w-full max-w-lg animate-scaleIn max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-[#3d2d5c] flex justify-between items-center sticky top-0 bg-[#1e1433]">
                <h2 className="text-xl font-bold text-white">Create Campaign</h2>
                <button onClick={() => setShowCreateModal(false)} className="text-gray-400 hover:text-white transition-colors">
                  <FiX className="w-6 h-6" />
                </button>
              </div>
              
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Campaign Name</label>
                  <input
                    type="text"
                    placeholder="Enter campaign name"
                    className="w-full px-4 py-3 bg-[#1e1433] border border-[#3d2d5c] rounded-xl text-white placeholder-gray-500 focus:border-[#f59e0b] outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Merchant</label>
                  <select className="w-full px-4 py-3 bg-[#1e1433] border border-[#3d2d5c] rounded-xl text-white focus:border-[#f59e0b] outline-none transition-all">
                    <option value="">Select merchant</option>
                    <option value="1">Coffee House</option>
                    <option value="2">Tech Store</option>
                    <option value="3">Fitness Center</option>
                    <option value="4">Pet Paradise</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Campaign Type</label>
                  <select className="w-full px-4 py-3 bg-[#1e1433] border border-[#3d2d5c] rounded-xl text-white focus:border-[#f59e0b] outline-none transition-all">
                    <option value="">Select type</option>
                    <option value="points">Points Reward</option>
                    <option value="cashback">Cashback</option>
                    <option value="discount">Discount</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Start Date</label>
                    <input
                      type="date"
                      className="w-full px-4 py-3 bg-[#1e1433] border border-[#3d2d5c] rounded-xl text-white focus:border-[#f59e0b] outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">End Date</label>
                    <input
                      type="date"
                      className="w-full px-4 py-3 bg-[#1e1433] border border-[#3d2d5c] rounded-xl text-white focus:border-[#f59e0b] outline-none transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Budget ($)</label>
                  <input
                    type="number"
                    placeholder="5000"
                    className="w-full px-4 py-3 bg-[#1e1433] border border-[#3d2d5c] rounded-xl text-white placeholder-gray-500 focus:border-[#f59e0b] outline-none transition-all"
                  />
                </div>
                
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => {
                      setShowCreateModal(false);
                      setSuccess('Campaign created successfully!');
                      setTimeout(() => setSuccess(''), 3000);
                    }}
                    className="flex-1 py-3 bg-gradient-to-r from-[#f59e0b] to-[#d97706] text-white rounded-xl font-medium hover:opacity-90 transition-all"
                  >
                    Create Campaign
                  </button>
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 py-3 bg-[#2a1f42] text-gray-300 rounded-xl font-medium hover:bg-[#3d2d5c] transition-all border border-[#3d2d5c]"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

