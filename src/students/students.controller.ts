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
import { StudentsService } from './students.service';
import { StudentResponseDto } from './dto/student-response.dto';
import { Authorization } from '@/auth/decorators/auth.decorator';
import {
  mapStudentsToListDto,
  mapStudentToDto,
} from './mappers/student.mapper';
import { StudentDto } from './dto/student.dto';
import { DeleteResponseDto } from '@/libs/common/dto/delete-response.dto';
import { RoleName } from '@/user_roles/entities/user_role.entity';
import { StudentFilterDto } from './dto/student-filter.dto';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Authorization(RoleName.ADMIN)
  @Get('all')
  @HttpCode(HttpStatus.OK)
  public async findAll(): Promise<StudentResponseDto[]> {
    const students = await this.studentsService.findAll();

    return mapStudentsToListDto(students);
  }

  @Authorization(RoleName.ADMIN)
  @Get('by-id/:id')
  @HttpCode(HttpStatus.OK)
  public async findById(@Param('id') id: string): Promise<StudentResponseDto> {
    const student = await this.studentsService.findById(+id);
    return mapStudentToDto(student);
  }

  @Authorization(RoleName.ADMIN)
  @Get('filter')
  @HttpCode(HttpStatus.OK)
  public async filter(
    @Query() filter: StudentFilterDto,
    @Query('q') q: string,
  ): Promise<StudentResponseDto[]> {
    const students = await this.studentsService.filter(filter, q);
    return mapStudentsToListDto(students);
  }

  @Authorization(RoleName.ADMIN)
  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  public async create(
    @Body() student: StudentDto,
  ): Promise<StudentResponseDto> {
    const newStudent = await this.studentsService.create(student);
    return mapStudentToDto(newStudent);
  }

  @Authorization(RoleName.ADMIN)
  @Put('update/:id')
  @HttpCode(HttpStatus.OK)
  public async update(
    @Param('id') id: string,
    @Body() student: StudentDto,
  ): Promise<StudentResponseDto> {
    const updatedStudent = await this.studentsService.update(+id, student);
    return mapStudentToDto(updatedStudent);
  }

  @Authorization(RoleName.ADMIN)
  @Delete('delete/:id')
  @HttpCode(HttpStatus.OK)
  public async delete(@Param('id') id: string): Promise<DeleteResponseDto> {
    return await this.studentsService.delete(+id);
  }
}
