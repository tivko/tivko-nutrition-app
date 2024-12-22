import { Expose } from 'class-transformer';
import { IsString, IsNumber, Min, Max } from 'class-validator';

export class MacroSplitGeneralDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  fat: number;

  @Expose()
  carbs: number;

  @Expose()
  protein: number;
}
