import type { NextAuthConfig } from 'next-auth';

/**
 * ============================================================================
 * NEXTAUTH V5 - EDGE-SAFE CONFIGURATION
 * ============================================================================
 *
 * This config is used by middleware (edge runtime).
 * Cannot import bcrypt or Prisma here - those only work in Node.js runtime.
 *
 * Keep only callbacks and configuration needed for route protection.
 * ============================================================================
 */

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    // JWT callback - runs on every request, edge-safe
    async jwt({ token, user }) {
      // On initial sign-in, user object is available
      if (user) {
        token.id = user.id;
        token.type = (user as any).type || 'user';
        token.role = (user as any).role;
      }
      return token;
    },

    // Session callback - runs on every request, edge-safe
    async session({ session, token }) {
      // Build session from JWT token (no database access needed)
      if (token.type === 'admin') {
        session.admin = {
          id: token.id as string,
          username: token.name || '',
          email: token.email || '',
          role: token.role as any,
          isActive: true,
        };
      } else {
        session.user = {
          id: token.id as string,
          username: token.name || '',
          email: token.email || '',
          emailVerified: null,
          name: token.name || '',
          image: token.picture || null,
        };
      }
      return session;
    },

    authorized({ auth, request: { nextUrl } }) {
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      const isOnAdmin = nextUrl.pathname.startsWith('/admin');
      const isOnAdminLogin = nextUrl.pathname === '/admin-login';

      // Admin routes - redirect to /admin-login if not authenticated
      if (isOnAdmin && !isOnAdminLogin) {
        if (!auth?.admin) {
          const url = nextUrl.clone();
          url.pathname = '/admin-login';
          url.searchParams.set('callbackUrl', nextUrl.pathname);
          return Response.redirect(url);
        }
        return true;
      }

      // User dashboard - redirect to /login if not authenticated
      if (isOnDashboard) {
        if (!auth?.user) return false;
        return true;
      }

      return true;
    },
  },
  providers: [], // Add providers with an empty array for edge compatibility
} satisfies NextAuthConfig;
