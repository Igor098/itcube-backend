import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRole } from './entities/user_role.entity';
import { Repository } from 'typeorm';
import { DeleteResponseDto } from '@/libs/common/dto/delete-response.dto';
import { UserRoleDto } from './dto/user-role.dto';

@Injectable()
export class UserRolesService {
  public constructor(
    @InjectRepository(UserRole)
    private readonly userRolesRepository: Repository<UserRole>,
  ) {}

  public async findAll(): Promise<UserRole[]> {
    return this.userRolesRepository.find();
  }

  public async findById(userId: number): Promise<UserRole> {
    const role = await this.userRolesRepository.findOneBy({ userId: userId });

    if (!role) {
      throw new NotFoundException('Роль не найдена!');
    }

    return role;
  }

  public async create(userRole: UserRoleDto): Promise<UserRole> {
    const isExists = await this.userRolesRepository.findOneBy({
      userId: userRole.userId,
      role: userRole.role,
    });

    if (isExists) {
      throw new ConflictException('Роль уже существует!');
    }

    return this.userRolesRepository.save(userRole);
  }

  public async update(userId: number, userRole: UserRole): Promise<UserRole> {
    const role = await this.findById(userId);

    Object.assign(role, userRole);
    return this.userRolesRepository.save(userRole);
  }

  public async delete(userId: number): Promise<DeleteResponseDto> {
    const role = await this.findById(userId);

    const r_id = role.userId;
    await this.userRolesRepository.remove(role);

    return { isDeleted: true, id: r_id };
  }
}
