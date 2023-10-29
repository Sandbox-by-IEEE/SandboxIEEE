import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface User {
    id: string;
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
        verified: boolean;
      };
      PTC: {
        buy: boolean;
        verified: boolean;
      };
    };
  }

  interface Session {
    user: DefaultSession['user'] & {
      id: string;
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
          verified: boolean;
        };
        PTC: {
          buy: boolean;
          verified: boolean;
        };
      };
    };
  }
}
