import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface User {
    id: string;
    username?: string;
    vote?: {
      status: boolean;
      karya?: {
        id: string;
        team: {
          id: string;
          teamName: string;
          chairmanName: string;
        };
        countVote: int;
        linkKarya: string;
      };
    };
    ticket?: {
      exhibition: {
        buy: boolean;
        verified: boolean;
        active: boolean;
      };
      TPC: {
        buy: boolean;
        verified: string;
      };
      PTC: {
        buy: boolean;
        verified: string;
      };
    };
  }

  interface Session {
    user: DefaultSession['user'] & {
      id: string;
      username?: string;
      vote?: {
        status: boolean;
        karya?: {
          id: string;
          team: {
            id: string;
            teamName: string;
            chairmanName: string;
          };
          countVote: int;
          linkKarya: string;
        };
      };
      ticket?: {
        exhibition: {
          buy: boolean;
          verified: boolean;
          active: boolean;
        };
        TPC: {
          buy: boolean;
          verified: string;
        };
        PTC: {
          buy: boolean;
          verified: string;
        };
      };
    };
  }
}
