import { Expose, Type } from 'class-transformer';
import { ActivityLevelGeneralDto } from 'src/additionalData/dtos/activitylevel.general.dto';
import { GoalGeneralDto } from 'src/additionalData/dtos/goal.general.dto';
import { MacroSplitGeneralDto } from 'src/additionalData/dtos/macrosplit.general.dto';

export class HealthInfoGeneralDto {
  @Expose()
  id: number;

  @Expose()
  age: number;

  @Expose()
  weight: number;

  @Expose()
  height: number;

  @Expose()
  bodyfat: number;

  @Expose()
  gender: string;

  // @Expose()
  // macroSplitDietCarbs: number;
  // @Expose()
  // macroSplitDietFat: number;
  // @Expose()
  // macroSplitDietProtein: number;

  // @Type(() => ActivityLevelGeneralDto)
  // @Expose()
  // activityLevel: ActivityLevelGeneralDto;

  // @Expose()
  // BMI: number | null;

  // @Expose()
  // BMR: number | null;
}
