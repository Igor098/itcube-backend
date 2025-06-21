import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Program } from './entities/program.entity';
import { ProgramService } from './programs.service';
import { ProgramController } from './programs.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Program])],
  providers: [ProgramService],
  controllers: [ProgramController],
  exports: [ProgramService],
})
export class ProgramModule {}
