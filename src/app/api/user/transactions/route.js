import { NextResponse } from 'next/server';

const mockTransactions = [
  { id: 'txn_1', merchantName: 'Coffee House', type: 'earn', points: 50, amount: 25.00, date: '2025-12-28T10:30:00Z', status: 'completed' },
  { id: 'txn_2', merchantName: 'Tech Store', type: 'earn', points: 200, amount: 199.99, date: '2025-12-27T14:15:00Z', status: 'completed' },
  { id: 'txn_3', merchantName: 'Fashion Outlet', type: 'earn', points: 150, amount: 89.50, date: '2025-12-26T16:45:00Z', status: 'completed' },
  { id: 'txn_4', merchantName: 'Grocery Mart', type: 'earn', points: 75, amount: 45.00, date: '2025-12-25T09:20:00Z', status: 'completed' },
  { id: 'txn_5', merchantName: 'Restaurant Deluxe', type: 'redeem', points: -500, amount: 0, date: '2025-12-24T19:00:00Z', status: 'completed', reward: 'Free Dinner Voucher' },
  { id: 'txn_6', merchantName: 'Coffee House', type: 'earn', points: 30, amount: 15.00, date: '2025-12-23T08:45:00Z', status: 'completed' },
  { id: 'txn_7', merchantName: 'Tech Store', type: 'earn', points: 500, amount: 499.99, date: '2025-12-22T11:30:00Z', status: 'completed' },
  { id: 'txn_8', merchantName: 'Fashion Outlet', type: 'redeem', points: -300, amount: 0, date: '2025-12-21T15:00:00Z', status: 'completed', reward: '15% Off Coupon' },
  { id: 'txn_9', merchantName: 'Grocery Mart', type: 'earn', points: 100, amount: 67.50, date: '2025-12-20T10:15:00Z', status: 'completed' },
  { id: 'txn_10', merchantName: 'Coffee House', type: 'earn', points: 45, amount: 22.50, date: '2025-12-19T09:00:00Z', status: 'completed' },
];

export async function GET(request) {
  try {
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const type = searchParams.get('type'); // 'earn', 'redeem', or null for all

    let filtered = mockTransactions;
    if (type) {
      filtered = mockTransactions.filter(t => t.type === type);
    }

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginated = filtered.slice(startIndex, endIndex);

    return NextResponse.json({
      success: true,
      data: {
        transactions: paginated,
        pagination: {
          page,
          limit,
          total: filtered.length,
          totalPages: Math.ceil(filtered.length / limit),
        },
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
