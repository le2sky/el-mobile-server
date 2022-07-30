import { IsNotEmpty, IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CommunityEntity } from './community.entity';
import { CustomerEntity } from './customer.entity';
import { TrainerEntity } from './trainer.entity';

@Entity('comment')
export class CommentEntity {
  @PrimaryGeneratedColumn()
  comment_id: number;

  @PrimaryColumn()
  post_id: number;

  @IsString()
  @IsNotEmpty()
  @Column({ type: 'text', nullable: true })
  content?: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => CommunityEntity, (post) => post.comments)
  @JoinColumn({ name: 'post_id', referencedColumnName: 'post_id' })
  post: CommentEntity;

  @ManyToOne(() => CustomerEntity, {
    nullable: true,
  })
  @JoinColumn({ name: 'customer_id', referencedColumnName: 'customer_id' })
  customer?: CustomerEntity;

  @ManyToOne(() => TrainerEntity, {
    nullable: true,
  })
  @JoinColumn({ name: 'trainer_id', referencedColumnName: 'trainer_id' })
  trainer?: TrainerEntity;

  @ManyToOne(() => CommentEntity, {
    nullable: true,
  })
  @JoinColumn({ name: 'parent_comment_id', referencedColumnName: 'comment_id' })
  parent_comment_id?: number;
}
