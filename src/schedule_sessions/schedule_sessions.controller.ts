import { Controller } from '@nestjs/common';
import { ScheduleSessionsService } from './schedule_sessions.service';

@Controller('schedule-sessions')
export class ScheduleSessionsController {
  constructor(private readonly scheduleSessionsService: ScheduleSessionsService) {}
}
