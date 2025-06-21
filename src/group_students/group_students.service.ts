import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupStudent } from './entities/group_student.entity';
import { Repository } from 'typeorm';
import { GroupStudentsFilterDto } from './dto/group-student-filter.dto';
import { DeleteResponseDto } from '@/libs/common/dto/delete-response.dto';
import { GroupStudentDto } from './dto/group-student.dto';

@Injectable()
export class GroupStudentsService {
  public constructor(
    @InjectRepository(GroupStudent)
    private readonly groupStudentsRepository: Repository<GroupStudent>,
  ) {}

  public async findAll(): Promise<GroupStudent[]> {
    return this.groupStudentsRepository.find({
      relations: {
        student: true,
        group: true,
      },
    });
  }

  public async findById(id: number): Promise<GroupStudent> {
    const studentInGroup = await this.groupStudentsRepository.findOne({
      where: { id },
      relations: {
        student: true,
        group: true,
      },
    });

    if (!studentInGroup) {
      throw new NotFoundException('Студент  в данной группе не найден!');
    }
    return studentInGroup;
  }

  public async findManyByFilters(
    q?: string,
    filters?: GroupStudentsFilterDto,
  ): Promise<GroupStudent[]> {
    const query = await this.groupStudentsRepository
      .createQueryBuilder('groupStudent')
      .leftJoinAndSelect('groupStudent.student', 'student')
      .leftJoinAndSelect('groupStudent.group', 'group')
      .leftJoinAndSelect('group.schoolYear', 'schoolYear');

    if (Boolean(filters?.groupId)) {
      query.andWhere('group.id = :groupId', { groupId: filters?.groupId });
    }

    if (Boolean(filters?.schoolYearId)) {
      query.andWhere('schoolYear.id = :schoolYearId', {
        schoolYearId: filters?.schoolYearId,
      });
    }

    if (Boolean(filters?.status)) {
      query.andWhere('groupStudent.status = :status', {
        status: filters?.status,
      });
    }

    if (Boolean(q)) {
      query.andWhere('student.full_name ILIKE :q', { q: `%${q}%` });
    }

    return query.getMany();
  }

  public async create(groupStudent: GroupStudentDto): Promise<GroupStudent> {
    const isExists = await this.groupStudentsRepository.findOneBy({
      groupId: groupStudent.groupId,
      studentId: groupStudent.studentId,
    });

    if (isExists) {
      throw new ConflictException('Студент уже состоит в этой группе!');
    }

    const newGroupStudent =
      await this.groupStudentsRepository.save(groupStudent);

    return this.findById(newGroupStudent.id);
  }

  public async update(
    id: number,
    groupStudent: GroupStudentDto,
  ): Promise<GroupStudent> {
    const groupStudentToUpdate = await this.groupStudentsRepository.findOneBy({
      id,
    });

    if (!groupStudentToUpdate) {
      throw new NotFoundException('Студент  в данной группе не найден!');
    }

    Object.assign(groupStudentToUpdate, groupStudent);

    const editedGroupStudent =
      await this.groupStudentsRepository.save(groupStudentToUpdate);

    return await this.findById(editedGroupStudent.id);
  }

  public async delete(id: number): Promise<DeleteResponseDto> {
    const groupStudent = await this.findById(id);
    const gs_id = groupStudent.id;
    await this.groupStudentsRepository.delete(gs_id);

    return { isDeleted: true, id: gs_id };
  }
}
