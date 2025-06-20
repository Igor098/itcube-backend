import { format } from 'date-fns';
import type { EmployeeResponseDto } from '../dto/employee-response.dto';
import type { Employee } from '../entities/employee.entity';

export function mapEmployeeToDto(employee: Employee): EmployeeResponseDto {
  return {
    id: employee.id,
    fullName: employee.fullName,
    birthDate: format(employee.birthDate, 'dd.MM.yyyy'),
    position: {
      id: employee.position.id,
      name: employee.position.name,
    },
    user: {
      id: employee.user.id,
      email: employee.user.email,
    },
    hireDate: format(employee.hireDate, 'dd.MM.yyyy'),
    education: employee.education ?? 'Не указано',
  };
}

export function mapEmployeesToListDto(
  employees: Employee[],
): EmployeeResponseDto[] {
  return employees.map(mapEmployeeToDto);
}
