import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { AttendanceRecord } from './entities/attendance_record.entity';
import { TeacherDetail } from '@/teacher_details/entities/teacher_detail.entity';
import { checkTeacherGroups } from '@/libs/common/utils/check-teacher-group.util';
import {
  AttendanceRecordCreateDto,
  AttendanceRecordUpdateDto,
} from './dto/attendance-record.dto';
import { ScheduleSession } from '@/schedule_sessions/entities/schedule_session.entity';
import { DeleteResponseDto } from '@/libs/common/dto/delete-response.dto';

@Injectable()
export class AttendanceRecordsService {
  public constructor(
    @InjectRepository(AttendanceRecord)
    private readonly attendanceRecordRepository: Repository<AttendanceRecord>,

    @InjectRepository(TeacherDetail)
    private readonly teacherDetailRepository: Repository<TeacherDetail>,

    @InjectRepository(ScheduleSession)
    private readonly scheduleSessionRepository: Repository<ScheduleSession>,
  ) {}

  public async findAll(): Promise<AttendanceRecord[]> {
    return await this.attendanceRecordRepository.find({
      relations: {
        student: true,
        session: true,
      },
    });
  }

  public async findById(id: number): Promise<AttendanceRecord> {
    const record = await this.attendanceRecordRepository.findOne({
      where: { id },
      relations: {
        student: true,
        session: true,
      },
    });

    if (!record) {
      throw new Error('Запись не найдена!');
    }

    return record;
  }

  public async findByTeacher(teacherId: number): Promise<AttendanceRecord[]> {
    return await this.attendanceRecordRepository
      .createQueryBuilder('attendanceRecords')
      .leftJoinAndSelect('attendanceRecords.student', 'student')
      .leftJoinAndSelect('attendanceRecords.session', 'session')
      .leftJoinAndSelect('session.group', 'group')
      .where('group.teacherId = :teacherId', { teacherId })
      .getMany();
  }

  public findByTeacherAndGroup(
    teacherId: number,
    groupId: number,
  ): Promise<AttendanceRecord[]> {
    return this.attendanceRecordRepository
      .createQueryBuilder('attendanceRecords')
      .leftJoinAndSelect('attendanceRecords.student', 'student')
      .leftJoinAndSelect('attendanceRecords.session', 'session')
      .leftJoinAndSelect('session.group', 'group')
      .where('group.teacherId = :teacherId', { teacherId })
      .andWhere('group.id = :groupId', { groupId })
      .getMany();
  }

  public async createMany(
    records: AttendanceRecordCreateDto[],
  ): Promise<AttendanceRecord[]> {
    const results: AttendanceRecord[] = [];

    for (const record of records) {
      const isExists = await this.attendanceRecordRepository.findOne({
        where: { studentId: record.studentId, sessionId: record.sessionId },
        relations: {
          student: true,
          session: true,
        },
      });
      if (!isExists) {
        const newRecord = this.attendanceRecordRepository.create(record);
        results.push(newRecord);
      }
    }
    if (!results.length) {
      throw new ConflictException('Все записи существуют!');
    }

    const created = await this.attendanceRecordRepository.save(results);
    const createdIds = created.map((r) => r.id);

    return this.attendanceRecordRepository.find({
      where: { id: In(createdIds) },
      relations: {
        student: true,
        session: true,
      },
    });
  }

  public async teacherCreateMany(
    teacherId: number,
    records: AttendanceRecordCreateDto[],
  ): Promise<AttendanceRecord[]> {
    if (!records.length) {
      throw new BadRequestException('Список записей пустой!');
    }

    const firstSession = await this.scheduleSessionRepository.findOne({
      where: { id: records[0].sessionId },
      relations: { group: true },
    });

    if (!firstSession) {
      throw new BadRequestException('Сессия не найдена');
    }

    const groupId = firstSession.group.id;

    const sessions = await this.scheduleSessionRepository.find({
      where: { id: In(records.map((r) => r.sessionId)) },
      relations: { group: true },
    });

    const isOneGroup = sessions.every((s) => s.group.id === groupId);

    if (!isOneGroup) {
      throw new BadRequestException('Все записи должны быть из одной группы!');
    }
    await checkTeacherGroups(this.teacherDetailRepository, teacherId, groupId);

    return await this.createMany(records);
  }

  public async updateMany(
    records: AttendanceRecordUpdateDto[],
  ): Promise<AttendanceRecord[]> {
    const results: AttendanceRecord[] = [];

    for (const record of records) {
      const existRecord = await this.attendanceRecordRepository.findOne({
        where: { id: record.id },
        relations: {
          student: true,
          session: true,
        },
      });
      if (!existRecord) {
        continue;
      }

      if (existRecord.sessionId !== record.sessionId) {
        throw new ConflictException(
          'Нельзя обновлять записи из других занятий!',
        );
      }

      Object.assign(existRecord, record);
      results.push(existRecord);
    }
    if (!results.length) {
      throw new ConflictException('Такие записи не существуют!');
    }

    const updated = await this.attendanceRecordRepository.save(results);
    const updatedIds = updated.map((r) => r.id);

    return this.attendanceRecordRepository.find({
      where: { id: In(updatedIds) },
      relations: {
        student: true,
        session: true,
      },
    });
  }

  public async teacherUpdateMany(
    teacherId: number,
    records: AttendanceRecordUpdateDto[],
  ): Promise<AttendanceRecord[]> {
    if (!records.length) {
      throw new BadRequestException('Список записей пустой!');
    }

    const firstSession = await this.scheduleSessionRepository.findOne({
      where: { id: records[0].sessionId },
      relations: { group: true },
    });

    if (!firstSession) {
      throw new BadRequestException('Сессия не найдена');
    }

    const groupId = firstSession.group.id;

    const sessions = await this.scheduleSessionRepository.find({
      where: { id: In(records.map((r) => r.sessionId)) },
      relations: { group: true },
    });

    const isOneGroup = sessions.every((s) => s.group.id === groupId);

    if (!isOneGroup) {
      throw new BadRequestException('Все записи должны быть из одной группы!');
    }

    await checkTeacherGroups(this.teacherDetailRepository, teacherId, groupId);

    return await this.updateMany(records);
  }

  public async deleteMany(records: number[]): Promise<DeleteResponseDto[]> {
    if (!records.length) {
      throw new BadRequestException('Список записей пустой!');
    }

    const existingRecords = await this.attendanceRecordRepository.find({
      where: { id: In(records) },
    });

    if (existingRecords.length !== records.length) {
      throw new NotFoundException('Некоторые записи не найдены.');
    }

    await this.attendanceRecordRepository.remove(existingRecords);

    return existingRecords.map((r) => ({ isDeleted: true, id: r.id }));
  }
}
