import nodemailer from 'nodemailer';
import { Resend } from 'resend';

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '465'),
  secure: process.env.SMTP_SECURE === 'true' ? true : false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const resend = new Resend('re_3CpvF9aQ_56AyBzdidBppxGcAPDFhHkj9');
