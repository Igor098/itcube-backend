import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { EmployeesService } from './employees.service';
import {
  mapEmployeesToListDto,
  mapEmployeeToDto,
} from './mappers/employee.mapper';
import { EmployeeResponseDto } from './dto/employee-response.dto';
import { Authorization } from '@/auth/decorators/auth.decorator';
import { EmployeeDto } from './dto/employee.dto';
import { DeleteResponseDto } from '@/libs/common/dto/delete-response.dto';
import { RoleName } from '@/user_roles/entities/user_role.entity';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Authorization(RoleName.ADMIN)
  @Get('all')
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<EmployeeResponseDto[]> {
    const employees = await this.employeesService.findAll();

    return mapEmployeesToListDto(employees);
  }

  @Authorization(RoleName.ADMIN)
  @Get('by-id/:id')
  @HttpCode(HttpStatus.OK)
  async findById(@Param('id') id: number): Promise<EmployeeResponseDto> {
    const employee = await this.employeesService.findById(id);

    return mapEmployeeToDto(employee);
  }

  @Authorization(RoleName.ADMIN)
  @Get('by-name')
  @HttpCode(HttpStatus.OK)
  async findByName(
    @Query('fullName') fullName: string,
  ): Promise<EmployeeResponseDto> {
    const employee = await this.employeesService.findByName(fullName);
    return mapEmployeeToDto(employee);
  }

  @Authorization(RoleName.ADMIN)
  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() employee: EmployeeDto): Promise<EmployeeResponseDto> {
    const newEmployee = await this.employeesService.create(employee);

    return mapEmployeeToDto(newEmployee);
  }

  @Authorization(RoleName.ADMIN)
  @Put('update/:id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: number,
    @Body() employee: EmployeeDto,
  ): Promise<EmployeeResponseDto> {
    const updatedEmployee = await this.employeesService.update(id, employee);
    return mapEmployeeToDto(updatedEmployee);
  }

  @Authorization(RoleName.ADMIN)
  @Delete('delete/:id')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id') id: number): Promise<DeleteResponseDto> {
    return await this.employeesService.delete(id);
  }
}
