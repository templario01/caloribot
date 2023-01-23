import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Food, FoodDocument } from './schema/food.schema';
import { CreateFoodDto } from './dtos/create-food.dto';

@Injectable()
export class FoodService {
  constructor(@InjectModel(Food.name) private foodModel: Model<FoodDocument>) {}

  async create(data: CreateFoodDto): Promise<Food> {
    const createFood = new this.foodModel(data);
    return createFood.save();
  }

  async findAll(): Promise<Food[]> {
    return this.foodModel.find().exec();
  }
}
