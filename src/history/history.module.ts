import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoryEntity } from '../database/entities/history.entity';
import { AwsModule } from '../aws/aws.module';
import { HistoryController } from './history.controller';
import { HistoryService } from './history.service';

@Module({
  imports: [AwsModule, TypeOrmModule.forFeature([HistoryEntity])],
  controllers: [HistoryController],
  providers: [HistoryService],
})
export class HistoryModule {}
