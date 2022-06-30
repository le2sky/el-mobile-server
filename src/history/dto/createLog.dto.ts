import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { WorkoutLogEntity } from 'src/database/entities/workout_log.entity';

export class CreateLogDto extends PartialType(WorkoutLogEntity) {
  @IsNotEmpty()
  @IsNumber()
  workout_id: number;

  @IsNotEmpty()
  @IsNumber()
  history_id: number;
}
