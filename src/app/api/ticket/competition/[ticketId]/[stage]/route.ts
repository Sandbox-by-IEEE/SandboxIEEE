import { render } from '@react-email/render';
import { NextRequest, NextResponse } from 'next/server';

import Email from '@/components/emails/Emails';
import { prisma } from '@/lib/db';
import { transporter } from '@/lib/mailTransporter';

interface Params {
  ticketId: string;
  stage: string;
}

export async function PATCH(
  req: NextRequest,
  { params: { ticketId, stage } }: { params: Params },
) {
  let isUpdated = false;
  const { status } = await req.json();
  try {
    if (!ticketId) {
      return NextResponse.json(
        { message: 'Missing parameter!!' },
        { status: 400 },
      );
    }

    const existingTicket = await prisma.ticketCompetition.findUnique({
      where: {
        id: ticketId,
      },
    });

    if (!existingTicket) {
      return NextResponse.json(
        { message: 'Ticket not found!!!' },
        { status: 404 },
      );
    }

    const updatedTicket = await prisma.ticketCompetition.update({
      where: {
        id: ticketId,
      },
      data: {
        stage: Number(stage) + 0.5,
      },
      include: {
        team: {
          select: {
            teamName: true,
            chairmanName: true,
            chairmanEmail: true,
          },
        },
      },
    });

    isUpdated = true;

    let heading = '';
    let content = '';

    if (status === 'verified') {
      heading = `Your Team Cleared Stage ${stage}!`;
      content = `
        Congratulations on advancing to the Semifinal Stage of the ProtoTech Contest 2025! Your team's hard work on the abstract has truly paid off, and we commend your efforts. You can view your score here:
        https://bit.ly/PTC25AbstractScore
        As you prepare for this exciting stage, please keep in mind the following key tasks:
        1. Submit a full paper.
        2. Create a compelling pitching video.
        To help you transition smoothly into the Semifinal Stage, we will be holding a Technical Meeting. This will be a great opportunity to discuss important guidelines and address any questions you may have. We strongly encourage your attendance. Here are the details for the meeting:
        - Date: 23 February 2025 (tomorrow!)
        - Time: 10:00 WIB (GMT +7)
        - Meeting link:
        https://meet.google.com/wzf-koaa-nzf
        Once again, congratulations on this achievement! We are eager to see how your prototype develops and flourishes in the coming stage...
      `;
    } else if (status === 'rejected') {
      heading = `Your Team Didn't Clear Stage ${stage}`;
      content = `
        We want to extend our heartfelt appreciation for your hard work and dedication in the ProtoTech Contest 2025!
        After careful evaluation, we regret to inform you that your team has not advanced to the semifinal round.
        https://bit.ly/PTC25AbstractScore
        We understand this may not be the outcome you hoped for, but we want to emphasize that your efforts and innovative ideas are truly commendable. Every project is an opportunity for growth, and we encourage you to continue exploring and refining your work. Each experience brings you closer to future success!
        Thank you once again for being a valuable part of ProtoTech Contest 2025. We look forward to seeing you in future competitions, where you can showcase even more of your groundbreaking ideas. Keep pushing forward and make your vision a reality!
        Best regards,  
        The Sandbox 2.0 by IEEE ITB Student Branch
        `;
    }

    const mailOptions = {
      from: '"The Sandbox by IEEE" <sandboxieeewebsite@gmail.com>',
      to: updatedTicket.team?.chairmanEmail || '',
      subject: `${
        (status === 'verified' &&
          `Congratulations, ${updatedTicket.team?.teamName}! Welcome to the Semifinals!`) ||
        `Thank You, ${updatedTicket.team?.teamName}!`
      }`,
      html: render(
        Email({
          heading,
          content,
          name: updatedTicket.team?.teamName || '',
        }),
        { pretty: true },
      ),
    };
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { ticket: updatedTicket, message: 'Ticket data updated successful' },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof Error) {
      if (isUpdated) {
        await prisma.ticketCompetition.update({
          where: {
            id: ticketId,
          },
          data: {
            stage: Number(stage),
          },
        });
      }
      // eslint-disable-next-line no-console
      console.log('ERROR_PATCH_TICKET: ', error);
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}
