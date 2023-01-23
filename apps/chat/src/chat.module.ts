import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Food, FoodSchema } from './application/food/schema/food.schema';
import { RmqModule } from '../../../libs/shared';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
@Module({
  imports: [
    RmqModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        RABBIT_MQ_HOST: Joi.string().required(),
        RABBIT_MQ_FOOD_QUEUE: Joi.string().required(),
      }),
      envFilePath: '.env',
    }),
    MongooseModule.forRoot('mongodb://victor:root@localhost:27017'),
    MongooseModule.forFeature([{ name: Food.name, schema: FoodSchema }]),
  ],
})
export class ChatModule {}
