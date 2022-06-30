import { IsNumber, IsString } from 'class-validator';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DateAuditEntity } from './dataAudit.entity';
import { UsersEntity } from './user.entity';
import { WorkoutLogEntity } from './workout_log.entity';

@Entity('workout_history')
export class WorkoutHistoryEntity extends DateAuditEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UsersEntity, (user) => user.histories)
  user: UsersEntity;

  @OneToMany(() => WorkoutLogEntity, (log) => log.history)
  logs: WorkoutLogEntity[];

  @IsNumber()
  @Column({ unsigned: true, type: 'float', nullable: true })
  total_volume?: number;

  @IsString()
  @Column({ type: 'text', nullable: true })
  description?: string;
}
