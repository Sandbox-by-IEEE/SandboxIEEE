import { JsonObject } from '@prisma/client/runtime/library';
import { render } from '@react-email/render';
import { NextRequest, NextResponse } from 'next/server';

import Email from '@/components/emails/Emails';
import { prisma } from '@/lib/db';
import { transporter } from '@/lib/mailTransporter';
import { snap } from '@/lib/midtrans';

const handleFailure = async (
  orderId: string,
  status: string,
  statusResponse: JsonObject,
) => {
  if (status === 'pending' || status === 'no-status') {
    const updated = await prisma.transactionDetail.update({
      where: {
        id: orderId,
      },
      data: {
        status: 'failure',
        metadata: statusResponse,
      },
      include: {
        ticketGS: true,
      },
    });

    // await prisma.transactionDetail.update({
    //   where: {
    //     id: updated.id,
    //   },
    //   data: {
    //     deletedData: { data: updated.ticketGS },
    //   },
    // });

    // const deleted = updated.ticketGS.map((t) => {
    //   return prisma.ticketGS.delete({
    //     where: {
    //       id: t.id,
    //     },
    //   });
    // });

    // await Promise.all(deleted);

    const heading = 'Verification Process for Your Ticket Purchase';
    const content = '';

    // await prisma.transactionDetail.update({
    //   where: {
    //     id: updated.id
    //   },
    //   data: {
    //     deletedData: { data: updated.ticketGS }
    //   }
    // })

    // const deleted = updated.ticketGS.map(t => {
    //   return prisma.ticketGS.delete({
    //     where: {
    //       id: t.id
    //     },
    //   })
    // })

    // await Promise.all(deleted)

    const promise = updated.ticketGS.map((t) => {
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

    await Promise.all(promise);

    // const payload = {
    //   sender: {
    //     email: 'sandboxieeewebsite@gmail.com',
    //   },
    //   subject: 'Verification Process for Your Ticket Purchase',
    //   messageVersions: updated.ticketGS.map((t) => {
    //     return {
    //       to: [
    //         {
    //           email: t.email,
    //           name: t.name,
    //         },
    //       ],
    //       htmlContent: render(
    //         Email({
    //           content: content,
    //           heading: heading,
    //           name: t.name,
    //         }),
    //         { pretty: true },
    //       ),
    //     };
    //   }),
    // };

    // await fetch('https://api.brevo.com/v3/smtp/email', {
    //   headers: {
    //     accept: 'application/json',
    //     'content-type': 'application/json',
    //     'api-key':
    //       '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',
    //   },
    //   method: "POST",
    //   body: JSON.stringify(payload)
    // });
  }
};

const handleSuccess = async (
  orderId: string,
  status: string,
  statusResponse: JsonObject,
) => {
  if (status === 'pending') {
    const updated = await prisma.transactionDetail.update({
      where: {
        id: orderId,
      },
      data: {
        status: 'success',
        metadata: statusResponse,
      },
      include: {
        ticketGS: {
          select: {
            email: true,
            id: true,
            idLine: true,
            name: true,
            phone: true,
          },
        },
      },
    });

    // const data = {
    //   registrationType: updated.registrationType,
    //   collectiveType: `collective ${updated.ticketGS.length}`,
    //   participants: updated.ticketGS,
    // };

    // const response = await fetch(
    //   `${process.env.SHEET_EXHI_MID}?type=ticket` || '',
    //   {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(data),
    //   },
    // );

    // const resBody = await response.json();

    // // console.log(resBody)

    // if (resBody.status > 299 || resBody.status < 200) {
    //   throw new Error(`Failed to create data, ${resBody.message}`);
    // }

    const heading = 'Verification Process for Your Ticket Purchase';
    const content =
      'We would like to inform you that we have received your ticket purchase order. Currently, our team is in the process of verifying this transaction to ensure its security and accuracy. Please be patient for a moment, as our team is diligently working to expedite this verification. We promise to provide you with the latest update as soon as the verification process is completed. We appreciate your understanding and patience throughout this process. If you have any questions or need further assistance, please do not hesitate to contact our support team at this email address. Thank you and warm regards,';

    const promise = updated.ticketGS.map((t) => {
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
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const statusResponse = await snap.transaction.notification(body);
    const orderId = statusResponse.order_id;
    const transactionStatus = statusResponse.transaction_status;
    const fraudStatus = statusResponse.fraud_status;

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
        // set transaction status on your databaase to 'challenge'
      } else if (fraudStatus == 'accept') {
        // set transaction status on your databaase to 'success'
        await handleSuccess(orderId, exist?.status || '', statusResponse);
      }
    } else if (transactionStatus == 'settlement') {
      // set transaction status on your databaase to 'success'

      await handleSuccess(orderId, exist?.status || '', statusResponse);
    } else if (transactionStatus == 'deny') {
      // you can ignore 'deny', because most of the time it allows payment retries
      // and later can become success
    } else if (transactionStatus == 'cancel' || transactionStatus == 'expire') {
      // set transaction status on your databaase to 'failure'
      await handleFailure(orderId, exist?.status || '', statusResponse);
    } else if (transactionStatus == 'pending') {
      // set transaction status on your databaase to 'pending' / waiting payment
      if (exist?.status !== 'success' && exist?.status !== 'failure') {
        await prisma.transactionDetail.update({
          where: {
            id: orderId,
          },
          data: {
            status: 'pending',
          },
        });
      }
    }

    return NextResponse.json({ message: 'OK' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: '' }, { status: 200 });
  }
}
