import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ClassroomsService } from './classrooms.service';
import { Classroom } from './entities/classroom.entity';
import { ClassroomDto } from './dto/classroom.dto';

@Controller('classrooms')
export class ClassroomsController {
  constructor(private readonly classroomsService: ClassroomsService) {}

  @Get('all')
  async findAll(): Promise<Classroom[]> {
    return await this.classroomsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Classroom> {
    return await this.classroomsService.findById(+id);
  }

  @Post()
  async create(@Body() classroom: ClassroomDto): Promise<Classroom> {
    return await this.classroomsService.create(classroom);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() classroom: ClassroomDto,
  ): Promise<Classroom> {
    return await this.classroomsService.update(+id, classroom);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Classroom> {
    return await this.classroomsService.delete(+id);
  }
}
