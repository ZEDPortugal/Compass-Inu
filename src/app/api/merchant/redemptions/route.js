import { NextResponse } from 'next/server';

const mockRedemptions = [
  { id: 'red_1', customerName: 'Alice W.', customerEmail: 'alice@example.com', reward: '$10 Voucher', pointsSpent: 500, code: 'REDEEM-ABC123', status: 'pending', requestedAt: '2025-12-28T11:00:00Z' },
  { id: 'red_2', customerName: 'Bob T.', customerEmail: 'bob@example.com', reward: 'Free Coffee', pointsSpent: 200, code: 'REDEEM-DEF456', status: 'pending', requestedAt: '2025-12-28T10:45:00Z' },
  { id: 'red_3', customerName: 'Carol S.', customerEmail: 'carol@example.com', reward: '$10 Voucher', pointsSpent: 500, code: 'REDEEM-GHI789', status: 'completed', requestedAt: '2025-12-27T16:30:00Z', completedAt: '2025-12-27T17:00:00Z' },
  { id: 'red_4', customerName: 'Dan P.', customerEmail: 'dan@example.com', reward: 'Free Coffee', pointsSpent: 200, code: 'REDEEM-JKL012', status: 'completed', requestedAt: '2025-12-27T14:00:00Z', completedAt: '2025-12-27T14:15:00Z' },
  { id: 'red_5', customerName: 'Eve N.', customerEmail: 'eve@example.com', reward: 'Free Pastry', pointsSpent: 150, code: 'REDEEM-MNO345', status: 'expired', requestedAt: '2025-12-20T10:00:00Z', expiredAt: '2025-12-27T10:00:00Z' },
];

export async function GET(request) {
  try {
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    let filtered = mockRedemptions;
    if (status) {
      filtered = mockRedemptions.filter(r => r.status === status);
    }

    return NextResponse.json({
      success: true,
      data: {
        redemptions: filtered,
        stats: {
          pending: mockRedemptions.filter(r => r.status === 'pending').length,
          completed: mockRedemptions.filter(r => r.status === 'completed').length,
          expired: mockRedemptions.filter(r => r.status === 'expired').length,
        },
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
    const { redemptionId, action } = body;

    if (!redemptionId || !action) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const redemption = mockRedemptions.find(r => r.id === redemptionId);
    if (!redemption) {
      return NextResponse.json({ error: 'Redemption not found' }, { status: 404 });
    }

    if (action === 'complete') {
      return NextResponse.json({
        success: true,
        data: { ...redemption, status: 'completed', completedAt: new Date().toISOString() },
        message: 'Redemption marked as completed',
      });
    } else if (action === 'cancel') {
      return NextResponse.json({
        success: true,
        data: { ...redemption, status: 'cancelled', cancelledAt: new Date().toISOString() },
        message: 'Redemption cancelled and points refunded',
      });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
