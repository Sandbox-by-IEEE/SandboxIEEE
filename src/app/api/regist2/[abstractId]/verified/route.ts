import { render } from '@react-email/render';
import { NextRequest, NextResponse } from 'next/server';

import Email from '@/components/emails/Emails';
import { prisma } from '@/lib/db';
import { transporter } from '@/lib/mailTransporter';

interface Params {
  abstractId: string;
}

export async function PATCH(
  req: NextRequest,
  { params: { abstractId } }: { params: Params },
) {
  let isUpdated = false;
  try {
    if (!abstractId) {
      return NextResponse.json(
        { message: 'some data is missing' },
        { status: 400 },
      );
    }

    const existingAbstract = await prisma.abstract.findUnique({
      where: {
        id: abstractId,
      },
    });

    if (!existingAbstract) {
      return NextResponse.json(
        { message: 'abstract not found' },
        { status: 404 },
      );
    }

    const updatedAbstract = await prisma.abstract.update({
      where: {
        id: abstractId,
      },
      data: {
        status: 'success',
      },
      include: {
        team: {
          select: {
            chairmanEmail: true,
            chairmanName: true,
            teamName: true,
            ticketCompetition: {
              select: {
                competitionType: true,
              },
            },
          },
        },
      },
    });

    // eslint-disable-next-line unused-imports/no-unused-vars
    isUpdated = true;

    const headingSuccess = ``;
    const content = ``;

    const mailOptions = {
      from: '"The Sandbox by IEEE" <sandboxieeewebsite@gmail.com>',
      to: updatedAbstract.team?.chairmanEmail || '',
      subject: ``,
      html: render(
        Email({
          heading: headingSuccess,
          content,
          name: updatedAbstract.team?.teamName || '',
        }),
        { pretty: true },
      ),
    };
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { data: updatedAbstract, message: 'Abstract update succesfull' },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof Error) {
      // eslint-disable-next-line no-console
      console.log('ERROR_UPDATED_ABSTRACT: ', error.message);
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}
