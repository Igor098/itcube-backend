import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from './entities/group.entity';
import { Repository } from 'typeorm';
import { GroupDto } from './dto/group.dto';
import { mapGroupsToListDto, mapGroupToDto } from './mappers/group.mapper';
import { GroupListItemDto, GroupResponseDto } from './dto/group-response.dto';

@Injectable()
export class GroupsService {
  public constructor(
    @InjectRepository(Group)
    private readonly groupsRepository: Repository<Group>,
  ) {}

  public async findAll(): Promise<GroupListItemDto[]> {
    const groups = await this.groupsRepository
      .createQueryBuilder('group')
      .leftJoinAndSelect('group.program', 'program')
      .leftJoinAndSelect('group.schoolYear', 'schoolYear')
      .leftJoinAndSelect('group.teacher', 'teacher')
      .leftJoinAndSelect('teacher.employee', 'employee')
      .leftJoinAndSelect('group.groupStudents', 'groupStudent')
      .leftJoinAndSelect('groupStudent.student', 'student')
      .loadRelationCountAndMap('group.studentsCount', 'group.groupStudents')
      .getMany();
    return mapGroupsToListDto(groups);
  }

  public async findById(id: number): Promise<GroupResponseDto> {
    const group = await this.groupsRepository
      .createQueryBuilder('group')
      .leftJoinAndSelect('group.program', 'program')
      .leftJoinAndSelect('group.schoolYear', 'schoolYear')
      .leftJoinAndSelect('group.teacher', 'teacher')
      .leftJoinAndSelect('teacher.employee', 'employee')
      .leftJoinAndSelect('group.groupStudents', 'groupStudent')
      .leftJoinAndSelect('groupStudent.student', 'student')
      .loadRelationCountAndMap('group.studentsCount', 'group.groupStudents')
      .where({ id })
      .getOne();

    if (!group) {
      throw new NotFoundException('Група не найдена!');
    }
    return mapGroupToDto(group);
  }

  public async findByName(name: string): Promise<GroupResponseDto> {
    const group = await this.groupsRepository
      .createQueryBuilder('group')
      .leftJoinAndSelect('group.program', 'program')
      .leftJoinAndSelect('group.schoolYear', 'schoolYear')
      .leftJoinAndSelect('group.teacher', 'teacher')
      .leftJoinAndSelect('teacher.employee', 'employee')
      .leftJoinAndSelect('group.groupStudents', 'groupStudent')
      .leftJoinAndSelect('groupStudent.student', 'student')
      .loadRelationCountAndMap('group.studentsCount', 'group.groupStudents')
      .where({ name })
      .getOne();

    if (!group) {
      throw new NotFoundException('Группа не найдена!');
    }
    return mapGroupToDto(group);
  }

  public async create(group: GroupDto): Promise<Group> {
    const isExists = await this.findByName(group.name);

    if (Boolean(isExists)) {
      throw new ConflictException('Группа с таким названием уже существует!');
    }
    return await this.groupsRepository.save(group);
  }

  public async update(id: number, group: GroupDto): Promise<Group> {
    const groupToUpdate = await this.findById(id);
    Object.assign(groupToUpdate, group);

    return await this.groupsRepository.save(groupToUpdate);
  }

  public async delete(id: number): Promise<boolean> {
    await this.groupsRepository.delete(id);
    return true;
  }
}
