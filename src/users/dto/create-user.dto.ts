import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
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

export class CreateUserEventDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
