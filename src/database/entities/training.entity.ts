import { IsDate, IsNotEmpty } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { CustomerEntity } from './customer.entity';
import { TrainerEntity } from './trainer.entity';

@Entity('training')
export class TrainingEntity {
  @PrimaryColumn()
  customer_id: number;

  @PrimaryColumn()
  trainer_id: number;

  @IsDate()
  @IsNotEmpty()
  @Column({ type: 'datetime', nullable: false })
  enrollAt: Date;

  @IsDate()
  @IsNotEmpty()
  @Column({ type: 'datetime', nullable: false })
  expirationAt: Date;

  @ManyToOne(() => CustomerEntity, (customer) => customer.trainings)
  @JoinColumn({ name: 'customer_id', referencedColumnName: 'customer_id' })
  customer: CustomerEntity;

  @ManyToOne(() => TrainerEntity, (trainer) => trainer.trainings)
  @JoinColumn({ name: 'trainer_id', referencedColumnName: 'trainer_id' })
  trainer: TrainerEntity;
}
