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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('트레이닝(Macthing)')
@Controller('training')
@UseInterceptors(SuccessInterceptor)
export class TrainingController {
  constructor(private trainingService: TrainingService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: '나의 트레이닝 조회',
    description:
      '주어진 jwt 토큰을 이용해, 내가 소속된 트레이닝의 정보를 리턴합니다.',
  })
  @ApiResponse({
    status: 200,
    description: '레코드가 성공적으로 조회 됐습니다.',
  })
  @Get()
  async myTraining(@User() user: CustomerEntity) {
    return await this.trainingService.getMyTraining(user.customer_id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: '모든 트레이너 조회',
    description:
      '트레이너와 매칭하기 위해서 모든 트레이너의 목록을 리턴합니다.',
  })
  @ApiResponse({
    status: 200,
    description: '레코드가 성공적으로 조회 됐습니다.',
  })
  @Get('/trainers')
  async allTrainer() {
    return await this.trainingService.getAllTrainer();
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: '트레이너와 매칭합니다.',
    description:
      'URI 파라미터로 전달된 트레이너 ID와 jwt 토큰을 기반으로 트레이닝을 생성합니다.',
  })
  @ApiResponse({
    status: 201,
    description: '레코드가 성공적으로 생성 됐습니다.',
  })
  @Post(':trainerId/join')
  async joinTrainer(
    @Param('trainerId') trainerId: number,
    @User() user: CustomerEntity,
  ) {
    return await this.trainingService.join(user.customer_id, trainerId);
  }
}
