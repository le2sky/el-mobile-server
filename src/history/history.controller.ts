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

@ApiTags('기록(History)')
@UseInterceptors(SuccessInterceptor)
@Controller('history')
export class HistoryController {
  constructor(private historyService: HistoryService) {}

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
  @Post('/diet/:training_id')
  async diet(
    @Param('training_id') training_id: number,
    @UploadedFile() file: Express.Multer.File,
    @User() user,
  ) {
    return await this.historyService.createDiet(training_id, user.id, file);
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
  @Post('/workout/:training_id')
  async workout(
    @Param('training_id') training_id: number,
    @UploadedFile() file: Express.Multer.File,
    @User() user,
  ) {}
}
