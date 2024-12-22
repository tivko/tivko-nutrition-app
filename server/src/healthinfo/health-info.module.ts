import { Module } from '@nestjs/common';
import { HealthInfoController } from './health-info.controller';
import { HealthInfoService } from './health-info.service';

@Module({
  controllers: [HealthInfoController],
  providers: [HealthInfoService],
})
export class HealthInfoModule {}
