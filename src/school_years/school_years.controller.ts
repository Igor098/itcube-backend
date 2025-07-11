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
import { RoleName } from '@/user_roles/entities/user_role.entity';

@Controller('school-years')
export class SchoolYearController {
  constructor(private readonly schoolYearService: SchoolYearService) {}

  @Authorization(RoleName.ADMIN)
  @HttpCode(HttpStatus.OK)
  @Get('all')
  public async findAll(): Promise<SchoolYearResponseDto[]> {
    const years = await this.schoolYearService.findAll();
    return mapSchoolYearsToListDto(years);
  }

  @Authorization(RoleName.ADMIN)
  @Get('by-period')
  @HttpCode(HttpStatus.OK)
  public async findByPeriod(
    @Query('period') period: string,
  ): Promise<SchoolYearResponseDto> {
    const year = await this.schoolYearService.findByPeriod(period);
    return mapSchoolYearToDto(year);
  }

  @Authorization(RoleName.ADMIN)
  @Get('by-id/:id')
  @HttpCode(HttpStatus.OK)
  public async findById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<SchoolYearResponseDto> {
    const year = await this.schoolYearService.findById(id);
    return mapSchoolYearToDto(year);
  }
  @Authorization(RoleName.ADMIN)
  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  public async create(
    @Body() dto: SchoolYearDto,
  ): Promise<SchoolYearResponseDto> {
    const year = await this.schoolYearService.create(dto);
    return mapSchoolYearToDto(year);
  }

  @Authorization(RoleName.ADMIN)
  @Put('update/:id')
  @HttpCode(HttpStatus.OK)
  public async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: SchoolYearDto,
  ): Promise<SchoolYearResponseDto> {
    const year = await this.schoolYearService.update(id, dto);
    return mapSchoolYearToDto(year);
  }

  @Authorization(RoleName.ADMIN)
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  public async delete(
    @Param('id', ParseIntPipe) id: string,
  ): Promise<DeleteResponseDto> {
    return await this.schoolYearService.delete(+id);
  }
}
