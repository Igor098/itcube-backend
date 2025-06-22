import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { UserRolesService } from './user_roles.service';
import { RoleName, UserRole } from './entities/user_role.entity';
import { Authorization } from '@/auth/decorators/auth.decorator';

@Controller('user-roles')
export class UserRolesController {
  public constructor(private readonly userRolesService: UserRolesService) {}

  @Authorization(RoleName.ADMIN)
  @Get('all')
  @HttpCode(HttpStatus.OK)
  public async findAll(): Promise<UserRole[]> {
    return this.userRolesService.findAll();
  }
}
