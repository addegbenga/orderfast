import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto, ResetUserPasswordDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UserEntity } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async createUser(createDto: CreateUserDto): Promise<UserEntity> {
    const { password, email, firstName, lastName, phoneNumber } = createDto;

    //--> Hash the password before storing it in the database

    //1.-->Generate password hash
    const hashedPassword = await this.genPasswordhash(password);

    //2. Create user entity with new hashed password
    const user = new CreateUserDto();
    user.password = hashedPassword;
    user.email = email;
    user.firstName = firstName;
    user.lastName = lastName;
    user.phoneNumber = phoneNumber;

    //4. Save user entity using the repository
    return this.usersRepository.createUser(user);
  }

  private async genPasswordhash(password: string) {
    //1. Generate Password Salt
    const salt = await bcrypt.genSalt();

    //2. Generate Password Salt
    const hashPassword = await bcrypt.hash(password, salt);

    return hashPassword;
  }

  async getByEmail(email: string) {
    const response = await this.usersRepository.getByEmail(email);
    if (!response) {
      throw new NotFoundException();
    }
    return response;
  }

  async getAllUser() {
    const response = await this.usersRepository.getAllUser();
    if (!response) {
      throw new NotFoundException();
    }
    return response;
  }

  async updateUser(createDto: UpdateUserDto) {
    const response = await this.usersRepository.updateUser(createDto);
    if (!response) {
      throw new NotFoundException();
    }
    return response;
  }

  async resetUserPassword({ newPassword, email }: ResetUserPasswordDto) {
    //-->Hash new Password before updating.

    //1.-->Generate password hash
    const hashedPassword = await this.genPasswordhash(newPassword);
    const response = await this.usersRepository.update(
      { email },
      {
        password: hashedPassword,
      },
    );
    if (!response) {
      throw new NotFoundException();
    }
    return response;
  }
}
