import { Test } from '@nestjs/testing';
import { UsersService } from './users.service';

const mockTaskRepository = () => ({
  getTasks: jest.fn(),
  findOne: jest.fn(),
});

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UsersService,
          useFactory: mockTaskRepository,
        },
      ],
    }).compile();

    service = module.get(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Create User', () => {
    it('Calls UserService.createUser and return a new user', async () => {});
  });

  describe('Get User By Email', () => {
    it('Calls UserService.getByEmail and returns a result', async () => {});
  });

  describe('Update User', () => {
    it('Calls UserService.updateUser and returns a result', async () => {});
  });
});
