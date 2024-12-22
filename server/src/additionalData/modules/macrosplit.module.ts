import { Module } from '@nestjs/common';
import { MacrosplitController } from '../controllers/macrosplit.controller';
import { MacroSplitService } from '../services/macrosplit.service';

@Module({
  controllers: [MacrosplitController],
  providers: [MacroSplitService],
})
export class MacrosplitModule {}
