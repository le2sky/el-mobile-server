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
import { TrainerInfoResponseDto } from './dto/trainerInfoResponse.dto';

@Injectable()
export class TrainingService {
  constructor(
    @InjectRepository(TrainerEntity)
    private trainerRepository: Repository<TrainerEntity>,

    @InjectRepository(TrainingEntity)
    private trainingRepository: Repository<TrainingEntity>,
  ) {}

  async getAllTrainer() {
    const trainers = await this.trainerRepository
      .createQueryBuilder('trainer')
      .leftJoinAndSelect('trainer.profile_image', 'media')
      .getMany();

    return trainers.map((trainer) => {
      const dto = new TrainerInfoResponseDto();
      dto.trainer_id = trainer.trainer_id;
      dto.name = trainer.name;
      dto.phone_number = trainer.phone_number;
      dto.career = trainer.career;
      dto.award = trainer.award;
      dto.self_introduction = trainer.self_introduction;
      dto.profile_image = trainer.profile_image.path;
      return dto;
    });
  }

  async getMyTraining(customerId: number) {
    return await this.trainingRepository.findBy({ customer_id: customerId });
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
