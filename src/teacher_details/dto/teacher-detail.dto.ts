import { IsInt, IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class TeacherDetailDto {
  @IsString({ message: 'Специализация должна быть строкой' })
  specialization: string;

  @IsInt({ message: 'Id сотрудника должно быть целым числом' })
  @IsPositive({ message: 'Id сотрудника должно быть положительным числом' })
  @IsNotEmpty({ message: 'Поле сотрудника не может быть пустым' })
  employeeId: number;
}
