import type { Program } from '../entities/program.entity';
import type { ProgramResponseDto } from '../dto/program-response.dto';

export function mapProgramToDto(program: Program): ProgramResponseDto {
  return {
    id: program.id,
    name: program.name,
    description: program.description,
    durationHours: program.durationHours,
    minAge: program.minAge,
    maxAge: program.maxAge,
    isActive: program.isActive,
    groupsCount: program.groupsCount,
  };
}

export function mapProgramsToListDto(
  programs: Program[],
): ProgramResponseDto[] {
  return programs.map(mapProgramToDto);
}
