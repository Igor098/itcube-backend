import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Brackets } from 'typeorm';
import { Program } from './entities/program.entity';
import { ProgramDto } from './dto/program.dto';
import { FilterProgramDto } from './dto/filter-program.dto';
import { DeleteResponseDto } from '@/libs/common/dto/delete-response.dto';

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

    const newProgram = await this.programRepository.save(dto);
    return this.findById(newProgram.id);
  }

  async findAll(): Promise<Program[]> {
    return this.programRepository.find({
      relations: ['groups'],
      order: { name: 'ASC' },
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

  async filterPrograms(
    q?: string,
    filters?: FilterProgramDto,
  ): Promise<Program[]> {
    const query = this.programRepository
      .createQueryBuilder('program')
      .leftJoinAndSelect('program.groups', 'groups');

    if (filters?.durationHours !== undefined) {
      query.andWhere({ durationHours: filters.durationHours });
    }

    if (filters?.isActive !== undefined) {
      query.andWhere({ isActive: filters.isActive });
    }

    if (Boolean(q)) {
      query.andWhere(
        new Brackets((qb) => {
          qb.where('program.name ILIKE :q').orWhere(
            'program.description ILIKE :q',
          );
        }),
        { q: `%${q}%` },
      );
    }

    return await query.getMany();
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

    return this.programRepository.save({ ...program, ...dto });
  }

  async delete(id: number): Promise<DeleteResponseDto> {
    const program = await this.programRepository.findOne({ where: { id: id } });

    if (!program) {
      throw new NotFoundException('Программа не найдена');
    }

    const p_id = program.id;

    await this.programRepository.remove(program);

    return { isDeleted: true, id: p_id };
  }
}
