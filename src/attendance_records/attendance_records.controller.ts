import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Put,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { AttendanceRecordsService } from './attendance_records.service';
import { mapAttendanceRecordsListToDto } from './mappers/attendance-record.mapper';
import { AttendanceRecordResponseDto } from './dto/attendance-record-response.dto';
import { Authorization } from '@/auth/decorators/auth.decorator';
import { RoleName } from '@/user_roles/entities/user_role.entity';
import { AttendanceRecordQueryDto } from './dto/attendance-record-query.dto';
import { AttendanceRecordUpdateListDto } from './dto/attendance-record.dto';

@Controller('attendance-records')
export class AttendanceRecordsController {
  public constructor(
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
  public async findById(
    @Param('id') id: number,
  ): Promise<AttendanceRecordResponseDto> {
    const record = await this.attendanceRecordsService.findById(id);

    return mapAttendanceRecordsListToDto([record])[0];
  }

  @Authorization(RoleName.ADMIN, RoleName.TEACHER)
  @Get('teacher/:teacherId')
  @HttpCode(HttpStatus.OK)
  public async findByTeacher(
    @Param('teacherId') teacherId: number,
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

  @Authorization(RoleName.ADMIN)
  @Put('update-many')
  @HttpCode(HttpStatus.CREATED)
  public async updateMany(
    @Body() recordsDto: AttendanceRecordUpdateListDto,
  ): Promise<AttendanceRecordResponseDto[]> {
    const updated = await this.attendanceRecordsService.updateMany(
      recordsDto.records,
    );

    return mapAttendanceRecordsListToDto(updated);
  }

  @Authorization(RoleName.ADMIN, RoleName.TEACHER)
  @Put('teacher-update-many/:teacherId')
  @HttpCode(HttpStatus.CREATED)
  public async teacherUpdateMany(
    @Param('teacherId') teacherId: string,
    @Body() recordsDto: AttendanceRecordUpdateListDto,
  ): Promise<AttendanceRecordResponseDto[]> {
    const updated = await this.attendanceRecordsService.teacherUpdateMany(
      +teacherId,
      recordsDto.records,
    );

    return mapAttendanceRecordsListToDto(updated);
  }
}
