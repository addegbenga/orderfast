import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UserEntity } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async createUser(createDto: CreateUserDto): Promise<UserEntity> {
    const { password, email, firstName, lastName, phoneNumber } = createDto;

    //--> Hash the password before storing it in the database

    //1. Generate Password Salt
    const salt = await bcrypt.genSalt();

    //2. Generate Password Salt
    const hashPassword = await bcrypt.hash(password, salt);

    //3. Create user entity with new hashed password
    const user = new CreateUserDto();
    user.password = hashPassword;
    user.email = email;
    user.firstName = firstName;
    user.lastName = lastName;
    user.phoneNumber = phoneNumber;

    //4. Save user entity using the repository
    return this.usersRepository.createUser(user);
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
}
