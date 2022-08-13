import {
  BadRequestException,
  ConsoleLogger,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TrainerEntity } from '../database/entities/trainer.entity';
import { Repository } from 'typeorm';
import { TrainingEntity } from '../database/entities/training.entity';

@Injectable()
export class TrainingService {
  constructor(
    @InjectRepository(TrainerEntity)
    private trainerRepository: Repository<TrainerEntity>,

    @InjectRepository(TrainingEntity)
    private trainingRepository: Repository<TrainingEntity>,
  ) {}

  async getAllTrainer() {
    return await this.trainerRepository.find();
  }

  async join(customerId: number, trainerId: number) {
    const trainer = await this.trainerRepository.findOneBy({
      trainer_id: trainerId,
    });

    if (trainer == null) {
      throw new NotFoundException('존재하지 않는 트레이너입니다.');
    }

    const duplication: boolean = await this.trainingRepository
      .findBy({
        trainer_id: trainerId,
      })
      .then((entities) => entities.filter((v) => v.customer_id === customerId))
      .then((v) => Boolean(v[0]));

    if (duplication) {
      throw new BadRequestException('이미 트레이너에게 등록된 회원입니다.');
    }

    const training = this.trainingRepository.create({
      customer_id: customerId,
      trainer_id: trainerId,
      enrollAt: new Date(),
      expirationAt: new Date(),
    });

    return await this.trainingRepository.save(training);
  }
}
