import { NextResponse } from 'next/server';

const mockAdminData = {
  platformStats: {
    totalUsers: 12500,
    totalMerchants: 485,
    activeMerchants: 420,
    pendingMerchants: 35,
    totalTransactions: 156000,
    totalPointsCirculating: 4500000,
    totalPointsRedeemed: 1200000,
    platformRevenue: 125000,
  },
  recentActivity: [
    { id: 'act_1', type: 'merchant_signup', description: 'New merchant registration: Tech Haven', timestamp: '2025-12-28T14:30:00Z' },
    { id: 'act_2', type: 'transaction', description: 'Large transaction: 5000 points issued by Electronics Plus', timestamp: '2025-12-28T14:15:00Z' },
    { id: 'act_3', type: 'redemption', description: 'High-value redemption: $100 voucher redeemed', timestamp: '2025-12-28T13:45:00Z' },
    { id: 'act_4', type: 'user_signup', description: '50 new users registered today', timestamp: '2025-12-28T12:00:00Z' },
    { id: 'act_5', type: 'campaign', description: 'New campaign launched: Winter Sale 2x Points', timestamp: '2025-12-28T10:30:00Z' },
  ],
  pendingApprovals: [
    { id: 'merch_pending_1', businessName: 'Tech Haven', category: 'Electronics', email: 'contact@techhaven.com', appliedAt: '2025-12-27T09:00:00Z' },
    { id: 'merch_pending_2', businessName: 'Fashion Forward', category: 'Clothing', email: 'hello@fashionforward.com', appliedAt: '2025-12-26T15:30:00Z' },
    { id: 'merch_pending_3', businessName: 'Gourmet Delights', category: 'Food & Beverage', email: 'info@gourmetdelights.com', appliedAt: '2025-12-26T11:00:00Z' },
  ],
  topMerchants: [
    { id: 'merch_1', businessName: 'Coffee House', totalTransactions: 8500, totalPointsIssued: 425000, revenue: 15000 },
    { id: 'merch_2', businessName: 'Tech Store', totalTransactions: 4200, totalPointsIssued: 840000, revenue: 28000 },
    { id: 'merch_3', businessName: 'Fashion Outlet', totalTransactions: 6100, totalPointsIssued: 305000, revenue: 12000 },
    { id: 'merch_4', businessName: 'Restaurant Deluxe', totalTransactions: 5800, totalPointsIssued: 290000, revenue: 18000 },
    { id: 'merch_5', businessName: 'Grocery Mart', totalTransactions: 12000, totalPointsIssued: 360000, revenue: 9000 },
  ],
  systemHealth: {
    apiLatency: 45,
    uptime: 99.98,
    activeConnections: 1250,
    queuedJobs: 12,
    lastBackup: '2025-12-28T06:00:00Z',
  },
  charts: {
    userGrowth: {
      labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      data: [8500, 9200, 10100, 11000, 11800, 12500],
    },
    transactionVolume: {
      labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      data: [120000, 125000, 135000, 142000, 150000, 156000],
    },
    merchantSignups: {
      labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      data: [25, 32, 28, 45, 38, 42],
    },
  },
  alerts: [
    { id: 'alert_1', type: 'warning', message: 'High transaction volume detected - monitor for fraud', timestamp: '2025-12-28T14:00:00Z' },
    { id: 'alert_2', type: 'info', message: '35 merchant applications pending review', timestamp: '2025-12-28T09:00:00Z' },
  ],
};

export async function GET(request) {
  try {
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // In production, verify admin role from JWT
    await new Promise(resolve => setTimeout(resolve, 100));

    return NextResponse.json({
      success: true,
      data: mockAdminData,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Admin dashboard API error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
