import { IsNotEmpty, IsString } from 'class-validator';

export class CreateIngredientCategoryDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  // @IsNotEmpty()
  // ingredientId: number;
}
