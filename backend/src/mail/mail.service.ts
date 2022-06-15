import { Injectable } from '@nestjs/common';
import { ActivationLink } from '../graphql.schema';
import { createTransport, SentMessageInfo, Transporter } from 'nodemailer';

@Injectable()
export class MailService {
  transporter: Transporter<SentMessageInfo>;
  constructor() {
    this.transporter = createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }
  public async sendActivationLinkToUser(data: ActivationLink) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to: data.email,
      subject: 'Активация аккаунта на ' + process.env.API_URL,
      text: 'Подтверждение электронной почты',
      html: `
        <div>
          <h1>Для подтверждения электронной почты перейдите по ссылке</h1>
          <a href="${data.link}">${data.link}</a>
        </div>
      `,
    });
  }
}
