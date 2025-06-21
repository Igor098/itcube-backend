import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { ScheduleSessionsService } from './schedule_sessions.service';
import {
  mapScheduleSessionsListToDto,
  mapScheduleSessionToDto,
} from './mappers/schedule-session.mapper';
import { ScheduleSessionResponseDto } from './dto/schedule-session-response.dto';
import { Authorization } from '@/auth/decorators/auth.decorator';
import { ScheduleSessionDto } from './dto/schedule-session.dto';
import { DeleteResponseDto } from '@/libs/common/dto/delete-response.dto';
import { ScheduleFilterDto } from './dto/schedule-session-filter.dto';
import { RoleName } from '@/user_roles/entities/user_role.entity';

@Controller('schedule-sessions')
export class ScheduleSessionsController {
  constructor(
    private readonly scheduleSessionsService: ScheduleSessionsService,
  ) {}

  @Authorization(RoleName.ADMIN)
  @Get('all')
  @HttpCode(HttpStatus.OK)
  public async findAll(): Promise<ScheduleSessionResponseDto[]> {
    const sessions = await this.scheduleSessionsService.findAll();
    return mapScheduleSessionsListToDto(sessions);
  }

  @Authorization(RoleName.ADMIN)
  @Get('by-id/:id')
  @HttpCode(HttpStatus.OK)
  public async findById(
    @Param('id') id: number,
  ): Promise<ScheduleSessionResponseDto> {
    const session = await this.scheduleSessionsService.findById(id);
    return mapScheduleSessionToDto(session);
  }

  @Authorization(RoleName.ADMIN, RoleName.TEACHER)
  @Get('by-teacher/:teacherId')
  @HttpCode(HttpStatus.OK)
  public async getManyByTeacher(
    @Param('teacherId') teacherId: number,
  ): Promise<ScheduleSessionResponseDto[]> {
    const sessions =
      await this.scheduleSessionsService.findManyByTeacher(teacherId);
    return mapScheduleSessionsListToDto(sessions);
  }

  @Authorization(RoleName.ADMIN, RoleName.TEACHER)
  @Get('by-filtered/teacher/:teacherId')
  @HttpCode(HttpStatus.OK)
  public async getManyByTeacherAndFilter(
    @Param('teacherId') teacherId: number,
    @Query('q') q: string,
    @Query(new ValidationPipe({ transform: true })) filter: ScheduleFilterDto,
  ): Promise<ScheduleSessionResponseDto[]> {
    const sessions =
      await this.scheduleSessionsService.findManyByTeacherAndFilter(
        teacherId,
        q,
        filter,
      );
    return mapScheduleSessionsListToDto(sessions);
  }

  @Authorization(RoleName.ADMIN)
  @Get('by-filtered')
  @HttpCode(HttpStatus.OK)
  public async findManyByFilter(
    @Query('q') q: string,
    @Query(new ValidationPipe({ transform: true })) filter: ScheduleFilterDto,
  ): Promise<ScheduleSessionResponseDto[]> {
    const sessions = await this.scheduleSessionsService.findManyByFilter(
      q,
      filter,
    );
    return mapScheduleSessionsListToDto(sessions);
  }

  @Authorization(RoleName.ADMIN, RoleName.TEACHER)
  @Get('nearest-by-teacher/:teacherId')
  @HttpCode(HttpStatus.OK)
  public async findNearestByTeacher(
    teacherId: number,
  ): Promise<ScheduleSessionResponseDto[]> {
    const sessions =
      await this.scheduleSessionsService.findNearestByTeacher(teacherId);
    return mapScheduleSessionsListToDto(sessions);
  }

  @Authorization(RoleName.ADMIN)
  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  public async create(
    @Body() scheduleSession: ScheduleSessionDto,
  ): Promise<ScheduleSessionResponseDto> {
    const session = await this.scheduleSessionsService.create(scheduleSession);
    return mapScheduleSessionToDto(session);
  }

  @Authorization(RoleName.ADMIN, RoleName.TEACHER)
  @Post('teacher-create')
  @HttpCode(HttpStatus.CREATED)
  public async teacherCreate(
    @Query('teacherId') teacherId: number,
    @Body() scheduleSession: ScheduleSessionDto,
  ): Promise<ScheduleSessionResponseDto> {
    const session = await this.scheduleSessionsService.teacherCreate(
      teacherId,
      scheduleSession,
    );
    return mapScheduleSessionToDto(session);
  }

  @Authorization(RoleName.ADMIN)
  @Put('update/:id')
  @HttpCode(HttpStatus.OK)
  public async update(
    @Param('id') id: number,
    scheduleSession: ScheduleSessionDto,
  ): Promise<ScheduleSessionResponseDto> {
    const updatedSession = await this.scheduleSessionsService.update(
      id,
      scheduleSession,
    );
    return mapScheduleSessionToDto(updatedSession);
  }

  @Authorization(RoleName.ADMIN, RoleName.TEACHER)
  @Put('teacher-update/:id')
  @HttpCode(HttpStatus.OK)
  public async teacherUpdate(
    @Param('id') id: number,
    @Query('teacherId') teacherId: number,
    scheduleSession: ScheduleSessionDto,
  ): Promise<ScheduleSessionResponseDto> {
    const updatedSession = await this.scheduleSessionsService.teacherUpdate(
      id,
      teacherId,
      scheduleSession,
    );
    return mapScheduleSessionToDto(updatedSession);
  }

  @Authorization(RoleName.ADMIN)
  @Delete('delete/:id')
  @HttpCode(HttpStatus.OK)
  public async delete(@Param('id') id: number): Promise<DeleteResponseDto> {
    return await this.scheduleSessionsService.delete(id);
  }

  @Authorization(RoleName.ADMIN, RoleName.TEACHER)
  @Delete('delete/:id')
  @HttpCode(HttpStatus.OK)
  public async teacherDelete(
    @Param('id') id: number,
    @Query('teacherId') teacherId: number,
  ): Promise<DeleteResponseDto> {
    return await this.scheduleSessionsService.teacherDelete(id, teacherId);
  }
}
