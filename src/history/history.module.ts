import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from 'src/database/entities/user.entity';
import { VideoEntity } from 'src/database/entities/video.entity';
import { WorkoutEntity } from 'src/database/entities/workout.entity';
import { WorkoutHistoryEntity } from 'src/database/entities/workout_history.entity';
import { WorkoutLogEntity } from 'src/database/entities/workout_log.entity';
import { HistoryController } from './history.controller';
import { HistoryService } from './history.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UsersEntity,
      WorkoutEntity,
      WorkoutHistoryEntity,
      WorkoutLogEntity,
      VideoEntity,
    ]),
  ],
  controllers: [HistoryController],
  providers: [HistoryService],
})
export class HistoryModule {}
