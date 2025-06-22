export class EmployeeResponseDto {
  id: number;
  fullName: string;
  birthDate: string;
  position?: {
    id?: number;
    name?: string;
  } | null;
  user: {
    id: number;
    email: string;
  };
  roles?: string[];
  hireDate: string;
  education?: string;
}
