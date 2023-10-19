import { PrismaAdapter } from '@auth/prisma-adapter';
import { compare } from 'bcrypt';
import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

import { prisma } from '@/lib/db';

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Missing email or password');
        }

        const existingUser = await prisma.user.findUnique({
          where: {
            email: credentials?.email,
          },
          include: {
            karya: {
              select: {
                id: true,
                anggota: true,
                countVote: true,
                teamName: true,
              },
            },
          },
        });

        if (!existingUser) {
          throw new Error('Email is unregistered');
        }

        const isPasswordMatch = await compare(
          credentials?.password,
          existingUser.password || '',
        );

        if (!isPasswordMatch) {
          throw new Error('Wrong password');
        }

        const karya = existingUser.karya
          ? {
              ...existingUser.karya,
              countVote: parseInt(
                existingUser.karya?.countVote.toString() || '0',
              ),
            }
          : undefined;

        return {
          id: existingUser.id,
          name: existingUser.name,
          email: existingUser.email,
          image: existingUser.image || '',
          vote: {
            karya: karya,
            status: existingUser.karya ? true : false,
          },
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      const existingUser = await prisma.user.findUnique({
        where: {
          id: token.sub,
        },
        include: {
          karya: {
            select: {
              id: true,
              anggota: true,
              countVote: true,
              teamName: true,
            },
          },
        },
      });

      if (!existingUser) {
        return {
          ...session,
          user: {
            ...session.user,
            id: token.sub,
            image: token.picture || '',
          },
        };
      }

      const karya = existingUser.karya
        ? {
            ...existingUser.karya,
            countVote: parseInt(
              existingUser.karya?.countVote.toString() || '0',
            ),
          }
        : null;

      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub,
          image: token.picture || '',
          vote: {
            karya: karya,
            status: existingUser.karya ? true : false,
          },
        },
      };
    },
  },
};
