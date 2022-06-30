import { PickType } from '@nestjs/swagger';
import { VideoEntity } from 'src/database/entities/video.entity';

export class CreateVideoDto extends PickType(VideoEntity, [
  's3_address',
] as const) {}
