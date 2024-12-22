import { Expose, Type } from 'class-transformer';
import { DishCategoryGeneralDto } from 'src/dish-category/dto/dish-category.general.dto';
import { DishIngredientGeneralDto } from 'src/dish-ingredients/dto/dish-ingredients.general.dto';
import { IngredientsGeneralDto } from 'src/ingredient/dto/ingredients.general.dto';

export class DishGeneralDto {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  description: string;

  @Expose()
  dish_photo: string;

  @Expose()
  dish_video: string;

  @Expose()
  carbohydrates: number;

  @Expose()
  protein: number;

  @Expose()
  portion: number;

  @Expose()
  fat: number;

  @Expose()
  calories: number;

  @Expose()
  isFavorite: boolean;

  @Type(() => IngredientsGeneralDto)
  @Expose()
  ingredients: IngredientsGeneralDto;

  @Type(() => DishCategoryGeneralDto)
  @Expose()
  categories: DishCategoryGeneralDto;

  @Type(() => DishIngredientGeneralDto)
  @Expose()
  dishingredients: DishIngredientGeneralDto;
}
