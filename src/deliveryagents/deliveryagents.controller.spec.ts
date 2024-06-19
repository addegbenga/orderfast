import { Test, TestingModule } from '@nestjs/testing';
import { DeliveryagentsController } from './deliveryagents.controller';
import { DeliveryagentsService } from './deliveryagents.service';

describe('DeliveryagentsController', () => {
  let controller: DeliveryagentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeliveryagentsController],
      providers: [DeliveryagentsService],
    }).compile();

    controller = module.get<DeliveryagentsController>(DeliveryagentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
