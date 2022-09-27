import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AwsProvider } from '../aws/aws.provider';
import { Repository } from 'typeorm';
import { HistoryEntity } from '../database/entities/history.entity';

@Injectable()
export class HistoryService {
  constructor(
    @InjectRepository(HistoryEntity)
    private historyRepository: Repository<HistoryEntity>,
    private awsProvider: AwsProvider,
  ) {}

  async createDiet(
    training_id: number,
    userId: number,
    file: Express.Multer.File,
  ) {
    const s3Obj = await this.awsProvider.upload('diet', file);
    const media = await this.awsProvider.createMedia(s3Obj.key, 'image');
  }
}
