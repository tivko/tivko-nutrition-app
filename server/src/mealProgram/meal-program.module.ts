import { Module } from '@nestjs/common';
import { MealProgramService } from './meal-program.service';
import { MealProgramController } from './meal-program.controller';

@Module({
  controllers: [MealProgramController],
  providers: [MealProgramService],
})
export class MealProgramModule {}
