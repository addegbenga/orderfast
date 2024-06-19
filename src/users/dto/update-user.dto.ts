import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @IsOptional()
  id?: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  firstName?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  lastName?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  phoneNumber?: string;

  // @ApiProperty()
  @IsOptional()
  @IsString()
  picture?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsBoolean()
  isActive?: boolean;
}
