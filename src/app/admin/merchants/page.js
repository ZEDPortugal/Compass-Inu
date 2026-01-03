'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiHome, FiUsers, FiShoppingBag, FiRadio, FiActivity, FiPieChart, FiSettings, FiLogOut, FiSearch, FiChevronRight, FiStar, FiCheck, FiX, FiPlus, FiClock, FiTrendingUp, FiGift, FiAward, FiSlash } from 'react-icons/fi';
import { BsCheckCircleFill } from 'react-icons/bs';
import AdminSidebar from '@/components/AdminSidebar';

// Mock merchants data
const mockMerchants = [
  { id: 1, name: 'Urban Café', category: 'Food & Beverage', status: 'active', campaigns: 3, totalRedemptions: 1250, rating: 4.8, joinDate: '2025-11-01' },
  { id: 2, name: 'Green Valley Market', category: 'Grocery Store', status: 'active', campaigns: 2, totalRedemptions: 890, rating: 4.5, joinDate: '2025-11-15' },
  { id: 3, name: 'Fashion Forward', category: 'Retail', status: 'pending', campaigns: 0, totalRedemptions: 0, rating: 0, joinDate: '2025-12-20' },
  { id: 4, name: 'FitLife Gym', category: 'Health', status: 'active', campaigns: 5, totalRedemptions: 2100, rating: 4.9, joinDate: '2025-10-05' },
  { id: 5, name: 'Book World', category: 'Educational', status: 'suspended', campaigns: 1, totalRedemptions: 320, rating: 4.2, joinDate: '2025-09-20' },
  { id: 6, name: 'Community Cooperative', category: 'Cooperative', status: 'active', campaigns: 4, totalRedemptions: 1680, rating: 4.7, joinDate: '2025-10-28' },
];

// Category icons mapping
const categoryIcons = {
  'Food & Beverage': FiShoppingBag,
  'Grocery Store': FiShoppingBag,
  'Retail': FiGift,
  'Health': FiAward,
  'Educational': FiStar,
  'Cooperative': FiUsers,
};

