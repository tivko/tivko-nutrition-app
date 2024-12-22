import { DailyInfo } from 'src/daily-info/entity/dailyInfo.entity';
import { Expose, Type } from 'class-transformer';
import { ActivityLevelGeneralDto } from 'src/additionalData/dtos/activitylevel.general.dto';
import { GoalGeneralDto } from 'src/additionalData/dtos/goal.general.dto';
import { UsersGeneralDto } from 'src/users/dto/users.general.dto';
import { Status } from '../enums/status.enum';
import { DailyInfoGeneralDto } from 'src/daily-info/dto/daily-info.general.dto';

export class MealProgramGeneralDto {
  @Expose()
  id: number;

  @Expose()
  requiredCalories: number;

  @Expose()
  requiredCarbohydrates: number;

  @Expose()
  requiredFat: number;

  @Expose()
  requiredProteins: number;

  @Expose()
  macroSplitDietCarbs?: number;

  @Expose()
  macroSplitDietFat?: number;

  @Expose()
  macroSplitDietProtein?: number;

  @Type(() => ActivityLevelGeneralDto)
  @Expose()
  activityLevel: ActivityLevelGeneralDto;

  @Type(() => GoalGeneralDto)
  @Expose()
  goal: GoalGeneralDto;

  @Expose()
  startDate?: Date;
  @Expose()
  endDate?: Date;
  @Expose()
  actualEndDate?: Date;

  @Expose()
  startWeight: number;

  @Expose()
  expectedWeight: number;

  @Expose()
  status?: Status;

  @Type(() => UsersGeneralDto)
  @Expose()
  user: UsersGeneralDto;

  @Type(() => DailyInfoGeneralDto)
  @Expose()
  dailyInfo: DailyInfoGeneralDto;
}
