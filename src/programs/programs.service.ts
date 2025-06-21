import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Program } from './entities/program.entity';
import { ProgramDto } from './dto/program.dto';

@Injectable()
export class ProgramService {
  constructor(
    @InjectRepository(Program)
    private readonly programRepository: Repository<Program>,
  ) {}

  async create(dto: ProgramDto): Promise<Program> {
    const existingProgram = await this.programRepository.findOne({
      where: { name: dto.name },
    });

    if (existingProgram) {
      throw new ConflictException(`Программа с таким названием уже существует`);
    }

    const program = this.programRepository.create(dto);
    return await this.programRepository.save(program);
  }

  async findAll(): Promise<Program[]> {
    return await this.programRepository.find({
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
      throw new NotFoundException(`Программа не найдена`);
    }
    return program;
  }

  async findByName(name: string): Promise<Program> {
    const program = await this.programRepository.findOne({
      where: { name },
      relations: ['groups'],
    });

    if (!program) {
      throw new NotFoundException(`Программа не найдена`);
    }
    return program;
  }

  async update(id: number, dto: Partial<ProgramDto>): Promise<Program> {
    const program = await this.findById(id);

    if (dto.name && dto.name !== program.name) {
      const existingWithName = await this.programRepository.findOne({
        where: { name: dto.name },
      });
      if (existingWithName) {
        throw new ConflictException(
          `Программа с таким названием уже существует`,
        );
      }
    }

    Object.assign(program, dto);
    return await this.programRepository.save(program);
  }

  async delete(id: number): Promise<void> {
    const program = await this.findById(id);
    await this.programRepository.remove(program);
  }
}
