// Mock Data for the application

export const mockUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', phone: '+1234567890', points: 2500, status: 'active', joinedAt: '2025-06-15' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '+1234567891', points: 1800, status: 'active', joinedAt: '2025-07-20' },
  { id: 3, name: 'Bob Wilson', email: 'bob@example.com', phone: '+1234567892', points: 500, status: 'flagged', joinedAt: '2025-08-10' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', phone: '+1234567893', points: 3200, status: 'active', joinedAt: '2025-05-01' },
  { id: 5, name: 'Charlie Davis', email: 'charlie@example.com', phone: '+1234567894', points: 750, status: 'suspended', joinedAt: '2025-09-05' },
];

export const mockMerchants = [
  { id: 1, name: 'Coffee House', email: 'coffee@example.com', category: 'Food & Beverage', status: 'approved', campaigns: 3, totalRedemptions: 450, joinedAt: '2025-04-10' },
  { id: 2, name: 'Tech Store', email: 'tech@example.com', category: 'Electronics', status: 'approved', campaigns: 5, totalRedemptions: 280, joinedAt: '2025-03-15' },
  { id: 3, name: 'Fashion Hub', email: 'fashion@example.com', category: 'Retail', status: 'pending', campaigns: 0, totalRedemptions: 0, joinedAt: '2025-12-28' },
  { id: 4, name: 'Gym Plus', email: 'gym@example.com', category: 'Health & Fitness', status: 'approved', campaigns: 2, totalRedemptions: 120, joinedAt: '2025-06-20' },
  { id: 5, name: 'Book World', email: 'books@example.com', category: 'Education', status: 'rejected', campaigns: 0, totalRedemptions: 0, joinedAt: '2025-11-10' },
];

export const mockCampaigns = [
  { id: 1, merchantId: 1, name: 'Double Points Weekend', type: 'multiplier', multiplier: 2, startDate: '2026-01-04', endDate: '2026-01-06', status: 'live', redemptions: 89 },
  { id: 2, merchantId: 1, name: 'Free Coffee at 100 Points', type: 'reward', pointsCost: 100, startDate: '2025-12-01', endDate: '2026-02-28', status: 'live', redemptions: 156 },
  { id: 3, merchantId: 2, name: '10% Off Electronics', type: 'discount', discount: 10, pointsCost: 500, startDate: '2026-01-01', endDate: '2026-01-31', status: 'live', redemptions: 42 },
  { id: 4, merchantId: 2, name: 'New Year Special', type: 'bonus', bonusPoints: 200, minPurchase: 100, startDate: '2026-01-01', endDate: '2026-01-15', status: 'live', redemptions: 78 },
  { id: 5, merchantId: 4, name: 'Free Trial Week', type: 'reward', pointsCost: 300, startDate: '2026-01-10', endDate: '2026-01-17', status: 'pending', redemptions: 0 },
];

export const mockTransactions = [
  { id: 1, userId: 1, merchantId: 1, amount: 25.50, pointsEarned: 51, type: 'purchase', status: 'validated', createdAt: '2026-01-02 14:30:00' },
  { id: 2, userId: 2, merchantId: 2, amount: 150.00, pointsEarned: 300, type: 'purchase', status: 'validated', createdAt: '2026-01-02 10:15:00' },
  { id: 3, userId: 1, merchantId: 4, amount: 45.00, pointsEarned: 90, type: 'purchase', status: 'pending', createdAt: '2026-01-03 09:45:00' },
  { id: 4, userId: 4, merchantId: 1, amount: 12.00, pointsEarned: 24, type: 'purchase', status: 'validated', createdAt: '2026-01-03 11:20:00' },
  { id: 5, userId: 3, merchantId: 2, amount: 500.00, pointsEarned: 1000, type: 'purchase', status: 'rejected', createdAt: '2026-01-01 16:00:00' },
];

