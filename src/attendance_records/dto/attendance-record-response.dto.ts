export class AttendanceRecordResponseDto {
  id: number;
  status: string;
  comment?: string;
  student: {
    id: number;
    fullName: string;
  };
  session: {
    id: number;
    topic: string;
  };
}
