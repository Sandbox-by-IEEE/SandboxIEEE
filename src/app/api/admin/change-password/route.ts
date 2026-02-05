import { auth } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';
import { hash, compare } from 'bcrypt';
import { z } from 'zod';
import { prisma } from '@/lib/db';

/**
 * POST /api/admin/change-password
 * 
 * Change password for authenticated admin
 * Requires: Current password + new password
 */

const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain uppercase letter')
    .regex(/[a-z]/, 'Password must contain lowercase letter')
    .regex(/\d/, 'Password must contain a number'),
});

export async function POST(req: NextRequest) {
  try {
    // Check authentication
    const session = await auth();

    if (!session?.admin) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized. Admin login required.' },
        { status: 401 }
      );
    }

    // Parse and validate request body
    const body = await req.json();
    const validation = changePasswordSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          message: 'Validation failed',
          errors: validation.error.errors.map((err) => err.message),
        },
        { status: 400 }
      );
    }

    const { currentPassword, newPassword } = validation.data;

    // Check if new password is same as current
    if (currentPassword === newPassword) {
      return NextResponse.json(
        {
          success: false,
          message: 'New password must be different from current password',
        },
        { status: 400 }
      );
    }

    // Get admin from database
    const admin = await prisma.admin.findUnique({
      where: { id: session.admin.id },
    });

    if (!admin) {
      return NextResponse.json(
        { success: false, message: 'Admin account not found' },
        { status: 404 }
      );
    }

    // Verify current password
    const isCurrentPasswordCorrect = await compare(
      currentPassword,
      admin.password
    );

    if (!isCurrentPasswordCorrect) {
      return NextResponse.json(
        { success: false, message: 'Current password is incorrect' },
        { status: 400 }
      );
    }

    // Hash new password
    const hashedNewPassword = await hash(newPassword, 10);

    // Update password in database
    await prisma.admin.update({
      where: { id: admin.id },
      data: {
        password: hashedNewPassword,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Password changed successfully',
    });
  } catch (error) {
    console.error('Change password error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error. Please try again later.',
      },
      { status: 500 }
    );
  }
}
