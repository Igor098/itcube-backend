import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { ScheduleStatus } from '../entities/schedule_session.entity';

export class ScheduleFilterDto {
  @IsOptional()
  @IsEnum(ScheduleStatus, {
    message: 'Статус должен быть одним из: planned, done, canceled',
  })
  status?: ScheduleStatus;

  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: 'groupId должен быть числом' })
  groupId?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: 'schoolYearId должен быть числом' })
  schoolYearId?: number;
}
