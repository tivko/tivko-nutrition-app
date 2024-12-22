import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateIngredientCategoryDto {
  @IsNotEmpty()
  @IsString()
  name?: string;
  // @IsNotEmpty()
  // ingredientId?: number;
}
