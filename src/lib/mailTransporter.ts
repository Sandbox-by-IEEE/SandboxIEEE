import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '465'),
  secure: process.env.SMTP_SECURE === 'true' ? true : false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendMail = async (options: {
  to: string;
  subject: string;
  html: string;
}) => {
  return transporter.sendMail({
    from: `"The Sandbox - IEEE ITB" <${process.env.SMTP_USER}>`,
    replyTo: process.env.SMTP_USER,
    ...options,
  });
};
