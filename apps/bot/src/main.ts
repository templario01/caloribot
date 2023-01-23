import { NestFactory } from '@nestjs/core';
import { BotModule } from './bot.module';
import { ConfigService } from '@nestjs/config';
import { RmqService } from '../../../libs/shared';

async function bootstrap() {
  const app = await NestFactory.create(BotModule);
  const configService = app.get(ConfigService);
  const rmqService = app.get<RmqService>(RmqService);

  app.connectMicroservice(rmqService.getOptions('BOT-MS'));
  await app.startAllMicroservices();
  await app.listen(configService.get('PORT'));
}
bootstrap();
