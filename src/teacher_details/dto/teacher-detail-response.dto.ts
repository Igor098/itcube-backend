export class TeacherDetailResponseDto {
  id: number;
  specialization: string;
  employee: {
    id: number;
    fullName: string;
  };
}
