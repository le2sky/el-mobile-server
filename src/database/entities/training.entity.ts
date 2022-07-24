import { IsDateString, IsNotEmpty } from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CustomerEntity } from './customer.entity';
import { TrainerEntity } from './trainer.entity';

@Entity('training')
export class TrainingEntity {
  @PrimaryGeneratedColumn()
  training_id: number;

  @IsDateString()
  @IsNotEmpty()
  @Column({ type: 'datetime', nullable: false })
  enrollAt: string;

  @IsDateString()
  @IsNotEmpty()
  @Column({ type: 'datetime', nullable: false })
  expirationAt: string;

  @ManyToOne(() => CustomerEntity, (customer) => customer.trainings)
  @JoinColumn({ name: 'customer_id', referencedColumnName: 'customer_id' })
  customer: CustomerEntity;

  @ManyToOne(() => TrainerEntity, (trainer) => trainer.trainings)
  @JoinColumn({ name: 'trainer_id', referencedColumnName: 'phone_number' })
  trainer: TrainerEntity;
}
