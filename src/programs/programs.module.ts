import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Program } from './entities/program.entity';
import { ProgramsService } from './programs.service';
import { ProgramController } from './programs.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Program])],
  providers: [ProgramsService],
  controllers: [ProgramController],
  exports: [ProgramsService],
})
export class ProgramModule {}
