import type { RoleName } from '@/user_roles/entities/user_role.entity';

export class EmployeeRolePositionDto {
  id: number;
  positionId: number;
  role: RoleName;
}
