import { IsString, IsNotEmpty, IsNumber, Min, IsEnum } from 'class-validator';
import { MealType } from '../entity/dailyDishes.entity';

export class CreateDailyDishDto {
  @IsNotEmpty()
  @IsNumber()
  dishId: number;

  @IsNotEmpty()
  @IsNumber()
  dailyInfoId: number;

  @IsNotEmpty()
  @IsEnum(MealType, { message: 'Неправильний mealType' })
  mealType: MealType;
}
