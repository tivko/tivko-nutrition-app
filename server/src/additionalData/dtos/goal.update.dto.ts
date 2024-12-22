import { PartialType } from '@nestjs/mapped-types';
import { CreateGoalDto } from './goal.create.dto';

export class UpdateGoalDto extends PartialType(CreateGoalDto) {}
