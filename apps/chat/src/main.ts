import { NestFactory } from '@nestjs/core';
import { ChatModule } from './chat.module';
import { RmqService } from '../../../libs/shared';

async function bootstrap() {
  const app = await NestFactory.create(ChatModule);
  const rmqService = app.get<RmqService>(RmqService);

  app.connectMicroservice(rmqService.getOptions('CHAT-MS'));
  await app.startAllMicroservices();
}
bootstrap();
