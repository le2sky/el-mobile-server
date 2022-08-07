import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrainerEntity } from '../database/entities/trainer.entity';
import { TrainingController } from './training.controller';
import { TrainingService } from './training.service';

@Module({
  imports: [TypeOrmModule.forFeature([TrainerEntity])],
  controllers: [TrainingController],
  providers: [TrainingService],
})
export class TrainingModule {}
