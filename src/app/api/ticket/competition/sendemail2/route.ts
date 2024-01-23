import { render } from '@react-email/render';
import { NextRequest, NextResponse } from 'next/server';

import Email from '@/components/emails/Emails';
import { prisma } from '@/lib/db';
import { transporter } from '@/lib/mailTransporter';

// eslint-disable-next-line unused-imports/no-unused-vars
export async function POST(req: NextRequest) {
  try {
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

    const headingVerifiedPTC = `${ticketVerifiedPTC[0].competitionType} Abstract Submission Update`;

    for (let i = 0; i < ticketVerifiedPTC.length; i++) {
      const mailOptions = {
        from: '"The Sandbox by IEEE" <sandboxieeewebsite@gmail.com>',
        to: ticketVerifiedPTC[i].team?.chairmanEmail,
        subject: `[SANDBOX] ${ticketVerifiedPTC[i].competitionType} Abstract Submission Update`,
        html: render(
          Email({
            heading: headingVerifiedPTC,
            content: `
            Dear The Sandbox PTC participant, 

            We are currently entering the abstract elimination stage. All information about the abstract guidelines and submission are attached in our website in each of competition page. To make it easier for you, the abstract guidelines is provided in link below. 

            https://drive.google.com/file/d/1t4HAvE1Xvh3sLA8vl9yHN_gL42B93BD-/view?usp=sharing

            Thank you for your understanding and best of luck!
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

    const headingVerifiedTPC = `${ticketVerifiedTPC[0].competitionType} Abstract Submission Update`;

    for (let i = 0; i < ticketVerifiedTPC.length; i++) {
      const mailOptions = {
        from: '"The Sandbox by IEEE" <sandboxieeewebsite@gmail.com>',
        to: ticketVerifiedTPC[i].team?.chairmanEmail,
        subject: `[SANDBOX] ${ticketVerifiedTPC[i].competitionType} Abstract Submission Update`,
        html: render(
          Email({
            heading: headingVerifiedTPC,
            content: `
            Dear The Sandbox TPC participant, 

            We are currently entering the abstract elimination stage. All information about the abstract guidelines and submission are attached in our website in each of competition page. To make it easier for you, the abstract guidelines is provided in link below. 
            
            https://drive.google.com/file/d/1yfrPlYfwlcEOUEkiat2yhhHddV8KBcut/view?usp=sharing

            Thank you for your understanding and best of luck!
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
