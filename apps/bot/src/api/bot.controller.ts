import { Controller, Get } from '@nestjs/common';

@Controller()
export class BotController {
  @Get('status')
  async getStatus() {
    return { status: 'ok', date: new Date() };
  }
}
