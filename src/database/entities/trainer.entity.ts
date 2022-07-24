import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { CommonUserEntity } from './interface/common.user';

@Entity('trainer')
export class TrainerEntity extends CommonUserEntity {
  @PrimaryColumn()
  phone_number: string;

  @Column({ type: 'text', length: 300, nullable: true })
  career?: string;

  @Column({ type: 'text', length: 300, nullable: true })
  award?: string;

  @Column({ type: 'text', length: 300, nullable: true })
  self_introduction?: string;
}
