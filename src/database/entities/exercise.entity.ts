import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { DateAuditEntity } from './dataAudit.entity';

export class ExerciseEntity extends DateAuditEntity {
  @PrimaryGeneratedColumn()
  exercise_id: number;

  @Column({ type: 'text', length: 300 })
  exer_description: string;
}
