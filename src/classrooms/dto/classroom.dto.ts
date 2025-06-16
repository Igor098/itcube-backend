import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class ClassroomDto {
  @IsString({ message: 'Название аудитории должно быть строкой.' })
  @IsNotEmpty({ message: 'Название аудитории не может быть пустым.' })
  name: string;

  @IsInt({ message: 'Вместимость аудитории должна быть целым числом.' })
  @IsNotEmpty({ message: 'Вместимость аудитории не может быть пустой.' })
  capacity: number;
}
