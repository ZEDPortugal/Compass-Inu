'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FiHome, FiUsers, FiShoppingBag, FiRadio, FiActivity, FiPieChart, FiSettings, FiLogOut, FiSearch, FiChevronRight, FiBell, FiStar, FiCheck, FiX, FiAlertTriangle, FiTrendingUp, FiUserCheck, FiUserX, FiSlash } from 'react-icons/fi';
import { BsCheckCircleFill } from 'react-icons/bs';
import AdminSidebar from '@/components/AdminSidebar';

// Mock users data
const mockUsers = [
  { id: 1, name: 'Maria Santos', email: 'maria@email.com', phone: '+639171234567', points: 12500, status: 'active', joinDate: '2025-12-15', avatar: 'M', transactions: 45 },
  { id: 2, name: 'Juan dela Cruz', email: 'juan@email.com', phone: '+639181234568', points: 8900, status: 'active', joinDate: '2025-12-18', avatar: 'J', transactions: 32 },
  { id: 3, name: 'Pedro Reyes', email: 'pedro@email.com', phone: '+639191234569', points: 3200, status: 'flagged', joinDate: '2025-12-20', avatar: 'P', transactions: 12 },
  { id: 4, name: 'Ana Gonzales', email: 'ana@email.com', phone: '+639201234570', points: 15600, status: 'active', joinDate: '2025-12-22', avatar: 'A', transactions: 67 },
  { id: 5, name: 'Jose Mendoza', email: 'jose@email.com', phone: '+639211234571', points: 200, status: 'suspended', joinDate: '2025-12-25', avatar: 'J', transactions: 3 },
  { id: 6, name: 'Rosa Villanueva', email: 'rosa@email.com', phone: '+639221234572', points: 9800, status: 'active', joinDate: '2025-12-28', avatar: 'R', transactions: 28 },
];

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

