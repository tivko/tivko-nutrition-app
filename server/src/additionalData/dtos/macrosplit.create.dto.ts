import { IsString, IsNumber, Min, Max } from 'class-validator';

export class CreateMacroSplitDto {
  @IsString()
  name: string;

  @IsNumber()
  @Min(0)
  @Max(100)
  fat: number;

  @IsNumber()
  @Min(0)
  @Max(100)
  carbs: number;

  @IsNumber()
  @Min(0)
  @Max(100)
  protein: number;
}
