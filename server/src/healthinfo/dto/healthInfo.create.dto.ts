import { Gender } from 'src/healthinfo/enums/gender.enum';
import {
  IsDecimal,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  Max,
  Min,
  MinLength,
} from 'class-validator';
import { Users } from 'src/users/entity/users.entity';
import { ActivityLevel } from 'src/additionalData/entities/activitylevel.enity';
import { Goal } from 'src/additionalData/entities/goal.enity';

export class HealthInfoCreateDto {
  @IsNotEmpty({ message: 'Age must be not empty' })
  @IsNumber({}, { message: 'Age must be a number' })
  @Min(18, { message: 'Age must be at least 18' })
  @Max(99, { message: 'Age must not exceed 99' })
  age: number;

  @IsNotEmpty({ message: 'Weight must not be empty' })
  @IsNumber(
    { maxDecimalPlaces: 3 },
    { message: 'Weight must be a number with maximum 3 decimal places' },
  )
  @Min(4.999, { message: 'Weight must be at least 4.999' })
  @Max(999.999, { message: 'Weight must not exceed 999.999' })
  weight: number;

  @IsNotEmpty({ message: 'Height must not be empty' })
  @IsNumber(
    { maxDecimalPlaces: 3 },
    { message: 'Height must be a number with maximum 3 decimal places' },
  )
  @Min(10.0, { message: 'Height must be at least 10.0' })
  @Max(300.0, { message: 'Height must not exceed 300.0' })
  height: number;

  @IsNotEmpty({ message: 'Gender must not be empty' })
  @IsEnum(Gender, { message: 'Invalid gender' })
  gender: Gender;

  @IsNotEmpty()
  user: Users;

  @IsOptional()
  bodyfat: number | null;
}
