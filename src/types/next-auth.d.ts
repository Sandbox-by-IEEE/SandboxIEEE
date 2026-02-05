// Extended NextAuth types for Sandbox v3.0

import { AdminRole } from '@prisma/client';
import 'next-auth';
import 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      username: string;
      email: string;
      name: string;
      image: string | null;
      registration?: any;
    };
    admin?: {
      id: string;
      username: string;
      email: string;
      role: AdminRole;
      isActive: boolean;
    };
  }

  interface User {
    id: string;
    username?: string;
    email: string;
    name?: string;
    image?: string | null;
    type?: 'user' | 'admin';
    role?: AdminRole;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    type: 'user' | 'admin';
    username?: string;
    role?: AdminRole;
  }
}
