import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // TODO: Extract user ID from JWT or session
    const userId = 1; // Replace with real user ID extraction

    // Fetch user profile
    const userRes = await query('SELECT * FROM users WHERE id = $1', [userId]);
    const user = userRes.rows[0];

    // Fetch stats
    const statsRes = await query(`
      SELECT 
        COALESCE(SUM(points),0) AS totalPoints,
        COALESCE(SUM(CASE WHEN status = 'available' THEN points ELSE 0 END),0) AS availablePoints,
        COALESCE(SUM(CASE WHEN status = 'pending' THEN points ELSE 0 END),0) AS pendingPoints,
        COALESCE(SUM(CASE WHEN status = 'redeemed' THEN points ELSE 0 END),0) AS redeemedPoints,
        (SELECT COUNT(*) FROM transactions WHERE user_id = $1) AS totalTransactions,
        (SELECT COUNT(*) FROM redemptions WHERE user_id = $1) AS totalRedemptions
      FROM points_ledger WHERE user_id = $1
    `, [userId]);
    const stats = statsRes.rows[0];

    // Recent transactions
    const recentTransactions = await query(
      'SELECT * FROM transactions WHERE user_id = $1 ORDER BY created_at DESC LIMIT 5',
      [userId]
    );

    // Available rewards
    const availableRewards = await query(
      'SELECT * FROM rewards WHERE points_cost <= $1 AND expires_at > NOW()',
      [stats.availablepoints || 0]
    );

    // Active campaigns
    const activeCampaigns = await query(
      'SELECT * FROM campaigns WHERE starts_at <= NOW() AND ends_at >= NOW()'
    );

    // Notifications
    const notifications = await query(
      'SELECT * FROM notifications WHERE user_id = $1 ORDER BY created_at DESC LIMIT 5',
      [userId]
    );

    return NextResponse.json({
      success: true,
      data: {
        user,
        stats,
        recentTransactions: recentTransactions.rows,
        availableRewards: availableRewards.rows,
        activeCampaigns: activeCampaigns.rows,
        notifications: notifications.rows,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('User dashboard API error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
