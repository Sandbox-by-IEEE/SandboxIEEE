import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  host: 'smtp-relay.sendinblue.com',
  port: 465,
  secure: true,
  auth: {
    user: 'sandboxieeewebsite@gmail.com',
    pass: 'XHIqgcPv5zjFMdZA',
  },
});
