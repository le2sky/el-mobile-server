import { PickType } from '@nestjs/swagger';
import { MediaEntity } from '../../database/entities/media.entity';

export class CreateVideoDto extends PickType(MediaEntity, ['path'] as const) {}
