import type { GroupStudentStatus } from '../entities/group_student.entity';

export class GroupStudentResponseDto {
  id: number;
  group: {
    id: number;
    name: string;
  };
  student: {
    id: number;
    fullName: string;
  };
  enrollmentDate: string;
  graduationDate?: string;
  status: GroupStudentStatus;
  isExpelled: boolean;
  isCerificateIssued: boolean;
  certificateNumber?: string;
}
