import { Column, PrimaryColumn } from 'typeorm';
import { CommonUserEntity } from './userCommon.entity';

export class TrainerEntity extends CommonUserEntity {
  @PrimaryColumn()
  phone_number: string;

  @Column({ type: 'text', length: 300 })
  career: string;

  @Column({ type: 'text', length: 300 })
  award: string;

  @Column({ type: 'text', length: 300 })
  self_introduction: string;

  /*
 미디어와 1대 1 관계
*/
}
