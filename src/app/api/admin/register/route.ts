/**
 * ============================================================================
 * ADMIN REGISTRATION API ENDPOINT
 * ============================================================================
 * POST /api/admin/register
 *
 * Purpose: Allow Super Admin to create new admin accounts for competition staff
 *
 * Access: Super Admin only
 *
 * Request Body:
 * {
 *   username: string,
 *   email: string,
 *   password: string,
 *   adminRole: "moderator" | "finance" | "super_admin"
 * }
 *
 * Response:
 * {
 *   success: true,
 *   admin: { id, username, email, adminRole, isActive }
 * }
 * ============================================================================
 */

import { hash } from 'bcrypt';
import { NextResponse } from 'next/server';
import { z } from 'zod';

import { auth } from '@/lib/auth';
import { prisma } from '@/lib/db';

// Validation Schema
const registerAdminSchema = z.object({
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(50, 'Username must be less than 50 characters')
    .regex(
      /^[a-zA-Z0-9_]+$/,
      'Username can only contain letters, numbers, and underscores',
    ),
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number',
    ),
  adminRole: z.enum(['moderator', 'finance', 'super_admin'], {
    errorMap: () => ({
      message:
        'Admin role must be either "moderator", "finance", or "super_admin"',
    }),
  }),
});

export async function POST(request: Request) {
  try {
    // ============================================================================
    // 1. Authentication Check
    // ============================================================================
    const session = await auth();

    // Check if user is authenticated
    if (!session || !session.admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if user is Super Admin
    if (session.admin.role !== 'super_admin') {
      return NextResponse.json(
        {
          error: 'Forbidden: Only Super Admins can create new admin accounts',
        },
        { status: 403 },
      );
    }

    // ============================================================================
    // 2. Validate Request Body
    // ============================================================================
    const body = await request.json();
    const validatedData = registerAdminSchema.parse(body);

    const { username, email, password, adminRole } = validatedData;

    // ============================================================================
    // 3. Check for Existing Admin
    // ============================================================================
    const existingAdmin = await prisma.admin.findFirst({
      where: {
        OR: [{ username }, { email }],
      },
    });

    if (existingAdmin) {
      if (existingAdmin.username === username) {
        return NextResponse.json(
          { error: 'Username already exists' },
          { status: 400 },
        );
      }
      if (existingAdmin.email === email) {
        return NextResponse.json(
          { error: 'Email already registered' },
          { status: 400 },
        );
      }
    }

    // ============================================================================
    // 4. Hash Password
    // ============================================================================
    const hashedPassword = await hash(password, 10);

    // ============================================================================
    // 5. Create Admin Account
    // ============================================================================
    const newAdmin = await prisma.admin.create({
      data: {
        username,
        email,
        password: hashedPassword,
        adminRole,
        isActive: true,
      },
      select: {
        id: true,
        username: true,
        email: true,
        adminRole: true,
        isActive: true,
        createdAt: true,
      },
    });

    // ============================================================================
    // 6. Send Success Response
    // ============================================================================
    return NextResponse.json(
      {
        success: true,
        message: 'Admin account created successfully',
        admin: newAdmin,
      },
      { status: 201 },
    );
  } catch (error) {
    // ============================================================================
    // Error Handling
    // ============================================================================
    console.error('❌ Admin registration error:', error);

    // Zod validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: error.errors.map((e) => ({
            field: e.path.join('.'),
            message: e.message,
          })),
        },
        { status: 400 },
      );
    }

    // Generic error
    return NextResponse.json(
      {
        error: 'Internal server error',
      },
      { status: 500 },
    );
  }
}
