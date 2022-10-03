import {
  Body,
  Controller,
  Get,
  Param,
  Post,
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
  @ApiResponse({
    status: 201,
    description: '레코드가 성공적으로 생성 됐습니다.',
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  @Post('/workout/:trainer_id')
  async workout(
    @Param('trainer_id') trainer_id: number,
    @UploadedFile() file: Express.Multer.File,
    @User() user,
  ) {}
}
