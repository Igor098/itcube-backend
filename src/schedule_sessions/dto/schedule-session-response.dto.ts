import type { ScheduleStatus } from '../entities/schedule_session.entity';

export class ScheduleSessionResponseDto {
  id: number;
  topic: string;
  lessonDate: string;
  startTime: string;
  endTime: string;
  classroom: {
    id: number;
    name: string;
  };
  group: {
    id: number;
    name: string;
  };
  teacher: {
    id: number;
    fullName: string;
  };
  status: ScheduleStatus;
}
