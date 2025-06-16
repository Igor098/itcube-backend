import { Controller } from '@nestjs/common';
import { PositionService } from './positions.service';

@Controller('position')
export class PositionController {
  constructor(private readonly positionService: PositionService) {}
}
