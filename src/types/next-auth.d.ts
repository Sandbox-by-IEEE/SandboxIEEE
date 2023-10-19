import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface User {
    id: string;
    vote?: {
      status: boolean;
      karya?: {
        id: string;
        teamName: string;
        anggota: string[];
        countVote: int;
      };
    };
    exhibition?: {
      active: boolean;
    };
  }

  interface Session {
    user: DefaultSession['user'] & {
      id: string;
      vote?: {
        status: boolean;
        karya?: {
          id: string;
          teamName: string;
          anggota: string[];
          countVote: int;
        };
      };
      exhibition?: {
        active: boolean;
      };
    };
  }
}
