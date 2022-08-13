import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrainingEntity } from '../database/entities/training.entity';
import { TrainerEntity } from '../database/entities/trainer.entity';
import { TrainingController } from './training.controller';
import { TrainingService } from './training.service';

@Module({
  imports: [TypeOrmModule.forFeature([TrainerEntity, TrainingEntity])],
  controllers: [TrainingController],
  providers: [TrainingService],
})
export class TrainingModule {}
