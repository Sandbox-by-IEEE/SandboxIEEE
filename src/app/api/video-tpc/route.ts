import { render } from '@react-email/render';
import moment from 'moment-timezone';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import Email from '@/components/emails/Emails';
import { authOptions } from '@/lib/authOptions';
import { prisma } from '@/lib/db';
import { transporter } from '@/lib/mailTransporter';

// export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();

    const { teamName, linkVideo } = body;

    if (!teamName || !linkVideo) {
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
        regist3Data: true,
        members: true,
      },
    });

    // Add validation freak team user
    if (!existingTeam) {
      const sanitizedTeamName = teamName.replace(/['`’]/g, '');

      const allTeams = await prisma.team.findMany({
        include: {
          ticketCompetition: true,
          regist3Data: true,
          members: true,
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

    if (existingTeam.ticketCompetition.competitionType !== 'TPC') {
      return NextResponse.json(
        { message: 'Your team is not TPC team' },
        { status: 400 },
      );
    }

    if (!existingTeam.regist3Data) {
      return NextResponse.json(
        { message: 'You did not register at stage 3' },
        { status: 400 },
      );
    }

    if (existingTeam.regist3Data.statusPayment !== 'verified') {
      return NextResponse.json(
        { message: 'Your payment for stage 3 has not been verified' },
        { status: 400 },
      );
    }

    if (
      moment().tz('Asia/Jakarta').unix() >
      moment.tz('2024-02-15 18:00', 'Asia/Jakarta').unix()
    ) {
      return NextResponse.json(
        {
          message: 'You past the deadline',
        },
        { status: 400 },
      );
    }

    const index = existingTeam.members.findIndex(
      (member) => member.email === session.user.email,
    );

    if (index === -1) {
      return NextResponse.json(
        { message: 'You are not a member of this team' },
        { status: 400 },
      );
    }

    const updatedKarya = await prisma.karya.update({
      where: {
        teamId: existingTeam.id,
      },
      data: {
        linkVideo2: linkVideo,
      },
      include: {
        team: true,
      },
    });

    const dataSheet = {
      registId: existingTeam.regist3Data.id,
      linkVideo: linkVideo,
    };

    const response = await fetch(
      `${process.env.API_SHEET_TPC_URL}?type=video` || '',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataSheet),
      },
    );

    const resBody = await response.json();

    // console.log(resBody)

    if (resBody.status > 299 || resBody.status < 200) {
      throw new Error(`Failed to create regist3 data, ${resBody.message}`);
    }

    const content = `
    Thank you for your participation in the Sandbox project. Your data has been received, please wait for confirmation from the Sandbox team.

    This is your link video: ${linkVideo}
    `;

    const promises: any[] = [];

    for (let i = 0; i < existingTeam.members.length; i++) {
      const mailOptions = {
        from: '"The Sandbox by IEEE" <sandboxieeewebsite@gmail.com>',
        to: existingTeam.members[i].email,
        subject: `[SANDBOX]
            Video Campaign Submission'
        }`,
        html: render(
          Email({
            content,
            heading: `Video Campaign Submission`,
            name: existingTeam.members[i].name || '',
          }),
          { pretty: true },
        ),
      };

      promises.push(transporter.sendMail(mailOptions));
    }

    await Promise.all(promises);

    // eslint-disable-next-line no-console
    console.log('POST_VIDEO_TPC_3: email was sent');

    return NextResponse.json(
      {
        data: { ...updatedKarya, countVote: updatedKarya.countVote.toString() },
        message: 'Upload video success',
      },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof Error) {
      console.log('POST_VIDEO_TPC_3: ', error);
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}
