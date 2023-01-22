import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { NutritionResponse } from './dtos/nutrition.response';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NutritionApiService {
  protected readonly logger = new Logger(NutritionApiService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async getCalories(message: string): Promise<NutritionResponse[]> {
    try {
      const apiKey = this.configService.get<string>('NINJA_API_KEY');
      const url = this.configService.get<string>('NINJA_NUTRITION_API_V1');

      const { data } = await this.httpService.axiosRef.get(
        `${url}/nutrition?query=${message}`,
        {
          headers: {
            'X-Api-Key': apiKey,
          },
        },
      );

      return data;
    } catch (error) {
      this.logger.error(error.message);
    }
  }
}
