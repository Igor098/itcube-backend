import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './entities/employee.entity';
import { DeleteResponseDto } from '@/libs/common/dto/delete-response.dto';
import { EmployeeDto } from './dto/employee.dto';
import { User } from '@/users/entities/user.entity';
import { UserRolesService } from '@/user_roles/user_roles.service';
import { RoleName } from '@/user_roles/entities/user_role.entity';

@Injectable()
export class EmployeesService {
  public constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly userRolesService: UserRolesService,
  ) {}

  public async findAll(): Promise<Employee[]> {
    return await this.employeeRepository.find({
      relations: {
        position: true,
        user: {
          userRoles: true,
        },
      },
    });
  }

  public async findById(id: number): Promise<Employee> {
    const employee = await this.employeeRepository.findOne({
      where: { id },
      relations: {
        position: true,
        user: {
          userRoles: true,
        },
      },
    });

    if (!employee) {
      throw new NotFoundException('Сотрудник не найден!');
    }

    return employee;
  }

  public async findByName(fullName: string): Promise<Employee> {
    const employee = await this.employeeRepository.findOne({
      where: { fullName },
      relations: {
        position: true,
        user: {
          userRoles: true,
        },
      },
    });

    if (!employee) {
      throw new NotFoundException('Сотрудник не найден!');
    }

    return employee;
  }

  public async create(employee: EmployeeDto): Promise<Employee> {
    const isExists = await this.employeeRepository.findOneBy({
      fullName: employee.fullName,
      positionId: employee.positionId,
    });
    if (isExists) {
      throw new ConflictException('Такой сотрудник уже существует!');
    }

    const hasUser = await this.userRepository.findOneBy({
      id: employee.userId,
    });
    if (!hasUser) {
      throw new NotFoundException(
        'Не найден аккаунт пользователя на сайте. Для добавления сотрудника он должен быть зарегистрирован!',
      );
    }
    console.log('data:', employee);

    const newEmployee = await this.employeeRepository.save(employee);

    console.log('newEmployee:', newEmployee);

    await this.userRolesService.create({
      userId: newEmployee.userId,
      role: employee.role ?? RoleName.USER,
    });

    return this.findById(newEmployee.id);
  }

  public async update(id: number, employee: EmployeeDto): Promise<Employee> {
    const employeeToUpdate = await this.employeeRepository.findOneBy({
      id,
    });

    if (!employeeToUpdate) {
      throw new NotFoundException('Сотрудник не найден!');
    }

    Object.assign(employeeToUpdate, employee);

    const updated = await this.employeeRepository.save(employeeToUpdate);

    await this.userRolesService.create({
      userId: updated.userId,
      role: employee.role ?? RoleName.USER,
    });

    return await this.findById(updated.id);
  }

  public async delete(id: number): Promise<DeleteResponseDto> {
    const employee = await this.findById(id);
    const e_id = employee.id;
    await this.employeeRepository.remove(employee);

    await this.userRolesService.delete(employee.userId);

    return { isDeleted: true, id: e_id };
  }
}