export const mockRedemptions = [
  { id: 1, userId: 1, campaignId: 2, pointsSpent: 100, status: 'approved', merchantName: 'Coffee House', reward: 'Free Coffee', redeemedAt: '2026-01-02 15:00:00' },
  { id: 2, userId: 2, campaignId: 3, pointsSpent: 500, status: 'approved', merchantName: 'Tech Store', reward: '10% Off Electronics', redeemedAt: '2026-01-01 12:30:00' },
  { id: 3, userId: 4, campaignId: 2, pointsSpent: 100, status: 'pending', merchantName: 'Coffee House', reward: 'Free Coffee', redeemedAt: '2026-01-03 10:00:00' },
  { id: 4, userId: 1, campaignId: 4, pointsSpent: 0, status: 'approved', merchantName: 'Tech Store', reward: '200 Bonus Points', redeemedAt: '2026-01-02 09:00:00' },
];

export const mockLedgerEntries = [
  { id: 1, userId: 1, type: 'earn', points: 51, balance: 2551, description: 'Purchase at Coffee House', createdAt: '2026-01-02 14:30:00' },
  { id: 2, userId: 1, type: 'redeem', points: -100, balance: 2451, description: 'Redeemed: Free Coffee', createdAt: '2026-01-02 15:00:00' },
  { id: 3, userId: 2, type: 'earn', points: 300, balance: 2100, description: 'Purchase at Tech Store', createdAt: '2026-01-02 10:15:00' },
  { id: 4, userId: 1, type: 'earn', points: 200, balance: 2651, description: 'Bonus: New Year Special', createdAt: '2026-01-02 09:00:00' },
  { id: 5, userId: 4, type: 'earn', points: 24, balance: 3224, description: 'Purchase at Coffee House', createdAt: '2026-01-03 11:20:00' },
];

export const mockNotifications = [
  { id: 1, userId: 1, type: 'reward', title: 'Points Earned!', message: 'You earned 51 points from your purchase.', read: false, createdAt: '2026-01-02 14:30:00' },
  { id: 2, userId: 1, type: 'reward', title: 'Redemption Successful', message: 'Your free coffee is ready to collect!', read: false, createdAt: '2026-01-02 15:00:00' },
  { id: 3, userId: 2, type: 'campaign', title: 'New Campaign!', message: 'Tech Store is offering 10% off with points.', read: true, createdAt: '2026-01-01 09:00:00' },
  { id: 4, userId: null, type: 'system', title: 'System Maintenance', message: 'Scheduled maintenance on Jan 5th.', read: false, createdAt: '2026-01-03 08:00:00' },
];

export const mockAnomalies = [
  { id: 1, userId: 3, type: 'high_redemption', severity: 'high', description: 'Unusual redemption pattern detected', status: 'pending', detectedAt: '2026-01-01 16:30:00' },
  { id: 2, userId: 5, type: 'suspicious_activity', severity: 'high', description: 'Multiple failed transactions', status: 'reviewed', detectedAt: '2025-12-28 11:00:00' },
  { id: 3, userId: 2, type: 'location_mismatch', severity: 'low', description: 'Transaction from new location', status: 'cleared', detectedAt: '2026-01-02 10:20:00' },
];

export const mockAnalytics = {
  totalUsers: 15420,
  totalMerchants: 342,
  totalPointsIssued: 2850000,
  totalRedemptions: 12350,
  activeCampaigns: 89,
  monthlyGrowth: 12.5,
  userRetention: 78.3,
  avgTransactionValue: 45.60,
  dailyStats: [
    { date: '2025-12-28', transactions: 450, points: 45000, redemptions: 120 },
    { date: '2025-12-29', transactions: 520, points: 52000, redemptions: 145 },
    { date: '2025-12-30', transactions: 480, points: 48000, redemptions: 130 },
    { date: '2025-12-31', transactions: 610, points: 61000, redemptions: 180 },
    { date: '2026-01-01', transactions: 720, points: 72000, redemptions: 210 },
    { date: '2026-01-02', transactions: 680, points: 68000, redemptions: 195 },
    { date: '2026-01-03', transactions: 590, points: 59000, redemptions: 165 },
  ],
};
