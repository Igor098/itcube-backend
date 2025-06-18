import { format } from 'date-fns';
import { type StudentResponseDto } from '../dto/student-response.dto';
import { type Student } from '../entities/student.entity';

export function mapStudentToDto(student: Student): StudentResponseDto {
  return {
    id: student.id,
    fullName: student.fullName,
    birthDate: format(student.birthDate, 'dd.MM.yyyy'),
    age: student.age,
    hasAccount: Boolean(student.user),
  };
}

export function mapStudentsToListDto(
  studentEntities: Student[],
): StudentResponseDto[] {
  return studentEntities.map(mapStudentToDto);
}
