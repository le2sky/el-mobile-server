import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VideoEntity } from 'src/database/entities/video.entity';
import { WorkoutEntity } from 'src/database/entities/workout.entity';
import { WorkoutHistoryEntity } from 'src/database/entities/workout_history.entity';
import { WorkoutLogEntity } from 'src/database/entities/workout_log.entity';
import { Repository } from 'typeorm';
import { CreateHistoryDto } from './dto/createHistory.dto';
import { CreateLogDto } from './dto/createLog.dto';

@Injectable()
export class HistoryService {
  constructor(
    @InjectRepository(WorkoutHistoryEntity)
    private workoutHistoryRepository: Repository<WorkoutHistoryEntity>,

    @InjectRepository(WorkoutLogEntity)
    private workoutLogsRepository: Repository<WorkoutLogEntity>,

    @InjectRepository(WorkoutEntity)
    private workoutRepository: Repository<WorkoutEntity>,

    @InjectRepository(VideoEntity)
    private videoRepository: Repository<VideoEntity>,
  ) {}

  async getOne(historyId: number) {
    return await this.workoutHistoryRepository
      .createQueryBuilder('workout_history')
      .leftJoinAndSelect('worktout_history.logs', 'workout_logs')
      .leftJoinAndSelect('workout_logs.video', 'video')
      .leftJoinAndSelect('workout_logs.workout', 'workout')
      .whereInIds(historyId)
      .getOne();
  }
  async create(dto: CreateHistoryDto) {
    return await this.workoutHistoryRepository.save(dto);
  }

  async createLogs(dto: CreateLogDto) {
    const { workout_id, history_id } = dto;
    const workout_exist = await this.workoutRepository.findOneBy({
      id: workout_id,
    });
    const history_exist = await this.workoutHistoryRepository.findOneBy({
      id: history_id,
    });

    if (!workout_exist)
      throw new BadRequestException('존재하지 않는 운동입니다.');

    if (!history_exist)
      throw new BadRequestException('존재하지 않는 기록입니다.');

    delete dto.history_id;
    delete dto.workout_id;
    return await this.workoutLogsRepository.save({
      workout: workout_exist,
      history: history_exist,
      ...dto,
    });
  }

  async setLogVideo(logId: number, videoId: number) {
    return await this.workoutLogsRepository.update(
      { id: logId },
      { video: await this.videoRepository.findOneBy({ id: videoId }) },
    );
  }

  async delete(historyId: number) {
    return await this.workoutHistoryRepository.delete(historyId);
  }
}
