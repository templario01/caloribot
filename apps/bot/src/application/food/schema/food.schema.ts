import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongoSchema } from 'mongoose';

export type FoodDocument = HydratedDocument<Food>;

const foodInfoSchema = new MongoSchema({
  name: String,
  calories: Number,
  serving_size_g: Number,
  fat_total_g: Number,
  fat_saturated_g: Number,
  protein_g: Number,
  sodium_mg: Number,
  potassium_mg: Number,
  cholesterol_mg: Number,
  carbohydrates_total_g: Number,
  fiber_g: Number,
  sugar_g: Number,
});

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
  message: string;

  @Prop({ type: [foodInfoSchema] })
  foodInfo: FoodInfo[];
}

export const FoodSchema = SchemaFactory.createForClass(Food);
