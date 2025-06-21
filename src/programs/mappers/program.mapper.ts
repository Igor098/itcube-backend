import type { Program } from '../entities/program.entity';
import type { ProgramResponseDto } from '../dto/program-response.dto';

export function mapProgramToDto(program: Program): ProgramResponseDto {
  return {
    id: program.id,
    name: program.name,
    description: program.description,
    duration_hours: program.duration_hours,
    min_age: program.min_age,
    max_age: program.max_age,
    is_active: program.is_active,
    groups_count: program.groups?.length || 0,
  };
}

export function mapProgramsToListDto(programs: Program[]): ProgramResponseDto[] {
  return programs.map(mapProgramToDto);
}
