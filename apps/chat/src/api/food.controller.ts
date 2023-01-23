import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { RmqService } from '../../../../libs/shared';
import { FoodService } from '../application/food/food.service';

@Controller()
export class FoodController {
  constructor(
    private readonly foodService: FoodService,
    private readonly rmqService: RmqService,
  ) {}

  @EventPattern('validate_food')
  async handleOrderCreated(@Payload() data: any, @Ctx() context: RmqContext) {
    console.log(data);
    this.rmqService.ack(context);
  }
}
