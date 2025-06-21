import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { parse } from 'date-fns';
import { GroupStudentStatus } from '../entities/group_student.entity';

export class GroupStudentDto {
  @IsInt({ message: 'Id ученика должно быть числом' })
  @IsPositive({ message: 'Id ученика должно быть положительным числом' })
  @IsNotEmpty({ message: 'Ученик не может быть пустым' })
  studentId: number;

  @IsInt({ message: 'Id группы должно быть числом' })
  @IsPositive({ message: 'Id группы должно быть положительным числом' })
  @IsNotEmpty({ message: 'Группа не может быть пустой' })
  groupId: number;

  @Transform(({ value }) => parse(value, 'dd.MM.yyyy', new Date()))
  @IsDate({ message: 'Дата зачисления ученика должна быть корректной датой' })
  @IsNotEmpty({ message: 'Дата зачисления ученика не может быть пустой' })
  enrolmentDate: string;

  @Transform(({ value }) => parse(value, 'dd.MM.yyyy', new Date()))
  @IsDate({ message: 'Дата выпуска ученика должна быть корректной датой' })
  @IsOptional()
  graduationDate?: string;

  @IsEnum(GroupStudentStatus, {
    message: 'Некорректный статус',
  })
  @IsNotEmpty({ message: 'Статус не может быть пустой' })
  status: GroupStudentStatus;

  @IsBoolean({ message: 'Поле с отчислением должно быть логическим значением' })
  @IsNotEmpty({ message: 'Поле с отчислением не может быть пустым' })
  isExpelled: boolean;

  @IsBoolean({
    message: 'Поле с выдачей сертификата должно быть логическим значением',
  })
  @IsNotEmpty({ message: 'Поле с выдачей сертификата не может быть пустым' })
  isCerificateIssued: boolean;

  @IsString({ message: 'Номер сертификата должен быть строкой' })
  @IsOptional()
  certificateNumber?: string;
}
