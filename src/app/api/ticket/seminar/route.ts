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
        { message: 'Email already registered' },
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
        validated: status === 'verified'
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
    
    // Prepare email content
    const heading = `Terimakasih telah membeli ticket seminar The Sandbox 2.0 by IEEE ITB Student Branch`;
    const content = `
Selamat datang di The Sandbox 2.0!

Berikut adalah kode tiket yang telah dibuat dan dapat digunakan untuk konfirmasi tiketmu di hari seminar:
Ticket ID: ${ticketId}

Silakan simpan QR code ini dan tunjukkan pada saat registrasi di hari acara.
    `;

    // Send email with QR code
    const mailOptions = {
      from: '"The Sandbox by IEEE" <sandboxieeewebsite@gmail.com>',
      to: email,
      subject: `Ticket Confirmation - The Sandbox 2.0 Seminar`,
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

    // Update Google Sheet via Apps Script Web App
    try {
      const appScriptUrl = process.env.API_SHEET_SEMINAR_2024;
      if (!appScriptUrl) {
        console.log('MISSING_APP_SCRIPT_URL: No Google Script URL provided');
      } else {
        const sheetType = 'GRAND_SEMINAR'; // Assuming this is the sheet name
        const scriptUrl = `${appScriptUrl}?method=PUT&type=${sheetType}`;
        
        const sheetResponse = await fetch(scriptUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id,
            ticketId,
            name,
            email
          }),
        });
        
        const sheetResult = await sheetResponse.json();
        console.log('SHEET_UPDATE_RESULT:', sheetResult);
      }
    } catch (sheetError) {
      console.log('ERROR_UPDATING_SHEET:', sheetError);
      // Continue with the flow even if sheet update fails
    }

    return NextResponse.json(
      { ticket: newEntry, message: 'Ticket created and email sent successfully' },
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