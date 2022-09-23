import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TrainerEntity } from '../database/entities/trainer.entity';
import { TrainingEntity } from '../database/entities/training.entity';
import { TrainingController } from './training.controller';
import { TrainingService } from './training.service';

const trainerRepository = {
  findOne: jest.fn(),
  save: jest.fn(),
  create: jest.fn(),
};

const trainingRepository = {
  findOne: jest.fn(),
  save: jest.fn(),
  create: jest.fn(),
};

describe('TrainingService', () => {
  let service: TrainingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TrainingController],
      providers: [
        TrainingService,
        {
          provide: getRepositoryToken(TrainerEntity),
          useValue: trainerRepository,
        },
        {
          provide: getRepositoryToken(TrainingEntity),
          useValue: trainingRepository,
        },
      ],
    }).compile();

    service = module.get<TrainingService>(TrainingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
