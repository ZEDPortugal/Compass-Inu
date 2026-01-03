import { NextResponse } from 'next/server';

const mockUsers = [
  { id: 'user_1', name: 'John Doe', email: 'john@example.com', phone: '+1234567890', status: 'active', joinedAt: '2024-01-15', totalPoints: 2450, tier: 'Gold' },
  { id: 'user_2', name: 'Sarah Miller', email: 'sarah@example.com', phone: '+1234567891', status: 'active', joinedAt: '2024-02-20', totalPoints: 1960, tier: 'Silver' },
  { id: 'user_3', name: 'Mike Roberts', email: 'mike@example.com', phone: '+1234567892', status: 'active', joinedAt: '2024-03-10', totalPoints: 1700, tier: 'Silver' },
  { id: 'user_4', name: 'Emily Lee', email: 'emily@example.com', phone: '+1234567893', status: 'active', joinedAt: '2024-04-05', totalPoints: 1440, tier: 'Bronze' },
  { id: 'user_5', name: 'David Kim', email: 'david@example.com', phone: '+1234567894', status: 'active', joinedAt: '2024-05-12', totalPoints: 1300, tier: 'Bronze' },
  { id: 'user_6', name: 'Alice Wong', email: 'alice@example.com', phone: '+1234567895', status: 'suspended', joinedAt: '2024-06-01', totalPoints: 500, tier: 'Bronze', suspendedAt: '2025-12-01', reason: 'Fraudulent activity' },
  { id: 'user_7', name: 'Bob Thompson', email: 'bob@example.com', phone: '+1234567896', status: 'inactive', joinedAt: '2024-01-20', totalPoints: 200, tier: 'Bronze', lastActiveAt: '2024-06-15' },
];

export async function GET(request) {
  try {
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const tier = searchParams.get('tier');
    const search = searchParams.get('search');

    let filtered = mockUsers;
    
    if (status) {
      filtered = filtered.filter(u => u.status === status);
    }
    
    if (tier) {
      filtered = filtered.filter(u => u.tier === tier);
    }
    
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(u => 
        u.name.toLowerCase().includes(searchLower) || 
        u.email.toLowerCase().includes(searchLower)
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        users: filtered,
        stats: {
          total: mockUsers.length,
          active: mockUsers.filter(u => u.status === 'active').length,
          suspended: mockUsers.filter(u => u.status === 'suspended').length,
          inactive: mockUsers.filter(u => u.status === 'inactive').length,
        },
        tiers: ['Bronze', 'Silver', 'Gold', 'Platinum'],
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { userId, action, reason } = body;

    if (!userId || !action) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const user = mockUsers.find(u => u.id === userId);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    let updatedUser;
    let message;

    switch (action) {
      case 'suspend':
        updatedUser = { ...user, status: 'suspended', suspendedAt: new Date().toISOString(), suspensionReason: reason };
        message = 'User suspended';
        break;
      case 'reactivate':
        updatedUser = { ...user, status: 'active', reactivatedAt: new Date().toISOString() };
        message = 'User reactivated';
        break;
      case 'adjustPoints':
        const { points } = body;
        updatedUser = { ...user, totalPoints: user.totalPoints + points };
        message = `Points adjusted by ${points}`;
        break;
      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      data: updatedUser,
      message,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
