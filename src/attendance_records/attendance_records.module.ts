import { Module } from '@nestjs/common';
import { AttendanceRecordsService } from './attendance_records.service';
import { AttendanceRecordsController } from './attendance_records.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@/users/entities/user.entity';
import { TeacherDetail } from '@/teacher_details/entities/teacher_detail.entity';
import { AttendanceRecord } from './entities/attendance_record.entity';
import { UsersService } from '@/users/users.service';
import { TeacherDetailsService } from '@/teacher_details/teacher_details.service';
import { ScheduleSession } from '@/schedule_sessions/entities/schedule_session.entity';
import { ScheduleSessionsService } from '@/schedule_sessions/schedule_sessions.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AttendanceRecord,
      User,
      TeacherDetail,
      ScheduleSession,
    ]),
  ],
  controllers: [AttendanceRecordsController],
  providers: [
    AttendanceRecordsService,
    UsersService,
    TeacherDetailsService,
    ScheduleSessionsService,
  ],
  exports: [AttendanceRecordsService],
})
export class AttendanceRecordsModule {}
