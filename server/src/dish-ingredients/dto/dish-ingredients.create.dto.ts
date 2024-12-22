import { IsString, IsNotEmpty, IsNumber, Min } from 'class-validator';
import { Dishes } from 'src/dish/entity/dishes.entity';
import { Ingredients } from 'src/ingredient/entity/ingredient.entity';

export class CreateDishIngredientDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(0.0001)
  count: number;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsString()
  @IsNotEmpty()
  unit_of_measurement: string;

  @IsNotEmpty()
  @IsNumber()
  dish: number;

  @IsNotEmpty()
  @IsNumber()
  ingredient: number;
}
