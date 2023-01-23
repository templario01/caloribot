import { Injectable, Logger } from '@nestjs/common';
import { FoodService } from '../food/food.service';
import { CreateFoodDto } from '../food/dtos/create-food.dto';
import { Food } from '../food/schema/food.schema';

@Injectable()
export class MessageService {
  private readonly logger: Logger;

  constructor(private readonly foodService: FoodService) {
    this.logger = new Logger(MessageService.name);
  }

  async addNewFood(payload: CreateFoodDto): Promise<Food> {
    const [food] = await this.foodService.findResources(payload.message);

    if (!food) {
      const newFood = await this.foodService.create(payload);
      this.logger.log(`New food added: ${newFood}`);

      return newFood;
    }

    this.logger.log(`Food found: ${food}`);

    return food;
  }
}
