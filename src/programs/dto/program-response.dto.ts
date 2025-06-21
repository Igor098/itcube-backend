export class ProgramResponseDto {
  id: number;
  name: string;
  description: string | null;
  duration_hours: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}
