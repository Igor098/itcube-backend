import { Module } from '@nestjs/common';
import { ScheduleSessionsService } from './schedule_sessions.service';
import { ScheduleSessionsController } from './schedule_sessions.controller';

@Module({
  controllers: [ScheduleSessionsController],
  providers: [ScheduleSessionsService],
})
export class ScheduleSessionsModule {}
