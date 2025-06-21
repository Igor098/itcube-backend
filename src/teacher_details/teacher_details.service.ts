import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TeacherDetail } from './entities/teacher_detail.entity';
import { DeleteResponseDto } from '@/libs/common/dto/delete-response.dto';

@Injectable()
export class TeacherDetailsService {
  public constructor(
    @InjectRepository(TeacherDetail)
    private readonly teacherDetailRepository: Repository<TeacherDetail>,
  ) {}

  public async findAll(): Promise<TeacherDetail[]> {
    return await this.teacherDetailRepository.find({
      relations: {
        employee: true,
      },
    });
  }

  public async findById(id: number): Promise<TeacherDetail> {
    const teacherDetail = await this.teacherDetailRepository.findOne({
      where: { id },
      relations: {
        employee: true,
      },
    });

    if (!teacherDetail) {
      throw new NotFoundException('Преподаватель не найден!');
    }

    return teacherDetail;
  }

  public async findByName(name: string): Promise<TeacherDetail> {
    const teacherDetail = await this.teacherDetailRepository.findOne({
      relations: {
        employee: true,
      },
      where: { employee: { fullName: name } },
    });

    if (!teacherDetail) {
      throw new NotFoundException('Преподаватель не найден!');
    }

    return teacherDetail;
  }

  public async create(teacherDetail: TeacherDetail): Promise<TeacherDetail> {
    const isExists = await this.teacherDetailRepository.findOneBy({
      employeeId: teacherDetail.id,
    });

    if (isExists) {
      throw new ConflictException('Преподаватель уже существует!');
    }

    const newTeacherDetail =
      await this.teacherDetailRepository.save(teacherDetail);

    return await this.findById(newTeacherDetail.id);
  }

  public async update(
    id: number,
    teacherDetail: TeacherDetail,
  ): Promise<TeacherDetail> {
    const teacherDetailToUpdate = await this.teacherDetailRepository.findOneBy({
      id,
    });

    if (!teacherDetailToUpdate) {
      throw new NotFoundException('Преподаватель не найден!');
    }

    Object.assign(teacherDetailToUpdate, teacherDetail);

    const editedTeacherDetail = await this.teacherDetailRepository.save(
      teacherDetailToUpdate,
    );

    return await this.findById(editedTeacherDetail.id);
  }

  public async delete(id: number): Promise<DeleteResponseDto> {
    const teacherDetailToDelete = await this.teacherDetailRepository.findOneBy({
      id,
    });

    if (!teacherDetailToDelete) {
      throw new NotFoundException('Преподаватель не найден!');
    }

    const t_id = teacherDetailToDelete.id;
    await this.teacherDetailRepository.remove(teacherDetailToDelete);

    return { isDeleted: true, id: t_id };
  }
}
