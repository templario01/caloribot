import { Module } from '@nestjs/common';
import { RmqModule } from '../../../libs/shared';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { HttpModule } from '@nestjs/axios';
import { NutritionApiService } from './application/nutrition-api/nutrition-api.service';
import { TelefrafService } from './application/telegraf/telegraf.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Food, FoodSchema } from './application/food/schema/food.schema';
import { FoodService } from './application/food/food.service';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URL'),
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([{ name: Food.name, schema: FoodSchema }]),
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
        MONGODB_URL: Joi.string().required(),
      }),
      envFilePath: '.env',
    }),
  ],

  providers: [TelefrafService, NutritionApiService, FoodService],
  exports: [],
  controllers: [],
})
export class BotModule {}
