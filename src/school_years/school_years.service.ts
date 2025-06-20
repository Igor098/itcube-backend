import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SchoolYear } from './entities/school_year.entity';
import { SchoolYearDto } from './dto/school-year.dto';
import { DeleteResponseDto } from '@/libs/common/dto/delete-response.dto';

@Injectable()
export class SchoolYearService {
  constructor(
    @InjectRepository(SchoolYear)
    private readonly schoolYearRepository: Repository<SchoolYear>,
  ) {}

  async create(dto: SchoolYearDto): Promise<SchoolYear> {
    const schoolYear = this.schoolYearRepository.create(dto);
    return await this.schoolYearRepository.save(schoolYear);
  }

  async findAll(): Promise<SchoolYear[]> {
    return await this.schoolYearRepository.find({
      order: { startDate: 'DESC' },
    });
  }

  async findById(id: number): Promise<SchoolYear> {
    const schoolYear = await this.schoolYearRepository.findOne({
      where: { id },
      relations: ['groups'],
    });

    if (!schoolYear) {
      throw new NotFoundException(`Учебный год  не найден`);
    }
    return schoolYear;
  }

  async findByPeriod(period: string): Promise<SchoolYear> {
    const schoolYear = await this.schoolYearRepository.findOne({
      where: { period },
    });

    if (!schoolYear) {
      throw new NotFoundException(`Учебный год с  таким периодом  не найден`);
    }
    return schoolYear;
  }

  async update(id: number, schoolYear: SchoolYearDto): Promise<SchoolYear> {
    const yearToUpdate = await this.findById(id);
    Object.assign(yearToUpdate, schoolYear);
    return await this.schoolYearRepository.save(yearToUpdate);
  }

  async delete(id: number): Promise<DeleteResponseDto> {
    const year = await this.findById(id);

    if (!year) {
      throw new NotFoundException(`Учебный год  не найден`);
    }

    const y_id = year.id;
    await this.schoolYearRepository.remove(year);

    return { isDeleted: true, id: y_id };
  }
}
