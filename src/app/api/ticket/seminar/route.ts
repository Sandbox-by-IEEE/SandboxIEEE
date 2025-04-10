import { render } from '@react-email/render';
import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

import Email from '@/components/emails/Emails';
import { prisma } from '@/lib/db';
import { transporter } from '@/lib/mailTransporter';

export async function PATCH(
  req: NextRequest,
) {
  try {
    const { name, email, status } = await req.json();
    
    if (!name || !email) {
      return NextResponse.json(
        { message: 'Missing name or email!' },
        { status: 400 },
      );
    }

    // Check if entry already exists
    const existingEntry = await prisma.grandSeminar.findFirst({
      where: {
        email: email
      }
    });

    if (existingEntry) {
      return NextResponse.json(
        { message: 'Email already registered', id: existingEntry.id },
        { status: 409 },
      );
    }

    // Generate unique IDs
    const id = uuidv4();
    const ticketId = `SB-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    // Create new entry in database
    const newEntry = await prisma.grandSeminar.create({
      data: {
        id,
        name,
        email,
        ticketId,
      }
    });

    // Generate QR code URL using api.qrserver.com
    const qrData = {
      ticketId: ticketId,
      email: email
    };
    
    // URL encode the JSON data
    const encodedData = encodeURIComponent(JSON.stringify(qrData));
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodedData}&size=200x200&color=705229`;
    
    // Prepare email content with new format
    const heading = `🎫 Your Ticket for Grand Seminar & Exhibition – The Sandbox 2.0 by IEEE ITB`;
    const content = `
Thank you for registering!

We're excited to welcome you to the Grand Seminar and Exhibition – The Sandbox 2.0, proudly presented by IEEE ITB 2024/2025. Get ready for a day filled with innovation, inspiration, and incredible experiences!

🔹 Event Details
Date: Saturday, April 12th, 2025
Open Gate: 08.00 WIB
Location: Auditorium IPTEKS, East Campus Centre ITB

Attached below is your QR Code ticket. Please present it at the entrance for a smooth check-in process.

[QR_CODE]

🛑 Important:
- Make sure to arrive early to secure the best seats, and don't be late.
- Don't forget to bring a valid ID and your QR Code.
- Your Ticket ID: ${ticketId}

We can't wait to see you there and explore The Sandbox 2.0 together!

More information:
📱Nata-08176750507
ID Line: nandandas
📧Email: 18323007@std.stei.itb.ac.id
    `;

    // Send email with QR code
    const mailOptions = {
      from: '"The Sandbox by IEEE" <sandboxieeewebsite@gmail.com>',
      to: email,
      subject: `🎫 Your Ticket for Grand Seminar & Exhibition – The Sandbox 2.0 by IEEE ITB`,
      html: render(
        Email({
          heading,
          content,
          name: name,
          qrUrl: qrUrl
        }),
        { pretty: true },
      ),
    };
    
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { 
        ticket: newEntry, 
        id: id,
        ticketId: ticketId,
        message: 'Ticket created and email sent successfully' 
      },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof Error) {
      // eslint-disable-next-line no-console
      console.log('ERROR_PATCH_TICKET: ', error);
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}