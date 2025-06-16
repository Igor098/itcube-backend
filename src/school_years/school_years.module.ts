import { Module } from '@nestjs/common';
import { SchoolYearsService } from './school_years.service';
import { SchoolYearsController } from './school_years.controller';

@Module({
  controllers: [SchoolYearsController],
  providers: [SchoolYearsService],
})
export class SchoolYearsModule {}
