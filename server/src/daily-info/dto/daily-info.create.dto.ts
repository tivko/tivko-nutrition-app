import {
  IsString,
  IsNotEmpty,
  IsNumber,
  Min,
  Max,
  IsOptional,
} from 'class-validator';
import { MealProgram } from 'src/mealProgram/entity/meal-program.entity';

export class CreateDailyInfoDto {
  @IsNotEmpty()
  @IsString()
  date: Date;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  dailyCarbohydrates: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  dailyProteins: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  dailyCalories?: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  dailyFat: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(20)
  currentWeight: number;

  @IsNotEmpty()
  mealProgram: number;

  @IsOptional()
  @IsNumber()
  @Min(3)
  @Max(5)
  mealsNumber?: number;
}
