import { IsBooleanString, IsOptional } from 'class-validator';

export class GroupFilterDto {
  @IsBooleanString({ message: 'isActive должно быть логическим значением' })
  @IsOptional()
  isActive?: boolean;
}
