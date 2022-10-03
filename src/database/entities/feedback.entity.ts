import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { HistoryEntity } from './history.entity';
import { DateAuditEntity } from './interface/dateAudit.entity';

@Entity('feedback')
export class FeedBackEntity extends DateAuditEntity {
  @PrimaryColumn()
  history_id: number;

  @OneToOne(() => HistoryEntity)
  @JoinColumn([{ name: 'history_id', referencedColumnName: 'history_id' }])
  history: HistoryEntity;

  @Column({ type: 'text', nullable: true })
  contents?: string;
}
