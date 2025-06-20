import { Module } from '@nestjs/common';
import { ScheduleSessionsService } from './schedule_sessions.service';
import { ScheduleSessionsController } from './schedule_sessions.controller';
import { ScheduleSession } from './entities/schedule_session.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@/users/entities/user.entity';
import { UsersService } from '@/users/users.service';
import { Employee } from '@/employees/entities/employee.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ScheduleSession, User, Employee])],
  controllers: [ScheduleSessionsController],
  providers: [ScheduleSessionsService, UsersService],
})
export class ScheduleSessionsModule {}
