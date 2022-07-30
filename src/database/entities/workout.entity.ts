import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MediaEntity } from './media.entity';

@Entity('workout')
export class WorkoutEntity {
  @PrimaryGeneratedColumn()
  workout_id: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  workout_name: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  parent_categories: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  sub_categories: string;

  @OneToOne(() => MediaEntity, { nullable: true })
  @JoinColumn({ name: 'guide_video', referencedColumnName: 'media_id' })
  guide_video?: number;
}
