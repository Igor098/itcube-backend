import { format } from 'date-fns';
import type { ScheduleSessionResponseDto } from '../dto/schedule-session-response.dto';
import type { ScheduleSession } from '../entities/schedule_session.entity';

export function mapScheduleSessionToDto(
  scheduleSession: ScheduleSession,
): ScheduleSessionResponseDto {
  return {
    id: scheduleSession.id,
    lessonDate: format(scheduleSession.lessonDate, 'dd.MM.yyyy'),
    topic: scheduleSession.topic,
    startTime: scheduleSession.startTime,
    endTime: scheduleSession.endTime,
    classroom: {
      id: scheduleSession.classroom.id,
      name: scheduleSession.classroom.name,
    },
    group: {
      id: scheduleSession.group.id,
      name: scheduleSession.group.name,
    },
    teacher: {
      id: scheduleSession.group.teacher.id,
      fullName: scheduleSession.group.teacher.employee.fullName,
    },
    status: scheduleSession.status,
  };
}

export function mapScheduleSessionsListToDto(
  scheduleSessions: ScheduleSession[],
): ScheduleSessionResponseDto[] {
  return scheduleSessions.map(mapScheduleSessionToDto);
}
