import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DateAuditEntity } from './dataAudit.entity';
import { WorkoutHistoryEntity } from './workout_history.entity';

@Entity('users')
export class UsersEntity extends DateAuditEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @IsString()
  @Column({ type: 'varchar', length: 20, unique: true })
  user_id: string;

  @IsNotEmpty()
  @IsString()
  @Column({ type: 'varchar', length: 20 })
  password: string;

  @IsNotEmpty()
  @IsString()
  @Column({ type: 'varchar', length: 20 })
  nickName: string;

  @IsNotEmpty()
  @IsEmail()
  @IsString()
  @Column({ type: 'varchar', length: 99, unique: true })
  email: string;

  @IsString()
  @Column({ type: 'varchar', length: 255, nullable: true })
  profile_image?: string;

  @IsString()
  @Column({ type: 'varchar', length: 255 })
  fcm_token?: string;

  @IsNotEmpty()
  @IsString()
  @Column({ type: 'varchar', length: 1 })
  gender: 'm' | 'f';

  @IsNumber()
  @Column({ type: 'float', nullable: true })
  height?: number;

  @IsNumber()
  @Column({ type: 'float', nullable: true })
  weight?: number;

  @IsNotEmpty()
  @IsBoolean()
  @Column({ type: 'boolean' })
  push_notification: boolean;

  @IsNotEmpty()
  @IsBoolean()
  @Column({ type: 'boolean' })
  agree_info: boolean;

  @IsNotEmpty()
  @IsBoolean()
  @Column({ type: 'boolean' })
  agree_marketing: boolean;

  @OneToMany(() => WorkoutHistoryEntity, (history) => history.user, {
    cascade: ['update', 'insert', 'remove', 'recover'],
  })
  histories: WorkoutHistoryEntity[];
}
