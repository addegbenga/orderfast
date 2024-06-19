import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOtpDto {}

export class VerifyEmailOtpEventDto {
  name: string;
  description: string;
}

export class EmailOtpDto {
  @ApiProperty()
  @IsEmail()
  email: string;
}

export class EmailOtpVerifyDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  otp: string;
}
