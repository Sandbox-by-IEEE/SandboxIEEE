import Midtrans from 'midtrans-client';

export const snap = new Midtrans.Snap({
  isProduction: false,
  serverKey: process.env.SECRET_MIDTRANS,
  clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT,
});
