import { BadRequestException, Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import * as speakeasy from 'speakeasy';
import { InjectRedis } from '@nestjs-modules/ioredis';
import { RedisKeys } from '../common/helpers/redis.helper';
import { EXPIRY_TIME } from '../common/enums/index.enum';
import { EmailOtpDto, EmailOtpVerifyDto } from './dto/create-otp.dto';

@Injectable()
export class OtpService {
  constructor(@InjectRedis() private readonly redisService: Redis) {}

  async generateOtp({ email }: EmailOtpDto) {
    const secret = speakeasy.generateSecret({ length: 20 });

    const otp = speakeasy.totp({
      secret: secret.base32,
      encoding: 'base32',
      time: EXPIRY_TIME.LONG_EXP,
    });

    //Set secret in redis
    await this.redisService.setex(
      RedisKeys.emailVerificationSecret(email),
      EXPIRY_TIME.LONG_EXP,
      JSON.stringify(secret),
    );

    //Set otp in Redis
    await this.redisService.setex(
      RedisKeys.emailVerificationPin(email),
      EXPIRY_TIME.LONG_EXP,
      otp,
    );

    return otp;
  }

  async verifyOtp({ email, otp }: EmailOtpVerifyDto) {
    const code = await this.redisService.get(
      RedisKeys.emailVerificationPin(email),
    );
    const secret = await this.redisService.get(
      RedisKeys.emailVerificationSecret(email),
    );

    if (!secret) {
      throw new BadRequestException('OTP not found or expired');
    }

    if (!code) {
      throw new BadRequestException('OTP not found or expired');
    }

    const isValid = speakeasy.totp.verify({
      secret: JSON.parse(secret).base32,
      encoding: 'base32',
      token: otp,
      window: 6,
      time: EXPIRY_TIME.LONG_EXP,
    });

    if (!isValid) {
      throw new BadRequestException('Not a valid OTP');
    }

    // Remove the otp from redis
    await this.redisService.del(RedisKeys.emailVerificationPin(email));
    // Remove the secret from redis
    await this.redisService.del(RedisKeys.emailVerificationSecret(email));

    return { success: true };
  }

  async resendOtp({ email }: EmailOtpDto) {
    const oldOtpData = await this.redisService.get(
      RedisKeys.emailVerificationPin(email),
    );
    const secretData = await this.redisService.get(
      RedisKeys.emailVerificationSecret(email),
    );

    if (!secretData || !oldOtpData) {
      const secret = speakeasy.generateSecret({ length: 20 });

      const otp = speakeasy.totp({
        secret: secret.base32,
        encoding: 'base32',
        time: EXPIRY_TIME.LONG_EXP,
      });

      //Set secret in redis
      await this.redisService.setex(
        RedisKeys.emailVerificationSecret(email),
        EXPIRY_TIME.LONG_EXP,
        JSON.stringify(secret),
      );

      //Set otp in Redis
      await this.redisService.setex(
        RedisKeys.emailVerificationPin(email),
        EXPIRY_TIME.LONG_EXP,
        otp,
      );

      return otp;
    }
    return oldOtpData;
  }
}
