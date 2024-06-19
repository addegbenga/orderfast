import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as sgMail from '@sendgrid/mail';
import { CreateMailDto } from './dto/create-mail.dto';

@Injectable()
export class MailService {
  private sendGridKey: string;
  private sendGridSender: string;
  constructor(private configService: ConfigService) {
    this.sendGridKey = configService.get('SENDGRID_API_KEY');
    this.sendGridSender = configService.get('SEND_GRID_MAIL_FROM');
    sgMail.setApiKey(this.sendGridKey);
  }
  async sendMail(sendEmailDto: CreateMailDto) {
    const data = await sgMail.send({
      from: this.sendGridSender,
      to: sendEmailDto.receiver,
      subject: sendEmailDto.subject,
      html: sendEmailDto.html,
    });
    return data;
  }

  async sendAuthOtpMail(sendEmailDto: CreateMailDto & { otp: string }) {
    const data = await sgMail.send({
      from: this.sendGridSender,
      to: sendEmailDto.receiver,
      subject: 'Welcome to OrderNow',
      html: `Welcome to OrderNow, Kindly Verify Your Otp with this code: ${sendEmailDto.otp} last for 7days `,
    });
    return data;
  }
}
