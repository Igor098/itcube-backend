import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Classroom } from './entities/classroom.entity';
import { Repository } from 'typeorm';
import { ClassroomDto } from './dto/classroom.dto';

@Injectable()
export class ClassroomsService {
  constructor(
    @InjectRepository(Classroom)
    private readonly classroomRepository: Repository<Classroom>,
  ) {}

  async findAll(): Promise<Classroom[]> {
    return await this.classroomRepository.find();
  }

  async findById(id: number): Promise<Classroom> {
    const classroom = await this.classroomRepository.findOne({
      where: { id },
    });

    if (!classroom) {
      throw new NotFoundException('Класс не найден!');
    }

    return classroom;
  }

  async create(classroom: ClassroomDto): Promise<Classroom> {
    const isExists = await this.classroomRepository.findOne({
      where: { name: classroom.name },
    });

    if (isExists) {
      throw new NotFoundException(
        'Аудитория с таким названием уже существует!',
      );
    }
    return await this.classroomRepository.save(classroom);
  }

  async update(id: number, classroom: ClassroomDto): Promise<Classroom> {
    const classroomToUpdate = await this.findById(id);
    Object.assign(classroomToUpdate, classroom);

    return await this.classroomRepository.save(classroomToUpdate);
  }

  async delete(id: number): Promise<Classroom> {
    const classroom = await this.findById(id);
    return await this.classroomRepository.remove(classroom);
  }
}
