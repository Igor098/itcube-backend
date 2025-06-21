import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, FindOptionsWhere, ILike } from 'typeorm';
import { Program } from './entities/program.entity';
import { ProgramDto } from './dto/program.dto';
import { FilterProgramDto } from './dto/filter-program.dto';

@Injectable()
export class ProgramsService {
  constructor(
    @InjectRepository(Program)
    private readonly programRepository: Repository<Program>,
  ) {}

  async create(dto: ProgramDto): Promise<Program> {
    const existing = await this.programRepository.findOne({
      where: { name: dto.name },
    });

    if (existing) {
      throw new ConflictException('Программа с таким названием уже существует');
    }

    if (dto.minAge > dto.maxAge) {
      throw new BadRequestException(
        'Минимальный возраст не может быть больше максимального',
      );
    }

    const program = this.programRepository.create(dto);
    return this.programRepository.save(program);
  }

  async findAll(): Promise<Program[]> {
    return this.programRepository.find({
      order: { name: 'ASC' },
      relations: ['groups'],
    });
  }

  async findById(id: number): Promise<Program> {
    const program = await this.programRepository.findOne({
      where: { id },
      relations: ['groups'],
    });

    if (!program) {
      throw new NotFoundException('Программа не найдена');
    }

    return program;
  }

  async findByName(name: string): Promise<Program> {
    const program = await this.programRepository.findOne({
      where: { name },
      relations: ['groups'],
    });

    if (!program) {
      throw new NotFoundException('Программа с таким названием не найдена');
    }

    return program;
  }

  async filterPrograms(filters: FilterProgramDto): Promise<Program[]> {
    const where: FindOptionsWhere<Program> = {};

    if (filters.minHours !== undefined && filters.maxHours !== undefined) {
      where.durationHours = Between(filters.minHours, filters.maxHours);
    } else if (filters.minHours !== undefined) {
      where.durationHours = Between(filters.minHours, 9999);
    } else if (filters.maxHours !== undefined) {
      where.durationHours = Between(0, filters.maxHours);
    }

    if (filters.name) {
      where.name = ILike(`%${filters.name}%`);
    }

    if (filters.isActive !== undefined) {
      where.isActive = filters.isActive;
    }

    return this.programRepository.find({
      where,
      relations: ['groups'],
      order: { name: 'ASC' },
    });
  }

  async update(id: number, dto: ProgramDto): Promise<Program> {
    const program = await this.findById(id);

    if (dto.name !== program.name) {
      const existing = await this.programRepository.findOne({
        where: { name: dto.name },
      });

      if (existing) {
        throw new ConflictException(
          'Программа с таким названием уже существует',
        );
      }
    }

    if (dto.minAge > dto.maxAge) {
      throw new BadRequestException(
        'Минимальный возраст не может быть больше максимального',
      );
    }

    Object.assign(program, dto);
    return this.programRepository.save(program);
  }

  async delete(id: number): Promise<void> {
    const program = await this.findById(id);
    await this.programRepository.remove(program);
  }
}
