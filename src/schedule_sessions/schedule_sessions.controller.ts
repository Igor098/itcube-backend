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
import { Authorized } from '@/auth/decorators/authorized.decorator';
import { ScheduleFilterDto } from './dto/schedule-session-filter.dto';

@Controller('schedule-sessions')
export class ScheduleSessionsController {
  constructor(
    private readonly scheduleSessionsService: ScheduleSessionsService,
  ) {}

  @Authorization('admin')
  @Get('all')
  @HttpCode(HttpStatus.OK)
  public async findAll(): Promise<ScheduleSessionResponseDto[]> {
    const sessions = await this.scheduleSessionsService.findAll();
    return mapScheduleSessionsListToDto(sessions);
  }

  @Authorization('admin')
  @Get('by-id/:id')
  @HttpCode(HttpStatus.OK)
  public async findById(
    @Param('id') id: number,
  ): Promise<ScheduleSessionResponseDto> {
    const session = await this.scheduleSessionsService.findById(id);
    return mapScheduleSessionToDto(session);
  }

  @Authorization('admin', 'teacher')
  @Get('by-teacher/:teacherId')
  @HttpCode(HttpStatus.OK)
  public async getManyByTeacher(
    @Param('teacherId') teacherId: number,
  ): Promise<ScheduleSessionResponseDto[]> {
    const sessions =
      await this.scheduleSessionsService.findManyByTeacher(teacherId);
    return mapScheduleSessionsListToDto(sessions);
  }

  @Authorization('admin', 'teacher')
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

  @Authorization('admin')
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

  @Authorization('admin', 'teacher')
  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  public async create(
    @Body() scheduleSession: ScheduleSessionDto,
  ): Promise<ScheduleSessionResponseDto> {
    const session = await this.scheduleSessionsService.create(scheduleSession);
    return mapScheduleSessionToDto(session);
  }

  @Authorization('admin', 'teacher')
  @Put('update/:id')
  @HttpCode(HttpStatus.OK)
  public async update(
    @Authorized('id') userId: number,
    @Authorized('userRoles') userRoles: string[],
    @Param('id') id: number,
    scheduleSession: ScheduleSessionDto,
  ): Promise<ScheduleSessionResponseDto> {
    const updatedSession = await this.scheduleSessionsService.update(
      id,
      scheduleSession,
      userId,
      userRoles,
    );
    return mapScheduleSessionToDto(updatedSession);
  }

  @Authorization('admin', 'teacher')
  @Delete('delete/:id')
  @HttpCode(HttpStatus.OK)
  public async delete(
    @Authorized('id') userId: number,
    @Authorized('userRoles') userRoles: string[],
    @Param('id') id: number,
  ): Promise<DeleteResponseDto> {
    return await this.scheduleSessionsService.delete(id, userId, userRoles);
  }
}
