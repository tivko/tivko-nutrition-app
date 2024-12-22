import {
  IsString,
  IsNotEmpty,
  IsNumber,
  Min,
  IsOptional,
} from 'class-validator';
import { Dishes } from 'src/dish/entity/dishes.entity';
import { Ingredients } from 'src/ingredient/entity/ingredient.entity';

export class UpdateDishIngredientDto {
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @Min(0.0001)
  count: number;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
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
