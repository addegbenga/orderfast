import { Controller, Post, Body, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { EmailOtpVerifyDto } from 'src/otp/dto/create-otp.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthDto, AccessAuthDto } from './dto/create-auth.dto';
import { createResponse } from 'src/common/util/response.util';
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  signupUser(@Body() createAuthDto: CreateUserDto) {
    return this.authService.signUp(createAuthDto);
  }

  @Post('/signin')
  async login(@Body() createAuthDto: AuthDto) {
    const result = await this.authService.signIn(createAuthDto);
    return createResponse(HttpStatus.OK, 'Login Successfully', result);
  }

  @Post('/verify')
  async verifyEmail(@Body() emailVerifyDto: EmailOtpVerifyDto) {
    await this.authService.verifyEmail(emailVerifyDto);
    return createResponse(HttpStatus.OK, 'Email Verified Successfully', []);
  }

  @Post('/refreshToken')
  async refreshToken(@Body() accessTokenDto: AccessAuthDto) {
    const result = await this.authService.refresh(accessTokenDto);
    return createResponse(
      HttpStatus.OK,
      'Token Refreshed Successfully',
      result,
    );
  }
}
