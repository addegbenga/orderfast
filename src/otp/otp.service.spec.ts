import { Test } from '@nestjs/testing';
import { OtpService } from './otp.service';

const mockTaskRepository = () => ({
  getTasks: jest.fn(),
  findOne: jest.fn(),
});

describe('OtpService', () => {
  let service: OtpService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        OtpService,
        {
          provide: OtpService,
          useFactory: mockTaskRepository,
        },
      ],
    }).compile();

    service = module.get(OtpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