// Stat Card Component
const StatCard = ({ label, value, icon: Icon, gradient, change, delay }) => (
  <div
    className="relative overflow-hidden bg-[#1e1433]/80 backdrop-blur-sm rounded-2xl p-6 border border-[#3d2d5c]/50 hover:border-[#f59e0b]/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-xl hover:shadow-orange-500/10 group animate-[fadeInUp_0.5s_ease-out_forwards] opacity-0"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
    
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
    </div>
    
    <div className="relative z-10">
      <div className="flex justify-between items-start mb-4">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        {change && (
          <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${change.startsWith('+') ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'}`}>
            <FiTrendingUp className={`w-3 h-3 ${change.startsWith('+') ? '' : 'rotate-180'}`} />
            {change}
          </div>
        )}
      </div>
      <p className="text-gray-400 text-sm mb-1">{label}</p>
      <p className="text-2xl font-bold text-white">{typeof value === 'number' ? value.toLocaleString() : value}</p>
    </div>
  </div>
);

export default function AdminMerchants() {
  const [filter, setFilter] = useState('all');
  const [selectedMerchant, setSelectedMerchant] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [success, setSuccess] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [merchants, setMerchants] = useState(mockMerchants);
  const [loading, setLoading] = useState(false);

  const filteredMerchants = merchants
    .filter(m => filter === 'all' || m.status === filter)
    .filter(m => 
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const stats = {
    total: merchants.length,
    active: merchants.filter(m => m.status === 'active').length,
    pending: merchants.filter(m => m.status === 'pending').length,
    totalRedemptions: merchants.reduce((sum, m) => sum + m.totalRedemptions, 0),
  };

  const handleAction = async (action) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (selectedMerchant) {
      setMerchants(prev => prev.map(m => 
        m.id === selectedMerchant.id 
          ? { ...m, status: action === 'approve' ? 'active' : action === 'suspend' ? 'suspended' : 'active' }
          : m
      ));
    }
    
    setShowModal(false);
    setLoading(false);
    setSuccess(`Merchant ${action === 'approve' ? 'approved' : action === 'suspend' ? 'suspended' : 'restored'} successfully!`);
    setTimeout(() => setSuccess(''), 3000);
  };

  const statCards = [
    { label: 'Partner MSMEs', value: stats.total, icon: FiShoppingBag, gradient: 'from-[#f59e0b] to-[#d97706]', change: '+12%' },
    { label: 'Active', value: stats.active, icon: FiCheck, gradient: 'from-[#22c55e] to-[#16a34a]', change: '+8%' },
    { label: 'Pending Approval', value: stats.pending, icon: FiClock, gradient: 'from-[#f59e0b] to-[#d97706]', change: '-2' },
    { label: 'Suki Redemptions', value: stats.totalRedemptions, icon: FiGift, gradient: 'from-[#fbbf24] to-[#f59e0b]', change: '+24%' },
  ];

  return (
    <div className="min-h-screen bg-[#0f0a1a]">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#f59e0b]/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#f59e0b]/10 rounded-full blur-[120px]" />
      </div>

      <AdminSidebar active="merchants" />
      
      <main className="lg:ml-64 p-4 sm:p-6 lg:p-8 relative z-10">
        {/* Success Alert */}
        {success && (
          <div className="fixed top-4 right-4 z-50 bg-green-500/20 border border-green-500/50 text-green-400 px-6 py-4 rounded-xl animate-[fadeInRight_0.3s_ease-out] flex items-center gap-3 backdrop-blur-sm">
            <BsCheckCircleFill className="w-5 h-5" />
            {success}
          </div>
        )}

        {/* Header */}
        <header className="mb-6 sm:mb-8 flex flex-col sm:flex-row justify-between items-start gap-4 animate-[fadeInDown_0.5s_ease-out]">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">MSME Partner Management</h1>
            <p className="text-sm sm:text-base text-gray-400">Manage MSMEs, cooperatives, and their loyalty campaigns</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-[#f59e0b] to-[#d97706] text-white rounded-xl font-medium hover:opacity-90 transition-all shadow-lg shadow-orange-500/30 flex items-center gap-2 hover:scale-105 text-sm sm:text-base w-full sm:w-auto justify-center"
          >
            <FiPlus className="w-5 h-5" />
            Add MSME
          </button>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 mb-6 sm:mb-8">
          {statCards.map((stat, index) => (
            <StatCard key={stat.label} {...stat} delay={index * 100} />
          ))}
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col gap-4 mb-6 animate-[fadeInUp_0.5s_ease-out_forwards] opacity-0" style={{ animationDelay: '300ms' }}>
          <div className="relative">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search merchants..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-2.5 sm:py-3 bg-[#1e1433]/80 backdrop-blur-sm border border-[#3d2d5c]/50 rounded-xl text-white placeholder-gray-500 focus:border-[#f59e0b]/50 outline-none transition-all text-sm sm:text-base"
            />
          </div>
          
          <div className="flex gap-2">
            {['all', 'active', 'pending', 'suspended'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-5 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                  filter === status 
                    ? 'bg-gradient-to-r from-[#f59e0b] to-[#d97706] text-white shadow-lg shadow-orange-500/30' 
                    : 'bg-[#1e1433]/80 backdrop-blur-sm text-gray-400 hover:text-white hover:bg-[#2a1f42] border border-[#3d2d5c]/50'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Merchants Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMerchants.map((merchant, index) => {
            const CategoryIcon = categoryIcons[merchant.category] || FiShoppingBag;
            return (
              <div
                key={merchant.id}
                className="bg-[#1e1433]/80 backdrop-blur-sm rounded-2xl border border-[#3d2d5c]/50 overflow-hidden hover:border-[#f59e0b]/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-xl hover:shadow-orange-500/10 group cursor-pointer animate-[fadeInUp_0.5s_ease-out_forwards] opacity-0"
                style={{ animationDelay: `${400 + index * 100}ms` }}
                onClick={() => { setSelectedMerchant(merchant); setShowModal(true); }}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#f59e0b]/20 to-[#d97706]/20 border border-[#3d2d5c]/50 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                      <CategoryIcon className="w-7 h-7 text-[#f59e0b]" />
                    </div>
                    <span className={`px-3 py-1.5 rounded-full text-xs font-semibold inline-flex items-center gap-1.5 ${
                      merchant.status === 'active' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                      merchant.status === 'pending' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' :
                      'bg-red-500/20 text-red-400 border border-red-500/30'
                    }`}>
                      {merchant.status === 'active' && <FiCheck className="w-3 h-3" />}
                      {merchant.status === 'pending' && <FiClock className="w-3 h-3" />}
                      {merchant.status === 'suspended' && <FiX className="w-3 h-3" />}
                      {merchant.status}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-1 group-hover:text-[#f59e0b] transition-colors">{merchant.name}</h3>
                  <p className="text-gray-400 text-sm mb-4">{merchant.category}</p>
                  
                  <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[#3d2d5c]/30">
                    <div className="text-center">
                      <p className="text-white font-bold">{merchant.campaigns}</p>
                      <p className="text-gray-500 text-xs">Campaigns</p>
                    </div>
                    <div className="text-center">
                      <p className="text-white font-bold">{merchant.totalRedemptions.toLocaleString()}</p>
                      <p className="text-gray-500 text-xs">Redemptions</p>
                    </div>
                    <div className="text-center">
                      <p className="text-white font-bold flex items-center justify-center gap-1">
                        {merchant.rating > 0 ? merchant.rating : '-'}
                        {merchant.rating > 0 && <FiStar className="w-3 h-3 text-yellow-400" />}
                      </p>
                      <p className="text-gray-500 text-xs">Rating</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Merchant Modal */}
        {showModal && selectedMerchant && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-[fadeIn_0.2s_ease-out]">
            <div className="bg-[#1e1433]/95 backdrop-blur-xl rounded-2xl border border-[#3d2d5c]/50 w-full max-w-lg animate-[scaleIn_0.3s_ease-out] shadow-2xl">
              <div className="p-6 border-b border-[#3d2d5c]/50 flex justify-between items-center">
                <h2 className="text-xl font-bold text-white">Merchant Details</h2>
                <button onClick={() => setShowModal(false)} className="p-2 text-gray-400 hover:text-white hover:bg-[#3d2d5c]/50 rounded-lg transition-all">
                  <FiX className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#f59e0b]/30 to-[#d97706]/30 border border-[#3d2d5c]/50 flex items-center justify-center">
                    {(() => {
                      const CategoryIcon = categoryIcons[selectedMerchant.category] || FiShoppingBag;
                      return <CategoryIcon className="w-8 h-8 text-[#f59e0b]" />;
                    })()}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{selectedMerchant.name}</h3>
                    <p className="text-gray-400">{selectedMerchant.category}</p>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between py-3 border-b border-[#3d2d5c]/30">
                    <span className="text-gray-400">Status</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold inline-flex items-center gap-1.5 ${
                      selectedMerchant.status === 'active' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                      selectedMerchant.status === 'pending' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' :
                      'bg-red-500/20 text-red-400 border border-red-500/30'
                    }`}>
                      {selectedMerchant.status}
                    </span>
                  </div>
                  {[
                    { label: 'Active Campaigns', value: selectedMerchant.campaigns },
                    { label: 'Total Redemptions', value: selectedMerchant.totalRedemptions.toLocaleString() },
                    { label: 'Rating', value: selectedMerchant.rating > 0 ? `${selectedMerchant.rating} / 5.0` : 'No ratings yet' },
                    { label: 'Joined', value: new Date(selectedMerchant.joinDate).toLocaleDateString() },
                  ].map((item) => (
                    <div key={item.label} className="flex justify-between py-3 border-b border-[#3d2d5c]/30">
                      <span className="text-gray-400">{item.label}</span>
                      <span className="text-white font-medium">{item.value}</span>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3">
                  {selectedMerchant.status === 'pending' ? (
                    <button
                      onClick={() => handleAction('approve')}
                      disabled={loading}
                      className="flex-1 py-3 bg-gradient-to-r from-green-500 to-green-700 text-white rounded-xl font-medium hover:opacity-90 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {loading ? 'Processing...' : <><FiCheck className="w-4 h-4" /> Approve Merchant</>}
                    </button>
                  ) : selectedMerchant.status === 'suspended' ? (
                    <button
                      onClick={() => handleAction('restore')}
                      disabled={loading}
                      className="flex-1 py-3 bg-gradient-to-r from-green-500 to-green-700 text-white rounded-xl font-medium hover:opacity-90 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {loading ? 'Processing...' : <><FiCheck className="w-4 h-4" /> Restore Merchant</>}
                    </button>
                  ) : (
                    <button
                      onClick={() => handleAction('suspend')}
                      disabled={loading}
                      className="flex-1 py-3 bg-gradient-to-r from-red-500 to-red-700 text-white rounded-xl font-medium hover:opacity-90 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {loading ? 'Processing...' : <><FiSlash className="w-4 h-4" /> Suspend Merchant</>}
                    </button>
                  )}
                  <button
                    onClick={() => setShowModal(false)}
                    className="flex-1 py-3 bg-[#0f0a1a]/50 text-gray-300 rounded-xl font-medium hover:bg-[#3d2d5c]/50 transition-all border border-[#3d2d5c]/50"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Add Merchant Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-[fadeIn_0.2s_ease-out]">
            <div className="bg-[#1e1433]/95 backdrop-blur-xl rounded-2xl border border-[#3d2d5c]/50 w-full max-w-lg animate-[scaleIn_0.3s_ease-out] shadow-2xl">
              <div className="p-6 border-b border-[#3d2d5c]/50 flex justify-between items-center">
                <h2 className="text-xl font-bold text-white">Add New Merchant</h2>
                <button onClick={() => setShowAddModal(false)} className="p-2 text-gray-400 hover:text-white hover:bg-[#3d2d5c]/50 rounded-lg transition-all">
                  <FiX className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Business Name</label>
                  <input
                    type="text"
                    placeholder="Enter business name"
                    className="w-full px-4 py-3 bg-[#0f0a1a]/50 border border-[#3d2d5c]/50 rounded-xl text-white placeholder-gray-500 focus:border-[#f59e0b]/50 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Category</label>
                  <select className="w-full px-4 py-3 bg-[#0f0a1a]/50 border border-[#3d2d5c]/50 rounded-xl text-white focus:border-[#f59e0b]/50 outline-none transition-all">
                    <option value="">Select category</option>
                    <option value="food">Food & Beverage</option>
                    <option value="retail">Retail</option>
                    <option value="electronics">Electronics</option>
                    <option value="health">Health & Fitness</option>
                    <option value="entertainment">Entertainment</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Contact Email</label>
                  <input
                    type="email"
                    placeholder="merchant@email.com"
                    className="w-full px-4 py-3 bg-[#0f0a1a]/50 border border-[#3d2d5c]/50 rounded-xl text-white placeholder-gray-500 focus:border-[#f59e0b]/50 outline-none transition-all"
                  />
                </div>
                
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => {
                      setShowAddModal(false);
                      setSuccess('Merchant invitation sent successfully!');
                      setTimeout(() => setSuccess(''), 3000);
                    }}
                    className="flex-1 py-3 bg-gradient-to-r from-[#f59e0b] to-[#d97706] text-white rounded-xl font-medium hover:opacity-90 transition-all"
                  >
                    Send Invitation
                  </button>
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 py-3 bg-[#0f0a1a]/50 text-gray-300 rounded-xl font-medium hover:bg-[#3d2d5c]/50 transition-all border border-[#3d2d5c]/50"
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

