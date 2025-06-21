import { IsOptional, IsBoolean, IsInt, Min } from 'class-validator';

export class FilterProgramDto {
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsInt()
  @Min(40)
  durationHours: number;
}
