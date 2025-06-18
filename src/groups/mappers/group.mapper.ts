import {
  type GroupListItemDto,
  type GroupResponseDto,
} from '../dto/group-response.dto';
import { type Group } from '../entities/group.entity';

export function mapGroupToDto(group: Group): GroupResponseDto {
  return {
    id: group.id,
    name: group.name,
    isActive: group.isActive,
    schoolYearPeriod: {
      id: group.schoolYear.id,
      period: group.schoolYear.period,
    },
    program: {
      id: group.program.id,
      name: group.program.name,
    },
    teacher: {
      id: group.teacher.id,
      fullName: group.teacher.employee.fullName,
    },
    studentsCount: group.groupStudents.length,
  };
}

export function mapGroupsToListDto(groupEntities: Group[]): GroupListItemDto[] {
  return groupEntities.map(mapGroupToDto);
}
