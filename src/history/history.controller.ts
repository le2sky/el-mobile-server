import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from '../common/decorators/user.decorator';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { SuccessInterceptor } from '../common/interceptors/success.interceptor';
import { DietDto } from './dto/diet.dto';
import { WorkoutDto } from './dto/workout.dto';
import { HistoryService } from './history.service';
import { CustomerEntity } from '../database/entities/customer.entity';

@ApiTags('기록(History)')
@UseInterceptors(SuccessInterceptor)
@Controller('history')
export class HistoryController {
  constructor(private historyService: HistoryService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: '트레이너의 피드백을 받아옵니다.',
    description: '',
  })
  @ApiResponse({
    status: 200,
    description: '레코드가 성공적으로 조회 됐습니다.',
  })
  @Get('/feedback')
  async feedback() {
    return [
      '속도를 천천히 가동범위를 충분히 늘려주면 좋을것같습니다.',
      '엉덩이를 더 뒤로 빼고 무게중심을 낮춰 자세를 고정하면 좋을것같습니다',
      '팔을 조금 앞으로 빼서 어깨를 고정하고 가동범위를 늘려주면 좋을것같습니다',
    ];
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: '식단 및 피드백 조회',
    description: '',
  })
  @ApiResponse({
    status: 200,
    description: '레코드가 성공적으로 조회 됐습니다.',
  })
  @Get('/diet/:trainer_id/:YYYYMMDD')
  async getDiet(
    @Param('trainer_id') trainer_id: number,
    @Param('YYYYMMDD') date: string,
    @User() user: CustomerEntity,
  ) {
    return await this.historyService.getContents(
      trainer_id,
      user.customer_id,
      date,
      'diet',
    );
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: '운동영상 및 피드백 조회',
    description: '',
  })
  @ApiResponse({
    status: 200,
    description: '레코드가 성공적으로 조회 됐습니다.',
  })
  @Get('/workout/:trainer_id/:YYYYMMDD')
  async getWorktout(
    @Param('trainer_id') trainer_id: number,
    @Param('YYYYMMDD') date: string,
    @User() user: CustomerEntity,
  ) {
    return await this.historyService.getContents(
      trainer_id,
      user.customer_id,
      date,
      'workout',
    );
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: '식단 사진 업로드',
    description: '',
  })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({
    status: 201,
    description: '레코드가 성공적으로 생성 됐습니다.',
  })
  @UseInterceptors(FileInterceptor('file'))
  @Post('/diet/:trainer_id')
  async diet(
    @Body() dto: DietDto,
    @Param('trainer_id') trainer_id: number,
    @UploadedFile() file: Express.Multer.File,
    @User() user: CustomerEntity,
  ) {
    return await this.historyService.createDiet(
      trainer_id,
      user.customer_id,
      file,
      dto,
    );
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: '영상 업로드',
    description: '',
  })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({
    status: 201,
    description: '레코드가 성공적으로 생성 됐습니다.',
  })
  @UseInterceptors(FileInterceptor('file'))
  @Post('/workout/:trainer_id')
  async workout(
    @Body() dto: WorkoutDto,
    @Param('trainer_id') trainer_id: number,
    @UploadedFile() file: Express.Multer.File,
    @User() user,
  ) {
    return await this.historyService.createWorkout(
      trainer_id,
      user.customer_id,
      file,
      dto,
    );
  }
}
