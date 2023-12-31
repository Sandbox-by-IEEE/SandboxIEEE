import { render } from '@react-email/render';
import { NextRequest, NextResponse } from 'next/server';

import Email from '@/components/emails/Emails';
import { prisma } from '@/lib/db';
import { transporter } from '@/lib/mailTransporter';

// eslint-disable-next-line unused-imports/no-unused-vars
export async function POST(req: NextRequest) {
  try {
    const ticketNotVerified = await prisma.ticketCompetition.findMany({
      where: {
        OR: [
          {
            verified: 'rejected',
          },
          {
            verified: 'pending',
          },
        ],
      },
      include: {
        team: {
          include: {
            members: true,
          },
        },
      },
    });

    const headingNotVerified = `${ticketNotVerified[0].competitionType} Verification Update`;

    for (let i = 0; i < ticketNotVerified.length; i++) {
      const mailOptions = {
        from: '"The Sandbox by IEEE" <sandboxieeewebsite@gmail.com>',
        to: ticketNotVerified[i].team?.chairmanEmail,
        subject: `[SANDBOX] Announcement of Verification Results of Your ${ticketNotVerified[i].competitionType} Ticket`,
        html: render(
          Email({
            heading: headingNotVerified,
            content: `
            Dear the Sandbox competition registrant,

            We would like to express our gratitude for your participation in our competition selection process. Unfortunately, we regret to inform you that your application didn’t meet our requirement. We appreciate for your time and effort. Thank you for your participation in our events and we hope that you keep engaged with our further opportunity in the Sandbox by IEEE ITB SB.
            Thank you for your interest and participation in our event. We hope to see you in future competitions and wish you the best in your future endeavors.
           `,
            name: ticketNotVerified[i].team?.teamName || '',
          }),
          { pretty: true },
        ),
      };
      await transporter.sendMail(mailOptions);
    }

    await prisma.ticketCompetition.updateMany({
      where: {
        verified: 'pending',
      },
      data: {
        verified: 'rejected',
      },
    });

    const ticketVerifiedPTC = await prisma.ticketCompetition.findMany({
      where: {
        verified: 'verified',
        competitionType: 'PTC',
      },
      include: {
        team: {
          include: {
            members: true,
          },
        },
      },
    });

    const headingVerifiedPTC = `${ticketVerifiedPTC[0].competitionType} Verification Update`;

    for (let i = 0; i < ticketVerifiedPTC.length; i++) {
      const mailOptions = {
        from: '"The Sandbox by IEEE" <sandboxieeewebsite@gmail.com>',
        to: ticketVerifiedPTC[i].team?.chairmanEmail,
        subject: `[SANDBOX] Announcement of Verification Results of Your ${ticketVerifiedPTC[i].competitionType} Ticket`,
        html: render(
          Email({
            heading: headingVerifiedPTC,
            content: `
            Greetings, Prototech Contest Participants!
            
            Congratulations, you have passed the document selection and are starting your journey in our competition with the abstract stage. More comprehensive information regarding abstracts can be accessed in our abstract guidline document below.
            
            Remember to submit your abstract along with a plagiarism letter. Failure to comply with existing provisions and rules will ensure your qualification at this stage.
            https://docs.google.com/document/d/1wb8lnMVLLYpO7X3wy1ct07gra49pPPnbDI4CIXSZ87Y/edit?usp=sharing
            
            You can join our WhatsApp Group by clicking the link provided below.
            https://chat.whatsapp.com/E7IFJ5arD8hHnurREL4JiF
           `,
            name: ticketVerifiedPTC[i].team?.teamName || '',
          }),
          { pretty: true },
        ),
      };
      await transporter.sendMail(mailOptions);
    }

    const ticketVerifiedTPC = await prisma.ticketCompetition.findMany({
      where: {
        verified: 'verified',
        competitionType: 'TPC',
      },
      include: {
        team: {
          include: {
            members: true,
          },
        },
      },
    });

    const headingVerifiedTPC = `${ticketVerifiedTPC[0].competitionType} Verification Update`;

    for (let i = 0; i < ticketVerifiedTPC.length; i++) {
      const mailOptions = {
        from: '"The Sandbox by IEEE" <sandboxieeewebsite@gmail.com>',
        to: ticketVerifiedTPC[i].team?.chairmanEmail,
        subject: `[SANDBOX] Announcement of Verification Results of Your ${ticketVerifiedTPC[i].competitionType} Ticket`,
        html: render(
          Email({
            heading: headingVerifiedTPC,
            content: `
            Greetings, Technovate Paper Competition Participants!
            
            Congratulations, you have passed the document selection and are starting your journey in our competition with the abstract stage. More comprehensive information regarding abstracts can be accessed in our abstract guidline document below.
            
            Remember to submit your abstract along with a plagiarism letter. Failure to comply with existing provisions and rules will ensure your qualification at this stage
            https://docs.google.com/document/d/1r1e5gqsZrAlBBP7HuzP28jd54VgHKUnkBpoEkNz1WhI/edit?usp=sharing
            
            You can join our WhatsApp Group by clicking the link provided below.
            https://chat.whatsapp.com/DNJPI2U2XbDJGPk5FfcxaJ
           `,
            name: ticketVerifiedTPC[i].team?.teamName || '',
          }),
          { pretty: true },
        ),
      };
      await transporter.sendMail(mailOptions);
    }

    // eslint-disable-next-line no-console
    console.log('POST_SEND_EMAIL: All email was sent');
    return NextResponse.json(
      { message: 'All email was sent' },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof Error) {
      // eslint-disable-next-line no-console
      console.log('ERROR_POST_SEND_EMAIL: ', error);
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}
