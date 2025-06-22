import { Module } from '@nestjs/common';
import { PositionService } from './positions.service';
import { PositionController } from './positions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Position } from './entities/position.entity';
import { User } from '@/users/entities/user.entity';
import { UsersService } from '@/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Position, User])],
  controllers: [PositionController],
  providers: [PositionService, UsersService],
})
export class PositionModule {}
