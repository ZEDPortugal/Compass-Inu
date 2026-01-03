import { NextResponse } from 'next/server';

const mockCampaigns = [
  {
    id: 'camp_1',
    name: 'Double Points Weekend',
    description: 'Earn 2x points on all purchases this weekend',
    type: 'multiplier',
    multiplier: 2,
    status: 'active',
    startsAt: '2026-01-04',
    endsAt: '2026-01-05',
    createdAt: '2025-12-20',
    participatingCustomers: 245,
    pointsIssued: 4500,
  },
  {
    id: 'camp_2',
    name: 'Happy Hour Bonus',
    description: 'Extra 25 points during happy hour',
    type: 'bonus',
    bonusPoints: 25,
    status: 'active',
    startsAt: '2025-12-01',
    endsAt: '2026-01-31',
    timeRestriction: '14:00-17:00',
    createdAt: '2025-11-28',
    participatingCustomers: 180,
    pointsIssued: 3200,
  },
  {
    id: 'camp_3',
    name: 'New Customer Welcome',
    description: '100 bonus points for first purchase',
    type: 'welcome',
    bonusPoints: 100,
    status: 'active',
    startsAt: '2025-01-01',
    endsAt: '2026-12-31',
    createdAt: '2024-12-15',
    participatingCustomers: 520,
    pointsIssued: 52000,
  },
  {
    id: 'camp_4',
    name: 'Holiday Triple Points',
    description: '3x points during holidays',
    type: 'multiplier',
    multiplier: 3,
    status: 'completed',
    startsAt: '2025-12-24',
    endsAt: '2025-12-26',
    createdAt: '2025-12-01',
    participatingCustomers: 890,
    pointsIssued: 25000,
  },
];

export async function GET(request) {
  try {
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    let filtered = mockCampaigns;
    if (status) {
      filtered = mockCampaigns.filter(c => c.status === status);
    }

    return NextResponse.json({
      success: true,
      data: {
        campaigns: filtered,
        stats: {
          total: mockCampaigns.length,
          active: mockCampaigns.filter(c => c.status === 'active').length,
          completed: mockCampaigns.filter(c => c.status === 'completed').length,
        },
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
    const { name, description, type, multiplier, bonusPoints, startsAt, endsAt, timeRestriction } = body;

    if (!name || !type || !startsAt || !endsAt) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newCampaign = {
      id: `camp_${Date.now()}`,
      name,
      description,
      type,
      multiplier: type === 'multiplier' ? multiplier : undefined,
      bonusPoints: type === 'bonus' || type === 'welcome' ? bonusPoints : undefined,
      status: 'active',
      startsAt,
      endsAt,
      timeRestriction,
      createdAt: new Date().toISOString().split('T')[0],
      participatingCustomers: 0,
      pointsIssued: 0,
    };

    return NextResponse.json({
      success: true,
      data: newCampaign,
      message: 'Campaign created successfully',
    });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
