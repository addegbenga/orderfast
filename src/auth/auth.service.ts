import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AccessAuthDto, AuthDto } from './dto/create-auth.dto';
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
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private refreshTokenSecret: string;
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private eventEmitter: EventEmitter2,
    private otpService: OtpService,
    private configService: ConfigService,
  ) {
    this.refreshTokenSecret = this.configService.get('REFRESH_TOKEN_SECRET');
  }

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
  async signIn(authCredentialsDto: AuthDto): Promise<{
    tokens: { accessToken: string; refreshToken: string };
    user: AuthDto;
  }> {
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
      return {
        tokens: {
          accessToken: signedToken.accessToken,
          refreshToken: signedToken.refreshToken,
        },
        user: user,
      };
    } else {
      throw new UnauthorizedException('Not Authorized');
    }
  }

  async refresh(payload: AccessAuthDto) {
    try {
      const resp = (await this.jwtService.verifyAsync(payload.accessToken, {
        secret: this.refreshTokenSecret,
      })) as JwtPayload;

      const result = await this.signJwt({
        email: resp.email,
        id: resp.id,
        sub: resp.sub,
      });

      return result;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  private async signJwt(payload: JwtPayload) {
    const accessToken = await this.jwtService.signAsync(payload);

    //--> This will last longer(And we overiding the default exp time here)
    const refreshToken = await this.jwtService.signAsync(
      {
        email: payload.email,
      },
      {
        secret: this.refreshTokenSecret,
        expiresIn: '7 days',
      },
    );
    return { accessToken, refreshToken };
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
