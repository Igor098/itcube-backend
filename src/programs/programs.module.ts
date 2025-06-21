import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Program } from './entities/program.entity';
import { ProgramsService } from './programs.service';
import { ProgramsController } from './programs.controller';
import { User } from '@/users/entities/user.entity';
import { UsersService } from '@/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Program, User])],
  providers: [ProgramsService, UsersService],
  controllers: [ProgramsController],
})
export class ProgramModule {}
