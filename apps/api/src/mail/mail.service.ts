import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

// Thin wrapper around nodemailer. Swap the transport for Resend/SES later
// without touching any code that calls sendOtpEmail(...).
@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  private readonly transporter: nodemailer.Transporter;
  private readonly from: string;

  constructor(private readonly config: ConfigService) {
    this.from = this.config.get<string>('mail.from')!;
    this.transporter = nodemailer.createTransport({
      host: this.config.get<string>('mail.host'),
      port: this.config.get<number>('mail.port'),
      secure: false,
      auth: {
        user: this.config.get<string>('mail.user'),
        pass: this.config.get<string>('mail.password'),
      },
    });
  }

  async sendOtpEmail(to: string, code: string): Promise<void> {
    const subject = 'رمز التحقق الخاص بك — SouQ سوق';
    const html = `
      <div dir="rtl" style="font-family: sans-serif; text-align: right;">
        <h2>رمز التحقق الخاص بك</h2>
        <p>استخدم الرمز التالي لإكمال العملية، وهو صالح لمدة 5 دقائق:</p>
        <p style="font-size: 28px; font-weight: bold; letter-spacing: 4px;">${code}</p>
        <p>إذا لم تطلب هذا الرمز، تجاهل هذه الرسالة.</p>
      </div>
    `;

    try {
      await this.transporter.sendMail({ from: this.from, to, subject, html });
    } catch (error) {
      // Never let a mail-provider outage crash the request — log it so it's
      // visible in Sentry/monitoring, the caller decides how to handle it.
      this.logger.error(`Failed to send OTP email to ${to}`, error as Error);
      throw error;
    }
  }
}
