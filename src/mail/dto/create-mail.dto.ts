import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMailDto {
  @ApiProperty()
  @IsEmail()
  receiver: string;

  @ApiProperty()
  @IsString()
  subject?: string;

  @ApiProperty()
  @IsString()
  html?: string;

  payload?: any;
}
