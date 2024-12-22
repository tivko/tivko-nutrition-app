import { Expose, Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsNumber, Min } from 'class-validator';
import { IngredientsGeneralDto } from 'src/ingredient/dto/ingredients.general.dto';

export class DishIngredientGeneralDto {
  @Expose()
  count: number;
  @Expose()
  id: number;

  @Expose()
  description: string;

  @Expose()
  unit_of_measurement: string;

  @Type(() => IngredientsGeneralDto)
  @Expose()
  ingredient: IngredientsGeneralDto;
}
