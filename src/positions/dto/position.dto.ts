import type { RoleName } from '@/user_roles/entities/user_role.entity';

export class PositionDto {
  name: string;
  description: string;
  role: RoleName;
}
