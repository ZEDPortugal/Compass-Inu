// Example usage of Neon Postgres in a Next.js API route
import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request) {
  try {
    // Example: Fetch all users from a 'users' table
    const result = await query('SELECT * FROM users LIMIT 10');
    return NextResponse.json({ success: true, users: result.rows });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}
