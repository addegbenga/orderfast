/**
 * Enum representing different OTP expiration times in seconds.
 */
export enum EXPIRY_TIME {
  /**
   * Default expiration time: 5 minutes (300 seconds)
   */
  DEFAULT_EXP = 300,
  /**
   * Short expiration time: 20 seconds
   */
  SHORT_EXP = 20,
  /**
   * Long expiration time: 7 Days
   */
  LONG_EXP = 604800,
}
