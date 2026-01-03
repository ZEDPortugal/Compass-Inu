'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiHome, FiUsers, FiShoppingBag, FiRadio, FiActivity, FiPieChart, FiSettings, FiLogOut, FiAlertTriangle, FiAlertCircle, FiCheck, FiX, FiEye, FiClock, FiZap, FiCpu, FiServer, FiSearch, FiBarChart2, FiBell } from 'react-icons/fi';
import AdminSidebar from '@/components/AdminSidebar';

// Mock anomalies data
const mockAnomalies = [
  { id: 1, type: 'suspicious_activity', description: 'Multiple redemptions from same IP within 5 minutes', user: 'John Doe', severity: 'high', status: 'pending', timestamp: '2026-01-05T14:30:00', details: 'IP: 192.168.1.100, 15 redemptions in 3 minutes' },
  { id: 2, type: 'unusual_pattern', description: 'Large point accumulation outside business hours', user: 'Mike Johnson', severity: 'medium', status: 'pending', timestamp: '2026-01-05T03:15:00', details: 'Earned 5000 points at 3AM when merchant is closed' },
  { id: 3, type: 'fraud_attempt', description: 'Invalid QR code scan attempts', user: 'Unknown', severity: 'high', status: 'investigating', timestamp: '2026-01-04T19:45:00', details: 'Multiple failed scan attempts with modified QR codes' },
  { id: 4, type: 'system_alert', description: 'API rate limit exceeded', user: 'System', severity: 'low', status: 'cleared', timestamp: '2026-01-04T11:00:00', details: 'API endpoint /api/points received 1000+ requests/minute' },
  { id: 5, type: 'suspicious_activity', description: 'Account created and redeemed high-value reward same day', user: 'David Wilson', severity: 'medium', status: 'pending', timestamp: '2026-01-03T16:20:00', details: 'New account redeemed $50 reward within 2 hours of registration' },
  { id: 6, type: 'unusual_pattern', description: 'Sudden spike in referral signups', user: 'Sarah Smith', severity: 'low', status: 'cleared', timestamp: '2026-01-02T09:30:00', details: '50 referrals in one day from single user' },
];

// Live metrics data
const liveMetrics = {
  activeUsers: 1247,
  transactionsPerMinute: 23,
  avgResponseTime: 145,
  errorRate: 0.02,
};

