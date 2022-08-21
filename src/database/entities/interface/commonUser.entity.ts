import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { Column } from 'typeorm';
import { DateAuditEntity } from './dateAudit.entity';

export abstract class CommonUserEntity extends DateAuditEntity {
  @ApiProperty()
  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  @IsString()
  @Column({ type: 'varchar', length: 50, unique: true, nullable: false })
  id: string;

  @ApiProperty()
  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  @IsString()
  @Column({ type: 'varchar', length: 50, nullable: false })
  name: string;

  @ApiProperty()
  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  @IsString()
  @Column({ type: 'varchar', length: 50, nullable: false })
  phone_number: string;

  @ApiProperty()
  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  @IsString()
  @Column({ type: 'varchar', length: 255, nullable: false })
  password: string;

  @ApiProperty()
  @IsBoolean()
  @Column({ type: 'boolean', nullable: true })
  agree_info?: boolean;

  @ApiProperty()
  @IsString()
  @Column({ type: 'varchar', length: 1, nullable: true })
  gender?: 'm' | 'f';
}
