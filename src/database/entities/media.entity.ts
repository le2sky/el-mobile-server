import { IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { DateAuditEntity } from './dataAudit.entity';

@Entity('media')
export class MediaEntity extends DateAuditEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @Column({ type: 'varchar', length: 255 })
  path: string;

  /*
     미디어 타입과 1 대 1
  */
}
