import { IsEnum, IsInt, IsNotEmpty, IsPositive } from 'class-validator';
import { RoleName } from '../entities/user_role.entity';

export class UserRoleDto {
  @IsInt({ message: 'Id пользователя должно быть числом' })
  @IsPositive({ message: 'Id пользователя должно быть положительным числом' })
  @IsNotEmpty({ message: 'Пользователь не может быть пустым' })
  userId: number;

  @IsEnum(RoleName, { message: 'Некорректная роль пользователя' })
  @IsNotEmpty({ message: 'Роль пользователя не может быть пустой' })
  role: RoleName;
}
