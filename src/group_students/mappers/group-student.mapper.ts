import { format } from 'date-fns';
import type { GroupStudentResponseDto } from '../dto/group-student-response.dto';
import type { GroupStudent } from '../entities/group_student.entity';

export function mapGroupStudentToDto(
  groupStudent: GroupStudent,
): GroupStudentResponseDto {
  return {
    id: groupStudent.id,
    group: {
      id: groupStudent.group.id,
      name: groupStudent.group.name,
    },
    student: {
      id: groupStudent.student.id,
      fullName: groupStudent.student.fullName,
    },
    enrollmentDate: format(groupStudent.enrolmentDate, 'dd.MM.yyyy'),
    graduationDate: groupStudent.graduationDate
      ? format(groupStudent.graduationDate, 'dd.MM.yyyy')
      : undefined,
    status: groupStudent.status,
    isExpelled: groupStudent.isExpelled,
    isCerificateIssued: groupStudent.isCerificateIssued,
    certificateNumber: groupStudent.certificateNumber ?? undefined,
  };
}

export function mapGroupStudentsListToDto(
  groupStudents: GroupStudent[],
): GroupStudentResponseDto[] {
  return groupStudents.map(mapGroupStudentToDto);
}
