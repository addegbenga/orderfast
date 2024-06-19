import { OnEvent } from '@nestjs/event-emitter';
import { Injectable } from '@nestjs/common';
import { OtpService } from 'src/otp/otp.service';
import { UserEvent } from './enum.event';
import { CreateUserEventDto } from '../dto/create-user.dto';
import { MailService } from '../../mail/mail.service';

@Injectable()
export class UserCreatedListener {
  constructor(
    private otpService: OtpService,
    private mailService: MailService,
  ) {}

  @OnEvent(UserEvent.UserCreated)
  async handleUserCreated({ email }: CreateUserEventDto) {
    //Generate OTP
    const otp = await this.otpService.generateOtp({ email });

    //Send Email with OTP
    await this.mailService.sendAuthOtpMail({ receiver: email, otp });

    //Do any other task
  }
}
