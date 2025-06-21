export class ProgramResponseDto {
  id: number;
  name: string;
  description: string | null;
  duration_hours: number;
  min_age: number;
  max_age: number;
  is_active: boolean;
  groups_count: number;
}
