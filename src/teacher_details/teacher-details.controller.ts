import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { TeacherDetailsService } from '@/teacher_details/teacher-details.service';
import { Authorization } from '@/auth/decorators/auth.decorator';
import { RoleName } from '@/user_roles/entities/user_role.entity';
import { mapTeacherDetailsToListDto, mapTeacherDetailToDto } from '@/teacher_details/mappers/teacher-details.mapper';
import { TeacherDetailDto } from '@/teacher_details/dto/teacher-detail.dto';
import { TeacherDetailResponseDto } from '@/teacher_details/dto/teacher-detail-response.dto';
import { DeleteResponseDto } from '@/libs/common/dto/delete-response.dto';



@Controller('teacher-details')
export class TeacherDetailsController {
  constructor(private readonly teacherDetailsService: TeacherDetailsService) {}

  @Authorization(RoleName.ADMIN)
  @HttpCode(HttpStatus.OK)
  @Get('all')
  async findAll(): Promise<TeacherDetailResponseDto[]> {
    const teacherDetails = await this.teacherDetailsService.findAll();
    return mapTeacherDetailsToListDto(teacherDetails);
  }

  @Authorization(RoleName.ADMIN)
  @HttpCode(HttpStatus.OK)
  @Get('by-id/:id')
  async findById(@Param('id') id: string): Promise<TeacherDetailResponseDto> {
    const teacherDetails = await this.teacherDetailsService.findById(+id);
    return mapTeacherDetailToDto(teacherDetails);
  }

  @Authorization(RoleName.ADMIN)
  @HttpCode(HttpStatus.CREATED)
  @Post('create')
  async create(
    @Body() teacherDetailDto: TeacherDetailDto,
  ): Promise<TeacherDetailResponseDto> {
    const teacherDetails =
      await this.teacherDetailsService.create(teacherDetailDto);
    return mapTeacherDetailToDto(teacherDetails);
  }

  @Authorization(RoleName.ADMIN)
  @Put('update/:id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Body() teacherDetailDto: TeacherDetailDto,
  ): Promise<TeacherDetailResponseDto> {
    const teacherDetails = await this.teacherDetailsService.update(
      +id,
      teacherDetailDto,
    );
    return mapTeacherDetailToDto(teacherDetails);
  }

  @Authorization(RoleName.ADMIN)
  @Delete('delete/:id')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id') id: string): Promise<DeleteResponseDto> {
    return await this.teacherDetailsService.delete(+id);
  }
}
