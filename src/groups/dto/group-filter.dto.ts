import { parseBoolean } from '@/libs/common/utils/parse-boolean.util';
import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional } from 'class-validator';

export class GroupFilterDto {
  @Transform(({ value }) => parseBoolean(value))
  @IsBoolean({ message: 'isActive должно быть логическим значением' })
  @IsOptional()
  isActive?: boolean;
}
