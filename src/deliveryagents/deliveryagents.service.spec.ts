import { Test, TestingModule } from '@nestjs/testing';
import { DeliveryagentsService } from './deliveryagents.service';

describe('DeliveryagentsService', () => {
  let service: DeliveryagentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeliveryagentsService],
    }).compile();

    service = module.get<DeliveryagentsService>(DeliveryagentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
