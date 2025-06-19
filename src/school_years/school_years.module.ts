import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchoolYear } from './entities/school_year.entity';
import { SchoolYearService } from './school_years.service';
import { SchoolYearController } from './school_years.controller';
import { User } from '@/users/entities/user.entity';
import { UsersService } from '@/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([SchoolYear, User])],
  providers: [SchoolYearService, UsersService],
  controllers: [SchoolYearController],
})
export class SchoolYearsModule {}
