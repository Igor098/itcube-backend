import { Controller } from '@nestjs/common';
import { AttendanceRecordsService } from './attendance_records.service';

@Controller('attendance-records')
export class AttendanceRecordsController {
  constructor(private readonly attendanceRecordsService: AttendanceRecordsService) {}
}
