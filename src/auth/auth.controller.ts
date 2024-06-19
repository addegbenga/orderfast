import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { EmailOtpVerifyDto } from 'src/otp/dto/create-otp.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthDto, AccessAuthDto } from './dto/create-auth.dto';
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  signupUser(@Body() createAuthDto: CreateUserDto) {
    return this.authService.signUp(createAuthDto);
  }

  @Post('/signin')
  login(@Body() createAuthDto: AuthDto) {
    return this.authService.signIn(createAuthDto);
  }

  @Post('/verify')
  verifyEmail(@Body() emailVerifyDto: EmailOtpVerifyDto) {
    return this.authService.verifyEmail(emailVerifyDto);
  }

  @Post('/refreshToken')
  refreshToken(@Body() accessTokenDto: AccessAuthDto) {
    return this.authService.refresh(accessTokenDto);
  }
}
