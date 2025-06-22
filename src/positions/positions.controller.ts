import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { PositionService } from './positions.service';
import { PositionResponseDto } from './dto/position-response.dto';
import { mapPositionsToListDto } from './mapper/position.mapper';
import { Authorization } from '@/auth/decorators/auth.decorator';
import { RoleName } from '@/user_roles/entities/user_role.entity';

@Controller('position')
export class PositionController {
  constructor(private readonly positionService: PositionService) {}

  @Authorization(RoleName.ADMIN)
  @Get('all')
  @HttpCode(HttpStatus.OK)
  public async findAll(): Promise<PositionResponseDto[]> {
    const positions = await this.positionService.findAll();

    return mapPositionsToListDto(positions);
  }
}
