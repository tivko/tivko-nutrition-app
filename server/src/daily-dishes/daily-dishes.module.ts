import { Module } from '@nestjs/common';
import { DailyDishesController } from './daily-dishes.controller';
import { DailyDishesService } from './daily-dishes.service';

@Module({
  providers: [DailyDishesService],
  controllers: [DailyDishesController],
})
export class DailyDishesModule {}
