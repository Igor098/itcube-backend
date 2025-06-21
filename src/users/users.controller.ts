import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { Authorized } from '@/auth/decorators/authorized.decorator';
import { Authorization } from '@/auth/decorators/auth.decorator';
import { RoleName } from '@/user_roles/entities/user_role.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Authorization(RoleName.ADMIN, RoleName.TEACHER)
  @Get('/profile')
  @HttpCode(HttpStatus.OK)
  public async findProfile(@Authorized('id') userId: number): Promise<User> {
    return await this.usersService.findById(userId);
  }

  @Authorization(RoleName.ADMIN)
  @Get('by-id/:id')
  @HttpCode(HttpStatus.OK)
  public async findById(@Authorized('id') userId: number): Promise<User> {
    return await this.usersService.findById(userId);
  }
}
