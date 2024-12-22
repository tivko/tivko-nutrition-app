import { Expose, Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsNumber, Min } from 'class-validator';
import { DailyDishGeneralDto } from 'src/daily-dishes/dto/daily-dish.general.dto';
import { MealProgramGeneralDto } from 'src/mealProgram/dto/mealProgram.general.dto';
import { MealProgram } from 'src/mealProgram/entity/meal-program.entity';

export class DailyInfoGeneralDto {
  // @Expose()
  // date: Date;
  @Expose()
  id: number;

  @Expose()
  dailyCarbohydrates: number;

  @Expose()
  dailyProteins: number;

  @Expose()
  dailyCalories: number;

  @Expose()
  dailyFat: number;

  @Expose()
  currentWeight: number;

  @Expose()
  date: Date;

  @Type(() => MealProgramGeneralDto)
  @Expose()
  mealProgram: MealProgramGeneralDto;

  @Type(() => DailyDishGeneralDto)
  @Expose()
  dailyDishes: DailyDishGeneralDto;

  @Expose()
  mealsNumber: number;
}
