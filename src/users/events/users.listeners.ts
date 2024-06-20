import { OnEvent } from '@nestjs/event-emitter';
import { Injectable } from '@nestjs/common';
import { OtpService } from '../../otp/otp.service';
import { UserEvent } from './enum.event';
import { CreateUserEventDto } from '../dto/create-user.dto';
import { MailService } from '../../mail/mail.service';
import { RedisKeys } from '../../common/helpers/redis.helper';
import { EXPIRY_TIME } from '../../common/enums/index.enum';

@Injectable()
export class UserCreatedListener {
  constructor(
    private otpService: OtpService,
    private mailService: MailService,
  ) {}

  @OnEvent(UserEvent.UserCreated)
  async handleUserCreated({ email }: CreateUserEventDto) {
    //Generate OTP
    const otp = await this.otpService.generateOtp({
      email,
      redisKey: RedisKeys.emailVerificationPin(email),
      expiryTime: EXPIRY_TIME.LONG_EXP,
    });

    //Send Email with OTP
    await this.mailService.sendAuthOtpMail({ receiver: email, otp });

    //Do any other task
  }
}
