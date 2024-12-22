import { IsNotEmpty } from 'class-validator';
import { Users } from '../entity/users.entity';
import { Ingredients } from 'src/ingredient/entity/ingredient.entity';
export class AllergiesDto {
  @IsNotEmpty()
  ingredientsId: number;
}
