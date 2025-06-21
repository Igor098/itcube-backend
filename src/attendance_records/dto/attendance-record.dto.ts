import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  ValidateNested,
} from 'class-validator';
import { AttendanceStatus } from '../entities/attendance_record.entity';
import { Type } from 'class-transformer';

export class AttendanceRecordDto {
  @IsEnum(AttendanceStatus, {
    message:
      'Допустимые значения: "присутствовал", "отсутствовал", "опоздал", "не задано"',
  })
  @IsNotEmpty({ message: 'Статус не может быть пустым' })
  status: string;

  @IsString({ message: 'Комментарий должен быть строкой' })
  @IsOptional()
  comment?: string;

  @IsInt({ message: 'Id ученика должно быть числом' })
  @IsPositive({ message: 'Id ученика должно быть положительным числом' })
  @IsNotEmpty({ message: 'Id студента не может быть пустым' })
  studentId: number;

  @IsInt({ message: 'Id сессии должно быть числом' })
  @IsPositive({ message: 'Id сессии должно быть положительным числом' })
  @IsNotEmpty({ message: 'Id сессии не может быть пустым' })
  sessionId: number;
}

export class AttendanceRecordListDto {
  @ValidateNested({ each: true })
  @Type(() => AttendanceRecordDto)
  records: AttendanceRecordDto[];
}
