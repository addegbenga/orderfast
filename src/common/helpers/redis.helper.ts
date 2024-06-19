export class RedisKeys {
  static emailVerificationPin(email: string): string {
    return `email-verification-otp:${email}`;
  }
  static emailVerificationSecret(email: string): string {
    return `email-verification-secret:${email}`;
  }

  static passwordResetPin(email: string): string {
    return `password-reset-pin:${email}`;
  }
}
