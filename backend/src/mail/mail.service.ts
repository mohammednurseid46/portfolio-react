import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  constructor(private readonly config: ConfigService) {}

  async sendContactMessage(data: { name: string; email: string; message: string }) {
    const host = this.config.get<string>('smtp.host');
    const user = this.config.get<string>('smtp.user');
    const password = this.config.get<string>('smtp.password');
    const notifyEmail = this.config.get<string>('smtp.notifyEmail');
    if (!host || !user || !password || !notifyEmail) {
      this.logger.warn('SMTP is not configured; contact email was skipped');
      return;
    }
    const transporter = nodemailer.createTransport({
      host,
      port: this.config.get<number>('smtp.port') || 587,
      secure: (this.config.get<number>('smtp.port') || 587) === 465,
      auth: { user, pass: password },
    });
    await transporter.sendMail({
      from: user,
      to: notifyEmail,
      replyTo: data.email,
      subject: `Portfolio contact from ${data.name}`,
      text: `${data.name} <${data.email}>\n\n${data.message}`,
    });
  }
}
