import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { OtpService } from './otp.service';
import { EmailOtpDto } from './dto/create-otp.dto';
import { ApiTags } from '@nestjs/swagger';
import { EXPIRY_TIME } from 'src/common/enums/index.enum';
import { RedisKeys } from 'src/common/helpers/redis.helper';
import { createResponse } from '../common/util/response.util';
@ApiTags('OTP')
@Controller('otp')
export class OtpController {
  constructor(private readonly otpService: OtpService) {}

  @Post('/resend')
  async resendOtp(@Body() emailVerifyDto: EmailOtpDto) {
    await this.otpService.resendOtp({
      email: emailVerifyDto.email,
      expiryTime: EXPIRY_TIME.LONG_EXP,
      redisKey: RedisKeys.emailVerificationPin(emailVerifyDto.email),
    });
    //-->Todo: Raise an event to send mail for the new otp):
    return createResponse(
      HttpStatus.OK,
      'Otp sent successfully, check your email.',
      [],
    );
  }
}
