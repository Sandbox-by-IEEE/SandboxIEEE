import { NextResponse } from 'next/server';
import { hash } from 'bcrypt';
import { z } from 'zod';
import { prisma } from '@/lib/db';
import { sendMail } from '@/lib/mailTransporter';
import crypto from 'crypto';

/**
 * ============================================================================
 * USER REGISTRATION API ENDPOINT
 * ============================================================================
 * POST /api/auth/register
 * 
 * Purpose: Register new user account and send email verification
 * 
 * Access: Public
 * 
 * Request Body:
 * {
 *   username: string,
 *   email: string,
 *   password: string,
 *   name: string,
 *   institution: string,
 *   phone: string
 * }
 * 
 * Response:
 * {
 *   success: true,
 *   message: "Registration successful. Please check your email to activate your account.",
 *   user: { id, username, email, name }
 * }
 * ============================================================================
 */

const registerSchema = z.object({
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(30, 'Username must be less than 30 characters')
    .regex(
      /^[a-zA-Z0-9_]+$/,
      'Username can only contain letters, numbers, and underscores'
    ),
  email: z
    .string()
    .email('Invalid email address')
    .toLowerCase(),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    ),
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  institution: z
    .string()
    .min(2, 'Institution must be at least 2 characters')
    .max(200, 'Institution must be less than 200 characters'),
  phone: z
    .string()
    .regex(
      /^(\+62|62|0)[0-9]{9,12}$/,
      'Invalid Indonesian phone number format'
    ),
});

export async function POST(request: Request) {
  try {
    // ============================================================================
    // 1. Validate Request Body
    // ============================================================================
    const body = await request.json();
    const validatedData = registerSchema.parse(body);

    const { username, email, password, name, institution, phone } = validatedData;

    // ============================================================================
    // 2. Check for Existing User
    // ============================================================================
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ username }, { email }],
      },
    });

    if (existingUser) {
      if (existingUser.username === username) {
        return NextResponse.json(
          { error: 'Username already taken' },
          { status: 400 }
        );
      }
      if (existingUser.email === email) {
        return NextResponse.json(
          { error: 'Email already registered' },
          { status: 400 }
        );
      }
    }

    // ============================================================================
    // 3. Hash Password
    // ============================================================================
    const hashedPassword = await hash(password, 10);

    // ============================================================================
    // 4. Create User Account (not activated yet)
    // ============================================================================
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        name,
        active: false, // User must verify email first
        emailVerified: null,
      },
      select: {
        id: true,
        username: true,
        email: true,
        name: true,
        createdAt: true,
      },
    });

    // ============================================================================
    // 5. Generate Activation Token (expires in 24 hours)
    // ============================================================================
    const activationToken = crypto.randomBytes(32).toString('hex');

    await prisma.activateToken.create({
      data: {
        token: activationToken,
        userId: newUser.id,
      },
    });

    // ============================================================================
    // 6. Send Activation Email
    // ============================================================================
    const activationUrl = `${process.env.NEXTAUTH_URL}/activate?token=${activationToken}`;

    try {
      await sendMail({
        to: email,
        subject: 'Activate Your Sandbox 3.0 Account',
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <style>
                body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #2563eb 0%, #9333ea 100%); color: white; padding: 40px 20px; text-align: center; border-radius: 10px 10px 0 0; }
                .content { background: #ffffff; padding: 40px 30px; border: 1px solid #e5e7eb; }
                .button { display: inline-block; background: linear-gradient(135deg, #2563eb 0%, #9333ea 100%); color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0; }
                .footer { background: #f9fafb; padding: 20px; text-align: center; font-size: 12px; color: #6b7280; border-radius: 0 0 10px 10px; }
                .warning { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 12px; margin: 20px 0; border-radius: 4px; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1 style="margin: 0; font-size: 28px;">Welcome to The Sandbox 3.0!</h1>
                  <p style="margin: 10px 0 0 0; opacity: 0.9;">IEEE ITB Student Branch</p>
                </div>
                
                <div class="content">
                  <h2 style="color: #1f2937; margin-top: 0;">Hi ${name}! 👋</h2>
                  
                  <p>Thank you for registering at The Sandbox 3.0! We're excited to have you join our competition.</p>
                  
                  <p>To complete your registration and activate your account, please click the button below:</p>
                  
                  <div style="text-align: center;">
                    <a href="${activationUrl}" class="button">Activate My Account</a>
                  </div>
                  
                  <p style="font-size: 14px; color: #6b7280;">Or copy and paste this link in your browser:</p>
                  <p style="font-size: 12px; word-break: break-all; background: #f3f4f6; padding: 10px; border-radius: 4px;">${activationUrl}</p>
                  
                  <div class="warning">
                    <strong>⏰ Important:</strong> This activation link will expire in <strong>24 hours</strong>.
                  </div>
                  
                  <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
                  
                  <p style="font-size: 14px; color: #6b7280;">
                    <strong>Your Account Details:</strong><br>
                    Username: <strong>${username}</strong><br>
                    Email: <strong>${email}</strong><br>
                    Institution: <strong>${institution}</strong>
                  </p>
                  
                  <p style="font-size: 14px; color: #6b7280;">
                    If you didn't create this account, please ignore this email.
                  </p>
                </div>
                
                <div class="footer">
                  <p><strong>The Sandbox 3.0</strong><br>IEEE ITB Student Branch</p>
                  <p style="margin: 10px 0 0 0;">
                    Need help? Contact us at 
                    <a href="mailto:sandbox@ieee-itb.org" style="color: #2563eb;">sandbox@ieee-itb.org</a>
                  </p>
                </div>
              </div>
            </body>
          </html>
        `,
      });

      console.log('✅ Activation email sent to:', email);
    } catch (emailError) {
      console.error('❌ Failed to send activation email:', emailError);
      // Don't fail registration if email fails - user can request new token
    }

    // ============================================================================
    // 7. Send Success Response
    // ============================================================================
    return NextResponse.json(
      {
        success: true,
        message: 'Registration successful. Please check your email to activate your account.',
        user: newUser,
      },
      { status: 201 }
    );
  } catch (error) {
    // ============================================================================
    // Error Handling
    // ============================================================================
    console.error('❌ User registration error:', error);

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
        { status: 400 }
      );
    }

    // Generic error
    return NextResponse.json(
      {
        error: 'Internal server error',
        message:
          error instanceof Error ? error.message : 'Unknown error occurred',
      },
      { status: 500 }
    );
  }
}
