import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from './entities/group.entity';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { GroupDto } from './dto/group.dto';
import { DeleteResponseDto } from '@/libs/common/dto/delete-response.dto';

@Injectable()
export class GroupsService {
  public constructor(
    @InjectRepository(Group)
    private readonly groupsRepository: Repository<Group>,
  ) {}

  public async findAll(): Promise<Group[]> {
    const query = this.getFindQueryBuilder();

    return await query.getMany();
  }

  public async findById(id: number): Promise<Group> {
    const query = this.getFindQueryBuilder();
    const group = await query.where({ id }).getOne();

    if (!group) {
      throw new NotFoundException('Група не найдена!');
    }
    return group;
  }

  public async findByName(name: string): Promise<Group> {
    const query = this.getFindQueryBuilder();

    const group = await query.where({ name }).getOne();

    if (!group) {
      throw new NotFoundException('Группа не найдена!');
    }
    return group;
  }

  public async findByTeacher(teacherId: number): Promise<Group[]> {
    const query = this.getFindQueryBuilder();

    return await query.where({ teacherId }).getMany();
  }

  public async create(group: GroupDto): Promise<Group> {
    const isExists = await this.groupsRepository.findOneBy({
      name: group.name,
    });

    if (Boolean(isExists)) {
      throw new ConflictException('Группа с таким названием уже существует!');
    }

    const newGroup = await this.groupsRepository.save(group);

    return await this.findById(newGroup.id);
  }

  public async update(id: number, group: GroupDto): Promise<Group> {
    const groupToUpdate = await this.groupsRepository.findOneBy({ id });

    if (!groupToUpdate) {
      throw new NotFoundException('Группа не найдена!');
    }

    Object.assign(groupToUpdate, group);

    const editedGroup = await this.groupsRepository.save(groupToUpdate);

    return await this.findById(editedGroup.id);
  }

  public async delete(id: number): Promise<DeleteResponseDto> {
    const isExists = await this.findById(id);

    if (!Boolean(isExists)) {
      throw new NotFoundException('Группа не найдена!');
    }

    const g_id = isExists.id;

    await this.groupsRepository.delete(id);
    return { isDeleted: true, id: g_id };
  }

  private getFindQueryBuilder(): SelectQueryBuilder<Group> {
    const query = this.groupsRepository
      .createQueryBuilder('group')
      .leftJoinAndSelect('group.program', 'program')
      .leftJoinAndSelect('group.schoolYear', 'schoolYear')
      .leftJoinAndSelect('group.teacher', 'teacher')
      .leftJoinAndSelect('teacher.employee', 'employee')
      .leftJoinAndSelect('group.groupStudents', 'groupStudent')
      .leftJoinAndSelect('groupStudent.student', 'student')
      .loadRelationCountAndMap('group.studentsCount', 'group.groupStudents');

    return query;
  }
}
