import { Module } from '@nestjs/common';
import { ActivityLevelService } from '../services/activitylevel.service';
import { ActivityLevelController } from '../controllers/activitylevel.controller';

@Module({
  controllers: [ActivityLevelController],
  providers: [ActivityLevelService],
})
export class ActivityLevelModule {}
