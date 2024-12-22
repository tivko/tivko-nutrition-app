import { IsEnum, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { ActivityLevel } from 'src/additionalData/entities/activitylevel.enity';
import { Goal } from 'src/additionalData/entities/goal.enity';
import { Status } from '../enums/status.enum';

export class UpdateMealProgramDto {
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  requiredCalories?: number;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  requiredCarbohydrates?: number;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  requiredFat?: number;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  requiredProteins?: number;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  macroSplitDietCarbs?: number;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  macroSplitDietFat?: number;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  macroSplitDietProtein?: number;

  @IsOptional()
  @IsNotEmpty()
  goal?: Goal;

  @IsOptional()
  @IsNotEmpty()
  activityLevel?: ActivityLevel;

  @IsOptional()
  @IsNotEmpty()
  startDate?: Date;

  @IsOptional()
  endDate?: Date;

  @IsOptional()
  actualEndDate: Date | null;

  @IsOptional()
  @IsNotEmpty()
  startWeight?: number;

  @IsOptional()
  @IsNotEmpty()
  expectedWeight?: number;

  @IsOptional()
  @IsNotEmpty()
  @IsEnum(Status)
  status?: Status;
}
