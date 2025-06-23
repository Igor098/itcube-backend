import { type UserResponseDto } from '../dto/user-response.dto';
import { type User } from '../entities/user.entity';

export function mapUserToDto(user: User): UserResponseDto {
  return {
    id: user.id,
    email: user.email,
    username: user.username,
    method: user.method,
    isVerified: user.isVerified,
    isTwoFactorEnabled: user.isTwoFactorEnabled,
    roles: user.userRoles?.map((userRole) => userRole.role) ?? [],
  };
}

export function mapUsersListToDto(users: User[]): UserResponseDto[] {
  return users.map((user) => mapUserToDto(user));
}
