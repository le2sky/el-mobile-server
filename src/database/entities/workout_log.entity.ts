import { IsNumber, IsString } from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DateAuditEntity } from './dataAudit.entity';
import { VideoEntity } from './video.entity';
import { WorkoutEntity } from './workout.entity';
import { WorkoutHistoryEntity } from './workout_history.entity';

@Entity('workout_log')
export class WorkoutLogEntity extends DateAuditEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => WorkoutHistoryEntity, (history) => history.logs)
  history: WorkoutHistoryEntity;

  @ManyToOne(() => WorkoutEntity, (workout) => workout.logs)
  workout: WorkoutEntity;

  @OneToOne(() => VideoEntity, {
    cascade: ['update', 'insert', 'remove', 'recover'],
  })
  @JoinColumn()
  video?: VideoEntity;

  @IsString()
  @Column({ type: 'text', nullable: true })
  memo?: string;

  @IsNumber()
  @Column({ unsigned: true, type: 'float', nullable: true })
  weight?: number;

  @IsString()
  @Column({ type: 'varchar', nullable: true })
  weight_unit?: 'k' | 'p';

  @IsNumber()
  @Column({ unsigned: true, type: 'smallint', nullable: true })
  reps?: number;

  @IsNumber()
  @Column({ unsigned: true, type: 'smallint', nullable: true })
  sets?: number;
}
