import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { Authorized } from '@/auth/decorators/authorized.decorator';
import { Authorization } from '@/auth/decorators/auth.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Authorization('teacher')
  @Get('/profile')
  @HttpCode(HttpStatus.OK)
  public async findProfile(@Authorized('id') userId: number): Promise<User> {
    return await this.usersService.findById(userId);
  }

  @Authorization('admin')
  @Get('by-id/:id')
  @HttpCode(HttpStatus.OK)
  public async findById(@Authorized('id') userId: number): Promise<User> {
    return await this.usersService.findById(userId);
  }
}
