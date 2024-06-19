import { Controller } from '@nestjs/common';
import { DeliveryagentsService } from './deliveryagents.service';

@Controller('deliveryagents')
export class DeliveryagentsController {
  constructor(private readonly deliveryagentsService: DeliveryagentsService) {}
}
