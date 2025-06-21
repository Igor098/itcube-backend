import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProgramsService } from './programs.service';
import { ProgramDto } from './dto/program.dto';
import { ProgramResponseDto } from './dto/program-response.dto';

@Controller('programs')
@UsePipes(new ValidationPipe({ transform: true }))
export class ProgramController {
  constructor(private readonly programService: ProgramsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: ProgramDto): Promise<ProgramResponseDto> {
    return this.programService.create(dto);
  }

  @Get()
  async findAll(): Promise<ProgramResponseDto[]> {
    return this.programService.findAll();
  }

  @Get(':id')
  async findById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ProgramResponseDto> {
    return this.programService.findById(id);
  }

  @Get('search/by-name')
  async findByName(@Query('name') name: string): Promise<ProgramResponseDto> {
    return this.programService.findByName(name);
  }

  @Get('filter/by-duration')
  async filterByDuration(
    @Query('minHours', new ParseIntPipe({ optional: true })) minHours?: number,
    @Query('maxHours', new ParseIntPipe({ optional: true })) maxHours?: number,
  ): Promise<ProgramResponseDto[]> {
    return this.programService.filterByDuration(minHours, maxHours);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ProgramDto,
  ): Promise<ProgramResponseDto> {
    return this.programService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.programService.delete(id);
  }
}