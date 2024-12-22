import {
  IsString,
  IsNotEmpty,
  IsNumber,
  Min,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { IngredientCategory } from 'src/ingredient-category/entity/ingredient-category.entity';

export class CreateIngredientDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  ingredient_photo: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  calories: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  carbohydrates: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  protein: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  fat: number;

  @IsNotEmpty()
  @IsNumber()
  categories: number;
}
