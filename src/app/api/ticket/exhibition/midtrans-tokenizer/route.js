import Midtrans from 'midtrans-client';
import { NextResponse } from 'next/server';

let snap = new Midtrans.Snap({
  isProduction: false,
  serverKey: process.env.SECRET_MIDTRANS,
  clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT,
});

export async function POST(req) {
  const { id, ticketType, price, salesPeriod } = await req.json();
  const quantity = 1;
  const parameter = {
    item_details: {
      name: ticketType + ' - The Sandbox Exhibition and Seminar',
      category: salesPeriod,
      price: price,
      quantity: quantity,
    },
    transaction_details: {
      order_id: id,
      gross_amount: price * quantity,
    },
  };

  try {
    // Gunakan try...catch untuk menangkap error
    const token = await snap.createTransactionToken(parameter);
    // Hapus console.log yang tidak perlu
    return NextResponse.json({ token });
  } catch (error) {
    // Kembalikan error yang informatif
    return NextResponse.json({ error });
  }
}
