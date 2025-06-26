import { Transform } from 'class-transformer';
import { IsInt, IsOptional, IsPositive } from 'class-validator';

export class StudentFilterDto {
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsInt({ message: 'Возраст должен быть числом' })
  @IsPositive({ message: 'Возраст должен быть положительным числом' })
  age?: number;
}
