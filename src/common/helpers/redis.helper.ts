export class RedisKeys {
  //Used for confirming email after registering
  static emailVerificationPin(email: string): string {
    return `email-verification-otp:${email}`;
  }

  //Used for reseting password
  static passwordResetPin(email: string): string {
    return `password-reset-pin:${email}`;
  }
}
