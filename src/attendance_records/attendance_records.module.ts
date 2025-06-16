import { Module } from '@nestjs/common';
import { AttendanceRecordsService } from './attendance_records.service';
import { AttendanceRecordsController } from './attendance_records.controller';

@Module({
  controllers: [AttendanceRecordsController],
  providers: [AttendanceRecordsService],
})
export class AttendanceRecordsModule {}
