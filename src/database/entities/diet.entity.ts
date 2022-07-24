import { IsDate } from 'class-validator';
import { Column, Entity } from 'typeorm';
import { DateAuditEntity } from './dataAudit.entity';

@Entity('diet')
export class DietEntity extends DateAuditEntity {
  /*

+ 미디어 번호 (1: 1)
+ 회원 번호 (1 : N)

*/

  @IsDate()
  @Column({ type: 'datetime' })
  diet_time: Date;
}
