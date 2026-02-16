/**
 * ============================================================================
 * RESEND ACTIVATION EMAIL API ENDPOINT
 * ============================================================================
 * 
 * POST /api/auth/resend-activation
 * 
 * Purpose: Resend activation email to user
 * ============================================================================
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

import { prisma } from '@/lib/db';
import { sendActivationEmail } from '@/lib/email';

const resendSchema = z.object({
  email: z.string().email('Invalid email format'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = resendSchema.parse(body);

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        activateTokens: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
      },
    });

    if (!user) {
      // Don't reveal if email exists or not
      return NextResponse.json({
        success: true,
        message: 'If the email exists, an activation link has been sent.',
      });
    }

    // Check if already activated
    if (user.active) {
      return NextResponse.json(
        { error: 'Account is already activated. You can login now.' },
        { status: 400 }
      );
    }

    // Rate limiting: Check if last token was created less than 5 minutes ago
    const lastToken = user.activateTokens[0];
    if (lastToken) {
      const timeSinceLastToken = Date.now() - lastToken.createdAt.getTime();
      const minInterval = 5 * 60 * 1000; // 5 minutes

      if (timeSinceLastToken < minInterval) {
        const remainingTime = Math.ceil((minInterval - timeSinceLastToken) / 1000 / 60);
        return NextResponse.json(
          {
            error: `Please wait ${remainingTime} minute(s) before requesting another activation email`,
          },
          { status: 429 }
        );
      }
    }

    // Create new activation token
    const activateToken = await prisma.activateToken.create({
      data: {
        userId: user.id,
        token: crypto.randomUUID(),
      },
    });

    // Send activation email
    await sendActivationEmail(user.email, user.name, activateToken.token);

    // TODO: Log resend to monitoring service

    return NextResponse.json({
      success: true,
      message: 'Activation email has been resent. Please check your inbox.',
    });
  } catch (error) {
    // TODO: Log error to monitoring service

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
