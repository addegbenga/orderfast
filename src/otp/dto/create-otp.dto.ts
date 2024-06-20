import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { EXPIRY_TIME } from '../../common/enums/index.enum';

export class CreateOtpDto {}

export class VerifyEmailOtpEventDto {
  name: string;
  description: string;
}

export class EmailOtpDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  redisKey?: string;
  expiryTime?: EXPIRY_TIME;
}

export class EmailOtpVerifyDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  otp: string;

  redisKey?: string;
  expiryTime?: EXPIRY_TIME;
}
