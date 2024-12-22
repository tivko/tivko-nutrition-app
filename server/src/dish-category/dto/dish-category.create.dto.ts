import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDishCategoryDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
