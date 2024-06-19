import { Body, Controller, Post } from '@nestjs/common';
import { OtpService } from './otp.service';
import { EmailOtpDto } from './dto/create-otp.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('OTP')
@Controller('otp')
export class OtpController {
  constructor(private readonly otpService: OtpService) {}

  @Post('/resend')
  async verifyEmail(@Body() emailVerifyDto: EmailOtpDto) {
    return this.otpService.resendOtp(emailVerifyDto);
  }
}
