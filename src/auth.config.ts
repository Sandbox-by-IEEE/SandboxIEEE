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
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user || !!auth?.admin;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      const isOnAdmin = nextUrl.pathname.startsWith('/admin');
      const isOnAdminLogin = nextUrl.pathname === '/admin/login';

      if (isOnAdmin && !isOnAdminLogin) {
        if (!auth?.admin) return false; // Redirect unauthenticated users to login page
        return true;
      }

      if (isOnDashboard) {
        if (!auth?.user) return false;
        return true;
      }

      return true;
    },
  },
  providers: [], // Add providers with an empty array for edge compatibility
} satisfies NextAuthConfig;
