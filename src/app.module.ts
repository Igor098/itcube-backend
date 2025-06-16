import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { ProgramsModule } from './programs/programs.module';
import { GroupsModule } from './groups/groups.module';
import { SchoolYearsModule } from './school_years/school_years.module';
import { EmployeesModule } from './employees/employees.module';
import { UserRolesModule } from './user_roles/user_roles.module';
import { GroupStudentsModule } from './group_students/group_students.module';
import { ScheduleSessionsModule } from './schedule_sessions/schedule_sessions.module';
import { AttendanceRecordsModule } from './attendance_records/attendance_records.module';
import { RolesModule } from './roles/roles.module';
import { TeacherDetailsModule } from './teacher_details/teacher_details.module';
import { StudentsModule } from './students/students.module';
import { ClassroomsModule } from './classrooms/classrooms.module';
import { PositionModule } from './positions/positions.module';
import AppDataSource from './database/data-source/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UsersModule,
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        const transactionalDataSource =
          addTransactionalDataSource(AppDataSource);
        await transactionalDataSource.initialize();
        return transactionalDataSource.options;
      },
    }),
    ProgramsModule,
    GroupsModule,
    SchoolYearsModule,
    EmployeesModule,
    UserRolesModule,
    GroupStudentsModule,
    ScheduleSessionsModule,
    AttendanceRecordsModule,
    RolesModule,
    TeacherDetailsModule,
    StudentsModule,
    ClassroomsModule,
    PositionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
