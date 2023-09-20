import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  host: 'smtp-relay.sendinblue.com',
  port: 587,
  secure: false,
  auth: {
    user: 'sandboxieeewebsite@gmail.com',
    pass: 'XHIqgcPv5zjFMdZA',
  },
});
