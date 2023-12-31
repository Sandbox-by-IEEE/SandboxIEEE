import { render } from '@react-email/render';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import Email from '@/components/emails/Emails';
import { authOptions } from '@/lib/authOptions';
import { prisma } from '@/lib/db';
import { transporter } from '@/lib/mailTransporter';

export async function POST(req: NextRequest) {
  let abstractId = '';
  try {
    const body = await req.json();
    // console.log(body)

    const { teamName, letterPlagiarism, abstract, type } = body;

    if (!teamName || !letterPlagiarism || !abstract || !type) {
      return NextResponse.json(
        { message: 'Missing some data' },
        { status: 400 },
      );
    }

    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const existingTeam = await prisma.team.findUnique({
      where: {
        teamName: teamName,
      },
      include: {
        ticketCompetition: true,
      },
    });

    if (!existingTeam) {
      return NextResponse.json({ message: 'Team not found' }, { status: 404 });
    }

    if (existingTeam.ticketCompetition.verified !== 'verified') {
      return NextResponse.json(
        { message: 'Registration 1 is still not verified' },
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

    const newAbstract = await prisma.abstract.create({
      data: {
        teamName,
        letterPlagiarism,
        abstract,
        teamId: existingTeam.id,
      },
      include: {
        team: {
          include: {
            members: true,
          },
        },
      },
    });

    abstractId = newAbstract.id;

    const dataRegist2 = {
      id: abstractId,
      teamName: newAbstract.teamName,
      letterPlagiarism: newAbstract.letterPlagiarism,
      abstract: newAbstract.abstract,
    };

    const sheetUrl =
      type === 'TPC'
        ? process.env.API_SHEET_TPC_URL
        : process.env.API_SHEET_PTC_URL;

    // console.log(sheetUrl)
    const response = await fetch(`${sheetUrl}?type=abstract` || '', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataRegist2),
    });

    const resBody = await response.json();

    // console.log(resBody)

    if (resBody.status > 299 || resBody.status < 200) {
      throw new Error(`Failed to create ticket, ${resBody.message}`);
    }

    //isi content email
    const content = `
    
    `;

    for (let i = 0; i < newAbstract.team.members.length; i++) {
      const mailOptions = {
        from: '"The Sandbox by IEEE" <sandboxieeewebsite@gmail.com>',
        to: newAbstract.team.members[i].email,
        subject: ` `,
        html: render(
          Email({
            content,
            heading: ``,
            name: newAbstract.team.members[i].name || '',
          }),
          { pretty: true },
        ),
      };

      await transporter.sendMail(mailOptions);
    }

    // eslint-disable-next-line no-console
    console.log('POST_REGIST_2: email was sent');

    return NextResponse.json(
      { data: newAbstract, message: 'submission succesfull' },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof Error) {
      if (abstractId) {
        await prisma.abstract.delete({
          where: {
            id: abstractId,
          },
        });
      }

      // eslint-disable-next-line no-console
      console.log('ERROR_REGIST_2', error);
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}
