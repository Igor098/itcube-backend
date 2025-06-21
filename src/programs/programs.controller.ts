import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ProgramService } from './programs.service';
import { ProgramDto } from './dto/program.dto';
import { Program } from './entities/program.entity';

@Controller('programs')
export class ProgramController {
  constructor(private readonly programService: ProgramService) {}

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: ProgramDto): Promise<Program> {
    return this.programService.create(dto);
  }

  @Get('all')
  async findAll(): Promise<Program[]> {
    return this.programService.findAll();
  }

  @Get('by-id/:id')
  async findById(@Param('id', ParseIntPipe) id: number): Promise<Program> {
    return this.programService.findById(id);
  }

  @Get('by-name/:name')
  async findByName(@Param('name') name: string): Promise<Program> {
    return this.programService.findByName(name);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.programService.delete(id);
  }
}