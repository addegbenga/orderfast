import { Controller, Get, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';
import { createPaginatedResponse } from '../common/util/response.util';
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/all')
  async findAllUser() {
    const result = await this.usersService.getAllUser();
    return createPaginatedResponse({
      status: HttpStatus.OK,
      message: 'All Users Fetched Successfully',
      data: result,
      currentPage: 0,
      pageSize: 0,
      totalItems: 0,
      totalPages: 0,
    });
  }
}
