export class ProgramResponseDto {
  id: number;
  name: string;
  description: string | null;
  duration_hours: number;
  is_active: boolean;
  groups_count: number;
}
