import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { SuccessInterceptor } from '../common/interceptors/success.interceptor';
import { TrainingService } from './training.service';

@Controller('training')
@UseInterceptors(SuccessInterceptor)
export class TrainingController {
  constructor(private trainingService: TrainingService) {}

  @Get()
  async getAll() {
    return await this.trainingService.getAllTrainer();
  }
}
