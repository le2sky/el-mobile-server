import { IsNotEmpty, IsString } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { WorkoutLogEntity } from './workout_log.entity';

@Entity('workout')
export class WorkoutEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @IsString()
  @Column({ type: 'varchar', length: 99 })
  workout_name: string;

  @IsNotEmpty()
  @IsString()
  @Column({ type: 'text' })
  workout_description: string;

  @OneToMany(() => WorkoutLogEntity, (log) => log.workout, {
    cascade: ['update', 'insert', 'remove', 'recover'],
  })
  logs: WorkoutLogEntity[];
}
