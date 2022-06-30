import { IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { DateAuditEntity } from './dataAudit.entity';

@Entity('video')
export class VideoEntity extends DateAuditEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @Column({ type: 'varchar', length: 255 })
  s3_address: string;
}
