import { IsString, IsInt, IsBoolean, Length, Min, Max } from 'class-validator';
import { Transform } from 'class-transformer';

export class ProgramDto {
  @IsString({ message: 'Название программы должно быть строкой' })
  @Length(2, 100, { message: 'Название должно быть от 2 до 100 символов' })
  name: string;

  @IsString({ message: 'Описание должно быть строкой' })
  description: string;

  @Transform(({ value }) => parseInt(value, 10))
  @IsInt({ message: 'Длительность должна быть целым числом (часы)' })
  duration_hours: number;

  @Transform(({ value }) => parseInt(value, 10))
  @IsInt({ message: 'Минимальный возраст должен быть целым числом' })
  @Min(0, { message: 'Минимальный возраст не может быть отрицательным' })
  @Max(18, { message: 'Максимальное значение минимального возраста - 18' })
  minAge: number;

  @Transform(({ value }) => parseInt(value, 10))
  @IsInt({ message: 'Максимальный возраст должен быть целым числом' })
  @Min(0, { message: 'Максимальный возраст не может быть отрицательным' })
  @Max(18, { message: 'Максимальное значение возраста - 18' })
  maxAge: number;

  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean({ message: 'Статус активности должен быть true/false' })
  is_active: boolean;
}
