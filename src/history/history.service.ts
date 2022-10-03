import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AwsProvider } from '../aws/aws.provider';
import { Equal, Repository } from 'typeorm';
import { HistoryEntity } from '../database/entities/history.entity';
import { DietDto } from './dto/diet.dto';
import { TrainerEntity } from '../database/entities/trainer.entity';
import { WorkoutDto } from './dto/workout.dto';
import { IHistory } from './dto/Ihistory';

@Injectable()
export class HistoryService {
  constructor(
    @InjectRepository(HistoryEntity)
    private historyRepository: Repository<HistoryEntity>,
    @InjectRepository(TrainerEntity)
    private trainerRepository: Repository<TrainerEntity>,
    private awsProvider: AwsProvider,
  ) {}

  async getContents(
    trainer_id: number,
    userId: number,
    date: string,
    type: string,
  ) {
    /*
      select history.history_id , history.history_type, history.perform_time, history.description, media.`path`
      from history
      left join media
      on history.media = media.media_id
      where Date(perform_time) = "2022-10-03" and customer_id = 1 and trainer_id =1;
    */

    const exist = await this.trainerRepository.findOneBy({ trainer_id });
    if (!exist) throw new NotFoundException('존재하지 않는 트레이너입니다.');

    const target = `${date.slice(0, 4)}-${date.slice(4, 6)}-${date.slice(6)}`;
    const contents = await this.historyRepository
      .createQueryBuilder('history')
      .select([
        'history.history_id',
        'history.perform_time',
        'history.description',
        'media.path',
      ])
      .leftJoin('history.media', 'media')
      .where(
        'Date(history.perform_time) = :target and history.customer_id = :customer_id and history.trainer_id = :trainer_id and history.history_type = :type',
        {
          type,
          target,
          trainer_id,
          customer_id: userId,
        },
      )
      .getMany();

    if (contents.length < 1)
      throw new NotFoundException('히스토리가 존재하지 않습니다.');

    const res: IHistory[] = [];

    if (type == 'workout') {
      for (const content of contents) {
        const temp = new WorkoutDto();
        const [index, sets, reps, degree, parts] =
          content.description.split('/');
        temp.time = content.perform_time.toLocaleString();
        temp.index = Number(index);
        temp.sets = Number(sets);
        temp.reps = Number(reps);
        temp.degree = degree;
        temp.parts = parts.split(',');
        temp.video = content.media.path;
        res.push(temp);
      }
      return (res as WorkoutDto[]).sort((a, b) => a.index - b.index);
    }

    for (const content of contents) {
      const temp = new DietDto();
      const [title, amount, score] = content.description.split('/');
      temp.time = content.perform_time.toLocaleString();
      temp.title = title;
      temp.amount = amount;
      temp.score = Number(score);
      temp.path = content.media.path;
      res.push(temp);
    }

    return res;
  }

  async createWorkout(
    trainer_id: number,
    userId: number,
    file: Express.Multer.File,
    dto: WorkoutDto,
  ) {
    const s3Obj = await this.awsProvider.upload('workout', file);
    const media = await this.awsProvider.createMedia(s3Obj.key, 'video');

    const history = this.historyRepository.create({
      customer_id: userId,
      description: dto.getDescripion(),
      history_type: 'workout',
      perform_time: new Date(),
      trainer_id,
      media,
    });

    return await this.historyRepository.save(history);
  }

  async createDiet(
    trainer_id: number,
    userId: number,
    file: Express.Multer.File,
    dto: DietDto,
  ) {
    const s3Obj = await this.awsProvider.upload('diet', file);
    const media = await this.awsProvider.createMedia(s3Obj.key, 'image');
    const time = dto.time;
    const history = this.historyRepository.create({
      customer_id: userId,
      description: dto.getDescripion(),
      history_type: 'diet',
      perform_time: this.getDateFromDateSTR(time),
      trainer_id,
      media,
    });

    return await this.historyRepository.save(history);
  }

  private getDateFromDateSTR(time: string) {
    const current = new Date();
    const hour = Number(time.slice(0, 2));
    const min = Number(time.slice(2));
    current.setHours(hour, min, 0, 0);
    return current;
  }
}
