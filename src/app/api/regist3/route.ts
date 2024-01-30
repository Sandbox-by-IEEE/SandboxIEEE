import { render } from '@react-email/render';
import moment from 'moment-timezone';
import { NextRequest, NextResponse } from 'next/server';

import Email from '@/components/emails/Emails';
import { prisma } from '@/lib/db';
import { transporter } from '@/lib/mailTransporter';

// export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  let registId;
  let karyaId;
  let isUpdated = false;
  let registData = {} as any;
  try {
    const dateNow = moment().tz('Asia/Jakarta').unix();

    const body = await req.json();
    // console.log(body)

    const {
      teamName,
      linkGDrive,
      paymentProof,
      paymentMethod,
      billName,
      karya,
      type,
    } = body;

    if (!teamName || !paymentProof || !type || !billName || !paymentMethod) {
      return NextResponse.json(
        { message: 'Missing some data' },
        { status: 400 },
      );
    }

    let existingTeam = await prisma.team.findUnique({
      where: {
        teamName: teamName,
      },
      include: {
        ticketCompetition: true,
        abstract: true,
      },
    });

    // Add validation freak team user
    if (!existingTeam) {
      const sanitizedTeamName = teamName.replace(/['`’]/g, '');

      const allTeams = await prisma.team.findMany({
        include: {
          ticketCompetition: true,
          abstract: true,
        },
      });

      const filterTeam = allTeams.find(
        (team) => team.teamName.replace(/['`’]/g, '') === sanitizedTeamName,
      );

      if (filterTeam) {
        existingTeam = filterTeam;
      }
    }

    if (!existingTeam) {
      return NextResponse.json({ message: 'Team not found' }, { status: 404 });
    }

    if (existingTeam.abstract?.status !== 'qualified') {
      return NextResponse.json(
        { message: 'You are not qualified' },
        { status: 401 },
      );
    }

    if (existingTeam.ticketCompetition.competitionType !== type) {
      return NextResponse.json(
        {
          message:
            'Wrong submission, your team not registered in this type of competition',
        },
        { status: 400 },
      );
    }

    if (
      type === 'PTC' &&
      dateNow > moment.tz('2024-01-23 23:59', 'Asia/Jakarta').unix()
    ) {
      return NextResponse.json(
        {
          message: 'You past the deadline',
        },
        { status: 400 },
      );
    }

    if (
      type === 'TPC' &&
      dateNow > moment.tz('2024-01-31 00:00', 'Asia/Jakarta').unix()
    ) {
      return NextResponse.json(
        {
          message: 'You past the deadline',
        },
        { status: 400 },
      );
    }
    if (type === 'TPC' && !karya && karya?.length === 0) {
      return NextResponse.json(
        {
          message: 'Full paper must be submitted in TPC',
        },
        { status: 400 },
      );
    }

    if (type === 'PTC' && !linkGDrive && linkGDrive?.length === 0) {
      return NextResponse.json(
        {
          message: 'Video url must be submitted in PTC',
        },
        { status: 400 },
      );
    }

    const existingRegist3Data = await prisma.regist3Data.findUnique({
      where: {
        teamId: existingTeam.id,
      },
      include: {
        team: {
          include: {
            karya: true,
            members: true,
          },
        },
      },
    });

    let regist3Data = {} as any;
    let karyaData = {} as any;
    if (!existingRegist3Data) {
      const newKarya = await prisma.karya.create({
        data: {
          linkFullPaper: karya,
          linkVideo: linkGDrive,
          teamId: existingTeam.id,
        },
      });
      karyaData = newKarya;
      karyaId = newKarya.id;
      const newRegist3Data = await prisma.regist3Data.create({
        data: {
          billName,
          paymentProof,
          teamName,
          paymentMethod,
          teamId: existingTeam.id,
        },
        include: {
          team: {
            include: {
              karya: true,
              members: true,
            },
          },
        },
      });
      regist3Data = newRegist3Data;
      registId = newRegist3Data.id;
    } else {
      const updatedKarya = await prisma.karya.update({
        where: {
          id: existingRegist3Data.team.karya?.id,
        },
        data: {
          linkFullPaper: karya,
          linkVideo: linkGDrive,
          teamId: existingTeam.id,
        },
      });
      karyaData = updatedKarya;
      karyaId = updatedKarya.id;
      const updatedRegist3Data = await prisma.regist3Data.update({
        where: {
          id: existingRegist3Data.id,
        },
        data: {
          billName,
          paymentProof,
          teamName,
          paymentMethod,
          teamId: existingTeam.id,
          statusPayment: 'waiting',
        },
        include: {
          team: {
            include: {
              karya: true,
              members: true,
            },
          },
        },
      });

      regist3Data = updatedRegist3Data;
      registId = updatedRegist3Data.id;

      isUpdated = true;
      registData = existingRegist3Data;
    }

    const dataRegist3 = {
      id: regist3Data.id,
      teamName: regist3Data.teamName,
      billName: regist3Data.billName,
      paymentProof: regist3Data.paymentProof,
      paymentMethod: regist3Data.paymentMethod,
      linkGDrive: karyaData.linkVideo,
      karya: karyaData.linkFullPaper,
    };

    const sheetUrl =
      type === 'TPC'
        ? process.env.API_SHEET_TPC_URL
        : process.env.API_SHEET_PTC_URL;

    // console.log(sheetUrl)
    const response = await fetch(`${sheetUrl}?type=fullpaper` || '', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataRegist3),
    });

    const resBody = await response.json();

    // console.log(resBody)

    if (resBody.status > 299 || resBody.status < 200) {
      throw new Error(`Failed to create regist3 data, ${resBody.message}`);
    }

    const content = `
    Thank you for your participation in the Sanbox project. Your data has been received, please wait for confirmation from the Sanbox team.
    `;

    const promises: any[] = [];

    for (let i = 0; i < regist3Data.team?.members.length; i++) {
      const mailOptions = {
        from: '"The Sandbox by IEEE" <sandboxieeewebsite@gmail.com>',
        to: regist3Data.team?.members[i].email,
        subject: `[SANDBOX] ${
          type.toUpperCase() === 'TPC'
            ? 'Full Paper Submission'
            : 'Video Pitching Submission'
        }`,
        html: render(
          Email({
            content,
            heading: `${
              type.toUpperCase() === 'TPC'
                ? 'Full Paper Submission'
                : 'Video Pitching Submission'
            }`,
            name: regist3Data.team?.members[i].name || '',
          }),
          { pretty: true },
        ),
      };

      promises.push(transporter.sendMail(mailOptions));
    }

    await Promise.all(promises);

    // eslint-disable-next-line no-console
    console.log('POST_REGIST_3: email was sent');

    // console.log(JSON.stringify(regist3Data));

    const serializedKarya = {
      ...karyaData,
      countVote: parseInt(karyaData.countVote.toString()),
    };

    regist3Data.team.karya = null;

    return NextResponse.json(
      {
        data: { ...regist3Data, karya: serializedKarya },
        message:
          'Full paper submission successful and please check your email for the announcement',
      },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof Error) {
      if (!isUpdated) {
        if (registId) {
          await prisma.regist3Data.delete({
            where: {
              id: registId,
            },
          });
        }

        if (karyaId) {
          await prisma.karya.delete({
            where: {
              id: karyaId,
            },
          });
        }
      } else {
        if (registId) {
          await prisma.regist3Data.update({
            where: {
              id: registId,
            },
            data: {
              billName: registData.billName,
              paymentProof: registData.paymentProof,
              paymentMethod: registData.paymentMethod,
              teamName: registData.teamName,
              teamId: registData.teamId,
              statusPayment: registData.statusPayment,
            },
          });
          if (karyaId) {
            await prisma.karya.update({
              where: {
                id: karyaId,
              },
              data: {
                linkFullPaper: registData.team.karya?.linkFullPaper,
                linkVideo: registData.team.karya?.linkVideo,
              },
            });
          }
        }
      }

      // eslint-disable-next-line no-console
      console.log('ERROR_REGIST_3', error);
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}
