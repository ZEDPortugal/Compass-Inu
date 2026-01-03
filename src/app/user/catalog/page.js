'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FiShoppingCart, FiStar, FiBell, FiX, FiCheck, FiFilter, FiSearch, FiPackage, FiSmartphone, FiCoffee, FiShoppingBag, FiTruck } from 'react-icons/fi';
import { BsCheckCircleFill, BsWallet2 } from 'react-icons/bs';
import { HiOutlineSparkles } from 'react-icons/hi';
import UserSidebar from '@/components/UserSidebar';

export default function RewardsCatalog() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const [category, setCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const userPoints = 5500;

  const categories = [
    { id: 'all', name: 'All Items', icon: FiShoppingBag },
    { id: 'load', name: 'Mobile Load', icon: FiSmartphone },
    { id: 'food', name: 'Food & Drinks', icon: FiCoffee },
    { id: 'goods', name: 'Goods', icon: FiPackage },
    { id: 'delivery', name: 'Delivery', icon: FiTruck },
  ];

  const catalogItems = [
    // Mobile Load
    { id: 1, name: '$5 Mobile Credit', points: 500, category: 'load', icon: FiSmartphone, stock: 'Unlimited', description: 'Instant mobile credit for any carrier' },
    { id: 2, name: '$10 Mobile Credit', points: 950, category: 'load', icon: FiSmartphone, stock: 'Unlimited', description: 'Instant mobile credit for any carrier' },
    { id: 3, name: '$5 Prepaid Card', points: 500, category: 'load', icon: FiSmartphone, stock: 'Unlimited', description: 'Digital prepaid card balance' },
    { id: 4, name: '$10 Prepaid Card', points: 950, category: 'load', icon: FiSmartphone, stock: 'Unlimited', description: 'Digital prepaid card balance' },
    
    // Food & Drinks
    { id: 5, name: 'Burger Combo Meal', points: 800, category: 'food', icon: FiCoffee, stock: '50 left', description: 'Redeemable at participating restaurants' },
    { id: 6, name: 'Premium Lunch Set', points: 1200, category: 'food', icon: FiCoffee, stock: '30 left', description: 'Full meal at partner restaurants' },
    { id: 7, name: 'Specialty Coffee', points: 1500, category: 'food', icon: FiCoffee, stock: '25 left', description: 'Any handcrafted specialty drink' },
    { id: 8, name: 'Coffee Bundle (2 cups)', points: 600, category: 'food', icon: FiCoffee, stock: '100 left', description: 'Two cups of brewed coffee' },
    
    // Goods
    { id: 9, name: 'Premium Rice (5lb)', points: 400, category: 'goods', icon: FiPackage, stock: '200 left', description: 'Quality rice from local suppliers' },
    { id: 10, name: 'Grocery Bundle $50', points: 4500, category: 'goods', icon: FiPackage, stock: '50 left', description: 'Assorted grocery items worth $50' },
    { id: 11, name: 'School Supplies Kit', points: 1000, category: 'goods', icon: FiPackage, stock: '75 left', description: 'Notebooks, pens, and basic school supplies' },
    { id: 12, name: 'Personal Care Pack', points: 800, category: 'goods', icon: FiPackage, stock: '60 left', description: 'Soap, shampoo, and toiletries' },
    
    // Delivery
    { id: 13, name: '$5 Delivery Voucher', points: 500, category: 'delivery', icon: FiTruck, stock: 'Unlimited', description: 'Valid for food or grocery delivery' },
    { id: 14, name: '$10 Delivery Credit', points: 950, category: 'delivery', icon: FiTruck, stock: 'Unlimited', description: 'For same-day deliveries' },
    { id: 15, name: 'Free Shipping Voucher', points: 300, category: 'delivery', icon: FiTruck, stock: 'Unlimited', description: 'Free shipping voucher up to $5' },
  ];

  const filteredItems = catalogItems.filter(item => {
    const matchesCategory = category === 'all' || item.category === category;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleRedeem = () => {
    setShowModal(false);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 5000);
  };

  return (
    <div className="min-h-screen bg-[#0f0a1a]">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#8b5cf6]/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#a78bfa]/10 rounded-full blur-[120px]" />
      </div>
      <UserSidebar active="catalog" />
      <main className="lg:ml-64 p-4 sm:p-6 lg:p-8 relative z-10">
        {success && (
          <div className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-xl flex items-center gap-3 animate-[fadeInDown_0.3s_ease-out]">
            <BsCheckCircleFill className="text-green-400 text-xl" />
            <span className="text-green-400 font-medium">Item redeemed successfully! Check your email for redemption details.</span>
          </div>
        )}

        <header className="mb-6 sm:mb-8 flex flex-col sm:flex-row justify-between items-start gap-4 animate-[fadeInDown_0.5s_ease-out]">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2 flex items-center gap-3">
              <FiShoppingCart className="text-[#8b5cf6]" />
              Rewards Catalog
            </h1>
            <p className="text-sm sm:text-base text-gray-400">Convert your Suki Points into tangible goods and services</p>
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
                <p className="text-gray-400 text-xs sm:text-sm">Available Points</p>
                <p className="text-2xl sm:text-3xl font-bold text-white">{userPoints.toLocaleString()} <span className="text-base sm:text-lg text-[#8b5cf6]">pts</span></p>
              </div>
            </div>
            <div className="text-left sm:text-right">
              <p className="text-gray-400 text-xs sm:text-sm">Catalog Items</p>
              <p className="text-xl sm:text-2xl font-bold text-white">{catalogItems.length}</p>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search catalog..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-[#1e1433]/80 rounded-xl border border-[#3d2d5c]/50 text-white placeholder-gray-500 focus:border-[#8b5cf6]/50 focus:outline-none transition-all"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="mb-6 overflow-x-auto pb-2">
          <div className="flex gap-2 min-w-max">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all ${
                  category === cat.id
                    ? 'bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] text-white'
                    : 'bg-[#1e1433]/80 text-gray-400 hover:text-white border border-[#3d2d5c]/50'
                }`}
              >
                <cat.icon className="w-4 h-4" />
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Catalog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {filteredItems.map((item, index) => {
            const canAfford = userPoints >= item.points;
            return (
              <div
                key={item.id}
                className={`bg-[#1e1433]/80 rounded-2xl p-5 border border-[#3d2d5c]/50 hover:border-[#8b5cf6]/50 transition-all duration-300 hover:scale-[1.02] group animate-[fadeInUp_0.5s_ease-out_forwards] opacity-0 ${!canAfford ? 'opacity-60' : ''}`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="aspect-square bg-gradient-to-br from-[#8b5cf6]/20 to-[#7c3aed]/20 rounded-xl mb-4 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <item.icon className="w-12 h-12 text-[#8b5cf6]" />
                </div>

                <div className="flex items-center justify-between mb-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    canAfford ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                  }`}>
                    {canAfford ? 'Available' : 'Need more pts'}
                  </span>
                  <span className="text-xs text-gray-500">{item.stock}</span>
                </div>

                <h3 className="font-bold text-white mb-1 line-clamp-2">{item.name}</h3>
                <p className="text-sm text-gray-400 mb-3 line-clamp-2">{item.description}</p>

                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1 text-lg font-bold text-[#8b5cf6]">
                    <FiStar className="w-4 h-4" />
                    {item.points.toLocaleString()}
                  </span>
                  <button
                    onClick={() => { if (canAfford) { setSelectedItem(item); setShowModal(true); } }}
                    disabled={!canAfford}
                    className={`px-4 py-2 rounded-lg font-medium transition-all text-sm ${
                      canAfford
                        ? 'bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] text-white hover:opacity-90'
                        : 'bg-gray-600/50 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    Redeem
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <FiShoppingBag className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">No items found matching your criteria</p>
          </div>
        )}

        {/* Redemption Modal */}
        {showModal && selectedItem && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50" onClick={() => setShowModal(false)}>
            <div className="bg-[#1e1433]/95 backdrop-blur-xl rounded-2xl p-6 w-full max-w-md border border-[#3d2d5c]/50 animate-[fadeInUp_0.3s_ease-out]" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <FiShoppingCart className="text-[#8b5cf6]" />
                  Confirm Redemption
                </h3>
                <button onClick={() => setShowModal(false)} className="p-2 hover:bg-[#3d2d5c]/50 rounded-lg">
                  <FiX className="text-gray-400 text-xl" />
                </button>
              </div>

              <div className="bg-[#0f0a1a]/50 rounded-xl p-4 mb-6 border border-[#3d2d5c]/30">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#8b5cf6]/20 to-[#7c3aed]/20 flex items-center justify-center">
                    <selectedItem.icon className="w-7 h-7 text-[#8b5cf6]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">{selectedItem.name}</h4>
                    <p className="text-sm text-gray-400">{selectedItem.description}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center py-3 border-b border-[#3d2d5c]/30">
                  <span className="text-gray-400">Your Balance</span>
                  <span className="font-bold text-white">{userPoints.toLocaleString()} pts</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-[#3d2d5c]/30">
                  <span className="text-gray-400">Cost</span>
                  <span className="font-bold text-red-400">-{selectedItem.points.toLocaleString()} pts</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-400">New Balance</span>
                  <span className="font-bold text-green-400">{(userPoints - selectedItem.points).toLocaleString()} pts</span>
                </div>
              </div>

              <div className="bg-[#8b5cf6]/10 border border-[#8b5cf6]/20 rounded-xl p-3 mb-6">
                <p className="text-sm text-[#8b5cf6] flex items-start gap-2">
                  <HiOutlineSparkles className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  Redemption details will be sent to your registered email/phone.
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-3 bg-[#0f0a1a]/50 border border-[#3d2d5c]/50 rounded-xl text-gray-400 font-medium hover:text-white transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleRedeem}
                  className="flex-1 py-3 bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] rounded-xl text-white font-medium hover:opacity-90 transition-all flex items-center justify-center gap-2"
                >
                  <FiCheck className="text-lg" />
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
