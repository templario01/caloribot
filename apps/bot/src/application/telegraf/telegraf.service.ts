import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Telegraf, Context } from 'telegraf';
import { NutritionApiService } from '../nutrition-api/nutrition-api.service';
import { TelegrafMessage } from './dtos/telegraf-message.response';

@Injectable()
export class TelefrafService implements OnModuleInit {
  private readonly telegraf: Telegraf;
  constructor(
    readonly configService: ConfigService,
    private readonly nutritionService: NutritionApiService,
  ) {
    this.telegraf = new Telegraf(configService.get<string>('BOT_TOKEN'));
    this.telegraf.command('start', this.startCommand.bind(this));
    this.telegraf.hears(
      /([0-9]+(?:[.,][0-9]+)?\s*(?:kg|l|g|gr|ml))(?:\s*\w+)*(?:\sand\s+)?/gi,
      this.handleFoodInfo.bind(this),
    );
    this.telegraf.on('message', this.handleOtherMessages.bind(this));
  }

  onModuleInit() {
    this.telegraf.launch();
  }

  private async handleFoodInfo(ctx: Context) {
    const { text } = <TelegrafMessage>ctx.message;
    const infoResponse = await this.nutritionService.getCalories(text);
    let foodResponse = '';

    infoResponse.forEach((food) => {
      foodResponse += `Name: ${food.name}\n`;
      foodResponse += `- calories: ${food.calories}\n`;
      foodResponse += `- carbohydrates: ${food.carbohydrates_total_g}g\n`;
      foodResponse += `- cholesterol: ${food.cholesterol_mg}mg\n`;
      foodResponse += `- fat: ${food.fat_total_g}g\n`;
      foodResponse += `- saturated fat: ${food.fat_saturated_g}g\n`;
      foodResponse += `- sugar: ${food.sugar_g}g\n`;
      foodResponse += `- sodium: ${food.sodium_mg}mg\n`;
      foodResponse += `- fiber: ${food.fiber_g}g\n`;

      ctx.reply(foodResponse);
    });
  }

  private startCommand(ctx: Context) {
    ctx.reply('Bienvenido a tu bot de calorias');
  }

  private handleOtherMessages(ctx: Context) {
    ctx.reply('No entiendo lo que dices');
  }
}
