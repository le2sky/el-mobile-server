import { IsNumber } from 'class-validator';
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

@Entity('customer')
export class CustomerEntity extends CommonUserEntity {
  @PrimaryGeneratedColumn()
  customer_id: number;

  @IsNumber()
  @Column({ type: 'float', nullable: true })
  height?: number;

  @IsNumber()
  @Column({ type: 'float', nullable: true })
  weight?: number;

  @OneToMany(() => TrainingEntity, (traning) => traning.customer)
  trainings?: TrainingEntity[];

  @OneToMany(() => CommunityEntity, (post) => post.customer)
  posts?: CommunityEntity[];

  @OneToOne(() => MediaEntity, { nullable: true })
  @JoinColumn({ name: 'profile_image', referencedColumnName: 'media_id' })
  profile_image?: number;
}
