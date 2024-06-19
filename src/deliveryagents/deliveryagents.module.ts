import { Module } from '@nestjs/common';
import { DeliveryagentsService } from './deliveryagents.service';
import { DeliveryagentsController } from './deliveryagents.controller';

@Module({
  controllers: [DeliveryagentsController],
  providers: [DeliveryagentsService],
})
export class DeliveryagentsModule {}
