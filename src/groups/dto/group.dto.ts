import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class GroupDto {
  @IsString({ message: 'Название группы должно быть строкой' })
  @IsNotEmpty({ message: 'Название группы не может быть пустым' })
  name: string;

  @IsBoolean({ message: 'Статус группы должен быть логическим значением' })
  @IsOptional()
  isActive?: boolean;

  @IsInt({ message: 'Программа обучения должна быть целым числом' })
  @IsPositive({
    message: 'Программа обучения должна быть положительным числом',
  })
  @IsNotEmpty({ message: 'Программа обучения не может быть пустой' })
  programId: number;

  @IsInt({ message: 'Год обучения должен быть целым числом' })
  @IsPositive({ message: 'Год обучения должен быть положительным числом' })
  @IsNotEmpty({ message: 'Год обучения не может быть пустым' })
  schoolYearId: number;

  @IsInt({ message: 'Преподаватель должен быть целым числом' })
  @IsPositive({ message: 'Преподаватель должен быть положительным числом' })
  @IsNotEmpty({ message: 'Преподаватель не может быть пустым' })
  teacherId: number;
}
