import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AttendanceRecord } from './entities/attendance_record.entity';

@Injectable()
export class AttendanceRecordsService {
  public constructor(
    @InjectRepository(AttendanceRecord)
    private readonly attendanceRecordRepository: Repository<AttendanceRecord>,
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

  public async create(record: AttendanceRecord): Promise<AttendanceRecord> {
    const isExists = await this.attendanceRecordRepository.findOne({
      where: { studentId: record.student.id, sessionId: record.session.id },
      relations: {
        student: true,
        session: true,
      },
    });

    if (isExists) {
      throw new ConflictException('Запись уже существует!');
    }

    return await this.attendanceRecordRepository.save(record);
  }
}
