'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FiArrowLeft, FiArrowRight, FiCheck, FiStar, FiPercent, FiZap, FiCalendar, FiGift, FiClock, FiTarget } from 'react-icons/fi';
import MerchantSidebar from '@/components/MerchantSidebar';

const campaignTypes = [
  { id: 'points_multiplier', name: 'Points Multiplier', description: 'Multiply points earned on purchases', icon: FiStar, gradient: 'from-[#06b6d4] to-[#0891b2]' },
  { id: 'discount', name: 'Discount', description: 'Offer percentage or flat discounts', icon: FiPercent, gradient: 'from-[#22c55e] to-[#16a34a]' },
  { id: 'bonus_points', name: 'Bonus Points', description: 'Award extra points for actions', icon: FiZap, gradient: 'from-[#8b5cf6] to-[#7c3aed]' },
  { id: 'special_reward', name: 'Special Reward', description: 'Unlock exclusive rewards', icon: FiGift, gradient: 'from-[#ec4899] to-[#db2777]' },
];

export default function NewCampaign() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [campaign, setCampaign] = useState({
    type: '',
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    value: '',
    minPurchase: '',
    targetAudience: 'all',
  });

  const handleTypeSelect = (typeId) => {
    setCampaign({ ...campaign, type: typeId });
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    // Handle campaign creation
    router.push('/merchant/campaigns');
  };

  const selectedType = campaignTypes.find(t => t.id === campaign.type);

  return (
    <div className="min-h-screen bg-[#0f0a1a]">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#06b6d4]/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#22d3ee]/10 rounded-full blur-[120px]" />
      </div>
      <MerchantSidebar active="campaigns" />
      <main className="lg:ml-64 p-4 sm:p-6 lg:p-8 relative z-10">
        <header className="mb-6 sm:mb-8 animate-[fadeInDown_0.5s_ease-out]">
          <Link href="/merchant/campaigns" className="inline-flex items-center gap-2 text-gray-400 hover:text-[#06b6d4] transition-colors mb-4 text-sm sm:text-base">
            <FiArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            Back to Campaigns
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2 flex items-center gap-3"><RiMegaphoneLine className="text-[#06b6d4]" />Create Campaign</h1>
          <p className="text-sm sm:text-base text-gray-400">Set up a new loyalty campaign for your customers</p>
        </header>

        {/* Progress Steps */}
        <div className="mb-6 sm:mb-8 animate-[fadeInUp_0.5s_ease-out]">
          <div className="flex items-center justify-between max-w-2xl mx-auto overflow-x-auto pb-2 sm:pb-0">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center flex-shrink-0">
                <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 text-sm sm:text-base ${step >= s ? 'bg-gradient-to-r from-[#06b6d4] to-[#0891b2] text-white' : 'bg-[#1e1433] text-gray-500 border border-[#3d2d5c]/50'}`}>
                  {step > s ? <FiCheck className="w-4 h-4 sm:w-5 sm:h-5" /> : s}
                </div>
                <span className={`ml-2 sm:ml-3 font-medium text-xs sm:text-base ${step >= s ? 'text-white' : 'text-gray-500'}`}>
                  {s === 1 ? 'Type' : s === 2 ? 'Details' : 'Review'}
                </span>
                {s < 3 && <div className={`w-12 sm:w-24 h-1 mx-2 sm:mx-4 rounded-full ${step > s ? 'bg-gradient-to-r from-[#06b6d4] to-[#0891b2]' : 'bg-[#3d2d5c]/50'}`} />}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="max-w-3xl mx-auto">
          {step === 1 && (
            <div className="bg-[#1e1433]/80 rounded-2xl p-4 sm:p-8 border border-[#3d2d5c]/50 animate-[fadeInUp_0.5s_ease-out_forwards] opacity-0" style={{ animationDelay: '200ms' }}>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6">Select Campaign Type</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {campaignTypes.map((type, index) => (
                  <button key={type.id} onClick={() => handleTypeSelect(type.id)} className={`p-6 rounded-xl border transition-all duration-300 text-left group animate-[fadeInUp_0.4s_ease-out_forwards] opacity-0 ${campaign.type === type.id ? 'bg-gradient-to-br from-[#06b6d4]/20 to-[#0891b2]/10 border-[#06b6d4]/50' : 'bg-[#0f0a1a]/50 border-[#3d2d5c]/30 hover:border-[#06b6d4]/30'}`} style={{ animationDelay: `${300 + index * 100}ms` }}>
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${type.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <type.icon className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-white font-semibold mb-2">{type.name}</h4>
                    <p className="text-gray-400 text-sm">{type.description}</p>
                    {campaign.type === type.id && (
                      <div className="absolute top-4 right-4">
                        <FiCheck className="text-[#06b6d4]" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="bg-[#1e1433]/80 rounded-2xl p-4 sm:p-8 border border-[#3d2d5c]/50 animate-[fadeInUp_0.5s_ease-out_forwards] opacity-0" style={{ animationDelay: '200ms' }}>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6">Campaign Details</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Campaign Name</label>
                  <input type="text" value={campaign.name} onChange={(e) => setCampaign({ ...campaign, name: e.target.value })} placeholder="Enter campaign name" className="w-full px-4 py-3 bg-[#0f0a1a]/50 rounded-xl border border-[#3d2d5c]/50 text-white placeholder-gray-500 focus:border-[#06b6d4]/50 focus:outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Description</label>
                  <textarea value={campaign.description} onChange={(e) => setCampaign({ ...campaign, description: e.target.value })} placeholder="Describe your campaign" rows={3} className="w-full px-4 py-3 bg-[#0f0a1a]/50 rounded-xl border border-[#3d2d5c]/50 text-white placeholder-gray-500 focus:border-[#06b6d4]/50 focus:outline-none transition-all resize-none" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2"><FiCalendar className="inline mr-2" />Start Date</label>
                    <input type="date" value={campaign.startDate} onChange={(e) => setCampaign({ ...campaign, startDate: e.target.value })} className="w-full px-4 py-3 bg-[#0f0a1a]/50 rounded-xl border border-[#3d2d5c]/50 text-white focus:border-[#06b6d4]/50 focus:outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2"><FiClock className="inline mr-2" />End Date</label>
                    <input type="date" value={campaign.endDate} onChange={(e) => setCampaign({ ...campaign, endDate: e.target.value })} className="w-full px-4 py-3 bg-[#0f0a1a]/50 rounded-xl border border-[#3d2d5c]/50 text-white focus:border-[#06b6d4]/50 focus:outline-none transition-all" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">{selectedType?.id === 'points_multiplier' ? 'Multiplier (e.g., 2x)' : selectedType?.id === 'discount' ? 'Discount %' : 'Bonus Points'}</label>
                    <input type="number" value={campaign.value} onChange={(e) => setCampaign({ ...campaign, value: e.target.value })} placeholder="Enter value" className="w-full px-4 py-3 bg-[#0f0a1a]/50 rounded-xl border border-[#3d2d5c]/50 text-white placeholder-gray-500 focus:border-[#06b6d4]/50 focus:outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Min. Purchase ($)</label>
                    <input type="number" value={campaign.minPurchase} onChange={(e) => setCampaign({ ...campaign, minPurchase: e.target.value })} placeholder="Optional" className="w-full px-4 py-3 bg-[#0f0a1a]/50 rounded-xl border border-[#3d2d5c]/50 text-white placeholder-gray-500 focus:border-[#06b6d4]/50 focus:outline-none transition-all" />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2"><FiTarget className="inline mr-2" />Target Audience</label>
                  <div className="flex gap-3">
                    {['all', 'new', 'returning', 'vip'].map((audience) => (
                      <button key={audience} onClick={() => setCampaign({ ...campaign, targetAudience: audience })} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${campaign.targetAudience === audience ? 'bg-gradient-to-r from-[#06b6d4] to-[#0891b2] text-white' : 'bg-[#0f0a1a]/50 text-gray-400 hover:text-white border border-[#3d2d5c]/50'}`}>
                        {audience.charAt(0).toUpperCase() + audience.slice(1)} Customers
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="bg-[#1e1433]/80 rounded-2xl p-8 border border-[#3d2d5c]/50 animate-[fadeInUp_0.5s_ease-out_forwards] opacity-0" style={{ animationDelay: '200ms' }}>
              <h3 className="text-xl font-bold text-white mb-6">Review Campaign</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4 p-4 bg-[#0f0a1a]/50 rounded-xl border border-[#3d2d5c]/30">
                  {selectedType && (
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${selectedType.gradient} flex items-center justify-center`}>
                      <selectedType.icon className="w-6 h-6 text-white" />
                    </div>
                  )}
                  <div>
                    <h4 className="text-white font-semibold">{campaign.name || 'Unnamed Campaign'}</h4>
                    <p className="text-gray-400 text-sm">{selectedType?.name}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-[#0f0a1a]/50 rounded-xl border border-[#3d2d5c]/30">
                    <p className="text-gray-400 text-sm mb-1">Duration</p>
                    <p className="text-white font-medium">{campaign.startDate || 'TBD'} - {campaign.endDate || 'TBD'}</p>
                  </div>
                  <div className="p-4 bg-[#0f0a1a]/50 rounded-xl border border-[#3d2d5c]/30">
                    <p className="text-gray-400 text-sm mb-1">Value</p>
                    <p className="text-[#06b6d4] font-bold text-xl">{campaign.value || '0'}{selectedType?.id === 'points_multiplier' ? 'x' : selectedType?.id === 'discount' ? '%' : ' pts'}</p>
                  </div>
                </div>
                {campaign.description && (
                  <div className="p-4 bg-[#0f0a1a]/50 rounded-xl border border-[#3d2d5c]/30">
                    <p className="text-gray-400 text-sm mb-1">Description</p>
                    <p className="text-white">{campaign.description}</p>
                  </div>
                )}
                <div className="p-4 bg-[#0f0a1a]/50 rounded-xl border border-[#3d2d5c]/30">
                  <p className="text-gray-400 text-sm mb-1">Target Audience</p>
                  <p className="text-white capitalize">{campaign.targetAudience} Customers</p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 animate-[fadeInUp_0.5s_ease-out_forwards] opacity-0" style={{ animationDelay: '400ms' }}>
            <button onClick={handleBack} disabled={step === 1} className={`px-6 py-3 rounded-xl font-medium flex items-center gap-2 transition-all duration-300 ${step === 1 ? 'opacity-50 cursor-not-allowed bg-[#1e1433] text-gray-500' : 'bg-[#1e1433] text-white hover:bg-[#3d2d5c] border border-[#3d2d5c]/50'}`}>
              <FiArrowLeft className="w-5 h-5" />Back
            </button>
            {step < 3 ? (
              <button onClick={handleNext} disabled={step === 1 && !campaign.type} className={`px-6 py-3 rounded-xl font-medium flex items-center gap-2 transition-all duration-300 ${step === 1 && !campaign.type ? 'opacity-50 cursor-not-allowed bg-gray-600 text-gray-400' : 'bg-gradient-to-r from-[#06b6d4] to-[#0891b2] text-white hover:shadow-lg hover:shadow-cyan-500/25'}`}>
                Continue<FiArrowRight className="w-5 h-5" />
              </button>
            ) : (
              <button onClick={handleSubmit} className="px-6 py-3 rounded-xl font-medium flex items-center gap-2 bg-gradient-to-r from-[#22c55e] to-[#16a34a] text-white hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300">
                <FiCheck className="w-5 h-5" />Create Campaign
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

