import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersRepository extends Repository<UserEntity> {
  constructor(private dataSource: DataSource) {
    super(UserEntity, dataSource.createEntityManager());
  }

  async createUser(createDto: CreateUserDto): Promise<UserEntity> {
    const { password, email, firstName, lastName, phoneNumber } = createDto;
    return this.save({
      password,
      email,
      firstName,
      lastName,
      phoneNumber,
    });
  }

  async getByEmail(email: string) {
    const response = await this.findOne({ where: { email } });
    return response;
  }

  async getAllUser() {
    const response = await this.find();
    return response;
  }

  async updateUser(createDto: UpdateUserDto) {
    const { email, firstName, lastName, phoneNumber, isActive } = createDto;
    return await this.update(
      { email: email },
      { isActive, firstName, lastName, phoneNumber },
    );
  }
}
