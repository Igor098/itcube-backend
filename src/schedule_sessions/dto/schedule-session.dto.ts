import {
  IsDate,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { ScheduleStatus } from '../entities/schedule_session.entity';
import { Transform } from 'class-transformer';
import { parse } from 'date-fns';
import { IsTime } from '../decorators/validate-time.decorator';
import { IsEndTimeAfter } from '../decorators/validate-end-time.decorator';

export class ScheduleSessionDto {
  @IsString({ message: 'Тема занятия должна быть строкой' })
  @IsNotEmpty({ message: 'Тема занятия не может быть пустой' })
  topic: string;

  @Transform(({ value }) => parse(value, 'dd.MM.yyyy', new Date()))
  @IsDate({ message: 'Дата занятия должна быть корректной датой' })
  @IsNotEmpty({ message: 'Дата занятия не может быть пустой' })
  lessonDate: Date;

  @IsNotEmpty({ message: 'Время начала занятия не может быть пустым' })
  @IsTime()
  startTime: string;

  @IsNotEmpty({ message: 'Время окончания занятия не может быть пустым' })
  @IsTime()
  @IsEndTimeAfter('startTime')
  endTime: string;

  @IsInt({ message: 'Id группы должно быть числом' })
  @IsPositive({ message: 'Id группы должно быть положительным числом' })
  @IsNotEmpty({ message: 'Группа не может быть пустой' })
  groupId: number;

  @IsInt({ message: 'Id аудитории должно быть числом' })
  @IsPositive({ message: 'Id аудитории должно быть положительным числом' })
  @IsNotEmpty({ message: 'Аудитория не может быть пустой' })
  classroomId: number;

  @IsEnum(ScheduleStatus, { message: 'Некорректный статус занятия' })
  @IsNotEmpty({ message: 'Статус занятия не может быть пустой' })
  @IsOptional()
  status?: ScheduleStatus;
}
