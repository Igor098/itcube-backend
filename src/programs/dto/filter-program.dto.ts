import { Transform } from 'class-transformer';
import { IsOptional, IsBoolean, IsInt, Min } from 'class-validator';

export class FilterProgramDto {
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  @IsInt()
  @Min(40)
  durationHours: number;
}
