import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { GroupsService } from './groups.service';
import { Authorization } from '@/auth/decorators/auth.decorator';
import { Group } from './entities/group.entity';
import { GroupDto } from './dto/group.dto';
import { GroupListItemDto, GroupResponseDto } from './dto/group-response.dto';

@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Authorization('admin')
  @Get('all')
  @HttpCode(HttpStatus.OK)
  public async findAll(): Promise<GroupListItemDto[]> {
    return await this.groupsService.findAll();
  }

  @Authorization('teacher', 'admin')
  @Get('by-id/:id')
  @HttpCode(HttpStatus.OK)
  public async findById(@Param('id') id: string): Promise<GroupResponseDto> {
    return await this.groupsService.findById(+id);
  }

  @Authorization('teacher', 'admin')
  @Get('by-name/:name')
  @HttpCode(HttpStatus.OK)
  public async findByName(
    @Param('name') name: string,
  ): Promise<GroupResponseDto> {
    return await this.groupsService.findByName(name);
  }

  @Authorization('admin')
  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  public async create(@Body() group: GroupDto): Promise<Group> {
    return await this.groupsService.create(group);
  }

  @Authorization('admin')
  @Put('update/:id')
  public async update(
    @Param('id') id: string,
    group: GroupDto,
  ): Promise<Group> {
    return await this.groupsService.update(+id, group);
  }

  @Authorization('admin')
  public async delete(@Param('id') id: string): Promise<boolean> {
    return await this.groupsService.delete(+id);
  }
}
