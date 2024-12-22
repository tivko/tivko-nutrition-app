import { Expose, Type } from 'class-transformer';
import { MealType } from '../entity/dailyDishes.entity';
import { DishGeneralDto } from 'src/dish/dto/dish.general.dto';

export class DailyDishGeneralDto {
  @Expose()
  id: number;

  @Expose()
  mealType: MealType;

  @Type(() => DishGeneralDto)
  @Expose()
  dish: DishGeneralDto;
}
