import { applyDecorators, UseGuards } from '@nestjs/common';
import { Roles } from './roles.decorator';
import { AuthGuard } from '@/auth/guards/auth.guard';
import { RoleGuard } from '@/auth/guards/roles.guard';
import type { RoleName } from '@/user_roles/entities/user_role.entity';

export function Authorization(...roles: RoleName[]): MethodDecorator {
  if (roles.length > 0) {
    return applyDecorators(Roles(...roles), UseGuards(AuthGuard, RoleGuard));
  }

  return applyDecorators(UseGuards(AuthGuard));
}
