import { Test } from '@nestjs/testing';
import { AddressService } from './address.service';

const mockTaskRepository = () => ({
  getTasks: jest.fn(),
  findOne: jest.fn(),
});

describe('AddressService', () => {
  let service: AddressService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AddressService,
        {
          provide: AddressService,
          useFactory: mockTaskRepository,
        },
      ],
    }).compile();

    service = module.get(AddressService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
