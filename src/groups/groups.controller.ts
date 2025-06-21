import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { GroupsService } from './groups.service';
import { Authorization } from '@/auth/decorators/auth.decorator';
import { GroupDto } from './dto/group.dto';
import { GroupListItemDto, GroupResponseDto } from './dto/group-response.dto';
import { mapGroupsToListDto, mapGroupToDto } from './mappers/group.mapper';
import { DeleteResponseDto } from '@/libs/common/dto/delete-response.dto';
import { RoleName } from '@/user_roles/entities/user_role.entity';

@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Authorization(RoleName.ADMIN)
  @Get('all')
  @HttpCode(HttpStatus.OK)
  public async findAll(): Promise<GroupListItemDto[]> {
    const groups = await this.groupsService.findAll();
    return mapGroupsToListDto(groups);
  }

  @Authorization(RoleName.ADMIN)
  @Get('by-id/:id')
  @HttpCode(HttpStatus.OK)
  public async findById(@Param('id') id: string): Promise<GroupResponseDto> {
    const group = await this.groupsService.findById(+id);
    return mapGroupToDto(group);
  }

  @Authorization(RoleName.ADMIN)
  @Get('by-name')
  @HttpCode(HttpStatus.OK)
  public async findByName(
    @Query('name') name: string,
  ): Promise<GroupResponseDto> {
    const group = await this.groupsService.findByName(name);
    return mapGroupToDto(group);
  }

  @Authorization(RoleName.ADMIN, RoleName.TEACHER)
  @Get('by-teacher/:teacherId')
  @HttpCode(HttpStatus.OK)
  public async findByTeacher(
    @Param('teacherId') teacherId: string,
  ): Promise<GroupListItemDto[]> {
    const groups = await this.groupsService.findByTeacher(+teacherId);
    return mapGroupsToListDto(groups);
  }

  @Authorization(RoleName.ADMIN)
  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  public async create(@Body() group: GroupDto): Promise<GroupResponseDto> {
    const newGroup = await this.groupsService.create(group);
    return mapGroupToDto(newGroup);
  }

  @Authorization(RoleName.ADMIN)
  @Put('update/:id')
  @HttpCode(HttpStatus.OK)
  public async update(
    @Param('id') id: string,
    @Body() group: GroupDto,
  ): Promise<GroupResponseDto> {
    const updatedGroup = await this.groupsService.update(+id, group);
    return mapGroupToDto(updatedGroup);
  }

  @Authorization(RoleName.ADMIN)
  @Delete('delete/:id')
  @HttpCode(HttpStatus.OK)
  public async delete(@Param('id') id: string): Promise<DeleteResponseDto> {
    return await this.groupsService.delete(+id);
  }
}
