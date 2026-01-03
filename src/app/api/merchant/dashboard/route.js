import { NextResponse } from 'next/server';

const mockMerchantData = {
  merchant: {
    id: 'merchant_1',
    businessName: 'Coffee House',
    email: 'contact@coffeehouse.com',
    phone: '+1987654321',
    address: '123 Main Street, Downtown',
    category: 'Food & Beverage',
    status: 'active',
    joinedAt: '2024-06-15',
    logo: null,
  },
  stats: {
    totalCustomers: 1250,
    activeCustomers: 890,
    totalPointsIssued: 125000,
    totalPointsRedeemed: 45000,
    totalTransactions: 3450,
    totalRedemptions: 520,
    averageTransactionValue: 28.50,
    conversionRate: 15.2,
  },
  recentTransactions: [
    { id: 'txn_m1', customerName: 'John D.', type: 'earn', points: 50, amount: 25.00, date: '2025-12-28T10:30:00Z' },
    { id: 'txn_m2', customerName: 'Sarah M.', type: 'earn', points: 30, amount: 15.00, date: '2025-12-28T09:45:00Z' },
    { id: 'txn_m3', customerName: 'Mike R.', type: 'redeem', points: -200, amount: 0, date: '2025-12-28T09:15:00Z', reward: 'Free Coffee' },
    { id: 'txn_m4', customerName: 'Emily L.', type: 'earn', points: 45, amount: 22.50, date: '2025-12-27T16:30:00Z' },
    { id: 'txn_m5', customerName: 'David K.', type: 'earn', points: 60, amount: 30.00, date: '2025-12-27T15:00:00Z' },
  ],
  activeCampaigns: [
    {
      id: 'camp_1',
      name: 'Double Points Weekend',
      type: 'multiplier',
      multiplier: 2,
      status: 'active',
      startsAt: '2026-01-04',
      endsAt: '2026-01-05',
      participatingCustomers: 245,
      pointsIssued: 4500,
    },
    {
      id: 'camp_2',
      name: 'Happy Hour Bonus',
      type: 'bonus',
      bonusPoints: 25,
      status: 'active',
      startsAt: '2025-12-01',
      endsAt: '2026-01-31',
      timeRestriction: '14:00-17:00',
      participatingCustomers: 180,
      pointsIssued: 3200,
    },
  ],
  topCustomers: [
    { id: 'cust_1', name: 'John Doe', totalSpent: 1250.00, totalPoints: 2500, visits: 45 },
    { id: 'cust_2', name: 'Sarah Miller', totalSpent: 980.00, totalPoints: 1960, visits: 38 },
    { id: 'cust_3', name: 'Mike Roberts', totalSpent: 850.00, totalPoints: 1700, visits: 32 },
    { id: 'cust_4', name: 'Emily Lee', totalSpent: 720.00, totalPoints: 1440, visits: 28 },
    { id: 'cust_5', name: 'David Kim', totalSpent: 650.00, totalPoints: 1300, visits: 25 },
  ],
  pendingRedemptions: [
    { id: 'red_1', customerName: 'Alice W.', reward: '$10 Voucher', code: 'REDEEM-ABC123', requestedAt: '2025-12-28T11:00:00Z' },
    { id: 'red_2', customerName: 'Bob T.', reward: 'Free Coffee', code: 'REDEEM-DEF456', requestedAt: '2025-12-28T10:45:00Z' },
  ],
  revenueChart: {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    data: [1200, 1450, 1100, 1680, 2100, 2800, 2400],
  },
  pointsChart: {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    issued: [600, 725, 550, 840, 1050, 1400, 1200],
    redeemed: [200, 150, 300, 250, 400, 500, 350],
  },
};

export async function GET(request) {
  try {
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await new Promise(resolve => setTimeout(resolve, 100));

    return NextResponse.json({
      success: true,
      data: mockMerchantData,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Merchant dashboard API error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
