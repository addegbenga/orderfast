import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersRepository } from 'src/users/users.repository';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/users/entities/user.entity';
import { OtpService } from 'src/otp/otp.service';
import { UserCreatedListener } from 'src/users/events/users.listeners';
import { MailService } from 'src/mail/mail.service';
import { UsersService } from 'src/users/users.service';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    UsersService,
    UsersRepository,
    JwtService,
    UserEntity,
    OtpService,
    UserCreatedListener,
    MailService,
  ],
})
export class AuthModule {}
