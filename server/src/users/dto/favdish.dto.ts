import { IsNotEmpty } from 'class-validator';

export class FavDishDto {
  @IsNotEmpty()
  dishId: number;
}
