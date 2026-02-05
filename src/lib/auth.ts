import { PrismaAdapter } from '@auth/prisma-adapter';
import type { Adapter } from '@auth/core/adapters';
import bcrypt from 'bcrypt';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';

import { authConfig } from '@/auth.config';
import { prisma } from '@/lib/db';

/**
 * ============================================================================
 * NEXTAUTH V5 CONFIGURATION - SANDBOX 3.0
 * ============================================================================
 * 
 * Dual authentication system:
 * 1. User Login (participants) - Credentials + Google OAuth
 * 2. Admin Login (staff) - Credentials only
 * 
 * NextAuth v5 uses new export pattern with auth.ts
 * Auth config is split for edge compatibility (see auth.config.ts)
 * ============================================================================
 */

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma) as any,
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
    error: '/login', // Redirect errors to login page
  },
  providers: [
    // ==========================================
    // ADMIN CREDENTIALS PROVIDER
    // ==========================================
    Credentials({
      id: 'admin-credentials',
      name: 'Admin Login',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        const admin = await prisma.admin.findUnique({
          where: { username: credentials.username as string },
        });

        if (!admin || !admin.isActive) {
          return null;
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password as string,
          admin.password
        );

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: admin.id,
          email: admin.email,
          name: admin.username,
          type: 'admin',
          role: admin.adminRole,
        };
      },
    }),

    // ==========================================
    // USER CREDENTIALS PROVIDER
    // ==========================================
    Credentials({
      id: 'user-credentials',
      name: 'User Login',
      credentials: {
        identifier: { label: 'Username or Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.identifier || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findFirst({
          where: {
            OR: [
              { username: credentials.identifier as string },
              { email: credentials.identifier as string },
            ],
          },
        });

        if (!user || !user.active || !user.password) {
          return null;
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password as string,
          user.password
        );

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          type: 'user',
        };
      },
    }),

    // ==========================================
    // GOOGLE OAUTH PROVIDER (USER ONLY)
    // ==========================================
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
      async profile(profile) {
        // Check if user exists in our database
        const existingUser = await prisma.user.findUnique({
          where: { email: profile.email },
        });

        if (existingUser) {
          return {
            id: existingUser.id,
            email: existingUser.email,
            name: existingUser.name,
            image: existingUser.image,
            type: 'user',
          };
        }

        // For new users, return profile data (username will be created in signIn callback)
        return {
          id: profile.sub,
          email: profile.email,
          name: profile.name,
          image: profile.picture,
          type: 'user',
        };
      },
    }),
  ],

  callbacks: {
    async redirect({ url, baseUrl }) {
      // After successful login, always redirect to homepage
      // This prevents the error page redirect issue
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },

    async signIn({ user, account, profile }) {
      // For Google OAuth users, ensure they have a username
      if (account?.provider === 'google' && user?.email) {
        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email },
        });

        if (!existingUser) {
          // Generate a unique username from email
          const baseUsername = user.email.split('@')[0];
          let username = baseUsername;
          let counter = 1;

          // Ensure username is unique
          while (await prisma.user.findUnique({ where: { username } })) {
            username = `${baseUsername}${counter}`;
            counter++;
          }

          // Create the user with generated username
          await prisma.user.create({
            data: {
              username,
              email: user.email,
              name: user.name || user.email.split('@')[0],
              image: user.image || (profile?.picture as string),
              active: true, // Auto-activate OAuth users
            },
          });
        }
      }

      return true;
    },

    async jwt({ token, user }) {
      if (user?.id) {
        token.id = user.id;
        token.type = (user as any).type || 'user';
        token.role = (user as any).role;
      }
      return token;
    },

    async session({ session, token }) {
      if (token.type === 'admin') {
        const admin = await prisma.admin.findUnique({
          where: { id: token.id as string },
        });

        if (admin) {
          session.admin = {
            id: admin.id,
            username: admin.username,
            email: admin.email,
            role: admin.adminRole,
            isActive: admin.isActive,
          };
        }
      } else {
        const user = await prisma.user.findUnique({
          where: { id: token.id as string },
          include: {
            registration: {
              include: {
                competition: true,
                team: true,
              },
            },
          },
        });

        if (user) {
          session.user = {
            id: user.id,
            username: user.username,
            email: user.email,
            emailVerified: user.emailVerified,
            name: user.name,
            image: user.image,
            registration: user.registration,
          };
        }
      }

      return session;
    },
  },
});
