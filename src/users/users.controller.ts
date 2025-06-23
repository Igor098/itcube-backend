import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { Authorized } from '@/auth/decorators/authorized.decorator';
import { Authorization } from '@/auth/decorators/auth.decorator';
import { RoleName } from '@/user_roles/entities/user_role.entity';
import { mapUserToDto } from './mappers/user.mapper';
import { UserResponseDto } from './dto/user-response.dto';

@Controller('users')
export class UsersController {
  public constructor(private readonly usersService: UsersService) {}

  @Authorization(RoleName.ADMIN, RoleName.TEACHER)
  @Get('/profile')
  @HttpCode(HttpStatus.OK)
  public async findProfile(@Authorized('id') userId: number): Promise<User> {
    return await this.usersService.findById(userId);
  }

  @Authorization(RoleName.ADMIN)
  @Get('by-id/:id')
  @HttpCode(HttpStatus.OK)
  public async findById(@Param('id') userId: number): Promise<UserResponseDto> {
    const user = await this.usersService.findById(userId);
    return mapUserToDto(user);
  }

  @Authorization()
  @Get('me')
  @HttpCode(HttpStatus.OK)
  public async findMe(
    @Authorized('id') userId: number,
  ): Promise<UserResponseDto> {
    const user = await this.usersService.findById(userId);
    return mapUserToDto(user);
  }
}
