import { IsDateString, IsIn, IsNotEmpty, IsString } from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { DateAuditEntity } from './interface/dateAudit.entity';
import { MediaEntity } from './media.entity';
import { TrainingEntity } from './training.entity';

export const HISOTRY_TYPES = ['workout', 'diet'];
@Entity('history')
export class HistoryEntity extends DateAuditEntity {
  @PrimaryColumn()
  customer_id: number;

  @PrimaryColumn()
  trainer_id: number;

  @IsIn(HISOTRY_TYPES)
  @IsString()
  @IsNotEmpty()
  @Column({ type: 'varchar', length: 6, nullable: false })
  history_type: string;

  @IsString()
  @Column({ type: 'text', nullable: true })
  description?: string;

  @IsDateString()
  @IsNotEmpty()
  @Column({ type: 'datetime', nullable: false })
  perform_time: string;

  @ManyToOne(() => TrainingEntity)
  @JoinColumn([
    { name: 'trainer_id', referencedColumnName: 'trainer_id' },
    { name: 'customer_id', referencedColumnName: 'customer_id' },
  ])
  training: TrainingEntity;

  @OneToOne(() => MediaEntity, { nullable: true })
  @JoinColumn({ name: 'media', referencedColumnName: 'media_id' })
  media?: number;
}
