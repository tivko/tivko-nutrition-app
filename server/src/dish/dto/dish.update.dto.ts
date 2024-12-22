import {
  IsString,
  IsNotEmpty,
  IsNumber,
  Min,
  IsOptional,
} from 'class-validator';

export class UpdateDishDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;
  @IsOptional()
  @IsNotEmpty({ message: 'title must not be empty' })
  @IsString({ message: 'title must be a string' })
  title: string;

  @IsOptional()
  @IsNotEmpty({ message: 'description must not be empty' })
  @IsString({ message: 'description must be a string' })
  description: string;

  @IsOptional()
  @IsNotEmpty({ message: 'dish_photo must not be empty' })
  @IsString({ message: 'dish_photo must be a string' })
  dish_photo: string;

  @IsOptional()
  @IsNotEmpty({ message: 'dish_video must not be empty' })
  @IsString({ message: 'dish_video must be a string' })
  dish_video: string;

  @IsOptional()
  @IsNotEmpty({ message: 'carbohydrates must not be empty' })
  @IsNumber(
    { maxDecimalPlaces: 3 },
    { message: 'Carbohydrates must be a number with maximum 3 decimal places' },
  )
  @Min(0)
  carbohydrates: number;

  @IsOptional()
  @IsNotEmpty({ message: 'protein must not be empty' })
  @IsNumber(
    { maxDecimalPlaces: 3 },
    { message: 'Protein must be a number with maximum 3 decimal places' },
  )
  @Min(0)
  protein: number;

  @IsOptional()
  @IsNotEmpty({ message: 'portion must not be empty' })
  @IsNumber(
    { maxDecimalPlaces: 3 },
    { message: 'Portion must be a number with maximum 3 decimal places' },
  )
  @Min(0)
  portion: number;

  @IsOptional()
  @IsNotEmpty({ message: 'Calories must not be empty' })
  @IsNumber(
    { maxDecimalPlaces: 3 },
    { message: 'Calories must be a number with maximum 3 decimal places' },
  )
  @Min(0)
  calories: number;

  @IsOptional()
  @IsNotEmpty({ message: 'fat must not be empty' })
  @IsNumber(
    { maxDecimalPlaces: 3 },
    { message: 'Fat must be a number with maximum 3 decimal places' },
  )
  @Min(0)
  fat: number;
}
