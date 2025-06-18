import { Transform } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';
import { parse } from 'date-fns';

export class StudentDto {
  @IsString({ message: 'ФИО студента должно быть строкой' })
  @IsNotEmpty({ message: 'ФИО студента не может быть пустым' })
  fullName: string;

  @Transform(({ value }) => parse(value, 'dd.MM.yyyy', new Date()))
  @IsDate({ message: 'Дата рождения студента должна быть корректной датой' })
  @IsNotEmpty({ message: 'Дата рождения студента не может быть пустой' })
  birthDate: Date;
}
