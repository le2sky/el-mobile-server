import { PickType } from '@nestjs/swagger';
import { TrainerEntity } from '../../database/entities/trainer.entity';

export class TrainerInfoResponseDto extends PickType(TrainerEntity, [
  `trainer_id`,
  `name`,
  `phone_number`,
  `career`,
  `award`,
  `self_introduction`,
] as const) {
  profile_image: string;
}
