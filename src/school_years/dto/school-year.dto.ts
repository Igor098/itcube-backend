import { IsString, Length, IsDate, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';
import { parse } from 'date-fns';

export class SchoolYearDto {
  @IsString({ message: 'Период должен быть строкой' })
  @Length(4, 10, { message: 'Период должен быть от 4 до 10 символов' })
  period: string;

  @Transform(({ value }) => parse(value, 'dd.MM.yyyy', new Date()))
  @IsDate({ message: 'Дата начала учебного года должна быть корректной датой' })
  @IsNotEmpty({ message: 'Дата начала учебного года не может быть пустой' })
  startDate: Date;

  @Transform(({ value }) => parse(value, 'dd.MM.yyyy', new Date()))
  @IsDate({
    message: 'Дата окончания учебного года должна быть корректной датой',
  })
  @IsNotEmpty({ message: 'Дата окончания учебного года не может быть пустой' })
  endDate: Date;
}
