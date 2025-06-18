export class GroupResponseDto {
  id: number;
  name: string;
  isActive: boolean;
  schoolYearPeriod: {
    id: number;
    period: string;
  };
  program: {
    id: number;
    name: string;
  };
  teacher: {
    id: number;
    fullName: string;
  };
  studentsCount: number;
}

export class GroupListItemDto extends GroupResponseDto {}
[];
