import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CommunityEntity } from './community.entity';
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

  @Column({ type: 'text', nullable: true })
  self_introduction?: string;

  @OneToMany(() => TrainingEntity, (traning) => traning.trainer)
  trainings?: TrainingEntity[];

  @OneToMany(() => CommunityEntity, (post) => post.trainer)
  posts?: CommunityEntity[];

  @OneToOne(() => MediaEntity, { nullable: true })
  @JoinColumn({ name: 'profile_image', referencedColumnName: 'media_id' })
  profile_image?: number;
}
