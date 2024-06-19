import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from './dto/create-auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './dto/jwt-payload.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { EmailOtpVerifyDto } from 'src/otp/dto/create-otp.dto';
import { UserEvent } from 'src/users/events/enum.event';
import { UserCreatedEvent } from 'src/users/events/user.event';
import { OtpService } from 'src/otp/otp.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private eventEmitter: EventEmitter2,
    private otpService: OtpService,
  ) {}

  async signUp(payload: CreateUserDto) {
    //1. -->Create user
    const result = await this.usersService.createUser(payload);

    //2. -->User Created Event
    this.eventEmitter.emitAsync(
      UserEvent.UserCreated,
      new UserCreatedEvent({
        email: result.email,
      }),
    );

    return result;
  }
  async signIn(
    authCredentialsDto: AuthDto,
  ): Promise<{ data: { accessToken: string; user: AuthDto } }> {
    const { password, email } = authCredentialsDto;

    const user = await this.usersService.getByEmail(email);

    const isPasswordMatch = await this.comparePassword({
      password,
      hashedbPassword: user.password,
    });
    if (user && isPasswordMatch) {
      const signedToken = await this.signJwt({
        sub: user.id,
        id: user.id,
        email: user.email,
      });
      return { data: { accessToken: signedToken.accessToken, user: user } };
    } else {
      throw new UnauthorizedException('Not Authorized');
    }
  }
  private async signJwt(payload: JwtPayload) {
    const accessToken = await this.jwtService.signAsync(payload);
    return { accessToken };
  }
  private async comparePassword(payload: {
    password: string;
    hashedbPassword: string;
  }) {
    return bcrypt.compare(payload.password, payload.hashedbPassword);
  }

  async verifyEmail({ email, otp }: EmailOtpVerifyDto) {
    await this.otpService.verifyOtp({
      email,
      otp,
    });

    await this.usersService.updateUser({ email, isActive: true });
  }
}