export default function AdminUsers() {
  const [filter, setFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [success, setSuccess] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState(mockUsers);
  const [loading, setLoading] = useState(false);

  const filteredUsers = users
    .filter(u => filter === 'all' || u.status === filter)
    .filter(u => 
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const stats = {
    total: users.length,
    active: users.filter(u => u.status === 'active').length,
    flagged: users.filter(u => u.status === 'flagged').length,
    suspended: users.filter(u => u.status === 'suspended').length,
    totalPoints: users.reduce((sum, u) => sum + u.points, 0),
  };

  const handleAction = async (action) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (selectedUser) {
      setUsers(prev => prev.map(u => 
        u.id === selectedUser.id 
          ? { ...u, status: action === 'suspend' ? 'suspended' : 'active' }
          : u
      ));
    }
    
    setShowModal(false);
    setLoading(false);
    setSuccess(`User ${action === 'suspend' ? 'suspended' : 'restored'} successfully!`);
    setTimeout(() => setSuccess(''), 3000);
  };

  const statCards = [
    { label: 'Suki Members', value: stats.total, icon: FiUsers, gradient: 'from-[#f59e0b] to-[#d97706]', change: '+12%' },
    { label: 'Active', value: stats.active, icon: FiUserCheck, gradient: 'from-[#22c55e] to-[#16a34a]', change: '+8%' },
    { label: 'Flagged', value: stats.flagged, icon: FiAlertTriangle, gradient: 'from-[#f59e0b] to-[#d97706]', change: '-2' },
    { label: 'Suspended', value: stats.suspended, icon: FiSlash, gradient: 'from-[#ef4444] to-[#dc2626]', change: '0' },
    { label: 'Suki Points Issued', value: stats.totalPoints, icon: FiStar, gradient: 'from-[#fbbf24] to-[#f59e0b]', change: '+15%' },
  ];

  return (
    <div className="min-h-screen bg-[#0f0a1a]">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#f59e0b]/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#f59e0b]/10 rounded-full blur-[120px]" />
      </div>

      <AdminSidebar active="users" />
      
      <main className="lg:ml-64 p-4 sm:p-6 lg:p-8 relative z-10">
        {/* Success Alert */}
        {success && (
          <div className="fixed top-4 right-4 z-50 bg-green-500/20 border border-green-500/50 text-green-400 px-6 py-4 rounded-xl animate-[fadeInRight_0.3s_ease-out] flex items-center gap-3 backdrop-blur-sm">
            <BsCheckCircleFill className="w-5 h-5" />
            {success}
          </div>
        )}

        {/* Header */}
        <header className="mb-6 sm:mb-8 animate-[fadeInDown_0.5s_ease-out]">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">Suki Member Management</h1>
          <p className="text-sm sm:text-base text-gray-400">View and manage all platform users</p>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-5 mb-6 sm:mb-8">
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
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-2.5 sm:py-3 bg-[#1e1433]/80 backdrop-blur-sm border border-[#3d2d5c]/50 rounded-xl text-white placeholder-gray-500 focus:border-[#f59e0b]/50 outline-none transition-all text-sm sm:text-base"
            />
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-2">
            {['all', 'active', 'flagged', 'suspended'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-3 sm:px-5 py-2 sm:py-3 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 whitespace-nowrap ${
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

        {/* Users Table */}
        <div className="bg-[#1e1433]/80 backdrop-blur-sm rounded-2xl border border-[#3d2d5c]/50 overflow-hidden animate-[fadeInUp_0.5s_ease-out_forwards] opacity-0" style={{ animationDelay: '400ms' }}>
          <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="bg-[#0f0a1a]/50">
                <th className="text-left px-6 py-4 text-gray-400 font-medium text-sm">User</th>
                <th className="text-left px-6 py-4 text-gray-400 font-medium text-sm">Contact</th>
                <th className="text-left px-6 py-4 text-gray-400 font-medium text-sm">Points</th>
                <th className="text-left px-6 py-4 text-gray-400 font-medium text-sm">Status</th>
                <th className="text-left px-6 py-4 text-gray-400 font-medium text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr 
                  key={user.id}
                  className="border-t border-[#3d2d5c]/30 hover:bg-[#1a0f2e] transition-all duration-300 animate-[fadeInUp_0.4s_ease-out_forwards] opacity-0"
                  style={{ animationDelay: `${500 + index * 80}ms` }}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold bg-gradient-to-br from-[#f59e0b] to-[#d97706] group-hover:scale-105 transition-transform">
                        {user.avatar}
                      </div>
                      <div>
                        <p className="text-white font-medium">{user.name}</p>
                        <p className="text-gray-500 text-sm">ID: #{user.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-gray-300">{user.email}</p>
                    <p className="text-gray-500 text-sm">{user.phone}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-white font-semibold">{user.points.toLocaleString()}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1.5 rounded-full text-xs font-semibold inline-flex items-center gap-1.5 ${
                      user.status === 'active' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                      user.status === 'flagged' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' :
                      'bg-red-500/20 text-red-400 border border-red-500/30'
                    }`}>
                      {user.status === 'active' && <FiCheck className="w-3 h-3" />}
                      {user.status === 'flagged' && <FiAlertTriangle className="w-3 h-3" />}
                      {user.status === 'suspended' && <FiX className="w-3 h-3" />}
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button 
                      onClick={() => { setSelectedUser(user); setShowModal(true); }}
                      className="px-4 py-2 bg-[#f59e0b]/20 text-[#f59e0b] rounded-lg hover:bg-[#f59e0b]/30 transition-all text-sm font-medium border border-[#f59e0b]/30 hover:scale-105"
                    >
                      Manage
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>

        {/* User Modal */}
        {showModal && selectedUser && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-[fadeIn_0.2s_ease-out]">
            <div className="bg-[#1e1433]/95 backdrop-blur-xl rounded-2xl border border-[#3d2d5c]/50 w-full max-w-lg animate-[scaleIn_0.3s_ease-out] shadow-2xl">
              <div className="p-6 border-b border-[#3d2d5c]/50 flex justify-between items-center">
                <h2 className="text-xl font-bold text-white">User Details</h2>
                <button onClick={() => setShowModal(false)} className="p-2 text-gray-400 hover:text-white hover:bg-[#3d2d5c]/50 rounded-lg transition-all">
                  <FiX className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-white bg-gradient-to-br from-[#f59e0b] to-[#d97706]">
                    {selectedUser.avatar}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{selectedUser.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold inline-flex items-center gap-1.5 ${
                      selectedUser.status === 'active' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                      selectedUser.status === 'flagged' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' :
                      'bg-red-500/20 text-red-400 border border-red-500/30'
                    }`}>
                      {selectedUser.status === 'active' && <FiCheck className="w-3 h-3" />}
                      {selectedUser.status === 'flagged' && <FiAlertTriangle className="w-3 h-3" />}
                      {selectedUser.status === 'suspended' && <FiX className="w-3 h-3" />}
                      {selectedUser.status}
                    </span>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  {[
                    { label: 'Email', value: selectedUser.email },
                    { label: 'Phone', value: selectedUser.phone },
                    { label: 'Points', value: selectedUser.points.toLocaleString() + ' pts' },
                    { label: 'Joined', value: new Date(selectedUser.joinDate).toLocaleDateString() },
                  ].map((item) => (
                    <div key={item.label} className="flex justify-between py-3 border-b border-[#3d2d5c]/30">
                      <span className="text-gray-400">{item.label}</span>
                      <span className="text-white font-medium">{item.value}</span>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3">
                  {selectedUser.status !== 'suspended' ? (
                    <button
                      onClick={() => handleAction('suspend')}
                      disabled={loading}
                      className="flex-1 py-3 bg-gradient-to-r from-red-500 to-red-700 text-white rounded-xl font-medium hover:opacity-90 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {loading ? 'Processing...' : <><FiSlash className="w-4 h-4" /> Suspend User</>}
                    </button>
                  ) : (
                    <button
                      onClick={() => handleAction('restore')}
                      disabled={loading}
                      className="flex-1 py-3 bg-gradient-to-r from-green-500 to-green-700 text-white rounded-xl font-medium hover:opacity-90 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {loading ? 'Processing...' : <><FiCheck className="w-4 h-4" /> Restore User</>}
                    </button>
                  )}
                  <button
                    onClick={() => setShowModal(false)}
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

