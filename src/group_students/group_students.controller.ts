import { Controller } from '@nestjs/common';
import { GroupStudentsService } from './group_students.service';

@Controller('group-students')
export class GroupStudentsController {
  constructor(private readonly groupStudentsService: GroupStudentsService) {}
}
