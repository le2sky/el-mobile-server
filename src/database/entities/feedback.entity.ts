import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { DateAuditEntity } from './dataAudit.entity';

@Entity('feedback')
export class FeedBackEntity extends DateAuditEntity {
  @PrimaryGeneratedColumn()
  feedback_id: number;

  @Column({ type: 'text', length: 300 })
  contents: string;
}
