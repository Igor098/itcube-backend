import { Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { User } from '@/users/entities/user.entity';
import { UsersService } from '@/users/users.service';
import { UserRolesService } from '@/user_roles/user_roles.service';
import { UserRole } from '@/user_roles/entities/user_role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Employee, User, UserRole])],
  controllers: [EmployeesController],
  providers: [EmployeesService, UsersService, UserRolesService],
})
export class EmployeesModule {}
