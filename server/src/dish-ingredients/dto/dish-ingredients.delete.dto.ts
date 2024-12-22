import { IsString, IsNotEmpty, IsNumber, Min } from 'class-validator';
import { Dishes } from 'src/dish/entity/dishes.entity';
import { Ingredients } from 'src/ingredient/entity/ingredient.entity';

export class DeleteDishIngredientDto {
  @IsNotEmpty()
  @IsNumber()
  dish: number;

  @IsNotEmpty()
  @IsNumber()
  ingredient: number;
}
