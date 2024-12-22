import { Expose, Type } from 'class-transformer';
import { IngredientCategoryGeneralDto } from 'src/ingredient-category/dto/ingredient-category.general.dto';

export class AllergiesGeneralDto {
  @Expose()
  title: string;
  @Expose()
  description: string;
  @Expose()
  id: number;
  @Expose()
  ingredient_photo: string;

  @Type(() => IngredientCategoryGeneralDto)
  @Expose()
  categories: IngredientCategoryGeneralDto;
}
