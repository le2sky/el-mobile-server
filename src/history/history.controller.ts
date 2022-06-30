import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { CreateHistoryDto } from './dto/createHistory.dto';
import { CreateLogDto } from './dto/createLog.dto';
import { HistoryService } from './history.service';

@Controller('history')
@UseInterceptors(SuccessInterceptor)
export class HistoryController {
  constructor(private historyService: HistoryService) {}

  @Get(':id')
  async getOne(@Param('id') historyId: number) {
    return await this.historyService.getOne(historyId);
  }

  @Post()
  async createHistory(@Body() dto: CreateHistoryDto) {
    return await this.createHistory(dto);
  }

  @Post()
  async createLogs(@Body() dto: CreateLogDto) {
    return await this.createLogs(dto);
  }
}
