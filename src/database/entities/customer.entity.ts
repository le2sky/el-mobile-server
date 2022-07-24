import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { CommonUserEntity } from './userCommon.entity';

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
