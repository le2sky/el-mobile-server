import { Transform } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { Column } from 'typeorm';
import { DateAuditEntity } from './dataAudit.entity';

export abstract class CommonUserEntity extends DateAuditEntity {
  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  @IsString()
  @Column({ type: 'varchar', length: 20, unique: true })
  id: string;

  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  @IsString()
  @Column({ type: 'varchar', length: 20 })
  name: string;

  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  @IsString()
  @Column({ type: 'varchar', length: 20 })
  phone_number: string;

  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  @IsString()
  @Column({ type: 'varchar', length: 20 })
  password: string;

  @IsBoolean()
  @Column({ type: 'boolean' })
  agree_info?: boolean;

  @IsString()
  @Column({ type: 'varchar', length: 1 })
  gender?: 'm' | 'f';
}
