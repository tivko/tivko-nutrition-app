import {
  IsString,
  IsNumber,
  Min,
  Max,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { BMICategory } from '../enums/bmicategory.enum';

export class CreateGoalDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(2) // Приклад: коефіцієнт від 0 до 10
  coefficient?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(2000)
  value?: number;

  @IsOptional()
  @IsNumber()
  weightChangePerWeek?: number | null;

  @IsEnum(BMICategory, { each: true, message: 'Неправильна категорія' })
  bmiCategory: BMICategory[];
}
