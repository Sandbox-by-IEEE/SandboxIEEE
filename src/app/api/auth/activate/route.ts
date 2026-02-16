import { NextResponse } from 'next/server';

import { prisma } from '@/lib/db';

/**
 * ============================================================================
 * EMAIL ACTIVATION API ENDPOINT
 * ============================================================================
 * GET /api/auth/activate?token=xxx
 * 
 * Purpose: Activate user account via email verification token
 * 
 * Access: Public
 * 
 * Query Parameters:
 * - token: Activation token from email
 * 
 * Response:
 * {
 *   success: true,
 *   message: "Account activated successfully. You can now login."
 * }
 * ============================================================================
 */

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json(
        { error: 'Activation token is required' },
        { status: 400 }
      );
    }

    // ============================================================================
    // 1. Find Activation Token
    // ============================================================================
    const activationRecord = await prisma.activateToken.findUnique({
      where: { token },
      include: { user: true },
    });

    if (!activationRecord) {
      return NextResponse.json(
        { error: 'Invalid activation token' },
        { status: 400 }
      );
    }

    // ============================================================================
    // 2. Check Token Expiry
    // ============================================================================
    // Token expires 24 hours after creation
    const expiryDate = new Date(activationRecord.createdAt);
    expiryDate.setHours(expiryDate.getHours() + 24);

    if (new Date() > expiryDate) {
      return NextResponse.json(
        { error: 'Activation token has expired. Please request a new one.' },
        { status: 400 }
      );
    }

    // ============================================================================
    // 3. Check if User Already Activated
    // ============================================================================
    if (activationRecord.user.active && activationRecord.user.emailVerified) {
      return NextResponse.json(
        {
          success: true,
          message: 'Account is already activated. You can login now.',
          alreadyActivated: true,
        },
        { status: 200 }
      );
    }

    // ============================================================================
    // 4. Activate User Account
    // ============================================================================
    await prisma.user.update({
      where: { id: activationRecord.userId },
      data: {
        active: true,
        emailVerified: new Date(),
      },
    });

    // ============================================================================
    // 5. Delete Used Token
    // ============================================================================
    await prisma.activateToken.delete({
      where: { token },
    });

    // TODO: Log successful activation to monitoring service

    // ============================================================================
    // 6. Send Success Response
    // ============================================================================
    return NextResponse.json(
      {
        success: true,
        message: 'Account activated successfully! You can now login.',
        user: {
          username: activationRecord.user.username,
          email: activationRecord.user.email,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    // TODO: Log error to monitoring service with stack trace

    return NextResponse.json(
      {
        error: 'Failed to activate account',
        message: error instanceof Error ? error.message : 'Unknown error occurred',
      },
      { status: 500 }
    );
  }
}
