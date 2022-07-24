import { IsEnum, IsIn, IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { DateAuditEntity } from './interface/dateAudit.entity';

export const MEDIA_TYPES = ['video', 'sound', 'image', 'gif'];

@Entity('media')
export class MediaEntity extends DateAuditEntity {
  @PrimaryGeneratedColumn()
  media_id: number;

  @IsString()
  @Column({ type: 'varchar', length: 255, nullable: false })
  path: string;

  @IsString()
  @IsIn(MEDIA_TYPES)
  @Column({ type: 'varchar', length: 6, nullable: false })
  media_type: 'video' | 'sound' | 'image' | 'gif';
}
