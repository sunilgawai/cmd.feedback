import nodemailer, { TransportOptions } from 'nodemailer';

const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_HOST,
      secure: process.env.MAIL_HOST,
      
} as TransportOptions)