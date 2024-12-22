import { Expose } from 'class-transformer';
import { BMICategory } from '../enums/bmicategory.enum';

export class GoalGeneralDto {
  @Expose()
  id: number;
  @Expose()
  name: string;
  @Expose()
  coefficient: number;
  @Expose()
  value: number;
  @Expose()
  bmiCategory: BMICategory[];
  @Expose()
  weightChangePerWeek: number | null;
}
