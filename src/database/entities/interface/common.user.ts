import { Transform } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { Column, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { MediaEntity } from '../media.entity';
import { TrainingEntity } from '../training.entity';
import { DateAuditEntity } from './date.audit';

export abstract class CommonUserEntity extends DateAuditEntity {
  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  @IsString()
  @Column({ type: 'varchar', length: 20, unique: true, nullable: false })
  id: string;

  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  @IsString()
  @Column({ type: 'varchar', length: 20, nullable: false })
  name: string;

  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  @IsString()
  @Column({ type: 'varchar', length: 20, nullable: false })
  phone_number: string;

  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  @IsString()
  @Column({ type: 'varchar', length: 20, nullable: false })
  password: string;

  @IsBoolean()
  @Column({ type: 'boolean', nullable: true })
  agree_info?: boolean;

  @IsString()
  @Column({ type: 'varchar', length: 1, nullable: true })
  gender?: 'm' | 'f';

  @OneToMany(() => TrainingEntity, (traning) => traning.customer)
  trainings?: TrainingEntity[];

  @OneToOne(() => MediaEntity)
  @JoinColumn({ name: 'profile_image', referencedColumnName: 'media_id' })
  profile_image?: string;
}
