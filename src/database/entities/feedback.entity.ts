import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DateAuditEntity } from './interface/date.audit';
import { TrainingEntity } from './training.entity';

@Entity('feedback')
export class FeedBackEntity extends DateAuditEntity {
  @ManyToOne(() => TrainingEntity)
  @JoinColumn([
    { name: 'training_id', referencedColumnName: 'traning_id' },
    { name: 'history_id', referencedColumnName: 'history_id' },
  ])
  training: TrainingEntity;

  @Column({ type: 'text', length: 300, nullable: true })
  contents?: string;
}
