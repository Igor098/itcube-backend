import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { AttendanceRecordsService } from './attendance_records.service';
import { mapAttendanceRecordsListToDto } from './mappers/attendance-record.mapper';
import { AttendanceRecordResponseDto } from './dto/attendance-record-response.dto';
import { Authorization } from '@/auth/decorators/auth.decorator';
import { RoleName } from '@/user_roles/entities/user_role.entity';
import { AttendanceRecordQueryDto } from './dto/attendance-record-query.dto';

@Controller('attendance-records')
export class AttendanceRecordsController {
  constructor(
    private readonly attendanceRecordsService: AttendanceRecordsService,
  ) {}

  @Authorization(RoleName.ADMIN)
  @Get('all')
  @HttpCode(HttpStatus.OK)
  public async findAll(): Promise<AttendanceRecordResponseDto[]> {
    const records = await this.attendanceRecordsService.findAll();

    return mapAttendanceRecordsListToDto(records);
  }

  @Authorization(RoleName.ADMIN)
  @Get('by-id/:id')
  @HttpCode(HttpStatus.OK)
  public async findById(id: number): Promise<AttendanceRecordResponseDto> {
    const record = await this.attendanceRecordsService.findById(id);

    return mapAttendanceRecordsListToDto([record])[0];
  }

  @Authorization(RoleName.ADMIN, RoleName.TEACHER)
  @Get('teacher/:teacherId')
  @HttpCode(HttpStatus.OK)
  public async findByTeacher(
    teacherId: number,
  ): Promise<AttendanceRecordResponseDto[]> {
    const records =
      await this.attendanceRecordsService.findByTeacher(teacherId);
    return mapAttendanceRecordsListToDto(records);
  }

  @Authorization(RoleName.ADMIN, RoleName.TEACHER)
  @Get('teacher-group/:teacherId/')
  @HttpCode(HttpStatus.OK)
  public async findByTeacherAndGroup(
    @Param('teacherId') teacherId: string,
    @Query(new ValidationPipe({ transform: true }))
    queryParams: AttendanceRecordQueryDto,
  ): Promise<AttendanceRecordResponseDto[]> {
    const records = await this.attendanceRecordsService.findByTeacherAndGroup(
      +teacherId,
      queryParams.groupId,
    );
    return mapAttendanceRecordsListToDto(records);
  }
}
