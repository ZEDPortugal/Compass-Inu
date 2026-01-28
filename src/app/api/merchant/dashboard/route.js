import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // TODO: Extract merchant ID from JWT or session
    const merchantId = 1; // Replace with real merchant ID extraction

    // Fetch merchant profile
    const merchantRes = await query('SELECT * FROM merchants WHERE id = $1', [merchantId]);
    const merchant = merchantRes.rows[0];

    // Fetch stats
    const statsRes = await query(`
      SELECT 
        (SELECT COUNT(DISTINCT user_id) FROM transactions WHERE merchant_id = $1) AS totalCustomers,
        (SELECT COUNT(DISTINCT user_id) FROM transactions WHERE merchant_id = $1 AND created_at > NOW() - INTERVAL '30 days') AS activeCustomers,
        (SELECT COALESCE(SUM(points),0) FROM points_ledger WHERE merchant_id = $1) AS totalPointsIssued,
        (SELECT COALESCE(SUM(points),0) FROM redemptions WHERE merchant_id = $1) AS totalPointsRedeemed,
        (SELECT COUNT(*) FROM transactions WHERE merchant_id = $1) AS totalTransactions,
        (SELECT COUNT(*) FROM redemptions WHERE merchant_id = $1) AS totalRedemptions,
        (SELECT COALESCE(AVG(amount),0) FROM transactions WHERE merchant_id = $1) AS averageTransactionValue,
        0 AS conversionRate -- Replace with real calculation if available
    `, [merchantId]);
    const stats = statsRes.rows[0];

    // Recent transactions
    const recentTransactions = await query(
      'SELECT * FROM transactions WHERE merchant_id = $1 ORDER BY created_at DESC LIMIT 5',
      [merchantId]
    );

    // Active campaigns
    const activeCampaigns = await query(
      'SELECT * FROM campaigns WHERE merchant_id = $1 AND starts_at <= NOW() AND ends_at >= NOW()',
      [merchantId]
    );

    // Top customers
    const topCustomers = await query(
      'SELECT user_id, SUM(amount) AS totalSpent, SUM(points) AS totalPoints, COUNT(*) AS visits FROM transactions WHERE merchant_id = $1 GROUP BY user_id ORDER BY totalSpent DESC LIMIT 5',
      [merchantId]
    );

    // Pending redemptions
    const pendingRedemptions = await query(
      "SELECT * FROM redemptions WHERE merchant_id = $1 AND status = 'pending' ORDER BY requested_at DESC LIMIT 5",
      [merchantId]
    );

    // Revenue and points charts (example: last 7 days)
    const revenueChart = await query(
      `SELECT TO_CHAR(created_at, 'Dy') AS label, SUM(amount) AS data FROM transactions WHERE merchant_id = $1 AND created_at > NOW() - INTERVAL '7 days' GROUP BY label ORDER BY MIN(created_at)`,
      [merchantId]
    );
    const pointsChart = await query(
      `SELECT TO_CHAR(created_at, 'Dy') AS label, SUM(points) AS issued, SUM(CASE WHEN type = 'redeem' THEN points ELSE 0 END) AS redeemed FROM points_ledger WHERE merchant_id = $1 AND created_at > NOW() - INTERVAL '7 days' GROUP BY label ORDER BY MIN(created_at)`,
      [merchantId]
    );

    return NextResponse.json({
      success: true,
      data: {
        merchant,
        stats,
        recentTransactions: recentTransactions.rows,
        activeCampaigns: activeCampaigns.rows,
        topCustomers: topCustomers.rows,
        pendingRedemptions: pendingRedemptions.rows,
        revenueChart: revenueChart.rows,
        pointsChart: pointsChart.rows,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Merchant dashboard API error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
