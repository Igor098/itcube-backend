import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Program } from './entities/program.entity';
import { ProgramDto } from './dto/program.dto';
import { ProgramResponseDto } from './dto/program-response.dto';
import { mapProgramToDto } from './mappers/program.mapper';

@Injectable()
export class ProgramsService {
  constructor(
    @InjectRepository(Program)
    private readonly programRepository: Repository<Program>,
  ) {}

  async create(dto: ProgramDto): Promise<ProgramResponseDto> {
    // Проверка уникальности названия
    const existingProgram = await this.programRepository.findOne({
      where: { name: dto.name },
    });

    if (existingProgram) {
      throw new ConflictException('Программа с таким названием уже существует');
    }

    // Валидация возрастного диапазона
    if (dto.minAge > dto.maxAge) {
      throw new BadRequestException(
        'Минимальный возраст не может быть больше максимального',
      );
    }

    const program = this.programRepository.create(dto);
    const savedProgram = await this.programRepository.save(program);
    return mapProgramToDto(savedProgram);
  }

  async findAll(): Promise<ProgramResponseDto[]> {
    const programs = await this.programRepository.find({
      order: { name: 'ASC' },
      relations: ['groups'],
    });
    return programs.map(mapProgramToDto);
  }

  async findById(id: number): Promise<ProgramResponseDto> {
    const program = await this.programRepository.findOne({
      where: { id },
      relations: ['groups'],
    });

    if (!program) {
      throw new NotFoundException('Программа не найдена');
    }
    return mapProgramToDto(program);
  }

  async findByName(name: string): Promise<ProgramResponseDto> {
    const program = await this.programRepository.findOne({
      where: { name },
      relations: ['groups'],
    });

    if (!program) {
      throw new NotFoundException('Программа не найдена');
    }
    return mapProgramToDto(program);
  }

  async update(id: number, dto: ProgramDto): Promise<ProgramResponseDto> {
    const program = await this.programRepository.findOne({ where: { id } });

    if (!program) {
      throw new NotFoundException('Программа не найдена');
    }

    // Проверка уникальности имени (если имя изменилось)
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

    // Валидация возраста
    if (dto.minAge > dto.maxAge) {
      throw new BadRequestException(
        'Минимальный возраст не может быть больше максимального',
      );
    }

    // Полное обновление всех полей
    Object.assign(program, {
      name: dto.name,
      description: dto.description,
      duration_hours: dto.duration_hours,
      minAge: dto.minAge,
      maxAge: dto.maxAge,
      is_active: dto.is_active,
    });

    const updatedProgram = await this.programRepository.save(program);
    return mapProgramToDto(updatedProgram);
  }

  async delete(id: number): Promise<void> {
    const program = await this.programRepository.findOne({ where: { id } });

    if (!program) {
      throw new NotFoundException('Программа не найдена');
    }

    await this.programRepository.remove(program);
  }

  async filterByDuration(
    minHours?: number,
    maxHours?: number,
  ): Promise<ProgramResponseDto[]> {
    const query = this.programRepository.createQueryBuilder('program');

    if (minHours !== undefined) {
      query.andWhere('program.duration_hours >= :minHours', { minHours });
    }

    if (maxHours !== undefined) {
      query.andWhere('program.duration_hours <= :maxHours', { maxHours });
    }

    const programs = await query.getMany();
    return programs.map(mapProgramToDto);
  }
}
