import { NextResponse } from 'next/server';

const mockMerchants = [
  { id: 'merch_1', businessName: 'Coffee House', email: 'contact@coffeehouse.com', category: 'Food & Beverage', status: 'active', joinedAt: '2024-06-15', totalTransactions: 8500, totalPointsIssued: 425000 },
  { id: 'merch_2', businessName: 'Tech Store', email: 'hello@techstore.com', category: 'Electronics', status: 'active', joinedAt: '2024-07-20', totalTransactions: 4200, totalPointsIssued: 840000 },
  { id: 'merch_3', businessName: 'Fashion Outlet', email: 'info@fashionoutlet.com', category: 'Clothing', status: 'active', joinedAt: '2024-08-10', totalTransactions: 6100, totalPointsIssued: 305000 },
  { id: 'merch_4', businessName: 'Restaurant Deluxe', email: 'reservations@restaurantdeluxe.com', category: 'Food & Beverage', status: 'active', joinedAt: '2024-05-01', totalTransactions: 5800, totalPointsIssued: 290000 },
  { id: 'merch_5', businessName: 'Grocery Mart', email: 'support@grocerymart.com', category: 'Grocery', status: 'active', joinedAt: '2024-09-05', totalTransactions: 12000, totalPointsIssued: 360000 },
  { id: 'merch_pending_1', businessName: 'Tech Haven', email: 'contact@techhaven.com', category: 'Electronics', status: 'pending', appliedAt: '2025-12-27T09:00:00Z' },
  { id: 'merch_pending_2', businessName: 'Fashion Forward', email: 'hello@fashionforward.com', category: 'Clothing', status: 'pending', appliedAt: '2025-12-26T15:30:00Z' },
  { id: 'merch_suspended_1', businessName: 'Quick Deals', email: 'info@quickdeals.com', category: 'General', status: 'suspended', joinedAt: '2024-10-01', suspendedAt: '2025-12-15', reason: 'Policy violation' },
];

export async function GET(request) {
  try {
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const category = searchParams.get('category');

    let filtered = mockMerchants;
    
    if (status) {
      filtered = filtered.filter(m => m.status === status);
    }
    
    if (category) {
      filtered = filtered.filter(m => m.category === category);
    }

    return NextResponse.json({
      success: true,
      data: {
        merchants: filtered,
        stats: {
          total: mockMerchants.length,
          active: mockMerchants.filter(m => m.status === 'active').length,
          pending: mockMerchants.filter(m => m.status === 'pending').length,
          suspended: mockMerchants.filter(m => m.status === 'suspended').length,
        },
        categories: ['Food & Beverage', 'Electronics', 'Clothing', 'Grocery', 'General'],
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
    const { merchantId, action, reason } = body;

    if (!merchantId || !action) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const merchant = mockMerchants.find(m => m.id === merchantId);
    if (!merchant) {
      return NextResponse.json({ error: 'Merchant not found' }, { status: 404 });
    }

    let updatedMerchant;
    let message;

    switch (action) {
      case 'approve':
        updatedMerchant = { ...merchant, status: 'active', approvedAt: new Date().toISOString() };
        message = 'Merchant approved successfully';
        break;
      case 'reject':
        updatedMerchant = { ...merchant, status: 'rejected', rejectedAt: new Date().toISOString(), rejectionReason: reason };
        message = 'Merchant application rejected';
        break;
      case 'suspend':
        updatedMerchant = { ...merchant, status: 'suspended', suspendedAt: new Date().toISOString(), suspensionReason: reason };
        message = 'Merchant suspended';
        break;
      case 'reactivate':
        updatedMerchant = { ...merchant, status: 'active', reactivatedAt: new Date().toISOString() };
        message = 'Merchant reactivated';
        break;
      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      data: updatedMerchant,
      message,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
