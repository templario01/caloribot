import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { RmqService } from '../../../../libs/shared';
import { MessageService } from '../application/message/message.service';

@Controller()
export class FoodController {
  constructor(
    private readonly messageService: MessageService,
    private readonly rmqService: RmqService,
  ) {}

  // @EventPattern('validate_food')
  // async handleValidateFood(
  //   @Payload() data: PayloadDto,
  //   @Ctx() context: RmqContext,
  // ) {
  //   this.rmqService.ack(context);
  // }

  @EventPattern('add_food')
  async handleAddFood(@Payload() data: any, @Ctx() context: RmqContext) {
    console.log(data);
    await this.messageService.addNewFood(data);
    this.rmqService.ack(context);
  }
}
