import { Module } from '@nestjs/common';
import { TeacherDetailsService } from './teacher_details.service';
import { TeacherDetailsController } from './teacher_details.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeacherDetail } from './entities/teacher_detail.entity';
import { User } from '@/users/entities/user.entity';
import { UsersService } from '@/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([TeacherDetail, User])],
  controllers: [TeacherDetailsController],
  providers: [TeacherDetailsService, UsersService],
})
export class TeacherDetailsModule {}
