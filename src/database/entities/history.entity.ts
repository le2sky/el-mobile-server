import { IsIn, IsNotEmpty, IsString } from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DateAuditEntity } from './interface/date.audit';
import { MediaEntity } from './media.entity';
import { TrainingEntity } from './training.entity';

export const HISOTRY_TYPES = ['workout', 'diet'];
@Entity('history')
export class HistoryEntity extends DateAuditEntity {
  @PrimaryGeneratedColumn()
  history_id: number;

  @IsIn(HISOTRY_TYPES)
  @IsString()
  @IsNotEmpty()
  @Column({ type: 'varchar', length: 6, nullable: false })
  history_type: string;

  @IsString()
  @Column({ type: 'text', length: 300, nullable: true })
  description?: string;

  @ManyToOne(() => TrainingEntity)
  @JoinColumn({ name: 'training_id', referencedColumnName: 'training_id' })
  training: TrainingEntity;

  @OneToOne(() => MediaEntity)
  @JoinColumn({ name: 'profile_image', referencedColumnName: 'media_id' })
  profile_image?: string;
}
