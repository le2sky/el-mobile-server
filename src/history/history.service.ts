import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AwsProvider } from '../aws/aws.provider';
import { Equal, Repository } from 'typeorm';
import { HistoryEntity } from '../database/entities/history.entity';
import { DietDto } from './dto/diet.dto';

@Injectable()
export class HistoryService {
  constructor(
    @InjectRepository(HistoryEntity)
    private historyRepository: Repository<HistoryEntity>,
    private awsProvider: AwsProvider,
  ) {}

  async getContents(trainer_id: number, userId: number, date: string) {
    const contents = await this.historyRepository.findBy({
      trainer_id: Equal(trainer_id),
      customer_id: Equal(userId),
      perform_time: Equal(date),
    });

    if (contents.length < 1)
      throw new NotFoundException('히스토리가 존재하지 않습니다.');
    return contents;
  }

  async createDiet(
    training_id: number,
    userId: number,
    file: Express.Multer.File,
    dto: DietDto,
  ) {
    const s3Obj = await this.awsProvider.upload('diet', file);
    const media = await this.awsProvider.createMedia(s3Obj.key, 'image');
    const date = new Date();
    const time = dto.time;
    const history = this.historyRepository.create({
      customer_id: userId,
      trainer_id: training_id,
      description: dto.getDescripion(),
      history_type: 'diet',
      perform_time: `${date.getFullYear()}-${
        date.getMonth() + 1
      }-${date.getDate()} ${time.slice(0, 2)}:${time.slice(2)}`,
      media,
    });

    return await this.historyRepository.save(history);
  }
}
