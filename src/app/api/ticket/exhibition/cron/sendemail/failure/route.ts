import { render } from '@react-email/render';
import { NextRequest, NextResponse } from 'next/server';

import Email from '@/components/emails/Emails';
import { prisma } from '@/lib/db';
import { transporter } from '@/lib/mailTransporter';

export async function POST(req: NextRequest) {
  try {
    const transactions = await prisma.transactionDetail.findMany({
      where: {
        status: 'failure',
        statusData: 'waiting',
      },
      orderBy: {
        customerName: 'asc',
      },
      include: {
        ticketGS: true,
      },
      take: 2,
    });

    const heading = 'Verification Process for Your Ticket Purchase';
    const content =
      'We would like to inform you that we have received your ticket purchase order. Currently, our team is in the process of verifying this transaction to ensure its security and accuracy. Please be patient for a moment, as our team is diligently working to expedite this verification. We promise to provide you with the latest update as soon as the verification process is completed. We appreciate your understanding and patience throughout this process. If you have any questions or need further assistance, please do not hesitate to contact our support team at this email address. Thank you and warm regards,';

    const promise: any[] = [];
    for (let i = 0; i < transactions.length; i++) {
      const promiseTemp = transactions[i].ticketGS.map((t) => {
        return transporter.sendMail({
          from: '"Sandbox IEEE" <sandboxieeewebsite@gmail.com>',
          to: t.email,
          subject: 'Verification Process for Your Ticket Purchase',
          html: render(
            Email({
              content: content,
              heading: heading,
              name: t.name,
            }),
            { pretty: true },
          ),
        });
      });

      promise.push(promiseTemp);
    }
    await Promise.all(promise);

    const update = transactions.map((t) => {
      return prisma.transactionDetail.update({
        where: {
          id: t.id,
        },
        data: {
          statusData: 'email',
        },
      });
    });

    await Promise.all(update);
    return NextResponse.json(
      { message: 'Send failure email' },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}
