import { NextResponse } from 'next/server';

const mockRewards = [
  { id: 'reward_1', name: '$10 Coffee Voucher', description: 'Get $10 off at Coffee House', merchantName: 'Coffee House', pointsCost: 500, category: 'Food & Beverage', expiresAt: '2026-03-31', available: true },
  { id: 'reward_2', name: '20% Off Electronics', description: 'Get 20% off any item at Tech Store', merchantName: 'Tech Store', pointsCost: 1000, category: 'Electronics', expiresAt: '2026-02-28', available: true },
  { id: 'reward_3', name: 'Free Dessert', description: 'Complimentary dessert with any main course', merchantName: 'Restaurant Deluxe', pointsCost: 300, category: 'Food & Beverage', expiresAt: '2026-01-31', available: true },
  { id: 'reward_4', name: '$25 Shopping Credit', description: 'Use towards any purchase at Fashion Outlet', merchantName: 'Fashion Outlet', pointsCost: 1500, category: 'Shopping', expiresAt: '2026-04-30', available: true },
  { id: 'reward_5', name: 'Free Coffee', description: 'Get any coffee drink free', merchantName: 'Coffee House', pointsCost: 200, category: 'Food & Beverage', expiresAt: '2026-02-15', available: true },
  { id: 'reward_6', name: '$50 Tech Voucher', description: 'Use on any purchase over $100', merchantName: 'Tech Store', pointsCost: 2500, category: 'Electronics', expiresAt: '2026-03-15', available: true },
  { id: 'reward_7', name: 'Free Appetizer', description: 'Complimentary appetizer at Restaurant Deluxe', merchantName: 'Restaurant Deluxe', pointsCost: 400, category: 'Food & Beverage', expiresAt: '2026-02-28', available: true },
  { id: 'reward_8', name: '10% Grocery Discount', description: 'Get 10% off your grocery purchase', merchantName: 'Grocery Mart', pointsCost: 600, category: 'Grocery', expiresAt: '2026-01-31', available: true },
];

export async function GET(request) {
  try {
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const maxPoints = searchParams.get('maxPoints');

    let filtered = mockRewards;
    
    if (category) {
      filtered = filtered.filter(r => r.category === category);
    }
    
    if (maxPoints) {
      filtered = filtered.filter(r => r.pointsCost <= parseInt(maxPoints));
    }

    return NextResponse.json({
      success: true,
      data: {
        rewards: filtered,
        categories: ['Food & Beverage', 'Electronics', 'Shopping', 'Grocery'],
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { rewardId } = body;

    const reward = mockRewards.find(r => r.id === rewardId);
    
    if (!reward) {
      return NextResponse.json({ error: 'Reward not found' }, { status: 404 });
    }

    // In production, check user's points and deduct
    const redemption = {
      id: `redemption_${Date.now()}`,
      rewardId: reward.id,
      rewardName: reward.name,
      merchantName: reward.merchantName,
      pointsSpent: reward.pointsCost,
      redeemedAt: new Date().toISOString(),
      code: `REDEEM-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      expiresAt: reward.expiresAt,
      status: 'active',
    };

    return NextResponse.json({
      success: true,
      data: redemption,
      message: 'Reward redeemed successfully',
    });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
