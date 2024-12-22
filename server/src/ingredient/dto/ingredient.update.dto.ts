import {
  IsString,
  IsNotEmpty,
  IsNumber,
  Min,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { IngredientCategory } from 'src/ingredient-category/entity/ingredient-category.entity';

export class UpdateIngredientDto {
  @IsOptional()
  @IsNotEmpty({ message: 'title must not be empty' })
  @IsString({ message: 'title must be a string' })
  title: string;

  @IsOptional()
  @IsNotEmpty({ message: 'description must not be empty' })
  @IsString({ message: 'description must be a string' })
  description: string;

  @IsOptional()
  @IsNotEmpty({ message: 'ingredient_photo must not be empty' })
  @IsString({ message: 'ingredient_photo must be a string' })
  ingredient_photo: string;

  @IsOptional()
  @IsNotEmpty({ message: 'carbohydrates must not be empty' })
  @IsNumber(
    { maxDecimalPlaces: 3 },
    { message: 'Carbohydrates must be a number with maximum 3 decimal places' },
  )
  @Min(0)
  carbohydrates: number;

  @IsOptional()
  @IsNotEmpty({ message: 'Calories must not be empty' })
  @IsNumber(
    { maxDecimalPlaces: 3 },
    { message: 'Calories must be a number with maximum 3 decimal places' },
  )
  @Min(0)
  calories: number;

  @IsOptional()
  @IsNotEmpty({ message: 'protein must not be empty' })
  @IsNumber(
    { maxDecimalPlaces: 3 },
    { message: 'Protein must be a number with maximum 3 decimal places' },
  )
  @Min(0)
  protein: number;

  @IsOptional()
  @IsNotEmpty({ message: 'Fat must not be empty' })
  @IsNumber(
    { maxDecimalPlaces: 3 },
    { message: 'Fat must be a number with maximum 3 decimal places' },
  )
  @Min(0)
  fat: number;
}
