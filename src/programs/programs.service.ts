import { Injectable, NotFoundException } from '@nestjs/common';
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
    const program = this.programRepository.create(dto);
    return await this.programRepository.save(program);
  }

  async findAll(): Promise<Program[]> {
    return await this.programRepository.find({
      order: { name: 'ASC' },
    });
  }

  async findById(id: number): Promise<Program> {
    const program = await this.programRepository.findOne({
      where: { id },
      relations: ['groups'],
    });

    if (!program) {
      throw new NotFoundException(`Программа с ID ${id} не найдена`);
    }
    return program;
  }

  async findByName(name: string): Promise<Program> {
    const program = await this.programRepository.findOne({
      where: { name },
    });

    if (!program) {
      throw new NotFoundException(`Программа "${name}" не найдена`);
    }
    return program;
  }

  async delete(id: number): Promise<void> {
    const program = await this.findById(id);
    await this.programRepository.remove(program);
  }
}
