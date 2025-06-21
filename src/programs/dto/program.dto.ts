import { IsString, IsInt, IsBoolean, Length } from 'class-validator';
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

  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean({ message: 'Статус активности должен быть true/false' })
  is_active: boolean;
}