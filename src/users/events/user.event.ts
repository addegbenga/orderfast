import { CreateUserEventDto } from '../dto/create-user.dto';

export class UserCreatedEvent {
  /**
   * The email of the newly created user.
   * @type {string}
   */
  email: string;

  /**
   * This event listener handles OTP generation, sending email for OTP, and other events.
   * Creates an instance of UserCreatedEvent.
   * @param {CreateUserEventDto} params - The parameters for creating the event.
   * @param {string} params.email - The email of the newly created user.
   */

  constructor({ email }: CreateUserEventDto) {
    this.email = email;
  }
}
