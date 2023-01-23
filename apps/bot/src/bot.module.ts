import { Module } from '@nestjs/common';
import { RmqModule } from '../../../libs/shared';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { HttpModule } from '@nestjs/axios';
import { NutritionApiService } from './application/nutrition-api/nutrition-api.service';
import { TelefrafService } from './application/telegraf/telegraf.service';

@Module({
  imports: [
    HttpModule,
    RmqModule.register({
      name: 'CHAT-MS',
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        BOT_TOKEN: Joi.string().required(),
        NINJA_API_KEY: Joi.string().required(),
        NINJA_NUTRITION_API_V1: Joi.string().required(),
        PORT: Joi.number(),
        RABBIT_MQ_BOT_QUEUE: Joi.string().required(),
      }),
      envFilePath: '.env',
    }),
  ],

  providers: [TelefrafService, NutritionApiService],
  exports: [],
  controllers: [],
})
export class BotModule {}
