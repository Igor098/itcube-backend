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
import { GroupStudentsService } from './group_students.service';
import { GroupStudentResponseDto } from './dto/group-student-response.dto';
import {
  mapGroupStudentsListToDto,
  mapGroupStudentToDto,
} from './mappers/group-student.mapper';
import { Authorization } from '@/auth/decorators/auth.decorator';
import { GroupStudentsFilterDto } from './dto/group-student-filter.dto';
import { GroupStudentDto } from './dto/group-student.dto';
import { DeleteResponseDto } from '@/libs/common/dto/delete-response.dto';
import { RoleName } from '@/user_roles/entities/user_role.entity';

@Controller('group-students')
export class GroupStudentsController {
  public constructor(
    private readonly groupStudentsService: GroupStudentsService,
  ) {}

  @Authorization(RoleName.ADMIN)
  @Get('all')
  @HttpCode(HttpStatus.OK)
  public async findAll(): Promise<GroupStudentResponseDto[]> {
    const groupStudents = await this.groupStudentsService.findAll();
    return mapGroupStudentsListToDto(groupStudents);
  }

  @Authorization(RoleName.ADMIN)
  @Get('by-id/:id')
  @HttpCode(HttpStatus.OK)
  public async findById(
    @Param('id') id: string,
  ): Promise<GroupStudentResponseDto> {
    const groupStudent = await this.groupStudentsService.findById(+id);
    return mapGroupStudentToDto(groupStudent);
  }

  @Authorization(RoleName.ADMIN)
  @Get('by-filtered')
  @HttpCode(HttpStatus.OK)
  public async findManyByFilters(
    @Query('q') q?: string,
    @Query() filters?: GroupStudentsFilterDto,
  ): Promise<GroupStudentResponseDto[]> {
    const groupStudents = await this.groupStudentsService.findManyByFilters(
      q,
      filters,
    );
    return mapGroupStudentsListToDto(groupStudents);
  }

  @Authorization(RoleName.ADMIN)
  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  public async create(
    @Body() groupStudent: GroupStudentDto,
  ): Promise<GroupStudentResponseDto> {
    const newGroupStudent =
      await this.groupStudentsService.create(groupStudent);
    return mapGroupStudentToDto(newGroupStudent);
  }

  @Authorization(RoleName.ADMIN)
  @Put('update/:id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Body() groupStudent: GroupStudentDto,
  ): Promise<GroupStudentResponseDto> {
    const updatedGroupStudent = await this.groupStudentsService.update(
      +id,
      groupStudent,
    );
    return mapGroupStudentToDto(updatedGroupStudent);
  }

  @Authorization(RoleName.ADMIN)
  @Delete('delete/:id')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id') id: string): Promise<DeleteResponseDto> {
    return await this.groupStudentsService.delete(+id);
  }
}
