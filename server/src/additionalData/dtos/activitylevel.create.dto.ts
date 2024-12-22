// src/healthinfo/dto/create-activity-level.dto.ts
import { IsString, IsNumber, Min, Max } from 'class-validator';

export class CreateActivityLevelDto {
  @IsString()
  name: string;

  @IsNumber()
  @Min(0)
  @Max(10) // Приклад: коефіцієнт від 0 до 10
  coefficient: number;
}
