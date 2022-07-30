import { IsNotEmpty, IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CommentEntity } from './comment.entity';
import { CustomerEntity } from './customer.entity';
import { TrainerEntity } from './trainer.entity';

@Entity('community')
export class CommunityEntity {
  @PrimaryGeneratedColumn()
  post_id: number;

  @IsString()
  @IsNotEmpty()
  @Column({ type: 'text', nullable: true })
  content?: string;

  @Column({ type: 'integer', nullable: true })
  like_count?: number;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => CommentEntity, (comment) => comment.post, {
    nullable: true,
  })
  comments?: CommentEntity[];

  @ManyToOne(() => CustomerEntity, (customer) => customer.posts, {
    nullable: true,
  })
  @JoinColumn({ name: 'customer_id', referencedColumnName: 'customer_id' })
  customer?: CustomerEntity;

  @ManyToOne(() => TrainerEntity, (trainer) => trainer.posts, {
    nullable: true,
  })
  @JoinColumn({ name: 'trainer_id', referencedColumnName: 'trainer_id' })
  trainer?: TrainerEntity;
}
