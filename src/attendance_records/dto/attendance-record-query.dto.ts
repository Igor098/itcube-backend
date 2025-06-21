import { Transform } from 'class-transformer';
import { IsInt, IsNotEmpty } from 'class-validator';

export class AttendanceRecordQueryDto {
  @Transform(({ value }) => parseInt(value))
  @IsInt({ message: 'Id группы должно быть числом' })
  @IsNotEmpty({ message: 'Группа не может быть пустой' })
  groupId: number;
}