export default function AdminMonitoring() {
  const [filter, setFilter] = useState('all');
  const [selectedAnomaly, setSelectedAnomaly] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [success, setSuccess] = useState('');
  const [anomalies, setAnomalies] = useState(mockAnomalies);
  const [loading, setLoading] = useState(false);
  const [metrics, setMetrics] = useState(liveMetrics);
  const [pulseAnimation, setPulseAnimation] = useState(false);

  // Simulate live metrics updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 10 - 5),
        transactionsPerMinute: Math.max(15, prev.transactionsPerMinute + Math.floor(Math.random() * 6 - 3)),
        avgResponseTime: Math.max(80, prev.avgResponseTime + Math.floor(Math.random() * 20 - 10)),
        errorRate: Math.max(0, Math.min(1, prev.errorRate + (Math.random() * 0.01 - 0.005))),
      }));
      setPulseAnimation(true);
      setTimeout(() => setPulseAnimation(false), 300);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const filteredAnomalies = anomalies
    .filter(a => filter === 'all' || a.severity === filter || a.status === filter);

  const stats = {
    total: anomalies.length,
    high: anomalies.filter(a => a.severity === 'high').length,
    pending: anomalies.filter(a => a.status === 'pending').length,
    cleared: anomalies.filter(a => a.status === 'cleared').length,
  };

  const handleAction = async (action) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (selectedAnomaly) {
      setAnomalies(prev => prev.map(a => 
        a.id === selectedAnomaly.id 
          ? { ...a, status: action === 'clear' ? 'cleared' : action === 'investigate' ? 'investigating' : action === 'flag' ? 'flagged' : a.status }
          : a
      ));
    }
    
    setShowModal(false);
    setLoading(false);
    setSuccess(`Alert ${action === 'clear' ? 'cleared' : action === 'investigate' ? 'marked for investigation' : 'flagged'} successfully!`);
    setTimeout(() => setSuccess(''), 3000);
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'medium': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'low': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500/20 text-yellow-400';
      case 'investigating': return 'bg-orange-500/20 text-orange-400';
      case 'cleared': return 'bg-green-500/20 text-green-400';
      case 'flagged': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'suspicious_activity': return <FiSearch className="w-5 h-5" />;
      case 'unusual_pattern': return <FiBarChart2 className="w-5 h-5" />;
      case 'fraud_attempt': return <FiBell className="w-5 h-5" />;
      case 'system_alert': return <FiSettings className="w-5 h-5" />;
      default: return <FiAlertTriangle className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0a1a]">
      <AdminSidebar active="monitoring" />
      
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
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
            <h1 className="text-2xl sm:text-3xl font-bold text-white">System Monitoring</h1>
            <span className="flex items-center gap-2 px-3 py-1 bg-green-500/20 rounded-full text-green-400 text-sm w-fit">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              Live
            </span>
          </div>
          <p className="text-sm sm:text-base text-gray-400">Real-time fraud detection and system health monitoring</p>
        </header>

        {/* Live Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          {[
            { label: 'Active Users', value: metrics.activeUsers, Icon: FiUsers, suffix: '', color: 'purple' },
            { label: 'Transactions/min', value: metrics.transactionsPerMinute, Icon: FiZap, suffix: '', color: 'cyan' },
            { label: 'Avg Response Time', value: metrics.avgResponseTime, Icon: FiClock, suffix: 'ms', color: metrics.avgResponseTime > 200 ? 'orange' : 'green' },
            { label: 'Error Rate', value: (metrics.errorRate * 100).toFixed(2), Icon: FiAlertCircle, suffix: '%', color: metrics.errorRate > 0.5 ? 'red' : 'green' },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className={`bg-gradient-to-br from-[#1e1433] to-[#2a1f42] rounded-xl p-5 border border-[#3d2d5c] transition-all duration-300 opacity-0 animate-fadeInUp ${pulseAnimation ? 'scale-[1.02]' : ''}`}
              style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
            >
              <div className="flex justify-between items-start mb-3">
                <stat.Icon className="w-6 h-6 text-gray-300" />
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <p className="text-gray-400 text-sm">{stat.label}</p>
              <p className="text-2xl font-bold text-white transition-all duration-300">
                {stat.value.toLocaleString()}{stat.suffix}
              </p>
            </div>
          ))}
        </div>

        {/* Alert Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 opacity-0 animate-fadeInUp" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
          {[
            { label: 'Total Alerts', value: stats.total, Icon: FiBell, color: 'purple' },
            { label: 'High Priority', value: stats.high, Icon: FiAlertTriangle, color: 'red' },
            { label: 'Pending Review', value: stats.pending, Icon: FiClock, color: 'orange' },
            { label: 'Cleared', value: stats.cleared, Icon: FiCheck, color: 'green' },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className="bg-gradient-to-br from-[#1e1433] to-[#2a1f42] rounded-xl p-5 border border-[#3d2d5c] hover:border-[#f59e0b]/50 transition-all duration-300 hover:transform hover:scale-105"
            >
              <stat.Icon className="w-6 h-6 text-gray-300 mb-2" />
              <p className="text-gray-400 text-sm">{stat.label}</p>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2 sm:pb-0 opacity-0 animate-fadeInUp" style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}>
          {['all', 'high', 'medium', 'low', 'pending', 'investigating', 'cleared'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                filter === f 
                  ? 'bg-gradient-to-r from-[#f59e0b] to-[#d97706] text-white shadow-lg shadow-orange-500/30' 
                  : 'bg-[#1e1433] text-gray-400 hover:bg-[#2a1f42] border border-[#3d2d5c]'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Anomalies List */}
        <div className="space-y-4 opacity-0 animate-fadeInUp" style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}>
          {filteredAnomalies.map((anomaly, index) => (
            <div
              key={anomaly.id}
              className={`bg-gradient-to-br from-[#1e1433] to-[#2a1f42] rounded-2xl border ${
                anomaly.severity === 'high' ? 'border-red-500/30' : 'border-[#3d2d5c]'
              } overflow-hidden hover:border-[#f59e0b]/50 transition-all duration-300 cursor-pointer opacity-0 animate-fadeInRight`}
              style={{ animationDelay: `${(index + 5) * 100}ms`, animationFillMode: 'forwards' }}
              onClick={() => { setSelectedAnomaly(anomaly); setShowModal(true); }}
            >
              <div className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${getSeverityColor(anomaly.severity)}`}>
                      {getTypeIcon(anomaly.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1 flex-wrap">
                        <h3 className="text-white font-semibold">{anomaly.description}</h3>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getSeverityColor(anomaly.severity)}`}>
                          {anomaly.severity}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getStatusColor(anomaly.status)}`}>
                          {anomaly.status}
                        </span>
                      </div>
                      <p className="text-gray-500 text-sm">User: {anomaly.user}</p>
                      <p className="text-gray-600 text-xs mt-1">{new Date(anomaly.timestamp).toLocaleString()}</p>
                    </div>
                  </div>
                  
                  <button 
                    className="px-4 py-2 bg-[#f59e0b]/20 text-[#f59e0b] rounded-lg hover:bg-[#f59e0b]/30 transition-all text-sm font-medium"
                    onClick={(e) => { e.stopPropagation(); setSelectedAnomaly(anomaly); setShowModal(true); }}
                  >
                    Review
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Anomaly Modal */}
        {showModal && selectedAnomaly && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
            <div className="bg-gradient-to-br from-[#1e1433] to-[#2a1f42] rounded-2xl border border-[#3d2d5c] w-full max-w-lg animate-scaleIn">
              <div className="p-6 border-b border-[#3d2d5c] flex justify-between items-center">
                <h2 className="text-xl font-bold text-white">Alert Details</h2>
                <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white transition-colors">
                  <FiX className="w-6 h-6" />
                </button>
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-3xl ${getSeverityColor(selectedAnomaly.severity)}`}>
                    {getTypeIcon(selectedAnomaly.type)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getSeverityColor(selectedAnomaly.severity)}`}>
                        {selectedAnomaly.severity}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getStatusColor(selectedAnomaly.status)}`}>
                        {selectedAnomaly.status}
                      </span>
                    </div>
                    <p className="text-white font-semibold">{selectedAnomaly.type.replace('_', ' ').toUpperCase()}</p>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="bg-[#1e1433]/50 rounded-xl p-4">
                    <p className="text-gray-400 text-sm mb-1">Description</p>
                    <p className="text-white">{selectedAnomaly.description}</p>
                  </div>
                  <div className="bg-[#1e1433]/50 rounded-xl p-4">
                    <p className="text-gray-400 text-sm mb-1">Details</p>
                    <p className="text-white">{selectedAnomaly.details}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[#1e1433]/50 rounded-xl p-4">
                      <p className="text-gray-400 text-sm">User</p>
                      <p className="text-white font-medium">{selectedAnomaly.user}</p>
                    </div>
                    <div className="bg-[#1e1433]/50 rounded-xl p-4">
                      <p className="text-gray-400 text-sm">Time</p>
                      <p className="text-white font-medium">{new Date(selectedAnomaly.timestamp).toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                {selectedAnomaly.status !== 'cleared' && (
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleAction('clear')}
                      disabled={loading}
                      className="flex-1 py-3 bg-gradient-to-r from-green-500 to-green-700 text-white rounded-xl font-medium hover:opacity-90 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {loading ? 'Processing...' : <><FiCheck className="w-4 h-4" /> Clear Alert</>}
                    </button>
                    {selectedAnomaly.status !== 'investigating' && (
                      <button
                        onClick={() => handleAction('investigate')}
                        disabled={loading}
                        className="flex-1 py-3 bg-gradient-to-r from-[#f59e0b] to-[#d97706] text-white rounded-xl font-medium hover:opacity-90 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                      >
                        {loading ? 'Processing...' : <><FiSearch className="w-4 h-4" /> Investigate</>}
                      </button>
                    )}
                    <button
                      onClick={() => handleAction('flag')}
                      disabled={loading}
                      className="flex-1 py-3 bg-gradient-to-r from-red-500 to-red-700 text-white rounded-xl font-medium hover:opacity-90 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {loading ? 'Processing...' : <><FiAlertTriangle className="w-4 h-4" /> Flag User</>}
                    </button>
                  </div>
                )}
                
                {selectedAnomaly.status === 'cleared' && (
                  <button
                    onClick={() => setShowModal(false)}
                    className="w-full py-3 bg-[#2a1f42] text-gray-300 rounded-xl font-medium hover:bg-[#3d2d5c] transition-all border border-[#3d2d5c]"
                  >
                    Close
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}


