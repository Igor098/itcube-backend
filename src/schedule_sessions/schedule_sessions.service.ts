import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ScheduleSession } from './entities/schedule_session.entity';
import { Brackets, Repository } from 'typeorm';
import { ScheduleSessionDto } from './dto/schedule-session.dto';
import { DeleteResponseDto } from '@/libs/common/dto/delete-response.dto';
import { User } from '@/users/entities/user.entity';
import { ScheduleFilterDto } from './dto/schedule-session-filter.dto';

@Injectable()
export class ScheduleSessionsService {
  public constructor(
    @InjectRepository(ScheduleSession)
    private readonly scheduleSessionRepository: Repository<ScheduleSession>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async findAll(): Promise<ScheduleSession[]> {
    const scheduleSessions = await this.scheduleSessionRepository
      .createQueryBuilder('schedule_session')
      .leftJoinAndSelect('schedule_session.classroom', 'classroom')
      .leftJoinAndSelect('schedule_session.group', 'group')
      .leftJoinAndSelect('group.teacher', 'teacher')
      .leftJoinAndSelect('teacher.employee', 'employee')
      .getMany();
    console.log(scheduleSessions);
    return scheduleSessions;
  }

  public async findById(id: number): Promise<ScheduleSession> {
    const scheduleSession = await this.scheduleSessionRepository
      .createQueryBuilder('schedule_session')
      .leftJoinAndSelect('schedule_session.classroom', 'classroom')
      .leftJoinAndSelect('schedule_session.group', 'group')
      .leftJoinAndSelect('group.teacher', 'teacher')
      .leftJoinAndSelect('teacher.employee', 'employee')
      .where({ id })
      .getOne();

    if (!scheduleSession) {
      throw new NotFoundException('Занятие не найдено!');
    }

    return scheduleSession;
  }

  public async findManyByFilter(
    q?: string,
    filter?: ScheduleFilterDto,
  ): Promise<ScheduleSession[]> {
    const query = await this.scheduleSessionRepository
      .createQueryBuilder('schedule_session')
      .leftJoinAndSelect('schedule_session.classroom', 'classroom')
      .leftJoinAndSelect('schedule_session.group', 'group')
      .leftJoinAndSelect('group.teacher', 'teacher')
      .leftJoinAndSelect('teacher.employee', 'employee');

    if (Boolean(filter?.groupId)) {
      query.andWhere('group.id = :groupId', { groupId: filter?.groupId });
    }
    if (Boolean(filter?.schoolYearId)) {
      query.andWhere('group.school_year_id = :schoolYearId', {
        schoolYearId: filter?.schoolYearId,
      });
    }
    if (Boolean(filter?.status)) {
      query.andWhere('schedule_session.status = :status', {
        status: filter?.status,
      });
    }
    if (Boolean(q)) {
      query.andWhere(
        new Brackets((qb) => {
          qb.where('schedule_session.topic ILIKE :q')
            .orWhere('group.name LIKE :q')
            .orWhere('classroom.name LIKE :q')
            .orWhere('employee.full_name LIKE :q');
        }),
        { q: `%${q}%` },
      );
    }
    query.take(10);

    const sessions = await query.getMany();

    return sessions;
  }

  public async findManyByTeacher(
    teacherId: number,
  ): Promise<ScheduleSession[]> {
    return this.scheduleSessionRepository
      .createQueryBuilder('schedule_session')
      .leftJoinAndSelect('schedule_session.classroom', 'classroom')
      .leftJoinAndSelect('schedule_session.group', 'group')
      .leftJoinAndSelect('group.teacher', 'teacher')
      .leftJoinAndSelect('teacher.employee', 'employee')
      .where('teacher.id = :teacherId', { teacherId })
      .getMany();
  }

  public async findManyByTeacherAndFilter(
    teacherId: number,
    q: string,
    filter: ScheduleFilterDto,
  ): Promise<ScheduleSession[]> {
    const query = await this.scheduleSessionRepository
      .createQueryBuilder('schedule_session')
      .leftJoinAndSelect('schedule_session.classroom', 'classroom')
      .leftJoinAndSelect('schedule_session.group', 'group')
      .leftJoinAndSelect('group.teacher', 'teacher')
      .leftJoinAndSelect('teacher.employee', 'employee')
      .where('teacher.id = :teacherId', { teacherId });

    if (Boolean(filter.groupId)) {
      query.andWhere('group.id = :groupId', { groupId: filter.groupId });
    }
    if (Boolean(filter.schoolYearId)) {
      query.andWhere('group.school_year_id = :schoolYearId', {
        schoolYearId: filter.schoolYearId,
      });
    }
    if (Boolean(filter.status)) {
      query.andWhere('schedule_session.status = :status', {
        status: filter.status,
      });
    }
    if (Boolean(q)) {
      query.andWhere(
        new Brackets((qb) => {
          qb.where('schedule_session.topic ILIKE :q')
            .orWhere('group.name LIKE :q')
            .orWhere('classroom.name LIKE :q')
            .orWhere('employee.full_name LIKE :q');
        }),
        { q: `%${q}%` },
      );
    }
    query.take(10);

    return query.getMany();
  }

  public async create(
    scheduleSession: ScheduleSessionDto,
  ): Promise<ScheduleSession> {
    const isExists = await this.scheduleSessionRepository.findOneBy({
      topic: scheduleSession.topic,
      classroomId: scheduleSession.classroomId,
      startTime: scheduleSession.startTime,
      endTime: scheduleSession.endTime,
    });

    if (isExists) {
      throw new ConflictException('Занятие уже существует!');
    }

    const newSession =
      await this.scheduleSessionRepository.save(scheduleSession);

    return await this.findById(newSession.id);
  }

  public async update(
    id: number,
    scheduleSession: ScheduleSessionDto,
    userId: number,
    userRoles: string[],
  ): Promise<ScheduleSession> {
    const scheduleSessionToUpdate = await this.findById(id);
    const user = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.employee', 'employee')
      .leftJoinAndSelect('employee.teacherDetail', 'teacherDetail')
      .where('user.id = :userId', { userId })
      .getOne();

    if (
      user?.employee?.teacherDetail?.id !==
        scheduleSessionToUpdate.group.teacher.id &&
      !userRoles.includes('admin')
    ) {
      throw new ForbiddenException('Вы не можете изменить это занятие!');
    }

    Object.assign(scheduleSessionToUpdate, scheduleSession);

    const updatedSession = await this.scheduleSessionRepository.save(
      scheduleSessionToUpdate,
    );

    return await this.findById(updatedSession.id);
  }

  public async delete(
    id: number,
    userId: number,
    userRoles: string[],
  ): Promise<DeleteResponseDto> {
    const scheduleSessionToDelete = await this.findById(id);
    const user = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.employee', 'employee')
      .leftJoinAndSelect('employee.teacherDetail', 'teacherDetail')
      .where('user.id = :userId', { userId })
      .getOne();

    if (
      user?.employee?.teacherDetail?.id !==
        scheduleSessionToDelete.group.teacher.id &&
      !userRoles.includes('admin')
    ) {
      throw new ForbiddenException('Вы не можете удалить это занятие!');
    }

    const s_id = scheduleSessionToDelete.id;
    await this.scheduleSessionRepository.remove(scheduleSessionToDelete);

    return { isDeleted: true, id: s_id };
  }
}
