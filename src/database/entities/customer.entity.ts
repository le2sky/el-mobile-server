import { IsNumber } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { CommonUserEntity } from './interface/common.user';

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
}
