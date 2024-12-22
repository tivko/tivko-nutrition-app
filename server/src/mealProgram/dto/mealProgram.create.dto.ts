import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Max,
  Min,
} from 'class-validator';
import { ActivityLevel } from 'src/additionalData/entities/activitylevel.enity';
import { Goal } from 'src/additionalData/entities/goal.enity';
import { Users } from 'src/users/entity/users.entity';
import { Status } from '../enums/status.enum';

export class CreateMealProgramDto {
  @IsNumber()
  @IsNotEmpty()
  requiredCalories: number;

  @IsNumber()
  @IsNotEmpty()
  requiredCarbohydrates: number;

  @IsNumber()
  @IsNotEmpty()
  requiredFat: number;

  @IsNumber()
  @IsNotEmpty()
  requiredProteins: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(100)
  macroSplitDietCarbs: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(100)
  macroSplitDietFat: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(100)
  macroSplitDietProtein: number;

  @IsNotEmpty({ message: 'Goal must not be empty' })
  goal: Goal;

  @IsNotEmpty({ message: 'activityLevel must not be empty' })
  activityLevel: ActivityLevel;

  @IsNotEmpty({ message: 'StartDate must not be empty' })
  startDate: Date;

  @IsOptional()
  endDate: Date | null;

  @IsOptional()
  actualEndDate: Date | null;

  @IsNotEmpty({ message: 'StartWeight must not be empty' })
  startWeight: number;

  @IsOptional()
  expectedWeight: number | null;
}
