import { Module } from '@nestjs/common';
import { TeacherDetailsService } from './teacher_details.service';
import { TeacherDetailsController } from './teacher_details.controller';

@Module({
  controllers: [TeacherDetailsController],
  providers: [TeacherDetailsService],
})
export class TeacherDetailsModule {}
