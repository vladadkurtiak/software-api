import { Injectable } from '@nestjs/common';
import { createTransport, Transporter } from 'nodemailer';

import { SendVerificationCodePayloadType } from './types';

import { renderHTML } from './constants';

@Injectable()
export class MailService {
  private readonly transporter: Transporter;

  constructor() {
    this.transporter = createTransport({
      host: process.env.MAIL_HOST,
      port: parseInt(process.env.MAIL_PORT),
      secure: true,
      auth: {
        user: process.env.MAIL_FROM_EMAIL,
        pass: process.env.MAIL_PASSWORD,
      },
    });
  }

  async sendVerificationCodeByEmail(payload: SendVerificationCodePayloadType) {
    this.transporter.sendMail({
      to: payload.email,
      subject: 'Your verification code',
      html: renderHTML(payload.code),
      from: {
        address: process.env.MAIL_FROM_EMAIL,
        name: process.env.MAIL_FROM_NAME,
      },
    });
  }
}
