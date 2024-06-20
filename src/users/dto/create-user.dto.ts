import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { CreateAddressDto } from 'src/address/dto/create-address.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsOptional()
  id?: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  // @ApiProperty()
  @IsOptional()
  @IsString()
  picture?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsBoolean()
  isActive: boolean;

  address?: CreateAddressDto; // Assuming AddressDTO is defined similarly for the address fields
}

export class ResetUserPasswordDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  newPassword: string;
}

export class CreateUserEventDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
