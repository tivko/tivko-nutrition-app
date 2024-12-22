import {
  IsString,
  IsNotEmpty,
  IsNumber,
  Min,
  IsOptional,
} from 'class-validator';

export class CreateDishDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsString()
  @IsOptional()
  dish_photo: string;

  @IsString()
  @IsOptional()
  dish_video: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  carbohydrates: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  calories: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  portion: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  protein: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  fat: number;
}
