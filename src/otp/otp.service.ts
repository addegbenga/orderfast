import { BadRequestException, Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import * as speakeasy from 'speakeasy';
import { InjectRedis } from '@nestjs-modules/ioredis';
import { EmailOtpDto, EmailOtpVerifyDto } from './dto/create-otp.dto';

@Injectable()
export class OtpService {
  constructor(@InjectRedis() private readonly redisService: Redis) {}

  async generateOtp({ redisKey, expiryTime }: EmailOtpDto) {
    const secret = speakeasy.generateSecret({ length: 20 });

    const otp = speakeasy.totp({
      secret: secret.base32,
      encoding: 'base32',
      time: expiryTime,
    });

    // Create a single object containing both the secret and the otp
    const otpData = {
      secret: secret.base32,
      otp,
    };

    // Set the combined object in Redis
    await this.redisService.setex(
      redisKey,
      expiryTime,
      JSON.stringify(otpData),
    );

    return otp;
  }

  async verifyOtp({ otp, expiryTime, redisKey }: EmailOtpVerifyDto) {
    // Retrieve the combined object from Redis
    const otpDataStr = await this.redisService.get(redisKey);

    console.log(otpDataStr);

    if (!otpDataStr) {
      throw new BadRequestException('OTP not found or expired');
    }

    // Parse the JSON object to get the secret and otp
    const otpData = JSON.parse(otpDataStr);

    // Verify the OTP
    const isValid = speakeasy.totp.verify({
      secret: otpData.secret,
      encoding: 'base32',
      token: otp,
      window: 6,
      time: expiryTime,
    });

    if (!isValid) {
      throw new BadRequestException('Not a valid OTP');
    }

    await this.redisService.del(redisKey);

    return { success: true };
  }

  async resendOtp({ expiryTime, redisKey }: EmailOtpDto) {
    // Retrieve the combined object from Redis
    const otpDataStr = await this.redisService.get(redisKey);

    if (!otpDataStr) {
      // If the object doesn't exist, generate a new OTP and secret
      const secret = speakeasy.generateSecret({ length: 20 });

      const otp = speakeasy.totp({
        secret: secret.base32,
        encoding: 'base32',
        time: expiryTime,
      });

      // Create a single object containing both the secret and the otp
      const otpData = {
        secret: secret.base32,
        otp,
      };

      // Set the combined object in Redis
      await this.redisService.setex(
        redisKey,
        expiryTime,
        JSON.stringify(otpData),
      );
      return otp;
    }

    // Parse the JSON object to get the existing OTP
    const otpData = JSON.parse(otpDataStr);

    return otpData.otp;
  }
}
