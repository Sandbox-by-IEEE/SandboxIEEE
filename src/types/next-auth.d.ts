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
        linkFullPaper: string;
        linkVideo: string;
        linkVideo2: string;

      };
    };
    ticket?: {
      exhibition: {
        buy: boolean;
        verified: boolean;
        active: boolean;
      };
      TPC: {
        isLeader: boolean;
        teamId: string;
        buy: boolean;
        verified: string;
        regist2Status: string;
        regist3PaymentStatus: string;
      };
      PTC: {
        isLeader: boolean;
        teamId: string;
        buy: boolean;
        verified: string;
        regist2Status: string;
        regist3PaymentStatus: string;
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
          linkFullPaper: string;
          linkVideo: string;
          linkVideo2: string;
        };
      };
      ticket?: {
        exhibition: {
          buy: boolean;
          verified: boolean;
          active: boolean;
        };
        TPC: {
          isLeader: boolean;
          teamId: string;
          buy: boolean;
          verified: string;
          regist2Status: string;
          regist3PaymentStatus: string;
        };
        PTC: {
          isLeader: boolean;
          teamId: string;
          buy: boolean;
          verified: string;
          regist2Status: string;
          regist3PaymentStatus: string;
        };
      };
    };
  }
}
