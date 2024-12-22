import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class IngredientCategoryGeneralDto {
  @Expose()
  name: string;

  @Expose()
  id: string;
}
