import { Module } from '@nestjs/common';
import { PositionService } from './positions.service';
import { PositionController } from './positions.controller';

@Module({
  controllers: [PositionController],
  providers: [PositionService],
})
export class PositionModule {}
