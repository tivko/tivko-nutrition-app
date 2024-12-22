// src/user-goal/user-goal.module.ts
import { Module } from '@nestjs/common';
import { GoalService } from '../services/goal.service';
import { GoalController } from '../controllers/goal.controller';

@Module({
  controllers: [GoalController],
  providers: [GoalService],
})
export class GoalModule {}
