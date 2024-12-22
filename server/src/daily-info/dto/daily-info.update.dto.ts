import {
  IsString,
  IsNotEmpty,
  IsNumber,
  Min,
  IsOptional,
  Max,
} from 'class-validator';

export class UpdateDailyInfoDto {
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  dailyCarbohydrates?: number;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  dailyProteins?: number;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  dailyCalories?: number;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @Min(20)
  currentWeight?: number;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  dailyFat?: number;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @Min(3)
  @Max(5)
  mealsNumber?: number | null;
}
