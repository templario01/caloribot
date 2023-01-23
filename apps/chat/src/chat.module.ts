import { Module } from '@nestjs/common';
import { RmqModule } from '../../../libs/shared';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { FoodController } from './api/food.controller';
@Module({
  imports: [
    RmqModule.register({
      name: 'BOT-MS',
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        RABBIT_MQ_HOST: Joi.string().required(),
        RABBIT_MQ_FOOD_QUEUE: Joi.string().required(),
      }),
      envFilePath: '.env',
    }),
  ],
  controllers: [FoodController],
  providers: [],
})
export class ChatModule {}
