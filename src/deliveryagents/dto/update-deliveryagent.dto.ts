import { PartialType } from '@nestjs/mapped-types';
import { CreateDeliveryagentDto } from './create-deliveryagent.dto';

export class UpdateDeliveryagentDto extends PartialType(CreateDeliveryagentDto) {}
