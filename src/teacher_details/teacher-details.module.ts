import { Module } from '@nestjs/common';
import { TeacherDetailsService } from './teacher-details.service';
import { TeacherDetailsController } from './teacher-details.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeacherDetail } from './entities/teacher-detail.entity';
import { User } from '@/users/entities/user.entity';
import { UsersService } from '@/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([TeacherDetail, User])],
  controllers: [TeacherDetailsController],
  providers: [TeacherDetailsService, UsersService],
})
export class TeacherDetailsModule {}
