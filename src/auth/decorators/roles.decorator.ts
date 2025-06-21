import type { RoleName } from '@/user_roles/entities/user_role.entity';
import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';

export const Roles = (...roles: RoleName[]): MethodDecorator =>
  SetMetadata(ROLES_KEY, roles);
