import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface User {
    id: string;
    username?: string;
    vote?: {
      PTC?: {
        status: boolean;
        karya?: {
          id: string;
          team: {
            id: string;
            teamName: string;
            chairmanName: string;
            ticketCompetition: {
              competitionType: string;
            };
          };

          countVote: int;
          linkFullPaper: string;
          linkVideo: string;
          linkVideo2: string;
        };
      };
      TPC?: {
        status: boolean;
        karya?: {
          id: string;
          team: {
            id: string;
            teamName: string;
            chairmanName: string;
            ticketCompetition: {
              competitionType: string;
            };
          };

          countVote: int;
          linkFullPaper: string;
          linkVideo: string;
          linkVideo2: string;
        };
      };
    };
    ticket?: {
      exhibition: {
        normal: {
          buy: boolean;
          verified: boolean;
          active: boolean;
        };
        midtrans: {
          buy: boolean;
          verified: string;
          active: boolean;
        };
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
        PTC?: {
          status: boolean;
          karya?: {
            id: string;
            team: {
              id: string;
              teamName: string;
              chairmanName: string;
              ticketCompetition: {
                competitionType: string;
              };
            };

            countVote: int;
            linkFullPaper: string;
            linkVideo: string;
            linkVideo2: string;
          };
        };
        TPC?: {
          status: boolean;
          karya?: {
            id: string;
            team: {
              id: string;
              teamName: string;
              chairmanName: string;
              ticketCompetition: {
                competitionType: string;
              };
            };

            countVote: int;
            linkFullPaper: string;
            linkVideo: string;
            linkVideo2: string;
          };
        };
      };
      ticket?: {
        exhibition: {
          normal: {
            buy: boolean;
            verified: boolean;
            active: boolean;
          };
          midtrans: {
            buy: boolean;
            verified: string;
            active: boolean;
          };
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
