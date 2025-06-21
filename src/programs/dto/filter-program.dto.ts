import { IsOptional, IsString, IsInt, IsBoolean, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class FilterProgramDto {
  @IsOptional()
  @IsInt({ message: 'Минимальное количество часов должно быть числом' })
  @Min(0, {
    message: 'Минимальное количество часов не может быть отрицательным',
  })
  @Type(() => Number)
  minHours?: number;

  @IsOptional()
  @IsInt({ message: 'Максимальное количество часов должно быть числом' })
  @Min(0, {
    message: 'Максимальное количество часов не может быть отрицательным',
  })
  @Type(() => Number)
  maxHours?: number;

  @IsOptional()
  @IsString({ message: 'Название должно быть строкой' })
  name?: string;

  @IsOptional()
  @IsBoolean({ message: 'Флаг активности должен быть true или false' })
  @Type(() => Boolean)
  isActive?: boolean;
}
