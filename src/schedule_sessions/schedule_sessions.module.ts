import { Module } from '@nestjs/common';
import { ScheduleSessionsService } from './schedule_sessions.service';
import { ScheduleSessionsController } from './schedule_sessions.controller';
import { ScheduleSession } from './entities/schedule_session.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@/users/entities/user.entity';
import { UsersService } from '@/users/users.service';
import { TeacherDetailsService } from '@/teacher_details/teacher_details.service';
import { TeacherDetail } from '@/teacher_details/entities/teacher_detail.entity';
import { AttendanceRecordsService } from '@/attendance_records/attendance_records.service';
import { AttendanceRecord } from '@/attendance_records/entities/attendance_record.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ScheduleSession,
      User,
      TeacherDetail,
      AttendanceRecord,
    ]),
  ],
  controllers: [ScheduleSessionsController],
  providers: [
    ScheduleSessionsService,
    UsersService,
    TeacherDetailsService,
    AttendanceRecordsService,
  ],
})
export class ScheduleSessionsModule {}
