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
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          throw new Error('Missing username or password');
        }

        const existingUser = await prisma.user.findUnique({
          where: {
            username: credentials?.username,
          },
          include: {
            votesKarya: {
              select: {
                id: true,
                countVote: true,
                linkFullPaper: true,
                linkVideo: true,
                linkVideo2: true,
                team: {
                  select: {
                    id: true,
                    teamName: true,
                    chairmanName: true,
                    ticketCompetition: {
                      select: {
                        competitionType: true,
                      },
                    },
                  },
                },
              },
            },
            ticketsCompetition: {
              select: {
                competitionType: true,
                verified: true,
                team: true,
              },
            },
          },
        });

        if (!existingUser) {
          throw new Error(
            'Username is unregistered or user have been register with google before',
          );
        }

        if (!existingUser.credential) {
          throw new Error(
            'User is register with google, please login with google',
          );
        }

        if (!existingUser.active) {
          throw new Error(
            'User is not active, please activated your account first',
          );
        }

        const isPasswordMatch = await compare(
          credentials?.password,
          existingUser.password || '',
        );

        if (!isPasswordMatch) {
          throw new Error('Wrong password');
        }

        const karyaPTCArr = existingUser.votesKarya.filter(
          (k) => k.team.ticketCompetition.competitionType === 'PTC',
        );

        let karyaPTC;
        if (karyaPTCArr.length > 0) {
          karyaPTC = {
            ...karyaPTCArr[0],
            countVote: parseInt(karyaPTCArr[0].countVote.toString() || '0'),
            linkFullPaper: karyaPTCArr[0].linkFullPaper || '',
            linkVideo: karyaPTCArr[0].linkVideo || '',
            linkVideo2: karyaPTCArr[0].linkVideo2 || '',
          };
        } else {
          karyaPTC = undefined;
        }

        const karyaTPCArr = existingUser.votesKarya.filter(
          (k) => k.team.ticketCompetition.competitionType === 'TPC',
        );

        let karyaTPC;
        if (karyaTPCArr.length > 0) {
          karyaTPC = {
            ...karyaTPCArr[0],
            countVote: parseInt(karyaTPCArr[0].countVote.toString() || '0'),
            linkFullPaper: karyaTPCArr[0].linkFullPaper || '',
            linkVideo: karyaTPCArr[0].linkVideo || '',
            linkVideo2: karyaTPCArr[0].linkVideo2 || '',
          };
        } else {
          karyaTPC = undefined;
        }

        const ticketGSMid = await prisma.ticketGS.findFirst({
          where: {
            email: existingUser.email || '',
            transactionDetail: {
              status: 'success',
            },
          },
          include: {
            transactionDetail: true,
          },
        });

        const ticketGS = await prisma.ticketGS.findFirst({
          where: {
            email: existingUser.email || '',
          },
          include: {
            regisData: true,
          },
        });

        const ticketTPC = existingUser.ticketsCompetition.find(
          (ticket) => ticket.competitionType === 'TPC',
        );
        const ticketPTC = existingUser.ticketsCompetition.find(
          (ticket) => ticket.competitionType === 'PTC',
        );

        let currTeamTPC;
        let currTeamPTC;

        let ticketTPC2;
        let ticketPTC2;

        if (ticketTPC) {
          currTeamTPC = await prisma.team.findUnique({
            where: {
              id: ticketTPC.team?.id,
            },
            include: {
              abstract: true,
              regist3Data: true,
            },
          });
        } else {
          const participant = await prisma.participantCompetition.findFirst({
            where: {
              email: existingUser.email || '',
              team: { ticketCompetition: { competitionType: 'TPC' } },
            },
          });

          if (participant) {
            currTeamTPC = await prisma.team.findUnique({
              where: {
                id: participant.teamId,
              },
              include: {
                abstract: true,
                regist3Data: true,
                ticketCompetition: {
                  select: {
                    team: true,
                    verified: true,
                    competitionType: true,
                  },
                },
              },
            });
            ticketTPC2 = currTeamTPC.ticketCompetition;
          }
        }

        if (ticketPTC) {
          currTeamPTC = await prisma.team.findUnique({
            where: {
              id: ticketPTC.team?.id,
            },
            include: {
              abstract: true,
              regist3Data: true,
            },
          });
        } else {
          const participant = await prisma.participantCompetition.findFirst({
            where: {
              email: existingUser.email || '',
              team: { ticketCompetition: { competitionType: 'PTC' } },
            },
          });
          if (participant) {
            currTeamPTC = await prisma.team.findUnique({
              where: {
                id: participant?.teamId,
              },
              include: {
                abstract: true,
                regist3Data: true,
                ticketCompetition: {
                  select: {
                    team: true,
                    verified: true,
                    competitionType: true,
                  },
                },
              },
            });
            ticketPTC2 = currTeamPTC.ticketCompetition;
          }
        }

        return {
          id: existingUser.id,
          name: existingUser.name || '',
          username: existingUser.username || '',
          email: existingUser.email,
          image: existingUser.image || '',
          vote: {
            PTC: {
              karya: karyaPTC,
              status: karyaPTC ? true : false,
            },
            TPC: {
              karya: karyaTPC,
              status: karyaTPC ? true : false,
            },
          },
          ticket: {
            exhibition: {
              midtrans: {
                buy: ticketGSMid ? true : false,
                active: ticketGSMid ? ticketGSMid.active : false,
                verified: ticketGSMid?.transactionDetail?.status || '',
              },
              normal: {
                buy: ticketGS ? true : false,
                active: ticketGS ? ticketGS.active : false,
                verified:
                  ticketGS && ticketGS.regisData
                    ? ticketGS.regisData.verified
                    : false,
              },
            },

            PTC: {
              isLeader: currTeamPTC?.chairmanEmail === existingUser.email,
              teamId: currTeamPTC?.id,
              buy: ticketPTC ? true : false,
              verified: ticketPTC
                ? ticketPTC.verified
                : ticketPTC2
                ? ticketPTC2.verified
                : '',
              regist2Status: currTeamPTC?.abstract?.status || '',
              regist3PaymentStatus:
                currTeamPTC?.regist3Data?.statusPayment || '',
            },
            TPC: {
              isLeader: currTeamTPC?.chairmanEmail === existingUser.email,
              teamId: currTeamTPC?.id,
              buy: ticketTPC ? true : false,
              verified: ticketTPC
                ? ticketTPC.verified
                : ticketTPC2
                ? ticketTPC2.verified
                : '',
              regist2Status: currTeamTPC?.abstract?.status || '',
              regist3PaymentStatus:
                currTeamTPC?.regist3Data?.statusPayment || '',
            },
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
          votesKarya: {
            select: {
              id: true,
              countVote: true,
              linkFullPaper: true,
              linkVideo: true,
              linkVideo2: true,
              team: {
                select: {
                  id: true,
                  teamName: true,
                  chairmanName: true,
                  ticketCompetition: {
                    select: {
                      competitionType: true,
                    },
                  },
                },
              },
            },
          },
          ticketsExhibition: {
            select: {
              active: true,
              verified: true,
            },
          },
          ticketsCompetition: {
            select: {
              competitionType: true,
              verified: true,
              team: true,
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

      const karyaPTCArr = existingUser.votesKarya.filter(
        (k) => k.team.ticketCompetition.competitionType === 'PTC',
      );

      let karyaPTC;
      if (karyaPTCArr.length > 0) {
        karyaPTC = {
          ...karyaPTCArr[0],
          countVote: parseInt(karyaPTCArr[0].countVote.toString() || '0'),
          linkFullPaper: karyaPTCArr[0].linkFullPaper || '',
          linkVideo: karyaPTCArr[0].linkVideo || '',
          linkVideo2: karyaPTCArr[0].linkVideo2 || '',
        };
      } else {
        karyaPTC = undefined;
      }

      const karyaTPCArr = existingUser.votesKarya.filter(
        (k) => k.team.ticketCompetition.competitionType === 'TPC',
      );

      let karyaTPC;
      if (karyaTPCArr.length > 0) {
        karyaTPC = {
          ...karyaTPCArr[0],
          countVote: parseInt(karyaTPCArr[0].countVote.toString() || '0'),
          linkFullPaper: karyaTPCArr[0].linkFullPaper || '',
          linkVideo: karyaTPCArr[0].linkVideo || '',
          linkVideo2: karyaTPCArr[0].linkVideo2 || '',
        };
      } else {
        karyaTPC = undefined;
      }

      const ticketGSMid = await prisma.ticketGS.findFirst({
        where: {
          email: existingUser.email || '',
          transactionDetail: {
            status: 'success',
          },
        },
        include: {
          transactionDetail: true,
        },
      });

      const ticketGS = await prisma.ticketGS.findFirst({
        where: {
          email: existingUser.email || '',
        },
        include: {
          regisData: true,
        },
      });

      const ticketTPC = existingUser.ticketsCompetition.find(
        (ticket) => ticket.competitionType === 'TPC',
      );
      const ticketPTC = existingUser.ticketsCompetition.find(
        (ticket) => ticket.competitionType === 'PTC',
      );

      let currTeamTPC;
      let currTeamPTC;
      let ticketTPC2;
      let ticketPTC2;

      if (ticketTPC) {
        currTeamTPC = await prisma.team.findUnique({
          where: {
            id: ticketTPC.team?.id,
          },
          include: {
            abstract: true,
            regist3Data: true,
          },
        });
      } else {
        const participant = await prisma.participantCompetition.findFirst({
          where: {
            email: existingUser.email || '',
            team: { ticketCompetition: { competitionType: 'TPC' } },
          },
        });

        if (participant) {
          currTeamTPC = await prisma.team.findUnique({
            where: {
              id: participant.teamId,
            },
            include: {
              abstract: true,
              regist3Data: true,
              ticketCompetition: {
                select: {
                  team: true,
                  verified: true,
                  competitionType: true,
                },
              },
            },
          });
          ticketTPC2 = currTeamTPC.ticketCompetition;
        }
      }

      if (ticketPTC) {
        currTeamPTC = await prisma.team.findUnique({
          where: {
            id: ticketPTC.team?.id,
          },
          include: {
            abstract: true,
            regist3Data: true,
          },
        });
      } else {
        const participant = await prisma.participantCompetition.findFirst({
          where: {
            email: existingUser.email || '',
            team: { ticketCompetition: { competitionType: 'PTC' } },
          },
        });
        if (participant) {
          currTeamPTC = await prisma.team.findUnique({
            where: {
              id: participant?.teamId,
            },
            include: {
              abstract: true,
              regist3Data: true,
              ticketCompetition: {
                select: {
                  team: true,
                  verified: true,
                  competitionType: true,
                },
              },
            },
          });
          ticketPTC2 = currTeamPTC.ticketCompetition;
        }
      }
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub,
          name: existingUser.name || '',
          username: existingUser.username || '',
          image: existingUser.image || token.picture || '',
          vote: {
            vote: {
              PTC: {
                karya: karyaPTC,
                status: karyaPTC ? true : false,
              },
              TPC: {
                karya: karyaTPC,
                status: karyaTPC ? true : false,
              },
            },
          },
          ticket: {
            exhibition: {
              midtrans: {
                buy: ticketGSMid ? true : false,
                active: ticketGSMid ? ticketGSMid.active : false,
                verified: ticketGSMid?.transactionDetail?.status || '',
              },
              normal: {
                buy: ticketGS ? true : false,
                active: ticketGS ? ticketGS.active : false,
                verified:
                  ticketGS && ticketGS.regisData
                    ? ticketGS.regisData.verified
                    : false,
              },
            },

            PTC: {
              isLeader: currTeamPTC?.chairmanEmail === existingUser.email,
              teamId: currTeamPTC?.id,
              buy: ticketPTC ? true : false,
              verified: ticketPTC
                ? ticketPTC.verified
                : ticketPTC2
                ? ticketPTC2.verified
                : '',
              regist2Status: currTeamPTC?.abstract?.status || '',
              regist3PaymentStatus:
                currTeamPTC?.regist3Data?.statusPayment || '',
            },
            TPC: {
              isLeader: currTeamTPC?.chairmanEmail === existingUser.email,
              teamId: currTeamTPC?.id,
              buy: ticketTPC ? true : false,
              verified: ticketTPC
                ? ticketTPC.verified
                : ticketTPC2
                ? ticketTPC2.verified
                : '',
              regist2Status: currTeamTPC?.abstract?.status || '',
              regist3PaymentStatus:
                currTeamTPC?.regist3Data?.statusPayment || '',
            },
          },
        },
      };
    },
  },
};
