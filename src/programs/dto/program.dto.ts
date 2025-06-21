import { IsString, IsInt, IsBoolean, Length, Min, Max } from 'class-validator';

export class ProgramDto {
  @IsString({ message: 'Название программы должно быть строкой' })
  @Length(2, 100, { message: 'Название должно быть от 2 до 100 символов' })
  name: string;

  @IsString({ message: 'Описание должно быть строкой' })
  description: string;

  @IsInt({ message: 'Длительность должна быть целым числом (в часах)' })
  @Min(0, { message: 'Длительность не может быть отрицательной' })
  durationHours: number;

  @IsInt({ message: 'Минимальный возраст должен быть целым числом' })
  @Min(0, { message: 'Минимальный возраст не может быть отрицательным' })
  @Max(18, { message: 'Максимальный допустимый минимальный возраст - 18' })
  minAge: number;

  @IsInt({ message: 'Максимальный возраст должен быть целым числом' })
  @Min(0, { message: 'Максимальный возраст не может быть отрицательным' })
  @Max(18, { message: 'Максимальный возраст не должен превышать 18' })
  maxAge: number;

  @IsBoolean({ message: 'Статус активности должен быть true или false' })
  isActive: boolean;
}
