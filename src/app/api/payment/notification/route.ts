import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { snap } from '@/lib/midtrans';
import { prisma } from '@/lib/db';
import { data } from 'autoprefixer';
import { render } from '@react-email/render';
import Email from '@/components/emails/Emails';
import { transporter } from '@/lib/mailTransporter';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const statusResponse = await snap.transaction.notification(body);
    let orderId = statusResponse.order_id;
    let transactionStatus = statusResponse.transaction_status;
    let fraudStatus = statusResponse.fraud_status;

    console.log(
      `Transaction notification received. Order ID: ${orderId}. Transaction status: ${transactionStatus}. Fraud status: ${fraudStatus}`,
    );

    const exist = await prisma.transactionDetail.findUnique({
      where: {
        id: orderId,
      },
    });
    // Sample transactionStatus handling logic

    if (transactionStatus == 'capture') {
      // capture only applies to card transaction, which you need to check for the fraudStatus
      if (fraudStatus == 'challenge') {
        // TODO set transaction status on your databaase to 'challenge'
      } else if (fraudStatus == 'accept') {
        // TODO set transaction status on your databaase to 'success'

        if (exist?.status === 'pending') {
          const updated = await prisma.transactionDetail.update({
            where: {
              id: orderId,
            },
            data: {
              status: 'success',
            },
            include: {
              ticketExhibition: true,
            },
          });
          const heading = 'Verification Process for Your Ticket Purchase';
          const content =
            'We would like to inform you that we have received your ticket purchase order. Currently, our team is in the process of verifying this transaction to ensure its security and accuracy. Please be patient for a moment, as our team is diligently working to expedite this verification. We promise to provide you with the latest update as soon as the verification process is completed. We appreciate your understanding and patience throughout this process. If you have any questions or need further assistance, please do not hesitate to contact our support team at this email address. Thank you and warm regards,';

          const promise = updated.ticketExhibition.map((t) => {
            const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${JSON.stringify(
              {
                ticketId: t.id,
                email: t.email,
              },
            )}&amp;size=200x200`;

            return transporter.sendMail({
              from: '"Sandbox IEEE" <sandboxieeewebsite@gmail.com>',
              to: t.email,
              subject: 'Verification Process for Your Ticket Purchase',
              html: render(
                Email({
                  content: content,
                  heading: heading,
                  name: t.name,
                  qrUrl,
                }),
                { pretty: true },
              ),
            });
          });
          await Promise.all(promise);
        }
      }
    } else if (transactionStatus == 'settlement') {
      // TODO set transaction status on your databaase to 'success'

      if (exist?.status === 'pending') {
        const updated = await prisma.transactionDetail.update({
          where: {
            id: orderId,
          },
          data: {
            status: 'success',
          },
          include: {
            ticketExhibition: true,
          },
        });

        const heading = 'Verification Process for Your Ticket Purchase';
        const content =
          'We would like to inform you that we have received your ticket purchase order. Currently, our team is in the process of verifying this transaction to ensure its security and accuracy. Please be patient for a moment, as our team is diligently working to expedite this verification. We promise to provide you with the latest update as soon as the verification process is completed. We appreciate your understanding and patience throughout this process. If you have any questions or need further assistance, please do not hesitate to contact our support team at this email address. Thank you and warm regards,';

        const promise = updated.ticketExhibition.map((t) => {
          const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${JSON.stringify(
            {
              ticketId: t.id,
              email: t.email,
            },
          )}&amp;size=200x200`;

          return transporter.sendMail({
            from: '"Sandbox IEEE" <sandboxieeewebsite@gmail.com>',
            to: t.email,
            subject: 'Verification Process for Your Ticket Purchase',
            html: render(
              Email({
                content: content,
                heading: heading,
                name: t.name,
                qrUrl,
              }),
              { pretty: true },
            ),
          });
        });

        await Promise.all(promise);
      }
    } else if (transactionStatus == 'deny') {
      // TODO you can ignore 'deny', because most of the time it allows payment retries
      // and later can become success
    } else if (transactionStatus == 'cancel' || transactionStatus == 'expire') {
      // TODO set transaction status on your databaase to 'failure'

      if (exist?.status === 'pending') {
        await prisma.transactionDetail.update({
          where: {
            id: orderId,
          },
          data: {
            status: 'failure',
          },
        });
      }
    } else if (transactionStatus == 'pending') {
      // TODO set transaction status on your databaase to 'pending' / waiting payment
      // if (exist?.status !== 'success' && exist?.status !== 'failure' ) {
      //   await prisma.transactionDetail.update({
      //     where: {
      //       id: orderId,
      //     },
      //     data: {
      //       status: 'pending',
      //     },
      //   });
      // }
    }

    return NextResponse.json({ message: 'OK' }, { status: 200 });
  } catch (error) {}
}
