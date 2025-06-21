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

@Injectable()
export class AttendanceRecordsService {
  public constructor(
    @InjectRepository(AttendanceRecord)
    private readonly attendanceRecordRepository: Repository<AttendanceRecord>,

    @InjectRepository(TeacherDetail)
    private readonly teacherDetailRepository: Repository<TeacherDetail>,
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
    records: AttendanceRecord[],
  ): Promise<AttendanceRecord[]> {
    const results: AttendanceRecord[] = [];

    for (const record of records) {
      const isExists = await this.attendanceRecordRepository.findOne({
        where: { studentId: record.student.id, sessionId: record.session.id },
        relations: {
          student: true,
          session: true,
        },
      });
      if (!isExists) {
        results.push(record);
      }

      await this.attendanceRecordRepository.save(record);
    }
    if (!results.length) {
      throw new ConflictException('Все записи существуют!');
    }

    return await this.attendanceRecordRepository.save(results);
  }

  public async teacherCreateMany(
    teacherId: number,
    records: AttendanceRecord[],
  ): Promise<AttendanceRecord[]> {
    if (!records.length) {
      throw new BadRequestException('Список записей пустой!');
    }

    const groupId = records[0].session.groupId;

    const isOneGroup = records.every(
      (record) => record.session.groupId === groupId,
    );

    if (!isOneGroup) {
      throw new BadRequestException('Все записи должны быть из одной группы!');
    }
    await checkTeacherGroups(this.teacherDetailRepository, teacherId, groupId);

    return await this.createMany(records);
  }

  public async updateMany(
    records: AttendanceRecord[],
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

      if (existRecord.sessionId !== record.session.id) {
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

    return await this.attendanceRecordRepository.save(results);
  }

  public async teacherUpdateMany(
    teacherId: number,
    records: AttendanceRecord[],
  ): Promise<AttendanceRecord[]> {
    if (!records.length) {
      throw new BadRequestException('Список записей пустой!');
    }

    const groupId = records[0].session.groupId;

    const isOneGroup = records.every(
      (record) => record.session.groupId === groupId,
    );

    if (!isOneGroup) {
      throw new BadRequestException('Все записи должны быть из одной группы!');
    }

    await checkTeacherGroups(this.teacherDetailRepository, teacherId, groupId);

    return await this.updateMany(records);
  }

  public async deleteMany(records: AttendanceRecord[]): Promise<void> {
    if (!records.length) {
      throw new BadRequestException('Список записей пустой!');
    }

    const recordIds = records.map((r) => r.id);

    const existingRecords = await this.attendanceRecordRepository.find({
      where: { id: In(recordIds) },
    });

    if (existingRecords.length !== records.length) {
      throw new NotFoundException('Некоторые записи не найдены.');
    }

    await this.attendanceRecordRepository.remove(existingRecords);
  }

  public async teacherDeleteMany(
    teacherId: number,
    records: AttendanceRecord[],
  ): Promise<void> {
    if (!records.length) {
      throw new BadRequestException('Список записей пустой!');
    }

    const groupId = records[0].session.groupId;

    const isOneGroup = records.every(
      (record) => record.session.groupId === groupId,
    );

    if (!isOneGroup) {
      throw new BadRequestException('Все записи должны быть из одной группы!');
    }

    await checkTeacherGroups(this.teacherDetailRepository, teacherId, groupId);

    await this.deleteMany(records);
  }
}
