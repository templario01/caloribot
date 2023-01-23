import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type FoodDocument = HydratedDocument<Food>;

class FoodInfo {
  @Prop()
  name: string;

  @Prop()
  calories: number;
  @Prop()
  serving_size_g: number;

  @Prop()
  fat_total_g: number;

  @Prop()
  fat_saturated_g: number;

  @Prop()
  protein_g: number;

  @Prop()
  sodium_mg: number;

  @Prop()
  potassium_mg: number;

  @Prop()
  cholesterol_mg: number;

  @Prop()
  carbohydrates_total_g: number;

  @Prop()
  fiber_g: number;

  @Prop()
  sugar_g: number;
}

@Schema()
export class Food {
  @Prop()
  description: string;

  @Prop({ type: FoodInfo })
  foodInfo: FoodInfo;
}

export const FoodSchema = SchemaFactory.createForClass(Food);
