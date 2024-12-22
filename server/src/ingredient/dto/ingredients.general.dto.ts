import { Expose, Type } from 'class-transformer';
import { IngredientCategoryGeneralDto } from 'src/ingredient-category/dto/ingredient-category.general.dto';

export class IngredientsGeneralDto {
  @Expose()
  title: string;
  @Expose()
  description: string;
  @Expose()
  id: number;
  @Expose()
  ingredient_photo: string;

  @Expose()
  carbohydrates: number;

  @Expose()
  protein: number;

  @Expose()
  calories: number;

  @Expose()
  fat: number;

  @Type(() => IngredientCategoryGeneralDto)
  @Expose()
  categories: IngredientCategoryGeneralDto;
}
