import { IsNumber } from 'class-validator';
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

  @OneToOne(() => MediaEntity)
  @JoinColumn({ name: 'profile_image', referencedColumnName: 'media_id' })
  profile_image?: string;
}
