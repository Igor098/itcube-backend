import { Controller } from '@nestjs/common';
import { SchoolYearsService } from './school_years.service';

@Controller('school-years')
export class SchoolYearsController {
  constructor(private readonly schoolYearsService: SchoolYearsService) {}
}
