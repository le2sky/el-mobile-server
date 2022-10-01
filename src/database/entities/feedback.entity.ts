import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { HistoryEntity } from './history.entity';
import { DateAuditEntity } from './interface/dateAudit.entity';

@Entity('feedback')
export class FeedBackEntity extends DateAuditEntity {
  @PrimaryGeneratedColumn()
  feedback_id: number;

  @PrimaryColumn()
  history_id: number;

  @PrimaryColumn()
  customer_id: number;

  @PrimaryColumn()
  trainer_id: number;

  @ManyToOne(() => HistoryEntity)
  @JoinColumn([
    { name: 'history_id', referencedColumnName: 'history_id' },
    { name: 'trainer_id', referencedColumnName: 'trainer_id' },
    { name: 'customer_id', referencedColumnName: 'customer_id' },
  ])
  history: HistoryEntity;

  @Column({ type: 'text', nullable: true })
  contents?: string;
}
