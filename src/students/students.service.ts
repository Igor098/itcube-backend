import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './entities/student.entity';
import { StudentDto } from './dto/student.dto';
import { DeleteResponseDto } from '@/libs/common/dto/delete-response.dto';
import { format } from 'date-fns';
import { parseDate } from '@/libs/common/utils/parse-date.util';
import { StudentFilterDto } from './dto/student-filter.dto';

@Injectable()
export class StudentsService {
  public constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}

  public async findAll(): Promise<Student[]> {
    return await this.studentRepository.find();
  }

  public async findById(id: number): Promise<Student> {
    const student = await this.studentRepository.findOneBy({ id: id });

    if (!student) {
      throw new NotFoundException('Студент не найден!');
    }

    return student;
  }

  public async filter(filter: StudentFilterDto, q: string): Promise<Student[]> {
    const query = this.studentRepository.createQueryBuilder('student');

    if (filter.age !== undefined) {
      const today = new Date();
      const maxBirthDate = new Date(
        today.setFullYear(today.getFullYear() - filter.age),
      );
      const minBirthDate = new Date(today.setFullYear(today.getFullYear() - 1));

      query.andWhere('student.birthDate BETWEEN :min AND :max', {
        min: minBirthDate,
        max: maxBirthDate,
      });
    }

    if (q) {
      query.andWhere('student.fullName ILIKE :q', { q: `%${q}%` });
    }

    return await query.getMany();
  }

  public async create(student: StudentDto): Promise<Student> {
    const parsedDate = parseDate(format(student.birthDate, 'dd.MM.yyyy'));
    const isExists = await this.studentRepository.findOneBy({
      fullName: student.fullName,
      birthDate: parsedDate,
    });

    if (Boolean(isExists)) {
      throw new ConflictException('Студент с такими данными уже существует!');
    }

    return await this.studentRepository.save(student);
  }

  public async update(id: number, student: StudentDto): Promise<Student> {
    const studentToUpdate = await this.studentRepository.findOneBy({ id });

    if (!studentToUpdate) {
      throw new NotFoundException('Студент не найден!');
    }

    Object.assign(studentToUpdate, student);
    return await this.studentRepository.save(studentToUpdate);
  }

  public async delete(id: number): Promise<DeleteResponseDto> {
    const student = await this.findById(id);

    const removedStudent = await this.studentRepository.remove(student);
    return { isDeleted: true, id: removedStudent.id };
  }
}
