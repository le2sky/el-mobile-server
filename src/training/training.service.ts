import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TrainerEntity } from '../database/entities/trainer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TrainingService {
  constructor(
    @InjectRepository(TrainerEntity)
    private trainerRepository: Repository<TrainerEntity>,
  ) {}

  async getAllTrainer() {
    return await this.trainerRepository.find();
  }
}
