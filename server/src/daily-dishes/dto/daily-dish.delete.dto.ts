import { IsString, IsNotEmpty, IsNumber, Min, IsEnum } from 'class-validator';
import { MealType } from '../entity/dailyDishes.entity';

export class DeleteDailyDishDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
