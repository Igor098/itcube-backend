import type { TeacherDetail } from '@/teacher_details/entities/teacher-detail.entity';
import type { TeacherDetailResponseDto } from '@/teacher_details/dto/teacher-detail-response.dto';

export function mapTeacherDetailToDto(
  teacherDetail: TeacherDetail,
): TeacherDetailResponseDto {
  return {
    id: teacherDetail.id,
    specialization: teacherDetail.specialization,
    employee: {
      id: teacherDetail.employeeId,
      fullName: teacherDetail.employee.fullName,
    },
  };
}

export function mapTeacherDetailsToListDto(
  teacherDetail: TeacherDetail[],
): TeacherDetailResponseDto[] {
  return teacherDetail.map(mapTeacherDetailToDto);
}
