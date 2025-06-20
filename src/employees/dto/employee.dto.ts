import { Transform } from 'class-transformer';
import {
  IsDate,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { parse } from 'date-fns';

export class EmployeeDto {
  @IsString({ message: 'ФИО сотрудника должно быть строкой' })
  @IsNotEmpty({ message: 'ФИО сотрудника не может быть пустым' })
  fullName: string;

  @Transform(({ value }) => parse(value, 'dd.MM.yyyy', new Date()))
  @IsDate({ message: 'Дата рождения сотрудника должна быть корректной датой' })
  @IsNotEmpty({ message: 'Дата рождения сотрудника не может быть пустой' })
  birthDate: Date;

  @IsInt({ message: 'Id должности должно быть целым числом' })
  @IsPositive({ message: 'Id должности должно быть положительным числом' })
  @IsNotEmpty({ message: 'Должность не может быть пустой' })
  positionId: number;

  @IsInt({ message: 'Id аккаунта должно быть целым числом' })
  @IsPositive({ message: 'Id аккаунта должно быть положительным числом' })
  @IsNotEmpty({ message: 'Аккаунт не может быть пустой' })
  userId: number;

  @Transform(({ value }) => parse(value, 'dd.MM.yyyy', new Date()))
  @IsDate({ message: 'Дата приема сотрудника должна быть корректной датой' })
  @IsNotEmpty({ message: 'Дата приема сотрудника не может быть пустой' })
  hireDate: Date;

  @IsString({ message: 'Образование сотрудника должно быть строкой' })
  @IsOptional()
  education?: string;
}
