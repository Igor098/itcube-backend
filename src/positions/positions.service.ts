import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Position } from './entities/position.entity';
import { Repository } from 'typeorm';
import { DeleteResponseDto } from '@/libs/common/dto/delete-response.dto';

@Injectable()
export class PositionService {
  public constructor(
    @InjectRepository(Position)
    private readonly positionRepository: Repository<Position>,
  ) {}

  public async findAll(): Promise<Position[]> {
    return await this.positionRepository.find({
      relations: {
        employees: true,
      },
    });
  }

  public async findById(id: number): Promise<Position> {
    const position = await this.positionRepository.findOne({
      where: { id },
      relations: { employees: true },
    });

    if (!position) {
      throw new Error('Должность не найдена!');
    }

    return position;
  }

  public async create(position: Position): Promise<Position> {
    const isExists = await this.positionRepository.findOneBy({
      name: position.name,
    });

    if (Boolean(isExists)) {
      throw new Error('Должность с таким названием уже существует!');
    }

    return await this.positionRepository.save(position);
  }

  public async update(id: number, position: Position): Promise<Position> {
    const positionToUpdate = await this.findById(id);
    Object.assign(positionToUpdate, position);

    return await this.positionRepository.save(positionToUpdate);
  }

  public async delete(id: number): Promise<DeleteResponseDto> {
    const position = await this.findById(id);
    const r_id = position.id;
    await this.positionRepository.remove(position);

    return { isDeleted: true, id: r_id };
  }
}
