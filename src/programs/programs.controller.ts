import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  Put,
  Delete,
  ParseIntPipe, HttpCode, HttpStatus,
} from '@nestjs/common';
import { ProgramsService } from './programs.service';
import { ProgramDto } from './dto/program.dto';
import { FilterProgramDto } from './dto/filter-program.dto';
import {
  mapProgramToDto,
  mapProgramsToListDto,
} from './mappers/program.mapper';
import { Authorization } from '@/auth/decorators/auth.decorator';
import { RoleName } from '@/user_roles/entities/user_role.entity';
import { ProgramResponseDto } from '@/programs/dto/program-response.dto';
import { DeleteResponseDto } from '@/libs/common/dto/delete-response.dto';

@Controller('programs')
export class ProgramsController {
  constructor(private readonly programsService: ProgramsService) {}

  @Authorization(RoleName.ADMIN)
  @HttpCode(HttpStatus.OK)
  @Get('all')
  async findAll(): Promise<ProgramResponseDto[]> {
    const programs = await this.programsService.findAll();
    return mapProgramsToListDto(programs);
  }

  @Authorization(RoleName.ADMIN)
  @HttpCode(HttpStatus.OK)
  @Get('filter')
  async filter(
    @Query('q') q: string,
    @Query() filters: FilterProgramDto,
  ): Promise<ProgramResponseDto[]> {
    const programs = await this.programsService.filterPrograms(q, filters);
    return mapProgramsToListDto(programs);
  }

  @Authorization(RoleName.ADMIN)
  @HttpCode(HttpStatus.OK)
  @Get('by-id/:id')
  async findById(@Param('id') id: string): Promise<ProgramResponseDto> {
    const program = await this.programsService.findById(+id);
    return mapProgramToDto(program);
  }

  @Authorization(RoleName.ADMIN)
  @HttpCode(HttpStatus.CREATED)
  @Post('create')
  async create(@Body() dto: ProgramDto): Promise<ProgramResponseDto> {
    const program = await this.programsService.create(dto);
    return mapProgramToDto(program);
  }

  @Authorization(RoleName.ADMIN)
  @Put('update/:id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Body() dto: ProgramDto,
  ): Promise<ProgramResponseDto> {
    const program = await this.programsService.update(+id, dto);
    return mapProgramToDto(program);
  }

  @Authorization(RoleName.ADMIN)
  @Delete('delete/:id')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id') id: string): Promise<DeleteResponseDto> {
    return await this.programsService.delete(+id);
  }
}
