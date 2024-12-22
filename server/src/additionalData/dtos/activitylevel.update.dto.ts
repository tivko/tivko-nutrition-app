import { PartialType } from '@nestjs/mapped-types';
import { CreateActivityLevelDto } from './activitylevel.create.dto';

export class UpdateActivityLevelDto extends PartialType(
  CreateActivityLevelDto,
) {}
