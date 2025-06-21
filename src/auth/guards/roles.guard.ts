import {
  ForbiddenException,
  Injectable,
  CanActivate,
  type ExecutionContext,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import type { Observable } from 'rxjs';
import { RoleName } from '@/user_roles/entities/user_role.entity';

@Injectable()
export class RoleGuard implements CanActivate {
  public constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.getAllAndOverride<RoleName[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    const request = context.switchToHttp().getRequest();

    if (!Boolean(roles) || roles.length === 0) {
      return true;
    }

    const user = request.user;
    if (!Boolean(user) || !Boolean(user.userRoles)) {
      throw new ForbiddenException(
        'Пользователь не авторизован или роли не загружены',
      );
    }

    const userRoleNames = user.userRoles.map((userRole) => userRole.role);

    const hasRole = roles.some((role: RoleName): boolean =>
      userRoleNames.includes(role),
    );

    if (!hasRole) {
      throw new ForbiddenException(
        'У вас недостаточно прав для доступа к данному ресурсу.',
      );
    }
    return true;
  }
}
