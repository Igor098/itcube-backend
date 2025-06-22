import type { Position } from '../entities/position.entity';
import type { PositionResponseDto } from '../dto/position-response.dto';

export function mapPositionToDto(position: Position): PositionResponseDto {
  return {
    id: position.id,
    name: position.name,
    description: position.description,
  };
}

export function mapPositionsToListDto(
  positions: Position[],
): PositionResponseDto[] {
  return positions.map(mapPositionToDto);
}
