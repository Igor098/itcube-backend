import { format } from 'date-fns';
import type { SchoolYear } from '@/school_years/entities/school_year.entity';
import type { SchoolYearResponseDto } from '@/school_years/dto/school-year-response.dto';

export function mapSchoolYearToDto(
  schoolYear: SchoolYear,
): SchoolYearResponseDto {
  return {
    id: schoolYear.id,
    period: schoolYear.period,
    startDate: format(schoolYear.startDate, 'dd.MM.yyyy'),
    endDate: format(schoolYear.endDate, 'dd.MM.yyyy'),
  };
}

export function mapSchoolYearsToListDto(
  schoolYearEntities: SchoolYear[],
): SchoolYearResponseDto[] {
  return schoolYearEntities.map(mapSchoolYearToDto);
}
