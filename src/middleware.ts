import NextAuth from 'next-auth';
import { authConfig } from '@/auth.config';

/**
 * ============================================================================
 * MIDDLEWARE - ROUTE PROTECTION (Edge Runtime)
 * ============================================================================
 * 
 * Uses authConfig (edge-safe, no bcrypt/Prisma) for route protection.
 * Full auth.ts config is only used in API routes (Node.js runtime).
 * 
 * Protects:
 * - /admin/* requires admin session
 * - /dashboard/* requires user session
 * 
 * NextAuth v5 + Next.js 15 pattern
 * ============================================================================
 */

export default NextAuth(authConfig).auth;

export const config = {
  matcher: [
    '/admin/:path*',
    '/dashboard/:path*',
  ],
};
