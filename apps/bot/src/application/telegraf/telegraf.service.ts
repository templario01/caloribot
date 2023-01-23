import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Telegraf, Context } from 'telegraf';
import { NutritionApiService } from '../nutrition-api/nutrition-api.service';
import { TelegrafMessage } from './dtos/telegraf-message.response';
import { ClientProxy } from '@nestjs/microservices';
import { FoodService } from '../food/food.service';
import { NutritionResponse } from '../nutrition-api/dtos/nutrition.response';

@Injectable()
export class TelefrafService implements OnModuleInit {
  private readonly telegraf: Telegraf;
  private readonly logger: Logger;
  constructor(
    readonly configService: ConfigService,
    private readonly nutritionService: NutritionApiService,
    private readonly foodService: FoodService,
    @Inject('CHAT-MS') private chatClient: ClientProxy,
  ) {
    this.telegraf = new Telegraf(configService.get<string>('BOT_TOKEN'));
    this.telegraf.command('start', this.startCommand.bind(this));
    this.telegraf.hears(
      /([0-9]+(?:[.,][0-9]+)?\s*(?:kg|l|g|gr|ml))(?:\s*\w+)*(?:\sand\s+)?/gi,
      this.handleFoodInfo.bind(this),
    );
    this.telegraf.on('message', this.handleOtherMessages.bind(this));
    this.logger = new Logger(TelefrafService.name);
  }

  onModuleInit() {
    this.telegraf.launch();
  }

  private async handleFoodInfo(ctx: Context) {
    let infoResponse: NutritionResponse[];
    let foodResponse = '';
    const { text } = <TelegrafMessage>ctx.message;
    const [food] = await this.foodService.findResources(text);
    if (food) {
      infoResponse = food.foodInfo;
    } else {
      infoResponse = await this.nutritionService.getCalories(text);
      const newFood = await this.foodService.create({
        message: text,
        foodInfo: infoResponse,
      });

      this.logger.verbose(
        `Food added for futures searches: ${newFood.message}`,
      );
    }

    infoResponse.forEach((food) => {
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
