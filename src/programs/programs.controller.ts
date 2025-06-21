import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  HttpCode,
  HttpStatus,
  Put,
  ParseIntPipe,
  ValidationPipe,
} from '@nestjs/common';
import { ProgramsService } from './programs.service';
import { ProgramDto } from './dto/program.dto';
import { FilterProgramDto } from './dto/filter-program.dto';
import { ProgramResponseDto } from './dto/program-response.dto';
import {
  mapProgramToDto,
  mapProgramsToListDto,
} from './mappers/program.mapper';

@Controller('programs')
export class ProgramController {
  constructor(private readonly programService: ProgramsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body(new ValidationPipe()) dto: ProgramDto): Promise<ProgramResponseDto> {
    const program = await this.programService.create(dto);
    return mapProgramToDto(program);
  }

  @Get('all')
  async findAll(): Promise<ProgramResponseDto[]> {
    const programs = await this.programService.findAll();
    return mapProgramsToListDto(programs);
  }

  @Get(':id')
  async findById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ProgramResponseDto> {
    const program = await this.programService.findById(id);
    return mapProgramToDto(program);
  }

  @Get('search/by-name')
  async findByName(
    @Query('name') name: string,
  ): Promise<ProgramResponseDto> {
    const program = await this.programService.findByName(name);
    return mapProgramToDto(program);
  }

  @Get('filter')
  async filter(
    @Query(new ValidationPipe({ transform: true }))
    filters: FilterProgramDto,
  ): Promise<ProgramResponseDto[]> {
    const programs = await this.programService.filterPrograms(filters);
    return mapProgramsToListDto(programs);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe()) dto: ProgramDto,
  ): Promise<ProgramResponseDto> {
    const program = await this.programService.update(id, dto);
    return mapProgramToDto(program);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.programService.delete(id);
  }
}
