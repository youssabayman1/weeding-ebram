import { NextResponse } from 'next/server';
import { checkDatabaseConnection } from '@/backend_lib/infrastructure/mongodb';

export async function GET() {
  const dbStatus = await checkDatabaseConnection();
  
  if (process.env.DEBUG === 'true') {
    console.log('[DEBUG] Health check triggered. DB Status:', dbStatus);
  }

  return NextResponse.json({
    success: true,
    timestamp: new Date().toISOString(),
    database: dbStatus,
  }, {
    status: dbStatus.connected ? 200 : 503,
  });
}
