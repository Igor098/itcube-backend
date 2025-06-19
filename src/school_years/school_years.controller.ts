import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  ParseIntPipe,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { SchoolYearService } from './school_years.service';
import { SchoolYearDto } from './dto/school-year.dto';
import { Authorization } from '@/auth/decorators/auth.decorator';

import {
  mapSchoolYearsToListDto,
  mapSchoolYearToDto,
} from '@/school_years/mappers/school-year.mapper';
import { SchoolYearResponseDto } from '@/school_years/dto/school-year-response.dto';
import { DeleteResponseDto } from '@/libs/common/dto/delete-response.dto';

@Controller('school-years')
export class SchoolYearController {
  constructor(private readonly schoolYearService: SchoolYearService) {}

  @Authorization('admin')
  @HttpCode(HttpStatus.OK)
  @Get('all')
  public async findAll(): Promise<SchoolYearResponseDto[]> {
    const years = await this.schoolYearService.findAll();
    return mapSchoolYearsToListDto(years);
  }

  @Authorization('admin')
  @HttpCode(HttpStatus.OK)
  @Get('by-period')
  public async findByPeriod(
    @Query('period') period: string,
  ): Promise<SchoolYearResponseDto> {
    const year = await this.schoolYearService.findByPeriod(period);
    return mapSchoolYearToDto(year);
  }

  @Authorization('admin')
  @HttpCode(HttpStatus.OK)
  @Get('by-id/:id')
  public async findById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<SchoolYearResponseDto> {
    const year = await this.schoolYearService.findById(id);
    return mapSchoolYearToDto(year);
  }
  @Authorization('admin')
  @HttpCode(HttpStatus.CREATED)
  @Post('create')
  public async create(
    @Body() dto: SchoolYearDto,
  ): Promise<SchoolYearResponseDto> {
    const year = await this.schoolYearService.create(dto);
    return mapSchoolYearToDto(year);
  }

  @Authorization('admin')
  @HttpCode(HttpStatus.OK)
  @Put('update/:id')
  public async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: SchoolYearDto,
  ): Promise<SchoolYearResponseDto> {
    const year = await this.schoolYearService.update(id, dto);
    return mapSchoolYearToDto(year);
  }

  @Authorization('admin')
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  public async delete(
    @Param('id', ParseIntPipe) id: string,
  ): Promise<DeleteResponseDto> {
    return await this.schoolYearService.delete(+id);
  }
}
