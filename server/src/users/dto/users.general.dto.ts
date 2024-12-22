import { Expose, Type } from 'class-transformer';
import { DishGeneralDto } from 'src/dish/dto/dish.general.dto';
import { HealthInfoGeneralDto } from 'src/healthinfo/dto/healthnfo.general.dto';
import { AllergiesGeneralDto } from 'src/ingredient/dto/allergies.general.dto';
import { IngredientsGeneralDto } from 'src/ingredient/dto/ingredients.general.dto';
import { MealProgramGeneralDto } from 'src/mealProgram/dto/mealProgram.general.dto';

export class UsersGeneralDto {
  @Expose()
  id: string;
  @Expose()
  firstName: string;
  @Expose()
  lastName: string;
  @Expose()
  profile: string;
  @Expose()
  email: string;

  @Type(() => HealthInfoGeneralDto)
  @Expose()
  healthInfo: HealthInfoGeneralDto;

  @Type(() => AllergiesGeneralDto)
  @Expose()
  allergies: AllergiesGeneralDto;

  @Type(() => DishGeneralDto)
  @Expose()
  favoritedishes: DishGeneralDto;

  @Type(() => MealProgramGeneralDto)
  @Expose()
  mealProgram: MealProgramGeneralDto;
}
