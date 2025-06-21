import { IsEnum, IsInt, IsOptional, IsPositive } from 'class-validator';
import { GroupStudentStatus } from '../entities/group_student.entity';
import { Type } from 'class-transformer';

export class GroupStudentsFilterDto {
  @IsInt({ message: 'Id группы должно быть числом' })
  @IsPositive({ message: 'Id группы должно быть положительным числом' })
  @Type(() => Number)
  @IsOptional()
  groupId?: number;

  @IsInt({ message: 'Id учебного года должно быть числом' })
  @IsPositive({ message: 'Id учебного года должно быть положительным числом' })
  @Type(() => Number)
  @IsOptional()
  schoolYearId?: number;

  @IsEnum(GroupStudentStatus, {
    message: 'Некорректный статус',
  })
  @IsOptional()
  status?: GroupStudentStatus;
}
