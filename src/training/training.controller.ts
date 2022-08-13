import {
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { User } from '../common/decorators/user.decorator';
import { CustomerEntity } from '../database/entities/customer.entity';
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

  @UseGuards(JwtAuthGuard)
  @Post(':trainerId/join')
  async joinTrainer(
    @Param('trainerId') trainerId: number,
    @User() user: CustomerEntity,
  ) {
    return await this.trainingService.join(user.customer_id, trainerId);
  }
}
