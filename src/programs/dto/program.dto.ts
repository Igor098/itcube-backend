import { IsString, IsInt, IsBoolean, Min, Max, Length } from 'class-validator';

export class ProgramDto {
  @IsString({ message: 'Название программы должно быть строкой' })
  @Length(2, 100, { message: 'Название должно быть от 2 до 100 символов' })
  name: string;

  @IsString({ message: 'Описание должно быть строкой' })
  description: string;

  @IsInt({ message: 'Длительность должна быть числом' })
  @Min(0, { message: 'Длительность не может быть меньше 0' })
  durationHours: number;

  @IsInt({ message: 'Минимальный возраст должен быть числом' })
  @Min(0, { message: 'Минимальный возраст не может быть меньше 0' })
  @Max(18, { message: 'Минимальный возраст не может быть больше 18' })
  minAge: number;

  @IsInt({ message: 'Максимальный возраст должен быть числом' })
  @Min(0, { message: 'Максимальный возраст не может быть меньше 0' })
  @Max(18, { message: 'Максимальный возраст не может быть больше 18' })
  maxAge: number;

  @IsBoolean({ message: 'Активность должна быть true/false' })
  isActive: boolean;
}
