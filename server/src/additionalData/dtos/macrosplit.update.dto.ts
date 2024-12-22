import { CreateMacroSplitDto } from './macrosplit.create.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateMacroSplitDto extends PartialType(CreateMacroSplitDto) {}
