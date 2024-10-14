import { Role } from '@prisma/client';
// eslint-disable-next-line unused-imports/no-unused-imports
import _NextAuth, { DefaultSession } from 'next-auth';
// eslint-disable-next-line unused-imports/no-unused-imports
import { _JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    user: {
      username: string;
      role: string;
    } & DefaultSession['user'];
  }
  interface User {
    id: number;
    name: string;
    username: string;
    role: Role;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role?: string;
  }
}

