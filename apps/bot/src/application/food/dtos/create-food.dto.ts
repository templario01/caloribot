class FoodInfo {
  readonly name: string;
  readonly calories: number;
  readonly serving_size_g: number;
  readonly fat_total_g: number;
  readonly fat_saturated_g: number;
  readonly protein_g: number;
  readonly sodium_mg: number;
  readonly potassium_mg: number;
  readonly cholesterol_mg: number;
  readonly carbohydrates_total_g: number;
  readonly fiber_g: number;
  readonly sugar_g: number;
}
export class CreateFoodDto {
  message: string;
  foodInfo?: FoodInfo[];
}
