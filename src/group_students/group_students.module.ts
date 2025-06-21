import { Module } from '@nestjs/common';
import { GroupStudentsService } from './group_students.service';
import { GroupStudentsController } from './group_students.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupStudent } from './entities/group_student.entity';
import { User } from '@/users/entities/user.entity';
import { UsersService } from '@/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([GroupStudent, User])],
  controllers: [GroupStudentsController],
  providers: [GroupStudentsService, UsersService],
})
export class GroupStudentsModule {}
