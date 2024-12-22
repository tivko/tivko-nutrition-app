import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateDishCategoryDto {
  @IsNotEmpty()
  @IsString()
  readonly name?: string;
  @IsNotEmpty()
  readonly dishId?: number;
}
