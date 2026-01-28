import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Example queries, adjust table/column names to match your Neon schema
    const stats = await query(`
      SELECT 
        (SELECT COUNT(*) FROM users) AS total_users,
        (SELECT COUNT(*) FROM merchants) AS total_merchants,
        (SELECT COUNT(*) FROM merchants WHERE status = 'active') AS active_merchants,
        (SELECT COUNT(*) FROM merchants WHERE status = 'pending') AS pending_merchants,
        (SELECT COUNT(*) FROM transactions) AS total_transactions,
        (SELECT COALESCE(SUM(points),0) FROM points_ledger) AS total_points_circulating,
        (SELECT COALESCE(SUM(points),0) FROM redemptions) AS total_points_redeemed,
        (SELECT COALESCE(SUM(fee),0) FROM transactions) AS platform_revenue
    `);

    // Example: recent activity (last 5 events)
    const recentActivity = await query(`
      SELECT id, type, description, timestamp FROM activity_log ORDER BY timestamp DESC LIMIT 5
    `);

    // Example: pending merchant approvals
    const pendingApprovals = await query(`
      SELECT id, business_name, category, email, applied_at FROM merchants WHERE status = 'pending' ORDER BY applied_at DESC LIMIT 5
    `);

    // Example: top merchants by revenue
    const topMerchants = await query(`
      SELECT id, business_name, total_transactions, total_points_issued, revenue FROM merchants ORDER BY revenue DESC LIMIT 5
    `);

    // Example: system health (customize as needed)
    const systemHealth = {
      apiLatency: 45, // Replace with real metric if available
      uptime: 99.98, // Replace with real metric if available
      activeConnections: 0, // Replace with real metric if available
      queuedJobs: 0, // Replace with real metric if available
      lastBackup: null // Replace with real metric if available
    };

    return NextResponse.json({
      success: true,
      data: {
        platformStats: stats.rows[0],
        recentActivity: recentActivity.rows,
        pendingApprovals: pendingApprovals.rows,
        topMerchants: topMerchants.rows,
        systemHealth,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Admin dashboard API error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
