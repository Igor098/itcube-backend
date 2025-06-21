import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ScheduleSession } from './entities/schedule_session.entity';
import { Between, Brackets, Repository } from 'typeorm';
import { ScheduleSessionDto } from './dto/schedule-session.dto';
import { DeleteResponseDto } from '@/libs/common/dto/delete-response.dto';
import { ScheduleFilterDto } from './dto/schedule-session-filter.dto';
import { TeacherDetail } from '@/teacher_details/entities/teacher_detail.entity';
import { checkTeacherGroups } from '@/libs/common/utils/check-teacher-group.util';

@Injectable()
export class ScheduleSessionsService {
  public constructor(
    @InjectRepository(ScheduleSession)
    private readonly scheduleSessionRepository: Repository<ScheduleSession>,

    @InjectRepository(TeacherDetail)
    private readonly teacherDetailRepository: Repository<TeacherDetail>,
  ) {}

  public async findAll(): Promise<ScheduleSession[]> {
    const scheduleSessions = await this.scheduleSessionRepository
      .createQueryBuilder('schedule_session')
      .leftJoinAndSelect('schedule_session.classroom', 'classroom')
      .leftJoinAndSelect('schedule_session.group', 'group')
      .leftJoinAndSelect('group.teacher', 'teacher')
      .leftJoinAndSelect('teacher.employee', 'employee')
      .getMany();

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

  public async findNearestByTeacher(
    teacherId: number,
  ): Promise<ScheduleSession[]> {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // начало дня

    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    tomorrow.setHours(23, 59, 59, 999); // конец завтрашнего дня

    const sessions = await this.scheduleSessionRepository.find({
      where: {
        group: {
          teacherId: teacherId,
        },
        lessonDate: Between(today, tomorrow),
      },
      relations: {
        group: {
          teacher: {
            employee: true,
          },
        },
        classroom: true,
      },
      order: {
        lessonDate: 'ASC',
      },
    });

    return sessions;
  }

  public async create(
    scheduleSession: ScheduleSessionDto,
  ): Promise<ScheduleSession> {
    const isExists = await this.scheduleSessionRepository
      .createQueryBuilder('session')
      .where('session.groupId = :groupId', { groupId: scheduleSession.groupId })
      .andWhere('session.topic = :topic', { topic: scheduleSession.topic })
      .andWhere('session.lessonDate = :lessonDate', {
        lessonDate: scheduleSession.lessonDate,
      })
      .andWhere('session.startTime = :startTime', {
        startTime: scheduleSession.startTime,
      })
      .andWhere('session.endTime = :endTime', {
        endTime: scheduleSession.endTime,
      })
      .getOne();

    if (isExists) {
      throw new ConflictException('Занятие уже существует!');
    }

    const newSession =
      await this.scheduleSessionRepository.save(scheduleSession);

    return await this.findById(newSession.id);
  }

  public async teacherCreate(
    teacherId: number,
    scheduleSession: ScheduleSessionDto,
  ): Promise<ScheduleSession> {
    await checkTeacherGroups(
      this.teacherDetailRepository,
      teacherId,
      scheduleSession.groupId,
    );

    return await this.create(scheduleSession);
  }

  public async update(
    id: number,
    scheduleSession: ScheduleSessionDto,
  ): Promise<ScheduleSession> {
    const scheduleSessionToUpdate =
      await this.scheduleSessionRepository.findOneBy({ id });

    if (!scheduleSessionToUpdate) {
      throw new NotFoundException('Занятие не найдено!');
    }

    Object.assign(scheduleSessionToUpdate, scheduleSession);

    const updatedSession = await this.scheduleSessionRepository.save(
      scheduleSessionToUpdate,
    );

    return await this.findById(updatedSession.id);
  }

  public async teacherUpdate(
    id: number,
    teacherId: number,
    scheduleSession: ScheduleSessionDto,
  ): Promise<ScheduleSession> {
    await checkTeacherGroups(
      this.teacherDetailRepository,
      teacherId,
      scheduleSession.groupId,
    );

    return await this.update(id, scheduleSession);
  }

  public async delete(id: number): Promise<DeleteResponseDto> {
    const scheduleSessionToDelete = await this.findById(id);

    const s_id = scheduleSessionToDelete.id;
    await this.scheduleSessionRepository.remove(scheduleSessionToDelete);

    return { isDeleted: true, id: s_id };
  }

  public async teacherDelete(
    id: number,
    teacherId: number,
  ): Promise<DeleteResponseDto> {
    await checkTeacherGroups(this.teacherDetailRepository, teacherId, id);

    return await this.delete(id);
  }
}
