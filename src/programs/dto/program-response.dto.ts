export class ProgramResponseDto {
  id: number;
  name: string;
  description: string | null;
  durationHours: number;
  minAge: number;
  maxAge: number;
  isActive: boolean;
  groupsCount: number;
}
