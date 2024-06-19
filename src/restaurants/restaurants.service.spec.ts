import { Test } from '@nestjs/testing';
import { RestaurantsService } from './restaurants.service';

const mockTaskRepository = () => ({
  getTasks: jest.fn(),
  findOne: jest.fn(),
});

describe('RestaurantsService', () => {
  let service: RestaurantsService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        RestaurantsService,
        {
          provide: RestaurantsService,
          useFactory: mockTaskRepository,
        },
      ],
    }).compile();

    service = module.get(RestaurantsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
