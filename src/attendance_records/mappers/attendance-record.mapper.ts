import type { AttendanceRecordResponseDto } from '../dto/attendance-record-response.dto';
import type { AttendanceRecord } from '../entities/attendance_record.entity';

export function mapAttendanceRecordToDto(
  attendanceRecord: AttendanceRecord,
): AttendanceRecordResponseDto {
  return {
    id: attendanceRecord.id,
    status: attendanceRecord.status,
    comment: attendanceRecord.comment,
    student: {
      id: attendanceRecord.student.id,
      fullName: attendanceRecord.student.fullName,
    },
    session: {
      id: attendanceRecord.session.id,
      topic: attendanceRecord.session.topic,
    },
  };
}

export function mapAttendanceRecordsListToDto(
  attendanceRecords: AttendanceRecord[],
): AttendanceRecordResponseDto[] {
  return attendanceRecords.map(mapAttendanceRecordToDto);
}
