import { Controller } from '@nestjs/common';
import { TeacherDetailsService } from './teacher_details.service';

@Controller('teacher-details')
export class TeacherDetailsController {
  constructor(private readonly teacherDetailsService: TeacherDetailsService) {}
}
