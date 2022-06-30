import { PickType } from '@nestjs/swagger';
import { WorkoutHistoryEntity } from 'src/database/entities/workout_history.entity';

export class CreateHistoryDto extends PickType(WorkoutHistoryEntity, [
  'total_volume',
  'description',
] as const) {}
