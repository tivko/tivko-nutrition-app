import {
  IsOptional,
  IsNumber,
  Min,
  Max,
  IsEnum,
  IsNotEmpty,
} from 'class-validator';
import { Gender } from '../enums/gender.enum';
import { ActivityLevel } from 'src/additionalData/entities/activitylevel.enity';
import { Goal } from 'src/additionalData/entities/goal.enity';

export class HealthInfoUpdateDto {
  @IsOptional({ message: 'Age must be not empty' })
  @IsNotEmpty()
  @IsNumber({}, { message: 'Age must be a number' })
  @Min(18, { message: 'Age must be at least 18' })
  @Max(99, { message: 'Age must not exceed 99' })
  age?: number;

  @IsOptional({ message: 'Weight must not be empty' })
  @IsNotEmpty()
  @IsNumber(
    { maxDecimalPlaces: 3 },
    { message: 'Weight must be a number with maximum 3 decimal places' },
  )
  @Min(4.999, { message: 'Weight must be at least 4.999' })
  @Max(999.999, { message: 'Weight must not exceed 999.999' })
  weight?: number;

  @IsOptional({ message: 'Height must not be empty' })
  @IsNotEmpty()
  @IsNumber(
    { maxDecimalPlaces: 3 },
    { message: 'Height must be a number with maximum 3 decimal places' },
  )
  @Min(10.0, { message: 'Height must be at least 10.0' })
  @Max(300.0, { message: 'Height must not exceed 300.0' })
  height?: number;

  @IsOptional({ message: 'Gender must not be empty' })
  @IsNotEmpty()
  @IsEnum(Gender, { message: 'Invalid gender' })
  gender?: Gender;

  // @IsOptional()
  // @IsNotEmpty()
  // @IsNumber()
  // @Min(0)
  // @Max(100)
  // macroSplitDietCarbs?: number;
  // @IsOptional()
  // @IsNotEmpty()
  // @IsNumber()
  // @Min(0)
  // @Max(100)
  // macroSplitDietFat?: number;
  // @IsOptional()
  // @IsNotEmpty()
  // @IsNumber()
  // @Min(0)
  // @Max(100)
  // macroSplitDietProtein?: number;

  // @IsOptional()
  // @IsNotEmpty()
  // @IsNumber()
  // BMI?: number | null;
  // @IsOptional()
  // @IsNotEmpty()
  // @IsNumber()
  // BMR?: number | null;

  // @IsOptional()
  // @IsNotEmpty({ message: 'ActivityLevel must not be empty' })
  // activityLevel?: ActivityLevel;

  @IsOptional()
  bodyfat?: number | null;
}
