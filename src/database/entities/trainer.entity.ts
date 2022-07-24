import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CommonUserEntity } from './interface/commonUser.entity';
import { MediaEntity } from './media.entity';
import { TrainingEntity } from './training.entity';

@Entity('trainer')
export class TrainerEntity extends CommonUserEntity {
  @PrimaryGeneratedColumn()
  trainer_id: number;

  @Column({ type: 'text', nullable: true })
  career?: string;

  @Column({ type: 'text', nullable: true })
  award?: string;

  @Column({ type: 'datetime', nullable: true })
  training_day?: string;

  @Column({ type: 'text', nullable: true })
  self_introduction?: string;

  @OneToMany(() => TrainingEntity, (traning) => traning.customer)
  trainings?: TrainingEntity[];

  @OneToOne(() => MediaEntity)
  @JoinColumn({ name: 'profile_image', referencedColumnName: 'media_id' })
  profile_image?: string;
}
