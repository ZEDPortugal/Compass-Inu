'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiList, FiStar, FiSearch, FiBell, FiShoppingBag, FiCalendar, FiExternalLink, FiLink, FiCopy, FiCheck, FiShield } from 'react-icons/fi';
import { BsCheckCircleFill } from 'react-icons/bs';
import { HiOutlineSparkles } from 'react-icons/hi';
import UserSidebar from '@/components/UserSidebar';

export default function UserTransactions() {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedTx, setCopiedTx] = useState(null);

  // Generate mock transaction hashes for on-chain integrity
  const generateTxHash = (id) => {
    const chars = '0123456789abcdef';
    let hash = '0x';
    for (let i = 0; i < 64; i++) {
      hash += chars[Math.floor(Math.random() * chars.length)];
    }
    return hash;
  };

  const transactions = [
    { id: 1, merchant: 'Urban Café', amount: 2340.00, points: 450, date: '2026-01-03', type: 'earn', status: 'completed', txHash: '0x7a8b9c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b', blockNumber: 18234567 },
    { id: 2, merchant: 'Metro Supermarket', amount: 7800.00, points: 1500, date: '2026-01-02', type: 'earn', status: 'completed', txHash: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b', blockNumber: 18234456 },
    { id: 3, merchant: 'FitLife Gym', amount: 4160.00, points: 800, date: '2026-01-01', type: 'earn', status: 'completed', txHash: '0x2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c', blockNumber: 18234345 },
    { id: 4, merchant: 'Green Valley Market', amount: 3380.00, points: 650, date: '2025-12-30', type: 'earn', status: 'completed', txHash: '0x3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d', blockNumber: 18234234 },
    { id: 5, merchant: 'Fashion Forward', amount: 6240.00, points: 1200, date: '2025-12-28', type: 'earn', status: 'completed', txHash: '0x4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e', blockNumber: 18234123 },
    { id: 6, merchant: 'Quick Bites Diner', amount: 2860.00, points: 550, date: '2025-12-25', type: 'earn', status: 'completed', txHash: '0x5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f', blockNumber: 18234012 },
    { id: 7, merchant: 'Gift to Sarah Chen', amount: 0, points: -500, date: '2025-12-24', type: 'transfer', status: 'completed', txHash: '0x6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a', blockNumber: 18233901 },
    { id: 8, merchant: 'Free Movie Ticket - Cineplex', amount: 0, points: -1200, date: '2025-12-22', type: 'redeem', status: 'completed', txHash: '0x7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b', blockNumber: 18233790 },
  ];

  const copyToClipboard = (hash, id) => {
    navigator.clipboard.writeText(hash);
    setCopiedTx(id);
    setTimeout(() => setCopiedTx(null), 2000);
  };

  const stats = [
    { label: 'Suki Points Earned', value: '5,150', icon: FiStar, gradient: 'from-[#8b5cf6] to-[#7c3aed]' },
    { label: 'This Month', value: '2,750', icon: FiCalendar, gradient: 'from-[#a78bfa] to-[#8b5cf6]' },
    { label: 'On-Chain TXs', value: '24', icon: FiShield, gradient: 'from-[#7c3aed] to-[#6d28d9]' },
  ];

  const filteredTransactions = transactions.filter(t => {
    const matchesFilter = filter === 'all' || t.type === filter;
    const matchesSearch = t.merchant.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const truncateHash = (hash) => {
    return `${hash.slice(0, 10)}...${hash.slice(-8)}`;
  };

  return (
    <div className="min-h-screen bg-[#0f0a1a]">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#8b5cf6]/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#a78bfa]/10 rounded-full blur-[120px]" />
      </div>
      <UserSidebar active="transactions" />
      <main className="lg:ml-64 p-4 sm:p-6 lg:p-8 relative z-10">
        <header className="mb-6 sm:mb-8 flex flex-col sm:flex-row justify-between items-start gap-4 animate-[fadeInDown_0.5s_ease-out]">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2 flex items-center gap-3"><FiLink className="text-[#8b5cf6]" />On-Chain Ledger</h1>
            <p className="text-sm sm:text-base text-gray-400">Transparent, immutable record of all Suki Point transactions</p>
          </div>
          <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-none">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10 pr-4 py-2.5 sm:py-3 bg-[#1e1433]/80 rounded-xl border border-[#3d2d5c]/50 text-white placeholder-gray-500 focus:border-[#8b5cf6]/50 focus:outline-none transition-all w-full sm:w-64 text-sm sm:text-base" />
            </div>
            <button className="relative p-2.5 sm:p-3 bg-[#1e1433]/80 rounded-xl border border-[#3d2d5c]/50 hover:border-[#8b5cf6]/50 transition-all"><FiBell className="text-gray-400 text-lg sm:text-xl" /></button>
          </div>
        </header>

        {/* On-Chain Integrity Banner */}
        <div className="bg-gradient-to-r from-[#8b5cf6]/20 to-[#a78bfa]/20 rounded-2xl p-4 border border-[#8b5cf6]/30 mb-6 animate-[fadeInUp_0.5s_ease-out] flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#8b5cf6] to-[#7c3aed] flex items-center justify-center flex-shrink-0">
            <FiShield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-white font-semibold flex items-center gap-2">
              <HiOutlineSparkles className="text-[#8b5cf6]" />
              On-Chain Integrity
            </h3>
            <p className="text-sm text-gray-400">Every transaction is recorded on the blockchain. No lost or double-spent points.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 mb-6 sm:mb-8">
          {stats.map((stat, index) => (
            <div key={stat.label} className="bg-[#1e1433]/80 rounded-2xl p-6 border border-[#3d2d5c]/50 hover:border-[#8b5cf6]/50 transition-all duration-300 hover:scale-[1.02] group animate-[fadeInUp_0.5s_ease-out_forwards] opacity-0" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div><p className="text-gray-400 text-sm">{stat.label}</p><p className="text-2xl font-bold text-white">{stat.value}</p></div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-[#1e1433]/80 rounded-2xl p-4 sm:p-6 border border-[#3d2d5c]/50 animate-[fadeInUp_0.5s_ease-out_forwards] opacity-0" style={{ animationDelay: '300ms' }}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <h3 className="text-lg font-bold text-white">Transaction History</h3>
            <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto">
              {['all', 'earn', 'redeem', 'transfer'].map((f) => (
                <button key={f} onClick={() => setFilter(f)} className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${filter === f ? 'bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] text-white' : 'bg-[#0f0a1a]/50 text-gray-400 hover:text-white'}`}>
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            {filteredTransactions.map((tx, index) => (
              <div key={tx.id} className="p-4 bg-[#0f0a1a]/50 rounded-xl border border-[#3d2d5c]/30 hover:border-[#8b5cf6]/30 transition-all group animate-[fadeInUp_0.4s_ease-out_forwards] opacity-0" style={{ animationDelay: `${400 + index * 80}ms` }}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-4">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform ${
                      tx.type === 'earn' ? 'bg-gradient-to-br from-[#8b5cf6]/20 to-[#7c3aed]/20' :
                      tx.type === 'transfer' ? 'bg-gradient-to-br from-[#a78bfa]/20 to-[#8b5cf6]/20' :
                      'bg-gradient-to-br from-[#7c3aed]/20 to-[#6d28d9]/20'
                    }`}>
                      <FiShoppingBag className={`text-lg ${
                        tx.type === 'earn' ? 'text-[#8b5cf6]' :
                        tx.type === 'transfer' ? 'text-[#a78bfa]' :
                        'text-[#7c3aed]'
                      }`} />
                    </div>
                    <div>
                      <p className="font-medium text-white">{tx.merchant}</p>
                      {tx.amount > 0 && <p className="text-sm text-gray-500">${tx.amount.toLocaleString()}</p>}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold flex items-center gap-1 justify-end ${tx.points > 0 ? 'text-green-400' : 'text-red-400'}`}>
                      <FiStar className="w-4 h-4" />
                      {tx.points > 0 ? '+' : ''}{tx.points}
                    </p>
                    <p className="text-xs text-gray-500">{new Date(tx.date).toLocaleDateString()}</p>
                  </div>
                </div>
                {/* Transaction Hash Row */}
                <div className="flex items-center justify-between pt-3 border-t border-[#3d2d5c]/30">
                  <div className="flex items-center gap-2 text-xs">
                    <FiLink className="text-gray-500" />
                    <span className="text-gray-500">TX:</span>
                    <code className="text-[#8b5cf6] font-mono">{truncateHash(tx.txHash)}</code>
                    <button 
                      onClick={() => copyToClipboard(tx.txHash, tx.id)}
                      className="p-1 hover:bg-[#3d2d5c]/50 rounded transition-colors"
                    >
                      {copiedTx === tx.id ? (
                        <FiCheck className="w-3.5 h-3.5 text-green-400" />
                      ) : (
                        <FiCopy className="w-3.5 h-3.5 text-gray-500 hover:text-white" />
                      )}
                    </button>
                  </div>
                  <a 
                    href={`https://explorer.compass.inu/tx/${tx.txHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs text-[#8b5cf6] hover:text-[#a78bfa] transition-colors"
                  >
                    View on Explorer
                    <FiExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

