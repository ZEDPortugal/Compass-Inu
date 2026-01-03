import { NextResponse } from 'next/server';

// Mock user data - In production, this would come from a database
const mockUserData = {
  user: {
    id: 'user_1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1234567890',
    avatar: null,
    memberSince: '2024-01-15',
    tier: 'Gold',
  },
  stats: {
    totalPoints: 2450,
    availablePoints: 1850,
    pendingPoints: 200,
    redeemedPoints: 400,
    totalTransactions: 45,
    totalRedemptions: 8,
  },
  recentTransactions: [
    {
      id: 'txn_1',
      merchantName: 'Coffee House',
      merchantLogo: null,
      type: 'earn',
      points: 50,
      amount: 25.00,
      date: '2025-12-28T10:30:00Z',
      status: 'completed',
    },
    {
      id: 'txn_2',
      merchantName: 'Tech Store',
      merchantLogo: null,
      type: 'earn',
      points: 200,
      amount: 199.99,
      date: '2025-12-27T14:15:00Z',
      status: 'completed',
    },
    {
      id: 'txn_3',
      merchantName: 'Fashion Outlet',
      merchantLogo: null,
      type: 'earn',
      points: 150,
      amount: 89.50,
      date: '2025-12-26T16:45:00Z',
      status: 'completed',
    },
    {
      id: 'txn_4',
      merchantName: 'Grocery Mart',
      merchantLogo: null,
      type: 'earn',
      points: 75,
      amount: 45.00,
      date: '2025-12-25T09:20:00Z',
      status: 'completed',
    },
    {
      id: 'txn_5',
      merchantName: 'Restaurant Deluxe',
      merchantLogo: null,
      type: 'redeem',
      points: -500,
      amount: 0,
      date: '2025-12-24T19:00:00Z',
      status: 'completed',
      reward: 'Free Dinner Voucher',
    },
  ],
  availableRewards: [
    {
      id: 'reward_1',
      name: '$10 Coffee Voucher',
      description: 'Get $10 off at Coffee House',
      merchantName: 'Coffee House',
      pointsCost: 500,
      category: 'Food & Beverage',
      expiresAt: '2026-03-31',
      image: null,
    },
    {
      id: 'reward_2',
      name: '20% Off Electronics',
      description: 'Get 20% off any item at Tech Store',
      merchantName: 'Tech Store',
      pointsCost: 1000,
      category: 'Electronics',
      expiresAt: '2026-02-28',
      image: null,
    },
    {
      id: 'reward_3',
      name: 'Free Dessert',
      description: 'Complimentary dessert with any main course',
      merchantName: 'Restaurant Deluxe',
      pointsCost: 300,
      category: 'Food & Beverage',
      expiresAt: '2026-01-31',
      image: null,
    },
    {
      id: 'reward_4',
      name: '$25 Shopping Credit',
      description: 'Use towards any purchase at Fashion Outlet',
      merchantName: 'Fashion Outlet',
      pointsCost: 1500,
      category: 'Shopping',
      expiresAt: '2026-04-30',
      image: null,
    },
  ],
  activeCampaigns: [
    {
      id: 'campaign_1',
      name: 'Double Points Weekend',
      merchantName: 'Coffee House',
      description: 'Earn 2x points on all purchases this weekend',
      multiplier: 2,
      startsAt: '2026-01-04',
      endsAt: '2026-01-05',
    },
    {
      id: 'campaign_2',
      name: 'New Year Bonus',
      merchantName: 'Tech Store',
      description: 'Extra 100 bonus points on purchases over $50',
      bonusPoints: 100,
      minPurchase: 50,
      startsAt: '2026-01-01',
      endsAt: '2026-01-15',
    },
  ],
  notifications: [
    {
      id: 'notif_1',
      type: 'reward',
      title: 'New Reward Available!',
      message: 'You have enough points to redeem a $10 Coffee Voucher',
      read: false,
      createdAt: '2025-12-28T12:00:00Z',
    },
    {
      id: 'notif_2',
      type: 'campaign',
      title: 'Double Points This Weekend',
      message: 'Earn 2x points at Coffee House this weekend',
      read: false,
      createdAt: '2025-12-27T10:00:00Z',
    },
    {
      id: 'notif_3',
      type: 'points',
      title: 'Points Earned',
      message: 'You earned 50 points from Coffee House',
      read: true,
      createdAt: '2025-12-26T11:30:00Z',
    },
  ],
};

export async function GET(request) {
  try {
    // In production, verify JWT token and fetch user-specific data
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized', message: 'Missing or invalid authorization token' },
        { status: 401 }
      );
    }

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));

    return NextResponse.json({
      success: true,
      data: mockUserData,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('User dashboard API error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', message: 'Failed to fetch dashboard data' },
      { status: 500 }
    );
  }
}
