import { Module } from '@nestjs/common';
import { DailyInfoService } from './daily-info.service';
import { DailyInfoController } from './daily-info.controller';

@Module({
  providers: [DailyInfoService],
  controllers: [DailyInfoController],
})
export class DailyInfoModule {}
