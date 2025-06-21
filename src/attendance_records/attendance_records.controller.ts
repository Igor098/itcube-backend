import { Controller } from '@nestjs/common';
import { AttendanceRecordsService } from './attendance_records.service';
import { mapAttendanceRecordsListToDto } from './mappers/attendance-record.mapper';
import { AttendanceRecordResponseDto } from './dto/attendance-record-response.dto';

@Controller('attendance-records')
export class AttendanceRecordsController {
  constructor(
    private readonly attendanceRecordsService: AttendanceRecordsService,
  ) {}

  public async findAll(): Promise<AttendanceRecordResponseDto[]> {
    const records = await this.attendanceRecordsService.findAll();

    return mapAttendanceRecordsListToDto(records);
  }
}
