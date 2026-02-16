/**
 * Test endpoint to verify SMTP configuration
 * GET /api/test-email?to=email@example.com
 */

import { NextRequest, NextResponse } from 'next/server';
import { sendActivationEmail } from '@/lib/email';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const to = searchParams.get('to');

  if (!to) {
    return NextResponse.json(
      { error: 'Please provide "to" email parameter' },
      { status: 400 }
    );
  }

  try {
    await sendActivationEmail(to, 'Test User', 'test-token-123');

    return NextResponse.json({
      success: true,
      message: `Test email sent to ${to}. Check your inbox (and spam folder).`,
      smtpConfig: {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        user: process.env.SMTP_USER,
        from: process.env.SMTP_USER || 'sandbox@ieee-itb.org',
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Failed to send email',
        details: error instanceof Error ? error.message : String(error),
        smtpConfig: {
          host: process.env.SMTP_HOST,
          port: process.env.SMTP_PORT,
          user: process.env.SMTP_USER,
        },
      },
      { status: 500 }
    );
  }
}
